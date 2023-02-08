import {Button, Grid, Stack} from "@mui/material";

import {addedFSU, backStep} from "../../redux/formTender/reducers";
import React, {useEffect} from "react";
import DeliveryDriverFormBox from "../forms/deliveryDriver/DeliveryDriverForm";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {DeliveryDriver} from "../../model";
import * as spinnerActions from "../../redux/spinnerSlice";
import * as snackbarActions from "../../redux/snackbarSlice";
import {apiPaperChannel} from "../../api/paperChannelApi";
import {AxiosError} from "axios";
import CostsPaginationView from "../costPaginationView";


export default function StepFSU(){
  const formState = useAppSelector(state => state.tenderForm);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!formState.formFsu?.uniqueCode && formState.formTender.value?.code) {
      retrieveDetail(formState.formTender.value.code);
    }
  }, [])

  const retrieveDetail = async (tenderCode:string) => {
    dispatch(spinnerActions.updateSpinnerOpened(true));
    try {
      const response = await apiPaperChannel().getDetailFSU(tenderCode);
      const driver = {
        ...response.data.fsu
      } as DeliveryDriver;
      dispatch(spinnerActions.updateSpinnerOpened(false));
      dispatch(addedFSU(driver))
    } catch (e){
      if (e instanceof AxiosError){
        if (e?.response?.status && e.response.status === 404){
          dispatch(spinnerActions.updateSpinnerOpened(false));
          return;
        }
      }
      dispatch(spinnerActions.updateSpinnerOpened(false));
      dispatch(snackbarActions.updateSnackbacrOpened(true));
      dispatch(snackbarActions.updateStatusCode("400"));
    }
  }

  const handleChangedFSU = (newDriver: DeliveryDriver) => {
    dispatch(addedFSU(newDriver));
  }



  return <Stack spacing={2} sx={{width: 1}} >
    <DeliveryDriverFormBox fsu={true}
                           key={"FSU-"+formState.formFsu?.uniqueCode}
                           onChanged={handleChangedFSU}
                           tenderCode={(formState.formTender.value?.code) ? formState.formTender.value.code : ""}
                           initialValue={formState.formFsu}/>
    {
      (formState.formFsu?.uniqueCode && formState.formTender.value?.code) ?
        <CostsPaginationView fsu={true} tenderCode={formState.formTender.value?.code} driverCode={formState.formFsu?.uniqueCode} />:
        <></>
    }

    <Grid item container direction="row" justifyContent="space-between">
      <Button onClick={() => dispatch(backStep())} variant={"outlined"}>Torna a FSU</Button>
      <Button variant={"contained"} disabled={!(formState.formFsu?.uniqueCode)} >Avanti</Button>
    </Grid>
  </Stack>


}

