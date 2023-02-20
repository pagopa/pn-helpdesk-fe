import LoginForm from "../../components/forms/login/LoginForm";
import { useState } from "react";
import ChangePasswordForm from "../../components/forms/changePassword/ChangePasswordForm";

const LoginPage = () => {
  const [user, setUser] = useState();

  return user ? (
    <ChangePasswordForm user={user} />
  ) : (
    <LoginForm setUser={setUser} />
  );
};

export default LoginPage;
