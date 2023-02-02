import MainLayout from "../mainLayout/MainLayout";
import React, {useCallback, useEffect, useState} from "react";
import {Card, Container, Grid, Typography, Stack} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {DataInfo} from "../../components/dataInfo/DataInfo";
import {tenderRowsInfo} from "../../components/dataInfo/rows";
import {BreadcrumbCustom} from "../../components/breadcrumb/BreadcrumbCustom";
import {Navigate} from "react-router-dom";
import {GET_TENDER} from "../../navigation/router.const";
import {DeliveryDriverDto} from "../../generated";
import {ModelType, PaginationDataGrid} from "../../components/paginationGrid";
import {FilterRequest} from "../../model";
import {getAllDrivers} from "../../redux/deliveriesDrivers/actions";


export function TenderDetailPage({email}:any) {

  const tenderState = useAppSelector(state => state.tender);
  const deliveries = useAppSelector(state => state.deliveries);
  const dispatch = useAppDispatch();

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
    return <Navigate to={GET_TENDER}/>
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
            <PaginationDataGrid <DeliveryDriverDto> data={deliveries.allData}
                                                    type={ModelType.DELIVERY_DRIVER}
                                                    loading={tenderState.loading}
                                                    rowId={row => row.uniqueCode}/>
          </Card>
        </Grid>
      </Grid>

    </Container>
  </MainLayout>

}

