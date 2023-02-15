import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Container } from "@mui/material";
import { Grid, Typography } from "@material-ui/core";


/**
 * General component presenting the footer of the app.
 */
const Footer = () => {
  return (
    <AppBar sx={{ bgcolor: "primary.dark", bottom: 0, top: "auto" }}>
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
          <Grid container spacing={2}>
            <Grid item>
              <Typography>Privacy policy</Typography>
            </Grid>
            <Grid item>
              <Typography>Assistenza</Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography>Copyright</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
