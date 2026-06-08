import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Tooltip,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { infoMessages } from '../../helpers/messagesConstants';
import { useAuth } from '../../Authentication/auth';
import * as spinnerActions from '../../redux/spinnerSlice';
import NavigationMenu from '../navigationMenu/NavigationMenu';
import { useCurrentUser } from '../../hooks/useCurrentUser';

const Header = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useCurrentUser();
  const email = useMemo(() => currentUser?.email || 'no email', [currentUser]);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const dispatch = useDispatch();

  const handleCloseModal = () => setOpen(false);
  const handleOpenModal = () => setOpen(true);

  const handleLogOut = () => {
    setOpen(false);
    dispatch(spinnerActions.updateSpinnerOpened(true));
    logout()
      .then(() => {
        dispatch(spinnerActions.updateSpinnerOpened(false));
        navigate('/');
      })
      .catch((error: any) => {
        dispatch(spinnerActions.updateSpinnerOpened(false));
        throw error;
      });
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'primary.main', backgroundImage: 'none' }}>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-start' }}>
            <NavigationMenu />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', flex: 2 }}>
            <Typography
              variant="h6"
              component="h1"
              align="center"
              color='primary.contrastText'
              sx={{ fontWeight: 500, fontSize: { xs: '1rem', sm: '1.25rem' } }}
            >
              PagoPA S.p.A.
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            sx={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}
          >
            <Tooltip title={email} placement="bottom">
              <IconButton
                size="large"
                color="inherit"
                id="profile"
                aria-label="profilo utente"
              >
                <PermIdentityIcon sx={{ color: 'primary.contrastText' }} />
              </IconButton>
            </Tooltip>

            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ borderColor: 'rgba(255, 255, 255, 0.3)', my: 1 }}
            />

            <Tooltip title="Log out">
              <IconButton
                size="large"
                color="inherit"
                id="logout"
                aria-label="effettua il log out"
                onClick={handleOpenModal}
                data-testid="logout-button"
              >
                <LogoutIcon sx={{ color: 'primary.contrastText' }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </Container>

      <Dialog
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">LOG OUT</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {infoMessages.LOGOUT_CONFIRMATION}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Button id="cancelLogout" onClick={handleCloseModal} variant="text">
            Annulla
          </Button>
          <Button id="doLogout" onClick={handleLogOut} variant="text" autoFocus>
            Esci
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;