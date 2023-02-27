import {Chip} from "@mui/material";
import React from "react";
import {Tender} from "../../model";


export function TenderStatusChip(props:{data:Tender}) {
  let status = "-";

  if (props.data.status === "CREATED") status = "BOZZA"
  if (props.data.status === "VALIDATED") status = "CONVALIDATA"
  if (props.data.status === "IN_PROGRESS") status = "IN CORSO"
  if (props.data.status === "ENDED") status = "TERMINATA"
  return <Chip label={status}/>
}