import {RowDataInfo} from "./DataInfo";
import {Chip, Typography} from "@mui/material";
import {format} from "date-fns";


export const tenderRowsInfo: RowDataInfo[] = [
  {
    id: "name",
    label: "Identificazione",
    render: (data) => <Typography>{data?.name}</Typography>
  },
  {
    id: "startDate",
    label: "Data inizio",
    render: (data) => <Typography>{(data?.startDate) ? format(new Date(data.startDate), "dd-MM-yyyy HH:mm") : ""}</Typography>
  },
  {
    id: "endDate",
    label: "Data fine",
    render: (data) => <Typography>{(data?.endDate) ? format(new Date(data.endDate), "dd-MM-yyyy HH:mm") : ""}</Typography>
  },
  {
    id: "status",
    label: "Stato",
    render: (data) => <Chip label={data?.status}/>
  },
]