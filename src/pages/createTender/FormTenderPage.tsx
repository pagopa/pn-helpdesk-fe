import {BreadcrumbCustom} from "../../components/breadcrumb/BreadcrumbCustom";
import {Box, Container, Grid, Stack, Step, StepLabel, Stepper, Typography} from "@mui/material";

import MainLayout from "../mainLayout/MainLayout";
import React from "react";
import TenderFormBox from "../../components/forms/tender/TenderForm";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {StepView} from "../../model";



const stepGara:StepView = {
  name: "Informazioni sulla gara",
  key: "tender",
  render: () => <TenderFormBox />
}

const stepFSU:StepView = {
  name: "FSU",
  key: "fsu",
  render: () => <h1>FSU</h1>
}

const stepDeliveries:StepView = {
  name: "Recapitisti",
  key: "deliveries",
  render: () => <h1>DELIVERIES</h1>
}

const stepRiepilogo:StepView = {
  name: "Riepilogo",
  key: "review",
  render: () => <h1>REVIEW</h1>
}


export function FormTenderPage({email}:any) {

  const steps = [stepGara, stepFSU, stepDeliveries, stepRiepilogo]
  const tenderFormStepper = useAppSelector(state => state.tenderForm);
  const dispatch = useAppDispatch();

  return <MainLayout email={email}>
    <Container>
      <BreadcrumbCustom/>
      <Grid container direction="row" rowSpacing={3}>
        <Grid item container>
          <Box>
            <Typography variant="h4" color="text.primary">
              Nuova Gara
            </Typography>
          </Box>
        </Grid>
        <Grid item container>
          <Stack spacing={2} sx={{width: "100%"}}>
            <Stepper activeStep={tenderFormStepper.activeKey} alternativeLabel sx={{width: "100%"}} >
              {
                steps.map((stepView) => (
                  <Step key={stepView.key}>
                    <StepLabel>{stepView.name}</StepLabel>
                  </Step>
                ))
              }
            </Stepper>
            {
              steps[tenderFormStepper.activeKey].render()
            }
          </Stack>
        </Grid>

      </Grid>
    </Container>
  </MainLayout>

}