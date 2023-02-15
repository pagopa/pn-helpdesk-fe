import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {changeKey, goFinalStep, goFSUStep} from "../../redux/formTender/reducers";
import React, {useEffect} from "react";
import {StepDriverUpload} from "./StepDriverUpload";
import {Button, Card, Grid, Stack, Typography} from "@mui/material";
import {DeliveryDriver} from "../../model";
import {Add} from "@mui/icons-material";
import {
  changeFilterDrivers, resetDetailDriver,
  resetStateDrivers,
  setDetailDriver
} from "../../redux/deliveriesDrivers/reducers";
import {DeliveriesDriverTable} from "../deliveriesDrivers/DeliveriesDriverTable";
import {DriverAndCostForm} from "../deliveriesDrivers/DriverAndCostForm";


export function StepDeliveriesDrivers(){
  const formState = useAppSelector(state => state.tenderForm)
  const driversStore = useAppSelector(state => state.deliveries)
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("Recupero StepDeliveries")
    console.log(driversStore.detail);
    if (!formState.formTender?.code) {
      dispatch(changeKey({key: 0}))
    }
    return () => {dispatch(resetStateDrivers())}
  }, [])


  const handleBackOnDrivers = () => {
    dispatch(resetDetailDriver());
    dispatch(changeFilterDrivers({...driversStore.pagination, force: !(driversStore.pagination.force)}))
  }


  if (formState.fromUpload) {
    return <StepDriverUpload tenderCode={formState.formTender!.code as string}/>
  }

  if (driversStore.detail && !driversStore.detail.fsu){
    return <Stack direction={"column"} spacing={2} width={"100%"}>
      <DriverAndCostForm fsu={false}
                       tenderCode={formState.formTender!.code as string}
                       driverCode={driversStore.detail?.uniqueCode}/>

      <Grid item container direction="row" justifyContent="space-between">
        <Button onClick={handleBackOnDrivers} variant={"outlined"}>Torna ai recapitisti</Button>
      </Grid>
    </Stack>
  }

  return <Stack direction={"column"} spacing={2} width={"100%"}>
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
          <Typography variant="h5" component="div">Recapitisti</Typography>
        </Grid>
        <Grid item>
          <Button variant={"outlined"}
                  onClick={() => dispatch(setDetailDriver({} as DeliveryDriver ))}
                  startIcon={<Add />}>
            Aggiungi
          </Button>
        </Grid>
      </Grid>
      {
        (formState?.formTender?.code) ?
          <DeliveriesDriverTable tenderCode={formState.formTender.code} onlyFsu={false} withActions={true}/> : null
      }
    </Card>

    <Grid item container direction="row" justifyContent="space-between">
      <Button onClick={() => dispatch(goFSUStep())} variant={"outlined"}>Torna a FSU</Button>
      <Button variant={"contained"}
              onClick={() => dispatch(goFinalStep())}
              type={"submit"} >
        Avanti
      </Button>
    </Grid>

  </Stack>

}