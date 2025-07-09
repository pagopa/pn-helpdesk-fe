import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import Header from '../../components/header/Header';

import Footer from '../../components/footer/Footer';
import { useAuth } from '../../Authentication/auth';

/**
 * Main layout of the application with header and footer
 * @component
 */
const MainLayout = ({ children }: any) => {
  const navigate = useNavigate();
  const { logout, refreshToken } = useAuth();

  useEffect(() => {
    const idTokenInterval = setInterval(refreshToken, 3540000);
    // 300000 = 5 minutes
    // 3 540 000 = 59 minutes
    const refreshTokenInterval = setInterval(async () => {
      await logout()
        .then(() => {
          navigate('/');
        })
        .catch((error: any) => {
          throw error;
        });
    }, 36000000);
    // 36 000 000 = 10 hours
    return () => {
      clearInterval(idTokenInterval);
      clearInterval(refreshTokenInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyItems="start"
      justifyContent="space-around"
      rowSpacing={5}
      wrap="nowrap"
      sx={{ height: '100%' }}
    >
      <Grid item>
        <Header />
      </Grid>
      <Grid item sx={{ pb: '40px' }}>
        {children}
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default MainLayout;
