import awsmobile from "./aws-exports";
import { Auth, Amplify } from "aws-amplify";
import { setStorage, resetStorage, deleteStorage } from "./storage";
import { CognitoUser } from "@aws-amplify/auth";
import { Permission, UserData } from "../model/user-permission";

type Props = {
  /**
   * the username for logging
   */
  email: string;
  /**
   * the password for logging
   */
  password: string;
  /**
   * the function to set the user attributes other than tokens
   */
  setCurrentUser: (u: UserData) => void;
};

Amplify.configure(awsmobile);

function userDataForUser(user: any): UserData {
  const rawPermissions = user.attributes['custom:backoffice_tags'];

  // these are the permissions indicated in the Cognito state
  const possiblePermissions: Array<string> = rawPermissions && rawPermissions.length ? rawPermissions.split(',') : [];
  const allLegalPermissions = Object.values(Permission) as Array<string>;
  // these are the permissions indicated in the Cognito state *and* recognized by this app
  const validatedPermissions = possiblePermissions.filter(perm => allLegalPermissions.includes(perm));
  
  return {
    email: user.attributes.email,
    permissions: validatedPermissions as Array<Permission>,
  };
}

/**
 * Performs the login and set both the tokens (in session storage) 
 * and the user data (through setCurrentUser)
 */
const login = ({ email, password, setCurrentUser }: Props): Promise<any> => {
  return Auth.signIn(email, password)
    .then((user) => {
      if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        return setStorage("session", user.Session).then(() => user);
      } else {
        const token = user.signInUserSession.idToken.jwtToken;
        const refreshToken = user.signInUserSession.refreshToken.token;
        const accessToken = user.signInUserSession.accessToken.jwtToken;
        return Promise.allSettled([
          setStorage("token", token),
          setStorage("refreshToken", refreshToken),
          setStorage("accessToken", accessToken),
        ])
        .then(() => {
          setCurrentUser(userDataForUser(user));
          return user;
        });
      }
    })
    .catch((error: any) => {
      throw error;
    });
};

/**
 * logout the user
 * @returns
 */
const logout = async (): Promise<any> => {
  return Auth.signOut()
    .then(async (res) => {
      await resetStorage().then((res) => res);
    })
    .catch((error: any) => {
      throw error;
    });
};

const refreshToken = async (): Promise<any> => {
  await Auth.currentAuthenticatedUser()
    .then((user: CognitoUser) => {
      const refreshToken = user.getSignInUserSession()?.getRefreshToken();
      user.refreshSession(refreshToken!, (err, session) => {
        const token = user.getSignInUserSession()?.getIdToken().getJwtToken();
        const accessToken = user
          .getSignInUserSession()
          ?.getAccessToken()
          .getJwtToken();
        setStorage("token", token!);
        setStorage("accessToken", accessToken!);
      });
    })
    .catch((error: any) => {
      throw error;
    });
};

/**
 * for changing password adter the first login
 * @param user
 * @param newPassword
 * @returns
 */
const changePassword = (user: any, newPassword: string): Promise<any> => {
  return Auth.completeNewPassword(user, newPassword)
    .then(async (user: any) => {
      const token = user.signInUserSession.idToken.jwtToken;
      const refreshToken = user.signInUserSession.refreshToken.token;
      const accessToken = user.signInUserSession.accessToken.jwtToken;
      return await Promise.allSettled([
        setStorage("token", token),
        setStorage("refreshToken", refreshToken),
        setStorage("accessToken", accessToken),
        deleteStorage("session"),
      ]).then(() => user);
    })
    .catch((error: any) => {
      throw error;
    });
};

/*
 * Function that allows to obtain user data for an already logged user.
 * It's used on page reload, to obtain this data in a scenario in which 
 * the webapp startup (including user data registration) 
 * must be performed without passing through a login.
 */
const getUserData = async (): Promise<UserData | null> => {
  return await Auth.currentAuthenticatedUser()
    .then(user => userDataForUser(user))
    .catch((_error: any) => null);
};

export { login, logout, refreshToken, changePassword, getUserData };
