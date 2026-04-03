import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../Authentication/auth';
import * as snackbarActions from '../../redux/snackbarSlice';
import * as spinnerActions from '../../redux/spinnerSlice';
import GoogleIcon from './GoogleIcon';

const SSOLogin = () => {
  const { loginWithSSO } = useAuth();
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    dispatch(spinnerActions.updateSpinnerOpened(true));
    loginWithSSO().catch((error: any) => {
      dispatch(spinnerActions.updateSpinnerOpened(false));
      dispatch(snackbarActions.updateSnackbarOpened(true));
      dispatch(snackbarActions.updateStatusCode('400'));
      dispatch(
        snackbarActions.updateMessage(error?.message ?? 'Errore durante il login con Google')
      );
    });
  };

  return (
    <Button
      variant="outlined"
      onClick={handleGoogleLogin}
      startIcon={<GoogleIcon />}
      fullWidth
      sx={{ mt: 2 }}
    >
      Accedi con Google
    </Button>
  );
};

export default SSOLogin;
