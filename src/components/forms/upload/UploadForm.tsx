import React from "react";
import {Card, FormLabel, Grid, Typography} from "@mui/material";
import SingleFileInput from "@pagopa/mui-italia/dist/components/SingleFileInput/SingleFileInput";


export default function UploadBox() {

  const [file, setFile] = React.useState<File | null>(null);

  const handleSelect = (file: File) => {
    setFile(file);
  };

  const handleRemove = () => {
    setFile(null);
  };

  return (
    <Grid item container rowSpacing={2}>
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
          <Grid container rowSpacing={2}>
            <Grid item>
              <Typography
                sx={{fontFamily: "Sans-serif"}}
                variant="h4"
                component="div">
                Upload
              </Typography>
            </Grid>
            <Grid container spacing={1}>
              <Grid item container xs={12} sm={6}>
                <FormLabel
                  id="idLabelDownload"
                  sx={{fontFamily: "Monospace", fontWeight: "Normal", marginTop: "2rem"}} >
                  Carica file xlsx dei recapitisti
                </FormLabel>
              </Grid>
              <Grid item container xs={12} sm={6}>
                <SingleFileInput
                  label="Documento (richiesto)"
                  value={file}
                  accept={["image/png"]}
                  onFileSelected={handleSelect}
                  onFileRemoved={handleRemove}
                  dropzoneLabel="Trascinare e rilasciare un file .png o fare click per selezionarne uno"
                  rejectedLabel="Tipo di file non supportato"
                />
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
  </Grid>
  );
}