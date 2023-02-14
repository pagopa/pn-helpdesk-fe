import awsmobile from "./aws-exports";
import Amplify, { Auth } from "aws-amplify";
import { setStorage, resetStorage, deleteStorage } from "./storage";
import { CognitoUser } from "@aws-amplify/auth";

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

/**
 *
 * @param {Object} data login data
 * @returns
 */
const login = ({ email, password }: Props): Promise<any> => {
  return Auth.signIn(email, password)
    .then(async (user) => {
      if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        return await setStorage("session", user.Session).then(() => user);
      } else {
        const token = user.signInUserSession.idToken.jwtToken;
        const refreshToken = user.signInUserSession.refreshToken.token;
        const accessToken = user.signInUserSession.accessToken.jwtToken;
        return await Promise.allSettled([
          setStorage("token", token),
          setStorage("refreshToken", refreshToken),
          setStorage("accessToken", accessToken),
        ]).then(() => user);
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

const getUser = async (): Promise<any> => {
  return await Auth.currentAuthenticatedUser()
    .then(async (user) => {
      return await Auth.userAttributes(user).then((userAttr) => {
        return userAttr.find((attr) => attr.Name === "email")?.Value;
      });
    })
    .catch((error: any) => {
      throw error;
    });
};

export { login, logout, refreshToken, changePassword, getUser };
