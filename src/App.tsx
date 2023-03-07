import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { getUser } from './Authentication/auth';
import { ConfirmationProvider } from './components/confirmationDialog/ConfirmationProvider';
import SnackbarComponent from './components/snackbar/SnackbarComponent';
import { useCurrentUser } from './hooks/useCurrentUser';
import Router from './navigation/Router';
import { opened } from "./redux/spinnerSlice";

function App() {
  const openedSpinner = useSelector(opened);

  const { setCurrentUser } = useCurrentUser();

  /**
   * fetch user data and let the hook store it
   */
  useEffect(() => {
    getUser().then((userData) => {
      setCurrentUser(userData);
    });
  }, [setCurrentUser]);


  return (
    <div>
      <BrowserRouter>
        <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openedSpinner}
                dataid-test="spinner"
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        <ConfirmationProvider>
          <Router />
        </ConfirmationProvider>
        
        <SnackbarComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
