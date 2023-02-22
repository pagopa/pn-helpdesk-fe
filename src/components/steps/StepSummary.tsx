import {useAppDispatch, useAppSelector} from "../../redux/hook";
import React, {useEffect} from "react";
import {changeKey, clearFormState, goTenderDriversStep} from "../../redux/formTender/reducers";
import {Button, Card, Grid, Stack, Typography} from "@mui/material";
import {DataInfo} from "../dataInfo/DataInfo";
import {tenderRowsInfo} from "../dataInfo/rows";
import {DeliveriesDriverTable} from "../deliveriesDrivers/DeliveriesDriverTable";
import SaveIcon from '@mui/icons-material/Save';
import {useNavigate} from "react-router-dom";
import {TENDERS_TABLE_ROUTE} from "../../navigation/router.const";
import {resetStateDrivers} from "../../redux/deliveriesDrivers/reducers";


export function StepSummary(){
  const stepStore = useAppSelector(state => state.tenderForm);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() =>{
    if (!stepStore.formTender?.code){
      dispatch(changeKey({key: 0}))
    }
    return () => {
      dispatch(resetStateDrivers());

    }
    //eslint-disable-next-line
  }, [])

  const handleOnExit = () => {
    dispatch(clearFormState());
    navigate(TENDERS_TABLE_ROUTE);
  }

  if (!stepStore.formTender?.code) {
    return null
  }

  return <Grid item container rowSpacing={3}>
    <Grid item container>
      <Card
        elevation={24}
        sx={{
          width: 1,
          padding: "1rem 2rem",
          boxShadow: "0px 3px 3px -2px ",
          backgroundColor: "background.paper",
        }}>
        <Stack sx={{width: 1}} spacing={2}>
          <Grid item container>
            <Typography variant="h5">
              Informazioni
            </Typography>
          </Grid>
          <DataInfo data={stepStore.formTender} rows={tenderRowsInfo}/>
        </Stack>
      </Card>
    </Grid>
    <Grid item container direction="row" justifyContent="space-between">
      <Card
        elevation={24}
        sx={{
          width: 1,
          padding: "1rem 2rem",
          boxShadow: "0px 3px 3px -2px ",
          backgroundColor: "background.paper",
        }}>
        <Grid item container>
          <Typography variant="h5">
            Recapitisti
          </Typography>
        </Grid>
        <div data-testid="datagrid">
          <DeliveriesDriverTable tenderCode={stepStore.formTender.code} withActions={false}/>
        </div>
      </Card>
    </Grid>
    <Grid item container direction="row" justifyContent="space-between">
      <Button variant={"outlined"} onClick={() => dispatch(goTenderDriversStep())}>Torna ai Recapitisti</Button>
      <Button variant={"contained"} startIcon={<SaveIcon/>} onClick={handleOnExit}>
        Salva
      </Button>
    </Grid>

  </Grid>

}