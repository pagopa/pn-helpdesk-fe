import {Button, Card, Grid, Typography} from "@mui/material";
import DeliveryDriverFormBox from "../forms/deliveryDriver/DeliveryDriverForm";
import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {
  resetSelectedCost,
  resetStateDriverAndCost,
  setSelectedCost
} from "../../redux/fsuAndDrivers/reducers";
import {getDriverDetails, getFsuDetail} from "../../redux/deliveriesDrivers/actions";
import {resetDetailDriver, setDetailDriver} from "../../redux/deliveriesDrivers/reducers";
import {addedFSU} from "../../redux/formTender/reducers";
import {Cost, DeliveryDriver} from "../../model";
import {Add} from "@mui/icons-material";
import {CostsTable} from "./CostsTable";
import {CostDialog} from "../dialogs";


interface DriverAndCostFormProps{
  tenderCode: string,
  fsu: boolean
  driverCode ?:string
}

export function DriverAndCostForm(props: DriverAndCostFormProps){
  const driverStore = useAppSelector(state => state.deliveries);
  const costSelected = useAppSelector(state => state.fsuAndDrivers.selectedCost);
  const dispatch = useAppDispatch();

  const fetchCorrectDriver = useCallback(() => {
    if (props.fsu && props.tenderCode){
      void dispatch(getFsuDetail(props.tenderCode));
    } else if (!props.fsu && props.tenderCode && props?.driverCode){
      void dispatch(getDriverDetails({
        tenderCode: props.tenderCode,
        driverCode: props.driverCode as string
      }));
    }
  }, [props])

  useEffect(() => {
    fetchCorrectDriver()
    return () => {
      console.log("Hide component ", props.fsu)
      dispatch(resetStateDriverAndCost())
      dispatch(resetDetailDriver())
    }
  }, []);

  useEffect(() => {
    if (driverStore.detail?.uniqueCode && props.fsu){
      dispatch(addedFSU(driverStore.detail))
    }

  }, [driverStore.detail])

  const handleOnClickPositive = () => {
    dispatch(resetSelectedCost())
  }

  const handleOnSavedDriver = (data:DeliveryDriver) => {
    dispatch(setDetailDriver(data));
  }

  return <Grid item container rowSpacing={2}>
    <Grid item>
      <DeliveryDriverFormBox fsu={props.fsu}
                             key={"DRIVER_"+driverStore?.detail?.uniqueCode}
                             onChanged={handleOnSavedDriver}
                             tenderCode={props.tenderCode}
                             initialValue={driverStore.detail} />
    </Grid>
    {
      (driverStore.detail?.uniqueCode) ?
        <>
        <Grid item container>
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
            <CostsTable tenderCode={props.tenderCode} driverCode={driverStore.detail?.uniqueCode}/>
          </Card>
        </Grid>

        <CostDialog cost={costSelected}
                    tenderCode={props.tenderCode}
                    driverCode={driverStore.detail?.uniqueCode}
                    fsu={props.fsu}
                    open={!!(costSelected)}
                    onClickNegative={() => dispatch(resetSelectedCost())}
                    onClickPositive={handleOnClickPositive}/>
        </>
          : null
    }
  </Grid>

}