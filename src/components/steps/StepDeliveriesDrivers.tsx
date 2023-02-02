import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {Button, Grid, Stack} from "@mui/material";
import DownloadBox from "../forms/download/DownloadForm";
import DeliveryDriverFormBox from "../forms/deliveryDriver/DeliveryDriverForm";
import UploadBox from "../forms/upload/UploadForm";
import {changeKey} from "../../redux/formTender/reducers";
import React from "react";
import {LoadingButton} from "@mui/lab";


export function StepDeliveriesDrivers(){
  const formState = useAppSelector(state => state.tenderForm)
  const dispatch = useAppDispatch();



  return <>
    {
      (formState.fromUpload) ?
        <Stack direction={"column"} width={1} spacing={2}>
          <DownloadBox tenderCode={formState.formTender?.code}/>
          <UploadBox loading={formState.saving.loading}/>
          <Grid item container direction="row" justifyContent="space-between">
            <Button disabled={formState.saving.loading} onClick={() => dispatch(changeKey({key:0}))} variant={"outlined"}>Torna a Informazioni gara</Button>
            <LoadingButton loading={formState.saving.loading} variant={"contained"} type={"submit"} >
              Salva
            </LoadingButton>
          </Grid>
        </Stack>
        :
        <DeliveryDriverFormBox fsu={false}/>
    }

  </>

}