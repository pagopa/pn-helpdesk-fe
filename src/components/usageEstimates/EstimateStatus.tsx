import {Chip} from "@mui/material";
import React from "react";
import {EstimateStatusEnum} from "../../model";


export function EstimateStatusChip(props:{data:EstimateStatusEnum}) {
  if (props.data === "CREATED")
    return <Chip sx={{bgcolor: '#ffff00'}} label={"IN AGGIORNAMENTO"}/>
  if (props.data === "VALIDATED")
    return <Chip sx={{bgcolor: '#95f202'}}  label={"CONSOLIDATO"}/>
  if (props.data === "IN_PROGRESS")
    return <Chip  sx={{bgcolor: '#81d4fa'}} label={"IN CORSO"}/>
  if (props.data === "ENDED")
    return <Chip label={"TERMINATA"}/>
  return <Chip label={"-"}/>
}