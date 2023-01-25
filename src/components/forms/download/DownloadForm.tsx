import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  TextField, Grid, FormLabel, Button, CircularProgress,
} from "@material-ui/core";
import React from "react";

export default function DownloadBox() {
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography
            style={{fontFamily: "Sans-serif"}}
            variant="h4"
            component="div">
            Download
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormLabel
                id="idLabelDownload"
                style={{fontFamily: "Monospace"}}>
                Template/recapitisti attuali
              </FormLabel>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                id="idButtonDownload"
                variant="contained"
                size="medium"
                color="primary">
                Download
              </Button>
              {/*<CircularProgress />*/}
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Box>

  );
};