import React from "react";
import Header from "../../components/header/Header";
import {Box, Stack} from "@mui/material";
import Footer from "../../components/footer/Footer";
import { useEffect } from "react";
import { logout, refreshToken } from "../../Authentication/auth";
import { useNavigate } from "react-router-dom";

/**
 * Main layout of the application with header and footer
 * @component
 */
const MainLayout = ({ email, children }: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    const idTokenInterval = setInterval(async () => {
      await refreshToken();
    }, 3540000);
    // 300000 = 5 minutes
    // 3 540 000 = 59 minutes
    const refreshTokenInterval = setInterval(async () => {
      await logout()
        .then(() => {
          navigate("/");
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
    <Stack
      direction="column"
      spacing={2}
      sx={{ minHeight: 'calc(100vh - 5px)' }} // 100vh per sticky footer
    >
      <Header email={email} />
      <Stack direction={{ xs: 'column', lg: 'row' }} sx={{ flexGrow: 1 }}>

        <Box sx={{ flexGrow: 1, position: 'relative' }} component="main">
            {children}
        </Box>
      </Stack>
      <Footer />
    </Stack>
  );
};

export default MainLayout;
