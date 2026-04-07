import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAuth } from '../../Authentication/auth';
import * as snackbarActions from '../../redux/snackbarSlice';
import GoogleIcon from './GoogleIcon';

const SSOLogin = () => {
  const { loginWithSSO } = useAuth();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(false);
  }, []);

  const handleGoogleLogin = () => {
    setDisabled(true);

    loginWithSSO().catch((error: any) => {
      setDisabled(false);

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
      disabled={disabled}
    >
      Accedi con Google
    </Button>
  );
};

export default SSOLogin;
