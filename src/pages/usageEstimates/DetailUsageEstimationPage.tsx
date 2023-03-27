import {Button, Card, Container, Grid, Stack, Typography} from "@mui/material";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import {SEARCH_USAGE_ESTIMATES_ROUTE} from "../../navigation/router.const";
import MainLayout from "../mainLayout/MainLayout";
import React from "react";
import {useNavigate} from "react-router-dom";

const breadcrumbsLinks = [
  {
    linkLabel: 'Gestione volumi',
    linkRoute: SEARCH_USAGE_ESTIMATES_ROUTE
  }
]

export function DetailUsageEstimationPage(){
  const navigate = useNavigate();


  return <MainLayout>
    <Container>
      <Grid container direction="row" rowSpacing={3}>
        <Grid item container>
          <Breadcrumbs currentLocationLabel={"Dettaglio"}
                       links={breadcrumbsLinks} />

        </Grid>
        <Grid item container>
          <Typography variant="h4" color="text.primary">
            Dettaglio volumi
          </Typography>
        </Grid>

        <Grid item container>
          <Card
            elevation={24}
            sx={{
              width: 1,
              padding: "1rem 2rem",
              boxShadow: "0px 3px 3px -2px ",
              backgroundColor: "background.paper",
            }}>
            <Stack sx={{width: 1}} spacing={2}>
              <Grid item container>
                <Typography variant="h5">
                  Informazioni
                </Typography>
              </Grid>
              {
                //<DataInfo data={tenderState} rows={tenderRowsInfo}/>
              }
            </Stack>
          </Card>
        </Grid>

        <Grid item container direction="row" justifyContent="space-between">
          <Button variant={"outlined"}
                  data-testid={"back-button-usage-esitmates"}
                  onClick={()=> navigate(SEARCH_USAGE_ESTIMATES_ROUTE)}>
            Torna a elenco
          </Button>

        </Grid>
      </Grid>

    </Container>
  </MainLayout>
}