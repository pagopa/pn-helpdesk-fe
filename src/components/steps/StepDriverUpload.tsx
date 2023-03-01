import DownloadBox from "../forms/download/DownloadForm";
import UploadBox from "../forms/upload/UploadForm";
import {Button, Card, Chip, Grid, Stack, Typography} from "@mui/material";
import {changeKey, goFinalStep} from "../../redux/formTender/reducers";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {ErrorsNotify, UPLOAD_STATUS_ENUM} from "../../model";
import * as snackbarActions from "../../redux/snackbarSlice";
import {LoadingButton} from "@mui/lab";
import {notifyFileUpload} from "../../redux/uploading/actions";


export function StepDriverUpload(props:{tenderCode:string}){
  const stateUpload = useAppSelector(state => state.uploadAndDownload.upload);

  const dispatch = useAppDispatch();

  const notifyUploaded = () => {
    if (stateUpload.status !== UPLOAD_STATUS_ENUM.UPLOADED_FILE_S3 || !stateUpload.uid){
      dispatch(snackbarActions.updateSnackbacrOpened(true));
      dispatch(snackbarActions.updateStatusCode(500));
      dispatch(snackbarActions.updateMessage("Error durante il caricamento del file"));
      return;
    }
    dispatch(notifyFileUpload({tenderCode: props.tenderCode, uid: stateUpload.uid}));
  }


  useEffect(() => {
    if (stateUpload.uid && stateUpload.status === UPLOAD_STATUS_ENUM.NOTIFY_IN_PROGRESS) {
      retrieveAsync();
    }
    if (!stateUpload.retry && !stateUpload.error && stateUpload.status === UPLOAD_STATUS_ENUM.DATA_SAVED) {
      dispatch(snackbarActions.updateSnackbacrOpened(true));
      dispatch(snackbarActions.updateStatusCode(200));
      dispatch(snackbarActions.updateMessage("Caricamento dati terminato correttamente"));
    }
    //eslint-disable-next-line
  }, [stateUpload, dispatch]);

  const retrieveAsync = async () => {
    if (stateUpload?.uid && stateUpload?.retry){
      setTimeout(() => dispatch(notifyFileUpload({tenderCode: props.tenderCode, uid: stateUpload.uid})), stateUpload.retry);
    }
  }



  return <Grid item container rowSpacing={2}>
    <Grid item container>
      <DownloadBox tenderCode={props.tenderCode}/>
    </Grid>

    <Grid item container>
      <UploadBox />
    </Grid>

    {
      (stateUpload.status === UPLOAD_STATUS_ENUM.ERROR_VALIDATION_EXCEL) ?
        <Grid item container>
          <ErrorLog error={stateUpload.error as ErrorsNotify} />
        </Grid>
        : null
    }

    <Grid item container direction="row" justifyContent="space-between">
      <Button onClick={() => dispatch(changeKey({key:0}))} variant={"outlined"}>Torna a Informazioni gara</Button>

      {
        (stateUpload.status === UPLOAD_STATUS_ENUM.DATA_SAVED) ?
          <Button variant={"contained"}
                  onClick={() => dispatch(goFinalStep())}
                  type={"submit"} >
            Avanti
          </Button>
          :
          <LoadingButton loading={stateUpload.status === UPLOAD_STATUS_ENUM.NOTIFY_IN_PROGRESS} variant={"contained"}
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