import React, { useState } from "react";
import MainLayout from "../mainLayout/MainLayout";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import VirtualKeyTable from "../../components/apikey/VirtualKeyTable";
import PaSection from "../../components/apikey/PaSection";

/**
 * AuthApikey page
 * @component
 */
const AuthApikeyPage = ({ email }: any) => {
  const [selectedPa, setSelectedPa] = useState("");

  const handleSelect = (idPa: string) => { 
    setSelectedPa(idPa) 
  }
  
  return (
    <MainLayout email={email}>
      <Box px={3}>
        <Grid container marginBottom={3}>
          <Typography gutterBottom variant="h4" component="div">
            Gestione Autorizzazioni Apikey
          </Typography>
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={4} style={{ alignItems: 'left', textAlign: "center" }} >
            <Typography gutterBottom variant="h6" component="div">
              Seleziona una PA
            </Typography>
            <Box marginTop={4.4}>
              <PaSection onSelect={handleSelect} selectedPa={selectedPa} />
            </Box>
          </Grid>
          <Grid item xs={8} justifyContent={'flex-start'}>
            <Grid style={{ textAlign: "center" }}>
              <Typography gutterBottom variant="h6" component="div">
                Virtual Keys
              </Typography>
            </Grid>
            <Box marginTop={1}>
              <VirtualKeyTable id={selectedPa} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );

};
export default AuthApikeyPage;