import { useAuth } from '../../Authentication/auth';

const SSOLogin = () => {
  const { loginWithSSO } = useAuth();

  return (
    <div>
      <button onClick={() => loginWithSSO()}>Login with GOOGLE</button>
    </div>
  );
};

export default SSOLogin;
