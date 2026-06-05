import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import MainLayout from '../mainLayout/MainLayout';
import VirtualKeyTable from '../../components/apikey/VirtualKeyTable';
import PaSection from '../../components/apikey/PaSection';

/**
 * AuthApikey page
 * @component
 */
const AuthApikeyPage = ({ email }: any) => {
  const [selectedPa, setSelectedPa] = useState('');

  const handleSelect = (idPa: string) => {
    setSelectedPa(idPa);
  };

  return (
    <MainLayout email={email}>
      <Box sx={{ px: 3 }}>
        <Grid container sx={{ mb: 3 }}>
          <Typography gutterBottom variant="h4" component="div">
            Gestione Autorizzazioni Apikey
          </Typography>
        </Grid>
        <Grid container spacing={6}>
          <Box sx={{ alignItems: 'left', textAlign: 'center' }}>
            <Typography gutterBottom variant="h6" component="div">
              Seleziona una PA
            </Typography>
            <Box sx={{ marginTop: 4.4 }}>
              <PaSection onSelect={handleSelect} selectedPa={selectedPa} />
            </Box>
          </Box>
          <Box sx={{ justifyContent: 'flex-start' }}>
            <Grid sx={{ textAlign: 'center' }}>
              <Typography gutterBottom variant="h6" component="div">
                Virtual Keys
              </Typography>
            </Grid>
            <Box sx={{ marginTop: 1 }}>
              <VirtualKeyTable id={selectedPa} />
            </Box>
          </Box>
        </Grid>
      </Box>
    </MainLayout >
  );
};
export default AuthApikeyPage;
