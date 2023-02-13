import DownloadBox from "../forms/download/DownloadForm";
import UploadBox from "../forms/upload/UploadForm";
import {Button, Grid, Stack} from "@mui/material";
import {changeKey} from "../../redux/formTender/reducers";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {UPLOAD_STATUS_ENUM} from "../../model";
import * as snackbarActions from "../../redux/snackbarSlice";


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
    console.log("Notify : ", props.tenderCode, stateUpload.uid);
  }

  return <Stack direction={"column"} width={1} spacing={2}>
    <DownloadBox tenderCode={props.tenderCode}/>
    <UploadBox />
    <Grid item container direction="row" justifyContent="space-between">
      <Button onClick={() => dispatch(changeKey({key:0}))} variant={"outlined"}>Torna a Informazioni gara</Button>
      <Button variant={"contained"}
              onClick={notifyUploaded}
              type={"submit"} disabled={stateUpload.status !== UPLOAD_STATUS_ENUM.UPLOADED_FILE_S3} >
        Salva
      </Button>
    </Grid>
  </Stack>

}