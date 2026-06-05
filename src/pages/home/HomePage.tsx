import { ArrowForward } from '@mui/icons-material';
import { Box, Card, Grid, Paper, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useNavigationItems } from '../../hooks/useNavigationItems';

import MainLayout from '../mainLayout/MainLayout';

const HomePage = () => {
  const navigate = useNavigate();
  const { availableItems } = useNavigationItems();

  if (!availableItems.length) {
    return (
      <MainLayout>
        <Typography variant="h5" sx={{ align: "center", mt: 4 }} data-testid="empty-state">
          Non hai alcun permesso per utilizzare questa applicazione.
        </Typography>
        <Typography variant="body1" sx={{ align: "center", mt: 1 }}>
          Contatta il tuo amministratore per richiedere i permessi necessari.
        </Typography>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box sx={{ px: 2 }}>
        <Grid container sx={{ mx: "auto", maxWidth: 1200 }} spacing={2}>
          {availableItems.map((item) => (
            <Grid key={item.id} sx={{ width: "25%" }}>
              <Card
                id={item.id}
                component={Paper}
                elevation={8}
                onClick={() => navigate(item.link)}
                sx={{ cursor: 'pointer' }}
              >
                <Stack
                  sx={{ minHeight: "200px", p: 3, flexDirection: "column", justifyContent: "space-between" }}
                >
                  <Typography variant="h5" id={`cardTitle-${item.id}`}>
                    {item.title}
                  </Typography>
                  <Box sx={{ alignSelf: "flex-end" }}>
                    <ArrowForward id={`iconArrow-${item.id}`} color="primary" />
                  </Box>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default HomePage;
