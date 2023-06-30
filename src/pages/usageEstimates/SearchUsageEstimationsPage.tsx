import MainLayout from "../mainLayout/MainLayout";
import {Box, Card, Container, Grid, Typography} from "@mui/material";
import React from "react";
import {EstimatesTable} from "../../components/usageEstimates/EstimatesTable";


export function SearchUsageEstimationsPage({email=""}){


  return <MainLayout email={email}>
    <Container>
      <Grid container direction="row" rowSpacing={3}>
        <Grid item container>
          <Box>
            <Typography variant="h4" color="text.primary">
              Volumi delle notifiche
            </Typography>
          </Box>
        </Grid>
        <Grid item container direction="row" justifyContent="space-between">
          <Card
            elevation={24}
            sx={{
              width: 1,
              padding: "5%",
              boxShadow: "0px 3px 3px -2px ",
              backgroundColor: "background.paper",
            }}
          >
            <EstimatesTable/>
          </Card>
        </Grid>

      </Grid>
    </Container>
  </MainLayout>
}