import {Grid, Divider, Typography} from "@mui/material";
import React, {ReactNode} from "react";




export interface RowDataInfo {
  id: string
  label: string,
  type: "DIVIDER" | "ROW";
  labelWeight ?: string;
  labelVariant ?: "body1" | "subtitle1" | "subtitle2";
  render: (data: any) => ReactNode

}

export interface DataInfoProps {
  data: any,
  rows: RowDataInfo[]

}

export function DataInfo(props: DataInfoProps){

  return <Grid item container spacing={1} data-testid={'dataInfo'}>
    {
      props.rows.map(row => (
        (row.type === "DIVIDER") ?
          <Grid key={row.id} container alignItems={"center"} width="1" mt={2}>
            <Divider key={row.id} sx={{width:"100%"}} />
          </Grid>
          :
        <Grid key={row.id} container alignItems={"center"} direction="row" width="1">
          <Grid item md={6} xs={12}>
            <Typography variant={(row?.labelVariant) ? row.labelVariant : "body2"} fontWeight={(row?.labelWeight) ? row.labelWeight : "normal"} >
              {row.label}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            {row.render(props.data)}
          </Grid>
        </Grid>
      ))
    }
  </Grid>
}