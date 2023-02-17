import DownloadBox from "../forms/download/DownloadForm";
import UploadBox from "../forms/upload/UploadForm";
import {Button, Card, Chip, Grid, Stack, Typography} from "@mui/material";
import {changeKey, goFinalStep} from "../../redux/formTender/reducers";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {UPLOAD_STATUS_ENUM} from "../../model";
import * as snackbarActions from "../../redux/snackbarSlice";
import {LoadingButton} from "@mui/lab";
import {sendNotify} from "../../api/paperChannelApi";
import {AxiosError} from "axios";
interface ErrorsNotify {
  detail: string,
  errors: {col:string, row:string, message:string}[]
}

interface NotifyState {
  code: number | string,
  uid: string | undefined,
  retry: number | undefined,
  error : ErrorsNotify | undefined,
  loading: boolean
}

export function StepDriverUpload(props:{tenderCode:string}){
  const stateUpload = useAppSelector(state => state.uploadAndDownload.upload);
  const [stateNotify, setStateNotify] = useState<NotifyState>({
    uid: undefined,
    retry: undefined,
    error: undefined,
    loading:false,

    code: Math.random()
  });
  const dispatch = useAppDispatch();

  const notifyUploaded = () => {
    if (stateUpload.status !== UPLOAD_STATUS_ENUM.UPLOADED_FILE_S3 || !stateUpload.uid){
      dispatch(snackbarActions.updateSnackbacrOpened(true));
      dispatch(snackbarActions.updateStatusCode(500));
      dispatch(snackbarActions.updateMessage("Error durante il caricamento del file"));
      return;
    }
    setStateNotify(prev => ({...prev, uid: stateUpload.uid, retry:1}));

  }


  useEffect(() => {
    if (stateNotify.uid) {
      retrieveAsync();
    }
  }, [stateNotify]);

  const retrieveAsync = async () => {
    console.log("Retrieve async", stateNotify);
    if (stateNotify?.uid && stateNotify?.retry){
      setTimeout(() => sendNotify(props.tenderCode, stateNotify!.uid as string, handleSuccessNotify, handleErrorNotify), stateNotify.retry);
    } else if (!stateNotify.retry && !stateNotify.error) {
      dispatch(snackbarActions.updateSnackbacrOpened(true));
      dispatch(snackbarActions.updateStatusCode(200));
      dispatch(snackbarActions.updateMessage("Caricamento dati terminato correttamente"));
    }
  }

  const handleSuccessNotify = (response: any) => {
    const notifyState: NotifyState = {
      retry: response.retryAfter,
      loading: !(response.retryAfter),
      uid: response.uuid,
      error: undefined,
      code: (response.retryAfter) ? Math.random() : "DONE"
    }
    console.log("Handle success notify", notifyState);
    setStateNotify(prev => ({...prev, ...notifyState}))
  }

  const handleErrorNotify = (e: any) => {
    const error = {
      detail: "Errore durante l'elaborazione del file excel",
      errors: []
    } as ErrorsNotify;

    if (e instanceof AxiosError){
      if (e.response?.data.detail) {
        error.detail = e.response.data.detail
      }
      if (e.response?.data?.errors && e.response.data.errors instanceof Array){
        error.errors = e.response.data.errors.map((item:any) => ({
          col: item.detail as string,
          row: item.code as string,
          message: item.element as string
        }))
      }
    }
    setStateNotify(prev => ({...prev, retry: undefined, loading:false, uid:undefined, error:error}));
    dispatch(snackbarActions.updateSnackbacrOpened(true));
    dispatch(snackbarActions.updateStatusCode(400));
    dispatch(snackbarActions.updateMessage("Errore durante la notify"));
  }


  return <Grid item container rowSpacing={2}>
    <Grid item container>
      <DownloadBox tenderCode={props.tenderCode}/>
    </Grid>

    <Grid item container>
      <UploadBox />
    </Grid>

    {
      (stateNotify.error) ?
        <Grid item container>
          <ErrorLog error={stateNotify.error} />
        </Grid>
        : null
    }

    <Grid item container direction="row" justifyContent="space-between">
      <Button onClick={() => dispatch(changeKey({key:0}))} variant={"outlined"}>Torna a Informazioni gara</Button>

      {
        (stateNotify.code === "DONE") ?
          <Button variant={"contained"}
                  onClick={() => dispatch(goFinalStep())}
                  type={"submit"} >
            Avanti
          </Button>
          :
          <LoadingButton loading={stateNotify.loading} variant={"contained"}
                         onClick={notifyUploaded} disabled={stateUpload.status !== UPLOAD_STATUS_ENUM.UPLOADED_FILE_S3} >
            Salva
          </LoadingButton>
      }

    </Grid>
  </Grid>

}


function ErrorLog(props:{error:ErrorsNotify}) {
  return <Card elevation={24}
               sx={{
                 width: 1,
                 padding: "1rem 2rem",
                 boxShadow: "0px 3px 3px -2px ",
                 backgroundColor: "background.paper",
               }}>
    <Grid container rowSpacing={2}>
      <Grid item>
        <Typography variant="h4">
          Errore durante il caricamento del file
        </Typography>
      </Grid>
      <Grid container spacing={1}>
        <Grid item container >
          <Stack direction={"column"} spacing={2} >
            <Typography variant="subtitle1">
              {props.error.detail}
            </Typography>
            {
              props.error.errors.map(errorCell => (
                <Stack direction={"row"} alignItems={"center"} spacing={3}>
                  <Chip label="Errore" color="error"/>
                  <Typography>
                    {errorCell.message} ({errorCell.row}, {errorCell.col})
                  </Typography>
                </Stack>
              ))
            }
          </Stack>

        </Grid>

      </Grid>
    </Grid>
  </Card>
}