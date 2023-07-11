import {Chip} from "@mui/material";
import React from "react";
import {StatusReportEnum} from "../../model";

enum StatusChipLabel {
  RAW = "Raw",
  READY = "Pronto",
  DEANONIMIZING = "De-anonimizzazione",
  ERROR = "In Errore"
}


export function ReportStatusChip(props:{data:StatusReportEnum}) {
  if (props.data === StatusReportEnum.RAW)
    return <Chip color={"info"} label={StatusChipLabel.RAW}/>

  if (props.data === StatusReportEnum.READY)
    return <Chip color={"success"}  label={StatusChipLabel.READY}/>

  if (props.data === StatusReportEnum.DEANONIMIZING)
    return <Chip color={"info"} label={StatusChipLabel.DEANONIMIZING}/>

  if (props.data === StatusReportEnum.ERROR)
    return <Chip color={"error"} label={StatusChipLabel.ERROR}/>

  return <Chip label={"-"}/>
}