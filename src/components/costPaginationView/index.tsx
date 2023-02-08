import React, {useEffect, useState} from "react";
import {Button, Card, Grid, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import {DataGrid} from "@mui/x-data-grid";
import {getColumn} from "../paginationGrid/ColumnsDefinition";
import {ModelType} from "../paginationGrid";
import {CostDialog} from "../dialogs";
import {Cost} from "../../model";


interface CostsPaginationViewProps {
  fsu:boolean, tenderCode:string, driverCode: string
}


export default function CostsPaginationView (props:CostsPaginationViewProps){
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState<Cost | undefined>(undefined);
  

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
    <CostDialog cost={selected} fsu={props.fsu} open={opened} onClickNegative={() => setOpened(false)} onClickPositive={handleOnClickPositive}/>
  </Grid>
}