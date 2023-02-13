import React, {useCallback, useEffect} from "react";
import {Button, Card, Grid, Stack, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import {ModelType, PaginationDataGrid} from "../paginationGrid";
import {CostDialog} from "../dialogs";
import {Cost, FilterRequest, Page} from "../../model";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import DeliveryDriverFormBox from "../forms/deliveryDriver/DeliveryDriverForm";
import {getCosts, getDriverDetails, getFsuDetail} from "../../redux/fsuAndDrivers/actions";
import {CostDTO} from "../../generated";
import {
  changePaginationCost,
  resetPaginationCost, resetSelectedCost,
  resetStateDriverAndCost,
  setSelectedCost
} from "../../redux/fsuAndDrivers/reducers";
import {addedFSU} from "../../redux/formTender/reducers";


interface DriverCostsViewProps {
  fsu:boolean, tenderCode:string, driverCode?:string
}

export default function DriverCostsView (props:DriverCostsViewProps){
  const driverCostStore = useAppSelector(state => state.fsuAndDrivers);
  const dispatch = useAppDispatch();


  const fetchCorrectDriver = useCallback(() => {
    if (props.fsu && props.tenderCode){

      void dispatch(resetPaginationCost());
      void dispatch(getFsuDetail(props.tenderCode));

    } else if (!props.fsu && props.tenderCode && props?.driverCode){
      void dispatch(resetPaginationCost())
      void dispatch(getDriverDetails({
        tenderCode: props.tenderCode,
        driverCode: props.driverCode as string
      }));
    }
  }, [props])

  useEffect(() => {
    fetchCorrectDriver();
    return () => {
      dispatch(resetStateDriverAndCost())
    }
  }, []);



  const fetchCost = useCallback(() => {
    if (driverCostStore.pagination && driverCostStore.driver?.uniqueCode) {
      const filter = {
        ...driverCostStore.pagination,
        tenderCode:props.tenderCode,
        driverCode: driverCostStore.driver.uniqueCode
      } as FilterRequest
      void dispatch(getCosts(filter))
    }

  }, [driverCostStore.pagination, driverCostStore.driver])

  useEffect(() => {
    fetchCost()
  }, [fetchCost])

  useEffect(() => {
    if (driverCostStore.driver?.uniqueCode && props.fsu){
      dispatch(addedFSU(driverCostStore.driver))
    }

  }, [driverCostStore.driver])


  const handleOnClickPositive = () => {
    dispatch(resetSelectedCost())
    dispatch(changePaginationCost({
      ...driverCostStore.pagination,
      force: !(driverCostStore.pagination.force)
    }))
  }

  const handleOnSavedDriver = () => {
    fetchCorrectDriver();
  }

  const handleOnPageChange = (page:number) => {

  }

  const handleOnPageSizeChange = (size:number) => {

  }

  return <Stack direction={"column"} spacing={2}>
        <Grid item>
          <DeliveryDriverFormBox fsu={props.fsu}
                                 key={"DRIVER_"+driverCostStore?.driver?.uniqueCode}
                                 onChanged={handleOnSavedDriver}
                                 tenderCode={props.tenderCode}
                                 initialValue={driverCostStore.driver} />
        </Grid>

    {
      (driverCostStore?.driver?.uniqueCode) ?
        <Card
          elevation={24}
          sx={{
            width: 1,
            padding: "1rem 2rem",
            boxShadow: "0px 3px 3px -2px ",
            backgroundColor: "background.paper",
          }}
        >
          <Grid container
                rowSpacing={2}
                alignItems={"center"}
                justifyContent="space-between">
            <Grid item>
              <Typography variant="h5" component="div">Costi</Typography>
            </Grid>
            <Grid item>
              <Button variant={"outlined"}
                      onClick={() => dispatch(setSelectedCost({} as Cost))}
                      startIcon={<Add />}>
                Aggiungi
              </Button>
            </Grid>
          </Grid>
          <Grid item container>
            <PaginationDataGrid <CostDTO> data={(driverCostStore?.costs) ? driverCostStore.costs : {} as Page<CostDTO> }
                                          type={ModelType.COST}
                                          loading={false}
                                          rowId={row => row!.uid}
                                          onPageChange={handleOnPageChange}
                                          onPageSizeChange={handleOnPageSizeChange}/>
          </Grid>
        </Card>
        : null

    }



    {
      (driverCostStore?.driver?.uniqueCode) ?
        <CostDialog cost={driverCostStore.selectedCost}
                    tenderCode={props.tenderCode}
                    driverCode={driverCostStore.driver.uniqueCode}
                    fsu={props.fsu}
                    open={!!(driverCostStore.selectedCost)}
                    onClickNegative={() => dispatch(resetSelectedCost())}
                    onClickPositive={handleOnClickPositive}/>
        : null
    }


  </Stack>
}
