import {Chip} from "@mui/material";
import React from "react";
import {Tender, TenderStatusEnum} from "../../model";

enum TenderStatusLabel {
    CREATED = "BOZZA",
    VALIDATED = "CONVALIDATA",
    IN_PROGRESS = "IN CORSO",
    ENDED = "TERMINATA"
}


export function TenderStatusChip(props:{data:Tender}) {
    if (props.data.status === TenderStatusEnum.CREATED)
        return <Chip color={"warning"} label={TenderStatusLabel.CREATED}/>

    if (props.data.status === TenderStatusEnum.VALIDATED)
        return <Chip color={"success"}  label={TenderStatusLabel.VALIDATED}/>

    if (props.data.status === TenderStatusEnum.IN_PROGRESS)
        return <Chip label={TenderStatusLabel.IN_PROGRESS}/>

    if (props.data.status === TenderStatusEnum.ENDED)
        return <Chip variant={"outlined"} label={TenderStatusLabel.ENDED}/>

    return <Chip label={"-"}/>
}