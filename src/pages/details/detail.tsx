import MainLayout from "../mainLayout/MainLayout";
import React, {useCallback, useEffect, useState} from "react";
import {Card, Container, Grid, Typography, Stack, Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {DataInfo} from "../../components/dataInfo/DataInfo";
import {tenderRowsInfo} from "../../components/dataInfo/rows";
import {BreadcrumbCustom} from "../../components/breadcrumb/BreadcrumbCustom";
import {Navigate, useNavigate} from "react-router-dom";
import {TENDERS_TABLE_ROUTE} from "../../navigation/router.const";
import {DeliveryDriverDTO} from "../../generated";
import {ModelType, PaginationDataGrid} from "../../components/paginationGrid";
import {FilterRequest} from "../../model";
import {getAllDrivers} from "../../redux/deliveriesDrivers/actions";


export function TenderDetailPage({email}:any) {

  const tenderState = useAppSelector(state => state.tender);
  const deliveries = useAppSelector(state => state.deliveries);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState<FilterRequest>({
    tenderCode: tenderState.selected?.code,
    page: 1,
    tot: 25
  })

  const fetchDeliveries = useCallback(() => {
    if(pagination.tenderCode && !deliveries.loading){
      dispatch(getAllDrivers(pagination));
    }
    //react-hooks/exhaustive-deps
  }, [pagination])


  useEffect(() => {
    fetchDeliveries()
    //react-hooks/exhaustive-deps
  }, [fetchDeliveries])

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
            <PaginationDataGrid <DeliveryDriverDTO> data={deliveries.allData}
                                                    type={ModelType.DELIVERY_DRIVER}
                                                    loading={tenderState.loading}
                                                    rowId={row => row.uniqueCode}/>
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

