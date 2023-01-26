import {
  Card,
  Typography,
  Grid, FormLabel, Button, CircularProgress,
} from "@mui/material";
import React from "react";


export default function DownloadBox() {
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
                Download
              </Typography>
            </Grid>
            <Grid container spacing={1}>
              <Grid item container xs={12} sm={6}>
                <FormLabel
                  id="idLabelDownload"
                  sx={{fontFamily: "Monospace", fontWeight: "Normal", marginTop: "2rem"}} >
                  Template/recapitisti attuali
                </FormLabel>
              </Grid>
              <Grid item container xs={12} sm={6}>
                <Button
                  id="idButtonDownload"
                  variant="contained"
                  size="medium"
                  color="primary"
                  sx={{marginTop: "2rem"}} >
                  Download
                </Button>
                {/*<CircularProgress />*/}
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};