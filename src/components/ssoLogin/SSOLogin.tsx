import { useDispatch } from 'react-redux';
import { useAuth } from '../../Authentication/auth';
import * as snackbarActions from '../../redux/snackbarSlice';
import * as spinnerActions from '../../redux/spinnerSlice';

const SSOLogin = () => {
  const { loginWithSSO } = useAuth();
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    dispatch(spinnerActions.updateSpinnerOpened(true));
    loginWithSSO()
      .catch((error: any) => {
        dispatch(spinnerActions.updateSpinnerOpened(false));
        dispatch(snackbarActions.updateSnackbarOpened(true));
        dispatch(snackbarActions.updateStatusCode('400'));
        dispatch(snackbarActions.updateMessage(error?.message ?? 'Errore durante il login con Google'));
      });
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Login with GOOGLE</button>
    </div>
  );
};

export default SSOLogin;
