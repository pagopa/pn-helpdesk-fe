import React, {useEffect, useState} from "react";
import {Card, Grid, Stack, Typography} from "@mui/material";
import SingleFileInput from "@pagopa/mui-italia/dist/components/SingleFileInput/SingleFileInput";
import {useAppDispatch, useAppSelector} from "../../../redux/hook";
import {getPresignedUrl, uploadFile} from "../../../redux/uploading/actions";
import {resetStateUpload} from "../../../redux/uploading/reducers";
import {UPLOAD_STATUS_ENUM} from "../../../model";






export default function UploadBox() {
  const [file, setFile] = useState<File|undefined>(undefined);
  const uploadState = useAppSelector(state => state.uploadAndDownload);
  const dispatch = useAppDispatch();

  const handleSelect = (file: File) => {
    setFile(file);
    dispatch(resetStateUpload())
  };

  const handleRemove = () => {
    setFile(undefined);
    dispatch(resetStateUpload())
  };

  useEffect(() => {
    if (file && uploadState.upload.presignedUrl && uploadState.upload.status === UPLOAD_STATUS_ENUM.RETRIEVED_PRESIGNED_URL){
      console.log("presigned url retrieved")
      dispatch(uploadFile({
        url:uploadState.upload.presignedUrl,
        file: file
      }))
    } else if (file && uploadState.upload.status === UPLOAD_STATUS_ENUM.WAITING_FILE){
      console.log("Retrieve presigned url")
      dispatch(getPresignedUrl({}));
    }
    // eslint-disable-next-line
  }, [file, uploadState.upload])


  const statusDescription = () => {
    switch (uploadState.upload.status){
      case UPLOAD_STATUS_ENUM.RETRIEVING_PRESIGNED_URL:
        return <Typography variant="body1">
          In attesa dell'url di caricamento
        </Typography>
      case UPLOAD_STATUS_ENUM.UPLOADING_FILE_S3:
        return <Typography variant="body1">
          Caricamento file in corso
        </Typography>
      case UPLOAD_STATUS_ENUM.ERROR_PRESIGNED_URL:
        return <Typography variant="body1" color={"red"}>
          Errore con il recupero dell'url di caricamento
        </Typography>
      case UPLOAD_STATUS_ENUM.ERROR_UPLOADING_FILE_S3:
        return <Typography variant="body1" color={"red"}>
          Errore con il caricamento del file
        </Typography>
      default:
        return null
    }
  }

  return (
    <Card elevation={24}
          sx={{
            width: 1,
            padding: "1rem 2rem",
            boxShadow: "0px 3px 3px -2px ",
            backgroundColor: "background.paper",
          }}>
      <Grid container rowSpacing={2}>
        <Grid item>
          <Typography variant="h4">
            Upload
          </Typography>
        </Grid>
        <Grid container spacing={1}>
          <Grid item container xs={12} sm={6}>
            <Stack direction={"column"} spacing={2}>
              <Typography variant="subtitle1">
                Carica file xlsx dei recapitisti
              </Typography>
              {
                statusDescription()
              }
            </Stack>

          </Grid>
          <Grid item container xs={12} sm={6}>

            <SingleFileInput
              label="Documento (richiesto)"
              loading={uploadState.upload.loading}
              error={!!(uploadState.upload.error)}
              value={(file) ? file : null}
              accept={["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"]}
              onFileSelected={handleSelect}
              onFileRemoved={handleRemove}
              dropzoneLabel="Trascinare e rilasciare un file .xlsx o fare click per selezionarne uno"
              rejectedLabel="Tipo di file non supportato"
            />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}