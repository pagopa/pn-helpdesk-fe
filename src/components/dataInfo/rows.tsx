import {RowDataInfo} from "./DataInfo";
import {Typography} from "@mui/material";
import {format} from "date-fns";
import {TenderStatusChip} from "../deliveriesDrivers/TenderStatusChip";
import {Tender} from "../../model";
import {EstimateStatusChip} from "../usageEstimates/EstimateStatus";


export const tenderRowsInfo: RowDataInfo[] = [
  {
    id: "name",
    label: "Identificazione",
    type: "ROW",
    render: (data) => <Typography>{data?.name}</Typography>
  },
  {
    id: "startDate",
    label: "Data inizio",
    type: "ROW",
    render: (data) => <Typography>{(data?.startDate) ? format(new Date(data.startDate), "dd-MM-yyyy HH:mm") : ""}</Typography>
  },
  {
    id: "endDate",
    label: "Data fine",
    type: "ROW",
    render: (data) => <Typography>{(data?.endDate) ? format(new Date(data.endDate), "dd-MM-yyyy HH:mm") : ""}</Typography>
  },
  {
    id: "status",
    label: "Stato",
    type: "ROW",
    render: (data) => <TenderStatusChip data={data as Tender}/>
  },
]

export const usageInfoPA: RowDataInfo[] = [
  {
    id: "paName",
    label: "Soggetto aderente",
    type: "ROW",
    render: (data) => (
      <Typography variant="body2" sx={{fontWeight: "bold"}}>
        {(data?.paName) ? data.paName : "-"}
      </Typography>
    )
  },
  {
    id: "address",
    label: "Sede legale",
    type: "ROW",
    render: (data) => (
      <Typography variant="body2" sx={{fontWeight: "bold"}}>
        {(data?.registeredOffice) ? data.registeredOffice : "-"}
      </Typography>
    )
  },
  {
    id: "taxId",
    label: "Partita IVA",
    type: "ROW",
    render: (data) => (
      <Typography variant="body2" sx={{fontWeight: "bold"}}>
        {(data?.taxId) ? data.taxId : "-"}
      </Typography>
    )
  }
]

export const usagePeriodPA: RowDataInfo[] = [
  {
    id: "referenceMonth",
    label: "Mese di riferimento",
    type: "ROW",
    render: (data) => (
      <Typography variant="body2" sx={{fontWeight: "bold"}}>
        {data?.referenceMonth}
      </Typography>
    )
  },
  {
    id: "deadlineDate",
    label: "Data di scadenza",
    type: "ROW",
    render: (data) => (
      <Typography variant="body2" sx={{fontWeight: "bold"}}>
        {(data?.deadlineDate) ? format(new Date(data.deadlineDate), "dd-MM-yyyy HH:mm") : "-"}
      </Typography>
    )
  },
  {
    id: "insertDate",
    label: "Data di ultima modifica",
    type: "ROW",
    render: (data) => (
      <Typography variant="body2" sx={{fontWeight: "bold"}}>
        {(data?.lastModifiedDate) ? format(new Date(data.lastModifiedDate), "dd-MM-yyyy HH:mm") : "-"}
      </Typography>
    )
  },
  {
    id: "status",
    label: "Stato",
    type: "ROW",
    render: (data) => <EstimateStatusChip data={data.status}/>
  }
]

export const usageBillingDataPA: RowDataInfo[] = [
  {
    id: "sdiCode",
    label: "Codice SDI",
    type: "ROW",
    render: (data) => (
      <Typography variant="body2" sx={{fontWeight: "bold"}}>
        {(data?.sdiCode) ? data.sdiCode : "-"}
      </Typography>
    )
  },
  {
    id: "splitPayment",
    label: "Soggetto Split Payment",
    type: "ROW",
    render: (data) =>(
      <Typography variant="body2" sx={{fontWeight: "bold"}}>
        {(data?.splitPayment) ? "Si" : "No"}
      </Typography>
    )
  },
  {
    id: "mailAddress",
    label: "Indirizzo e-mail amministrativo",
    type: "ROW",
    render: (data) => (
      <Typography variant="body2" sx={{fontWeight: "bold"}}>
        {(data?.mailAddress) ? data.mailAddress : "-"}
      </Typography>
    )
  },
  {
    id: "description",
    type: "ROW",
    label: "Altre informazioni utili alla fatturazione",
    render: (data) => (
      <Typography variant="body2" sx={{fontWeight: "bold"}}>
        {(data?.description) ? data.description : "-"}
      </Typography>
    )
  },

]

export const usageEstimationsPA: RowDataInfo[] = [
  {
    id: "totalDigitalNotif",
    label: "Numero notifiche per via digitale",
    type: "ROW",
    render: (data) => (
      <Typography variant="body2"
                  textAlign={"end"}
                  sx={{fontWeight: "bold"}}>
        {data?.totalDigitalNotif}
      </Typography>
    )
  },
  {
    id: "totalPaperAR",
    label: "Numero notifiche per via analogica tramite A/R",
    type: "ROW",
    render: (data) => (
      <Typography variant="body2"
                  textAlign={"end"}
                  sx={{fontWeight: "bold"}}>
        {data?.totalAnalogNotif}
      </Typography>
    )
  },
  {
    id: "totalPaper890Notif",
    label: "Numero notifiche per via analogica tramite 890",
    type: "ROW",
    render: (data) => (
      <Typography variant="body2"
                  textAlign={"end"}
                  sx={{fontWeight: "bold"}}>
        {data?.total890Notif}
      </Typography>
    )
  },
  {
    id: "divider-total",
    label: "divider-label",
    type: "DIVIDER",
    render: (data) => null,
  },
  {
    id: "totalNotifToWork",
    label: "Totale notifiche stimate",
    type: "ROW",
    render: (data) => (
      <Typography variant="subtitle1"
                  textAlign={"end"}
                  sx={{fontWeight: "bold"}}>
        (data.total890Notif && data.totalAnalogNotif && data.totalDigitalNotif) ?
        data.total890Notif + data.totalAnalogNotif + data.totalDigitalNotif
        : "-"
      </Typography>
    )
  },
  {
    id: "totalDigital",
    label: "Per via digitale",
    type: "ROW",
    render: (data) => (
      <Typography variant="body2"
                  textAlign={"end"}
                  sx={{fontWeight: "bold"}}>
        {data?.totalDigitalNotif}
      </Typography>
    )
  },
  {
    id: "totalPaper",
    label: "Per via analogica",
    type: "ROW",
    render: (data) => (
      <Typography variant="body2"
                  textAlign={"end"}
                  sx={{fontWeight: "bold"}}>
        {data?.totalAnalogNotif + data?.total890Notif}
      </Typography>
    )
  }
]