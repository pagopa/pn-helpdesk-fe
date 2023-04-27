import {Button, Grid, Stack} from "@mui/material";

import {backStep, goTenderDriversStep} from "../../redux/formTender/reducers";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {DriverAndCostForm} from "../deliveriesDrivers/DriverAndCostForm";


export function StepFSU(){
  const formState = useAppSelector(state => state.tenderForm);
  const dispatch = useAppDispatch();


  return <Stack spacing={2} sx={{width: 1}} >
    {
      (formState.formTender?.code) ?
          <DriverAndCostForm key={"TENDER-FORM"} fsu={true} tenderCode={formState.formTender.code} /> : null
    }

    <Grid item container direction="row" justifyContent="space-between">
      <Button onClick={() => dispatch(backStep())}
              data-testid={"btn-back-fsu"}
              variant={"outlined"}>
        Torna ai dettagli gara
      </Button>

      <Button variant={"contained"}
              data-testid={"btn-next-fsu"}
              onClick={() => dispatch(goTenderDriversStep())}
              disabled={!(formState.formFsu?.taxId)} >
        Avanti
      </Button>
    </Grid>
  </Stack>


}

