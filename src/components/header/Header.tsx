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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { infoMessages } from "../../helpers/messagesConstants";
import { Divider, Grid, Typography } from "@material-ui/core";
import { logout, getUser } from "../../Authentication/auth";
import { useDispatch } from "react-redux";
import * as spinnerActions from "../../redux/spinnerSlice";
import NavigationMenu from "../navigationMenu/NavigationMenu";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

/**
 * General component presenting the header of the app.
 */
const Header = () => {
  /**
   * the state of the confirmation modal
   */
  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState("no email");

  const navigate = useNavigate();

  /**
   * dispatch redux actions
   */
  const dispatch = useDispatch();

  /**
   * get the user email
   */
  useEffect(() => {
    getUser().then((email) => {
      setEmail(email);
    });
  }, []);

  /**
   * Function closing the confirmation modal
   */
  const handleCloseModal = () => {
    setOpen(false);
  };

  /**
   * Function opening the confirmation modal after the log out button is click
   */
  const handleOpenModal = () => {
    setOpen(true);
  };

  /**
   * Function handling the logging out
   */
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
    <AppBar position="sticky" sx={{ bgcolor: "primary.main" }}>
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
            <Grid item xs={3} md={3}>
              <Grid container alignItems="center">
                <NavigationMenu />
              </Grid>
            </Grid>
            <Grid item xs={3} md={6}>
              <Typography align="center">PagoPA S.p.A.</Typography>
            </Grid>
            <Grid
              container
              item
              xs={6}
              md={3}
              justifyContent="flex-end"
              alignItems="center"
            >
              {/* <Grid container justifyContent="flex-end" alignItems="center"> */}
              <Grid item>
                {/* <Typography align="right">{email}</Typography> */}
                <Tooltip title={email} placement="bottom">
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ paddingRight: 0 }}
                  >
                    <PermIdentityIcon sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
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
              {/* </Grid> */}
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
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button onClick={handleCloseModal} sx={{ padding: "0 18px" }}>
            Annulla
          </Button>
          <Button onClick={handleLogOut} autoFocus>
            Esci
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;
