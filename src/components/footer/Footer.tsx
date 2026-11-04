import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Container, Typography } from '@mui/material';
import packageJson from '../../../package.json';
/**
 * General component presenting the footer of the app.
 */
const Footer = () => (
  <AppBar sx={{ bgcolor: 'primary.dark', bottom: 0, top: 'auto' }}>
    <Container>
      <Toolbar
        sx={{
          paddingRight: '0px',
          paddingLeft: '0px',
          '@media (min-width: 640px)': {
            paddingRight: '0px',
            paddingLeft: '0px',
          },
        }}
      >
        <Typography variant="body2" color="white">
          Version: {packageJson.version}
        </Typography>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Footer;
