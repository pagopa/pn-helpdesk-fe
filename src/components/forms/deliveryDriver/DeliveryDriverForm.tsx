import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  TextField, Grid,
} from "@material-ui/core";
import React from "react";
import {initialDeliveryDriverValues} from "./InitialDeliveryDriverValues"

export default function DeliveryDriverBox() {
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography
            style={{fontFamily: "Sans-serif"}}
            variant="h4"
            component="div">
            Nuovo FSU
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="idTaxId"
                label="Partita iva"
                name="taxId"
                variant="outlined"
                fullWidth
                margin="dense"
                required={true}
                value={initialDeliveryDriverValues.taxId}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="idBusinessName"
                label="Ragione sociale"
                name="businessName"
                variant="outlined"
                fullWidth
                margin="dense"
                required={true}
                value={initialDeliveryDriverValues.businessName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="idDenomination"
                label="Denominazione"
                name="denomination"
                variant="outlined"
                fullWidth
                margin="dense"
                required={true}
                value={initialDeliveryDriverValues.denomination}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="idRegisteredOffice"
                label="Sede legale"
                name="registeredOffice"
                variant="outlined"
                fullWidth
                margin="dense"
                required={true}
                value={initialDeliveryDriverValues.registeredOffice}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="idFiscalCode"
                label="Codice fiscale"
                name="fiscalCode"
                variant="outlined"
                fullWidth
                margin="dense"
                required={true}
                value={initialDeliveryDriverValues.fiscalCode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="idPec"
                label="Pec"
                name="pec"
                variant="outlined"
                fullWidth
                margin="dense"
                required={true}
                value={initialDeliveryDriverValues.pec}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="idPhoneNumber"
                label="Numero telefonico"
                name="phoneNumber"
                variant="outlined"
                fullWidth
                margin="dense"
                required={true}
                value={initialDeliveryDriverValues.phoneNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="idUniqueCode"
                label="Codice univoco"
                name="uniqueCode"
                variant="outlined"
                fullWidth
                margin="dense"
                required={true}
                value={initialDeliveryDriverValues.uniqueCode}
              />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Box>

  );
};