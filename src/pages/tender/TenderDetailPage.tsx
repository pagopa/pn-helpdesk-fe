import MainLayout from "../mainLayout/MainLayout";
import React, {useEffect} from "react";
import {Card, Container, Grid, Typography, Stack, Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {DataInfo} from "../../components/dataInfo/DataInfo";
import {tenderRowsInfo} from "../../components/dataInfo/rows";
import {Navigate, useNavigate} from "react-router-dom";
import {CREATE_TENDER_ROUTE, TENDERS_TABLE_ROUTE} from "../../navigation/router.const";
import {DeliveriesDriverTable} from "../../components/deliveriesDrivers/DeliveriesDriverTable";
import {resetStateDrivers} from "../../redux/deliveriesDrivers/reducers";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";


const breadcrumbsLinks = [
  {
    linkLabel: 'Tutte le Gare',
    linkRoute: TENDERS_TABLE_ROUTE
  }
]

export function TenderDetailPage() {

  const tenderState = useAppSelector(state => state.tender.selected);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => () => {
    dispatch(resetStateDrivers())
  }, [tenderState, dispatch])


  console.log("State", tenderState)
  if (!tenderState || !tenderState?.code){
    console.log("return navigate")
    return <Navigate to={TENDERS_TABLE_ROUTE}/>
  }

  return <MainLayout>
    <Container>
      <Grid container direction="row" rowSpacing={3}>
        <Grid item container>
          <Breadcrumbs currentLocationLabel={"Dettaglio Gara"}
                       links={breadcrumbsLinks} />

        </Grid>
        <Grid item container>
          <Typography variant="h4" color="text.primary" data-testid={'title-tender'}>
            {tenderState?.name}
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
              <DataInfo data={tenderState} rows={tenderRowsInfo}/>
            </Stack>
          </Card>
        </Grid>
        <Grid item container direction="row" justifyContent="space-between">
          <Card
            elevation={24}
            sx={{
              width: 1,
              padding: "1rem 2rem",
              boxShadow: "0px 3px 3px -2px ",
              backgroundColor: "background.paper",
            }}>
            <Grid item container>
              <Typography variant="h5">
                Recapitisti
              </Typography>
            </Grid>
            <div data-testid="datagrid">
              <DeliveriesDriverTable tenderCode={tenderState.code} withActions={false}/>
            </div>
          </Card>
        </Grid>
        <Grid item container direction="row" justifyContent="space-between">
          <Button variant={"outlined"}
                  data-testid={"back-button-tenders"}
                  onClick={()=> navigate(TENDERS_TABLE_ROUTE)}>
            Torna alle Gare
          </Button>
          {
            (tenderState?.status && tenderState.status === "CREATED") ?
              <Button variant={"contained"}
                      type={"submit"}
                      onClick={() => navigate(CREATE_TENDER_ROUTE+"/"+tenderState.code)}>
                Modifica
              </Button> : null
          }

        </Grid>
      </Grid>

    </Container>
  </MainLayout>

}

