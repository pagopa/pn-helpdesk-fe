import React, {useEffect, useState} from "react";
import {Card, Grid, Typography} from "@mui/material";
import SingleFileInput from "@pagopa/mui-italia/dist/components/SingleFileInput/SingleFileInput";
import {useAppDispatch, useAppSelector} from "../../../redux/hook";
import {getPresignedUrl} from "../../../redux/uploading/actions";
import {resetStateUpload} from "../../../redux/uploading/reducers";



export default function UploadBox() {
  const [file, setFile] = useState<File|undefined>(undefined);
  const uploadState = useAppSelector(state => state.uploadAndDownload);
  const dispatch = useAppDispatch();

  const handleSelect = (file: File) => {
    setFile(file);
    dispatch(resetStateUpload())
  };

  const handleRemove = () => {
  };

  useEffect(() => {
    if (file && uploadState.upload.presignedUrl){
      console.log("presigned url retrieved")
      // carico il file su S3 con presigned url
    } else if (file && !uploadState.upload.presignedUrl && !uploadState.upload.loading && !uploadState.upload.error){
      console.log("Retrieve presigned url")
      dispatch(getPresignedUrl({}));
    }
  }, [file, uploadState.upload])

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
            <Typography variant="subtitle1">
              Carica file xlsx dei recapitisti
            </Typography>
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