import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './Authentication/auth';
import { ConfirmationProvider } from './components/confirmationDialog/ConfirmationProvider';
import SnackbarComponent from './components/snackbar/SnackbarComponent';
import { useCurrentUser } from './hooks/useCurrentUser';
import Router from './navigation/Router';
import { opened } from './redux/spinnerSlice';

function App() {
  const openedSpinner = useSelector(opened);

  const { setCurrentUser } = useCurrentUser();
  const { getUserData } = useAuth();

  const [hasCheckedUser, setHasCheckedUser] = useState(false);

  /*
   * If the webapp is reloaded, then the user won't pass through the login.
   * While the tokens are in session storage, the user data *including permissions*.
   * must be reloaded from Cognito.
   *
   * Hence this effect is run on app loading.
   * - If there is a logged user, then getUserData returns a UserData object.
   *   In this case, we set the user data including the permissions.
   *   Consequently, the user can proceed to the previously accessed page within the app.
   * - Otherwise, getUserData returns null, and therefore there is nothing to set.
   *   As the initial set of permissions is empty, the navigation will be redirected to the login page.
   *   This is the behavior of PrivateRoute for any situation in which the user has not the required permissions.
   *
   * In order to avoid navigating to the login before the existence of a logged user is checked,
   * we define the hasCheckedUser state, and we set it to true *after* the verification has been performed.
   *
   * Cfr. PN-4348.
   */
  useEffect(() => {
    const setUserIfLoggedIn = async () => {
      const userData = await getUserData();
      if (userData) {
        setCurrentUser(userData);
      }
      setHasCheckedUser(true);
    };
    // disable eslint in next line because is correct to use async/await in useEffect
    // eslint-disable-next-line
    setUserIfLoggedIn();
  }, [setCurrentUser, getUserData]);

  // actual contents are rendered after the reload-with-logged-user check is completed only.
  return hasCheckedUser ? (
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
  ) : (
    <div />
  );
}

export default App;
