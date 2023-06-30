import {Container, Grid, Step, StepLabel, Stepper, Typography} from "@mui/material";
import MainLayout from "../mainLayout/MainLayout";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {StepView} from "../../model";
import {StepDeliveriesDrivers} from "../../components/steps/StepDeliveriesDrivers";
import {StepTender} from "../../components/steps/StepTender";
import {StepFSU} from "../../components/steps/StepFSU";
import {useParams} from "react-router-dom";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import {TENDERS_TABLE_ROUTE} from "../../navigation/router.const";
import {StepSummary} from "../../components/steps/StepSummary";
import {resetStateUpload} from "../../redux/uploading/reducers";
import {clearFormState} from "../../redux/formTender/reducers";



const stepGara:StepView = {
  name: "Informazioni sulla gara",
  key: "tender",
  render: () => <StepTender/>
}

const stepFSU:StepView = {
  name: "FSU",
  key: "fsu",
  render: () => <StepFSU />
}

const stepDeliveries:StepView = {
  name: "Recapitisti",
  key: "deliveries",
  render: () => <StepDeliveriesDrivers/>
}

const stepRiepilogo:StepView = {
  name: "Riepilogo",
  key: "review",
  render: () => <StepSummary />
}

const breadcrumbsLinks = [
  {
    linkLabel: 'Tutte le Gare',
    linkRoute: TENDERS_TABLE_ROUTE
  }
]

export function FormTenderPage({email=""}:any) {
  const {tenderCode} = useParams();
  const steps = [stepGara, stepFSU, stepDeliveries, stepRiepilogo]
  const tenderFormStepper = useAppSelector(state => state.tenderForm);
  const dispatch = useAppDispatch();

  useEffect(() =>
    () => {
      dispatch(resetStateUpload());
      dispatch(clearFormState());
    }
    // eslint-disable-next-line
  , [dispatch])

  return <MainLayout email={email}>
    <Container>

      <Grid container direction="row" rowSpacing={3}>
        <Grid item container rowSpacing={1}>
          <Grid>
            <Breadcrumbs currentLocationLabel={(tenderCode) ? "Modifica gara" : "Nuova Gara"}
                         links={breadcrumbsLinks} />
          </Grid>
          <Grid item container>
            <Typography variant="h4" color="text.primary" data-testid={"title-page"}>
              {(!tenderCode) ? "Nuova Gara" : "Modifica Gara"}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container>
          <Stepper activeStep={tenderFormStepper.activeKey}
                   alternativeLabel sx={{width: "100%"}} >
            {
              steps.map((stepView) => (
                <Step key={stepView.key}>
                  <StepLabel>{stepView.name}</StepLabel>
                </Step>
              ))
            }
          </Stepper>
        </Grid>
        <Grid item container>
          {
            steps[tenderFormStepper.activeKey].render()
          }
        </Grid>

      </Grid>

    </Container>
  </MainLayout>

}