import {Chip} from "@mui/material";
import React from "react";
import {Tender} from "../../model";


export function TenderStatusChip(props:{data:Tender}) {
    if (props.data.status === "CREATED")
        return <Chip sx={{bgcolor: '#fff000'}} label={"BOZZA"}/>
    if (props.data.status === "VALIDATED")
        return <Chip sx={{bgcolor: '#b2ff59'}}  label={"CONVALIDATA"}/>
    if (props.data.status === "IN_PROGRESS")
        return <Chip  sx={{bgcolor: '#81d4fa'}} label={"IN CORSO"}/>
    if (props.data.status === "ENDED")
        return <Chip label={"TERMINATA"}/>
}