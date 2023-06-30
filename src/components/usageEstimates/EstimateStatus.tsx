import {Chip} from "@mui/material";
import React from "react";
import {EstimateStatusEnum} from "../../model";

enum StatusChipLabel {
  DRAFT = "Bozza",
  VALIDATED = "Inviata",
  ABSENT = "Assente",
  ENDED = "TERMINATA"
}


export function EstimateStatusChip(props:{data:EstimateStatusEnum}) {
  if (props.data === EstimateStatusEnum.DRAFT)
    return <Chip color={"info"} label={StatusChipLabel.DRAFT}/>

  if (props.data === EstimateStatusEnum.VALIDATED)
    return <Chip color={"success"}  label={StatusChipLabel.VALIDATED}/>

  if (props.data === EstimateStatusEnum.ABSENT)
    return <Chip color={"error"} label={StatusChipLabel.ABSENT}/>

  return <Chip label={"-"}/>
}