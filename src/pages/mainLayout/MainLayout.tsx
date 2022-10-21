import React from "react";
import Header from "../../components/header/Header";
import SearchForm from "../../components/forms/search/SearchForm";
import { Grid } from "@mui/material";
import Footer from "../../components/footer/Footer";
import { useEffect } from "react";
import { logout, refreshToken } from "../../authentication/auth";
import { useNavigate } from "react-router-dom";

/**
 * Main layout of the application with header and footer 
 * @component
 */
const MainLayout = ({ email, children }: any) => {
  const navigate = useNavigate();

  /* istanbul ignore next */
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
    <Grid
      container
      direction="column"
      justifyItems="start"
      justifyContent="space-around"
      rowSpacing={3}
      wrap="nowrap"
    >
      <Grid item>
        <Header email={email} />
      </Grid>
      <Grid item>
        {children}
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default MainLayout;
