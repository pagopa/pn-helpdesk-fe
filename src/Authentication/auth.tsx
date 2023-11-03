import { Auth, Amplify } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { useCallback } from 'react';
import { Permission, UserData } from '../model/user-permission';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { setStorage, resetStorage, deleteStorage } from './storage';
import awsmobile from './aws-exports';

type Props = {
  /**
   * the username for logging
   */
  email: string;
  /**
   * the password for logging
   */
  password: string;
};

Amplify.configure(awsmobile);

function userDataForUser(user: any): UserData {
  const rawPermissions: string | undefined | null = user.attributes['custom:backoffice_tags'];

  // these are the permissions indicated in the Cognito state
  // rawPermissions could contain spaces after the commas, so we must trim the permission strings
  const possiblePermissions: Array<string> =
    rawPermissions && rawPermissions.length
      ? rawPermissions.split(',').map((permission) => permission.trim())
      : [];
  const allLegalPermissions = Object.values(Permission) as Array<string>;
  // these are the permissions indicated in the Cognito state *and* recognized by this app
  const validatedPermissions = possiblePermissions.filter((perm) =>
    allLegalPermissions.includes(perm)
  );

  return {
    email: user.attributes.email,
    permissions: validatedPermissions as Array<Permission>,
  };
}

export function useAuth() {
  const { setCurrentUser, clearCurrentUser } = useCurrentUser();

  /**
   * Performs the login and set both the tokens (in session storage)
   * and the user data (through setCurrentUser)
   */
  const login = useCallback(
    ({ email, password }: Props): Promise<any> =>
      Auth.signIn(email, password)
        .then((user) => {
          if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
            return setStorage('session', user.Session).then(() => user);
          } else {
            const token = user.signInUserSession.idToken.jwtToken;
            const refreshToken = user.signInUserSession.refreshToken.token;
            const accessToken = user.signInUserSession.accessToken.jwtToken;
            return Promise.allSettled([
              setStorage('token', token),
              setStorage('refreshToken', refreshToken),
              setStorage('accessToken', accessToken),
            ]).then(() => {
              setCurrentUser(userDataForUser(user));
              return user;
            });
          }
        })
        .catch((error: any) => {
          throw error;
        }),
    [setCurrentUser]
  );

  /**
   * logout the user
   * @returns
   */
  const logout = useCallback(
    (): Promise<any> =>
      Auth.signOut()
        .then(async () => {
          await resetStorage().then((res) => {
            clearCurrentUser();
            return res;
          });
        })
        .catch((error: any) => {
          throw error;
        }),
    [clearCurrentUser]
  );

  const refreshToken = useCallback((): void => {
    Auth.currentAuthenticatedUser()
      .then((user: CognitoUser) => {
        const refreshToken = user.getSignInUserSession()?.getRefreshToken();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        user.refreshSession(refreshToken!, async () => {
          const token = user.getSignInUserSession()?.getIdToken().getJwtToken();
          const accessToken = user.getSignInUserSession()?.getAccessToken().getJwtToken();
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          await setStorage('token', token!);
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          await setStorage('accessToken', accessToken!);
        });
      })
      .catch((error: any) => {
        throw error;
      });
  }, []);

  /**
   * for changing password adter the first login
   * @param user
   * @param newPassword
   * @returns
   */
  const changePassword = useCallback(
    (user: any, newPassword: string): Promise<any> =>
      Auth.completeNewPassword(user, newPassword)
        .then(async (user: any) => {
          const token = user.signInUserSession.idToken.jwtToken;
          const refreshToken = user.signInUserSession.refreshToken.token;
          const accessToken = user.signInUserSession.accessToken.jwtToken;
          return await Promise.allSettled([
            setStorage('token', token),
            setStorage('refreshToken', refreshToken),
            setStorage('accessToken', accessToken),
            deleteStorage('session'),
          ]).then(() => user);
        })
        .catch((error: any) => {
          throw error;
        }),
    []
  );

  /*
   * Function that allows to obtain user data for an already logged user.
   * It's used on page reload, to obtain this data in a scenario in which
   * the webapp startup (including user data registration)
   * must be performed without passing through a login.
   */
  const getUserData = useCallback(
    (): Promise<UserData | null> =>
      Auth.currentAuthenticatedUser()
        .then((user) => userDataForUser(user))
        .catch(() => null),
    []
  );

  return { login, logout, refreshToken, changePassword, getUserData };
}
