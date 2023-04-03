import {Chip} from "@mui/material";
import React from "react";
import {EstimateStatusEnum} from "../../model";

enum StatusChipLabel {
  CREATED = "IN AGGIORNAMENTO",
  VALIDATED = "CONSOLIDATO",
  IN_PROGRESS = "IN CORSO",
  ENDED = "TERMINATA"
}


export function EstimateStatusChip(props:{data:EstimateStatusEnum}) {
  if (props.data === EstimateStatusEnum.Created)
    return <Chip sx={{bgcolor: '#ffff00'}} label={StatusChipLabel.CREATED}/>

  if (props.data === EstimateStatusEnum.Validated)
    return <Chip sx={{bgcolor: '#95f202'}}  label={StatusChipLabel.VALIDATED}/>

  if (props.data === EstimateStatusEnum.InProgress)
    return <Chip  sx={{bgcolor: '#81d4fa'}} label={StatusChipLabel.IN_PROGRESS}/>

  if (props.data === EstimateStatusEnum.Ended)
    return <Chip label={StatusChipLabel.ENDED}/>

  return <Chip label={"-"}/>
}