import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { infoMessages } from "../../helpers/messagesConstants";
import { Divider, Grid, Typography } from "@material-ui/core";
import { logout } from "../../Authentication/auth";
import { useDispatch } from "react-redux";
import * as spinnerActions from "../../redux/spinnerSlice";
import NavigationMenu from "../navigationMenu/NavigationMenu";
/**
 * General component presenting the header of the app.
 */
const Header = ({ email }: any) => {
  /**
   * the state of the confirmation modal
   */
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  /**
   * dispatch redux actions
   */
  const dispatch = useDispatch();

  /**
   * Function closing the confirmation modal
   */
  /* istanbul ignore next */
  const handleCloseModal = () => {
    setOpen(false);
  };

  /**
   * Function opening the confirmation modal after the log out button is click
   */
  /* istanbul ignore next */
  const handleOpenModal = () => {
    setOpen(true);
  };

  /**
   * Function handling the logging out
   */
  /* istanbul ignore next */
  const handleLogOut = () => {
    setOpen(false);
    dispatch(spinnerActions.updateSpinnerOpened(true));
    logout()
      .then(() => {
        dispatch(spinnerActions.updateSpinnerOpened(false));
        navigate("/");
      })
      .catch((error: any) => {
        dispatch(spinnerActions.updateSpinnerOpened(false));
        throw error;
      });
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Container>
        <Toolbar
          sx={{
            paddingRight: "0px",
            paddingLeft: "0px",
            "@media (min-width: 640px)": {
              paddingRight: "0px",
              paddingLeft: "0px",
            },
          }}
        >
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={3}>
              <Grid container alignItems="center">
                <NavigationMenu />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Typography align="center">PagoPA S.p.A.</Typography>
            </Grid>
            <Grid item xs={3}>
              <Grid container justifyContent="flex-end" alignItems="center">
                <Grid item>
                  <Typography>{email}</Typography>
                </Grid>
                <Divider
                  style={{ background: "white" }}
                  orientation="vertical"
                  variant="middle"
                  flexItem
                />
                <Grid item>
                  <Tooltip title="Log out">
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      onClick={handleOpenModal}
                      sx={{ paddingRight: 0 }}
                    >
                      <LogoutIcon sx={{ color: "white" }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
        <DialogActions>
          <Button onClick={handleCloseModal}>Annulla</Button>
          <Button onClick={handleLogOut} autoFocus>
            Esci
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;
