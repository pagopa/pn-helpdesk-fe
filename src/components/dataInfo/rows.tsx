import {RowDataInfo} from "./DataInfo";
import {Chip, Typography} from "@mui/material";


export const tenderRowsInfo: RowDataInfo[] = [
  {
    id: "name",
    label: "Identificazione",
    render: (data) => <Typography>{data?.name}</Typography>
  },
  {
    id: "startDate",
    label: "Data inizio",
    render: (data) => <Typography>{data?.startDate}</Typography>
  },
  {
    id: "endDate",
    label: "Data fine",
    render: (data) => <Typography>{data?.endDate}</Typography>
  },
  {
    id: "status",
    label: "Stato",
    render: (data) => <Chip label={data?.status}/>
  },
  {
      id: "pIva",
      label: "Partita iva",
      render: (data) => <Chip label={data?.pIva}/>
  },
  {
      id: "zone",
      label: "Zone/CAP Prodotto",
      render: (data) => <Chip label={data?.zone}/>
  },
  {
      id: "fsu",
      label: "FSU",
      render: (data) => <Chip label={data?.fsu}/>
  }

]