import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
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

    const refreshTokenInterval = setInterval(async () => {
      await logout()
        .then(() => {
          navigate('/');
        })
        .catch((error: any) => {
          throw error;
        });
    }, 36000000);

    return () => {
      clearInterval(idTokenInterval);
      clearInterval(refreshTokenInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack
      direction="column"
      sx={{
        minHeight: '100vh',
        width: '100%'
      }}
    >
      <Box component="header" sx={{ width: '100%' }}>
        <Header />
      </Box>

      <Box
        component="main"
        sx={{
          flex: 1,
          width: '100%',
          pt: 5,
          pb: '40px'
        }}
      >
        {children}
      </Box>

      <Box component="footer" sx={{ width: '100%' }}>
        <Footer />
      </Box>
    </Stack>
  );
};

export default MainLayout;