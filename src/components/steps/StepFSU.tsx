import {Button, Card, Grid, Stack, Typography} from "@mui/material";

import {backStep} from "../../redux/formTender/reducers";
import React, {useState} from "react";
import DeliveryDriverFormBox from "../forms/deliveryDriver/DeliveryDriverForm";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import { Add } from "@mui/icons-material";
import {DataGrid} from "@mui/x-data-grid";
import {getColumn} from "../paginationGrid/ColumnsDefinition";
import {ModelType} from "../paginationGrid";
import {CostDialog} from "../dialogs";


export default function StepFSU(){
  const formState = useAppSelector(state => state.tenderForm);
  const dispatch = useAppDispatch();

return <Stack spacing={2} sx={{width: 1}} >
  <DeliveryDriverFormBox fsu={true}
                         tenderCode={(formState.formTender.value?.code) ? formState.formTender.value.code : ""}
                         initialValue={formState.formFsu}/>
  {
    (formState.formFsu?.uniqueCode) ?
      <CostsBox fsu={true}/> : <></>
  }

  <Grid item container direction="row" justifyContent="space-between">
    <Button onClick={() => dispatch(backStep({}))} variant={"outlined"}>Torna a FSU</Button>
    <Button variant={"contained"} disabled={!(formState.formFsu)} >Avanti</Button>
  </Grid>
  {/*
  <CostDialog fsu={props.fsu} open={openFormCost} onClickNegative={() => setOpenFormCost(false)} onClickPositive={handleOnSubmitFormCost}/>
*/}
</Stack>


}

function CostsBox (props:{fsu:boolean}){
  const [opened, setOpened] = useState(false);

  const handleOnClickPositive = () => {

  }

  return <Grid item container>
    <Card
      elevation={24}
      sx={{
        width: 1,
        padding: "1rem 2rem",
        boxShadow: "0px 3px 3px -2px ",
        backgroundColor: "background.paper",
      }}
    >
      <Grid container
            rowSpacing={2}
            alignItems={"center"}
            justifyContent="space-between">
        <Grid item>
          <Typography variant="h5" component="div">Costi</Typography>
        </Grid>
        <Grid item>
          <Button variant={"outlined"}
                  onClick={() => setOpened(true)}
                  startIcon={<Add />}>
            Aggiungi
          </Button>
        </Grid>
      </Grid>
      <Grid item container>
        <DataGrid columns={getColumn(ModelType.COST)}
                  rows={[]}
                  getRowId={(data) => data.type+ Math.random() }
                  sx={{
                    height:"400px",
                  }}
        />
      </Grid>
    </Card>
    <CostDialog fsu={props.fsu} open={opened} onClickNegative={() => setOpened(false)} onClickPositive={handleOnClickPositive}/>
  </Grid>
}