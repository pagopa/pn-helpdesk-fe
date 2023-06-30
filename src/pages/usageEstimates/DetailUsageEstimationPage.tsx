import {Button, Card, Container, Grid, Stack, Typography} from "@mui/material";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import {SEARCH_USAGE_ESTIMATES_ROUTE} from "../../navigation/router.const";
import MainLayout from "../mainLayout/MainLayout";
import React, {useCallback, useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import * as spinnerActions from "../../redux/spinnerSlice";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {usageInfoPA, usagePeriodPA, usageBillingDataPA, usageEstimationsPA} from "../../components/dataInfo/rows";
import {DataInfo} from "../../components/dataInfo/DataInfo";
import {getDetailEstimate} from "../../redux/usageEstimates/actions";
import {EstimateDetailRequest, EstimateStatusEnum} from "../../model";

const breadcrumbsLinks = [
  {
    linkLabel: 'Gestione volumi',
    linkRoute: SEARCH_USAGE_ESTIMATES_ROUTE
  }
]

export function DetailUsageEstimationPage(){
  const months = ["GEN", "FEB", "MAR", "APR", "MAG", "GIU",
    "LUG", "AGO", "SET", "OTT", "NOV", "DIC"];
  const detailEstimate = useAppSelector(state => state.usageEstimate.detail);
  const {paId, referenceMonth} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const fetchDetail = useCallback(() => {
    if (!redirectCondition) {
      dispatch(spinnerActions.updateSpinnerOpened(true));
      dispatch(getDetailEstimate({paId: paId, referenceMonth: referenceMonth} as EstimateDetailRequest))
        .unwrap().then(() => {
        dispatch(spinnerActions.updateSpinnerOpened(false));
      }).catch(() => {
        dispatch(spinnerActions.updateSpinnerOpened(false));
      });
    }
  }, [paId, referenceMonth])

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail])

  const isAMonth = (monthToCheck: string | undefined) => {
    return months.filter(month => {
      if(monthToCheck === undefined)
        return false;
      if(monthToCheck.toUpperCase().includes(month))
        return true;
    });
  }

  const redirectCondition = (!paId || !referenceMonth || isAMonth(referenceMonth).length === 0);

  if (redirectCondition) {
    console.log("return to Search estimation page")
    return <Navigate to={SEARCH_USAGE_ESTIMATES_ROUTE}/>
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
                <Typography
                  color="text.primary"
                  variant="overline"
                  fontWeight={700}
                  textTransform="uppercase"
                  fontSize={14}
                >
                  INFORMAZIONI
                </Typography>
              </Grid>
              { (detailEstimate) ? <DataInfo data={detailEstimate.paInfo} rows={usageInfoPA}/> : null }
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
                <Typography
                  color="text.primary"
                  variant="overline"
                  fontWeight={700}
                  textTransform="uppercase"
                  fontSize={14}
                >
                  PERIODO
                </Typography>
              </Grid>
              { (detailEstimate) ? <DataInfo data={detailEstimate} rows={usagePeriodPA}/> : null }
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
                <Typography
                  color="text.primary"
                  variant="overline"
                  fontWeight={700}
                  textTransform="uppercase"
                  fontSize={14}
                >
                  DATI AGGIUNTIVI PER LA FATTURAZIONE
                </Typography>
              </Grid>
              {(detailEstimate) ? <DataInfo data={detailEstimate.billing} rows={usageBillingDataPA}/> : null }
            </Stack>
          </Card>


          {
            (detailEstimate && detailEstimate.status !== EstimateStatusEnum.ABSENT) ?
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
                    <Typography
                      color="text.primary"
                      variant="overline"
                      fontWeight={700}
                      textTransform="uppercase"
                      fontSize={14}
                    >
                      DATI AGGIUNTIVI PER LA FATTURAZIONE
                    </Typography>
                  </Grid>
                  <DataInfo data={detailEstimate.estimate} rows={usageEstimationsPA}/>
                </Stack>
              </Card> : null
          }


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
                <Typography
                  color="text.primary"
                  variant="overline"
                  fontWeight={700}
                  textTransform="uppercase"
                  fontSize={14}
                >
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