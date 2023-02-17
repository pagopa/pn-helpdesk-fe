import MainLayout from "../mainLayout/MainLayout";
import React, {useEffect} from "react";
import {Card, Container, Grid, Typography, Stack, Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {DataInfo} from "../../components/dataInfo/DataInfo";
import {tenderRowsInfo} from "../../components/dataInfo/rows";
import {BreadcrumbCustom} from "../../components/breadcrumb/BreadcrumbCustom";
import {Navigate, useNavigate} from "react-router-dom";
import {TENDERS_TABLE_ROUTE} from "../../navigation/router.const";
import {DeliveriesDriverTable} from "../../components/deliveriesDrivers/DeliveriesDriverTable";
import {resetStateDrivers} from "../../redux/deliveriesDrivers/reducers";


export function TenderDetailPage({email}:any) {

  const tenderState = useAppSelector(state => state.tender);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => () => {
    dispatch(resetStateDrivers())
  }, [dispatch])


  if (!tenderState.selected || !tenderState.selected?.code){
    return <Navigate to={TENDERS_TABLE_ROUTE}/>
  }

  return <MainLayout email={email}>
    <Container>
      <Grid container direction="row" rowSpacing={3}>
        <Grid item container>
          <BreadcrumbCustom/>
        </Grid>
        <Grid item container>
          <Typography variant="h4" color="text.primary">
            {tenderState.selected?.name}
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
              <DataInfo data={tenderState.selected} rows={tenderRowsInfo}/>
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
              <DeliveriesDriverTable tenderCode={tenderState.selected.code} withActions={false}/>
            </div>
          </Card>
        </Grid>
        <Grid item container direction="row" justifyContent="space-between">
          <Button variant={"outlined"} onClick={()=> navigate(TENDERS_TABLE_ROUTE)}>Torna alle Gare</Button>
          <Button variant={"contained"}
                  type={"submit"} >
            Modifica
          </Button>
        </Grid>
      </Grid>

    </Container>
  </MainLayout>

}

