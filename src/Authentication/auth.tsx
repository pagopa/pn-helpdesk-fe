import { Auth, Amplify } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { useCallback } from 'react';
import { Permission, UserData } from '../model/user-permission';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { getConfiguration } from '../services/configuration.service';
import { setStorage, resetStorage, deleteStorage } from './storage';

export const CUSTOM_PERMISSION_KEY = 'custom:backoffice_tags';

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

export async function initAmplify() {
  // the dynamic import is needed, because the aws-exports file uses properties from configuration
  // so the configuration must be loaded (check the index.tsx file) before importing the aws-exports file
  try {
    const { default: awsmobile } = await import('./aws-exports');
    Amplify.configure(awsmobile);
  } catch (e: any) {
    throw new Error(e);
  }
}

function userDataForUser(user: any): UserData {
  const rawPermissions: string | undefined | null = user.attributes[CUSTOM_PERMISSION_KEY];

  // these are the permissions indicated in the Cognito state
  // rawPermissions could contain spaces after the commas, so we must trim the permission strings
  const possiblePermissions: Array<string> = rawPermissions?.length
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
  const COGNITO_PROVIDER_NAME = getConfiguration().COGNITO_PROVIDER_NAME;

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

  const loginWithSSO = useCallback(
    (): Promise<any> =>
      Auth.federatedSignIn({ customProvider: COGNITO_PROVIDER_NAME }).catch((error: any) => {
        throw error;
      }),
    []
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
   *
   * The function handles two login flows:
   * - Google (federated via Cognito Hosted UI): the user object returned by Amplify does not
   *   expose attributes directly. Tokens are saved to session storage explicitly, and the
   *   custom permissions tag is read from the ID token payload (where Cognito includes it
   *   as a claim for federated users).
   * - Email/password (standard Cognito): Amplify populates user.attributes normally,
   *   so we delegate to currentAuthenticatedUser() and read attributes from there.
   */
  const getUserData = useCallback(
    (): Promise<UserData | null> =>
      Auth.currentSession()
        .then(async (session) => {
          const payload = session.getIdToken().decodePayload();
          const isFederatedUser = payload.identities?.some(
            (identity: any) => identity.providerName === COGNITO_PROVIDER_NAME
          );
          if (isFederatedUser) {
            const token = session.getIdToken().getJwtToken();
            const refreshToken = session.getRefreshToken().getToken();
            const accessToken = session.getAccessToken().getJwtToken();
            await Promise.allSettled([
              setStorage('token', token),
              setStorage('refreshToken', refreshToken),
              setStorage('accessToken', accessToken),
            ]);
            return {
              attributes: {
                email: payload.email,
                [CUSTOM_PERMISSION_KEY]: payload[CUSTOM_PERMISSION_KEY],
              },
            };
          } else {
            return Auth.currentAuthenticatedUser();
          }
        })
        .then((userInfo: { attributes: { email: string; [CUSTOM_PERMISSION_KEY]: string } }) =>
          userDataForUser(userInfo)
        )
        .catch(() => null),
    []
  );

  return { login, logout, refreshToken, changePassword, getUserData, loginWithSSO };
}
