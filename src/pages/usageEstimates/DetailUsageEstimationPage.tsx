import {Button, Card, Container, Grid, Stack, Typography} from "@mui/material";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import {SEARCH_USAGE_ESTIMATES_ROUTE} from "../../navigation/router.const";
import MainLayout from "../mainLayout/MainLayout";
import React, {useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {FinalBalances} from "../../components/finalBalances/FinalBalances";
import * as spinnerActions from "../../redux/spinnerSlice";
import {getDetailEstimate} from "../../api/usageEstimatesApi";
import * as snackbarActions from "../../redux/snackbarSlice";
import {addedTender} from "../../redux/formTender/reducers";
import {Estimate, Tender} from "../../model";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../redux/hook";
import {usageInfoPA, usagePeriodPA, usageBillingDataPA, usageEstimationsPA} from "../../components/dataInfo/rows";
import {DataInfo} from "../../components/dataInfo/DataInfo";

const breadcrumbsLinks = [
  {
    linkLabel: 'Gestione volumi',
    linkRoute: SEARCH_USAGE_ESTIMATES_ROUTE
  }
]

export function DetailUsageEstimationPage(){
  const months = ["GENNAIO", "FEBBRAIO", "MARZO", "APRILE", "MAGGIO", "GIUGNO",
    "LUGLIO", "AGOSTO", "SETTEMBRE", "OTTOBRE", "NOVEMBRE", "DICEMBRE"];
  const {paId, referenceMonth} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [detailEstimate, setDetailEstimate] = useState({});
  const arrayFiles = ["1"];


  useEffect(() => {
    if (!redirectCondition){
      console.log("useEffect")
      console.log("paid: ", paId);
      console.log("referenceMonth: ", referenceMonth);
      retrieveDetailEstimate(paId, referenceMonth);
    }
  }, [])

  const isAmonth = (monthToCheck: string | undefined) => {
    return months.filter(month => {
      if(monthToCheck === undefined)
        return false;
      if(monthToCheck.toUpperCase().includes(month))
        return true;
    });
  }

  const redirectCondition = (!paId || isNaN(Number(paId)) || !referenceMonth || isAmonth(referenceMonth).length === 0);

  if (redirectCondition) {
    console.log("return to Search estimation page")
    return <Navigate to={SEARCH_USAGE_ESTIMATES_ROUTE}/>
  }

  const retrieveDetailEstimate = async (paId: string, referenceMonth: string) => {
    dispatch(spinnerActions.updateSpinnerOpened(true));
    try {
      const response = await getDetailEstimate(paId, referenceMonth);
      const estimate = response;
      dispatch(spinnerActions.updateSpinnerOpened(false));
      setDetailEstimate(estimate);
    } catch (exception){
      dispatch(spinnerActions.updateSpinnerOpened(false));
      dispatch(snackbarActions.updateSnackbacrOpened(true));
      dispatch(snackbarActions.updateStatusCode(404));
      dispatch(snackbarActions.updateMessage("Stima del mese non trovata!"));
      navigate(SEARCH_USAGE_ESTIMATES_ROUTE);
    }
  }



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
              marginBottom: "1rem"
            }}>
            <Stack sx={{width: 1}} spacing={2}>
              <Grid item container>
                <Typography variant="h5">
                  INFORMAZIONI
                </Typography>
              </Grid>
              { <DataInfo data={detailEstimate} rows={usageInfoPA}/> }
            </Stack>
          </Card>

          <Card
            elevation={24}
            sx={{
              width: 1,
              padding: "1rem 2rem",
              boxShadow: "0px 3px 3px -2px ",
              backgroundColor: "background.paper",
              marginBottom: "1rem"
            }}>
            <Stack sx={{width: 1}} spacing={2}>
              <Grid item container>
                <Typography variant="h5">
                  PERIODO
                </Typography>
              </Grid>
              { <DataInfo data={detailEstimate} rows={usagePeriodPA}/> }
            </Stack>
          </Card>

          <Card
            elevation={24}
            sx={{
              width: 1,
              padding: "1rem 2rem",
              boxShadow: "0px 3px 3px -2px ",
              backgroundColor: "background.paper",
              marginBottom: "1rem"
            }}>
            <Stack sx={{width: 1}} spacing={2}>
              <Grid item container>
                <Typography variant="h5">
                  DATI AGGIUNTIVI PER LA FATTURAZIONE
                </Typography>
              </Grid>
              { <DataInfo data={detailEstimate} rows={usageBillingDataPA}/> }
            </Stack>
          </Card>

          <Card
            elevation={24}
            sx={{
              width: 1,
              padding: "1rem 2rem",
              boxShadow: "0px 3px 3px -2px ",
              backgroundColor: "background.paper",
              marginBottom: "1rem"
            }}>
            <Stack sx={{width: 1}} spacing={2}>
              <Grid item container>
                <Typography variant="h5">
                  DATI AGGIUNTIVI PER LA FATTURAZIONE
                </Typography>
              </Grid>
              { <DataInfo data={detailEstimate} rows={usageEstimationsPA}/> }
            </Stack>
          </Card>

          <Card
            elevation={24}
            sx={{
              width: 1,
              padding: "1rem 2rem",
              boxShadow: "0px 3px 3px -2px ",
              backgroundColor: "background.paper",
              marginBottom: "1rem"
            }}>
            <Stack sx={{width: 1}} spacing={2}>
              <Grid item container>
                <Typography variant="h5">
                  CONSUNTIVI
                </Typography>
              </Grid>
                 {/*<FinalBalances finalBalances={arrayFiles} />*/}
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