import { useNavigate } from 'react-router-dom';
import { Box, Card, Grid, Paper, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useNavigationItems } from '../../hooks/useNavigationItems';

import MainLayout from '../mainLayout/MainLayout';

const HomePage = () => {
  const navigate = useNavigate();
  const { availableItems } = useNavigationItems();

  return (
    <MainLayout>
      <Box px={2}>
        <Grid container mx="auto" maxWidth={1200} spacing={2}>
          {availableItems.map((item) => (
            <Grid key={item.title} item width="25%">
              <Card
                id={item.id}
                component={Paper}
                elevation={8}
                onClick={() => navigate(item.link)}
                sx={{ cursor: 'pointer' }}
              >
                <Box
                  minHeight="200px"
                  p={3}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Typography variant="h5" id={`cardTitle-${item.title}`}>{item.title}</Typography>
                  <Box alignSelf="flex-end">
                    <ArrowForward id={`iconArrow-${item.id}`} color="primary" />
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default HomePage;
