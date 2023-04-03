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
    render: (data) => <TenderStatusChip data={data as Tender}/>
  },
]

export const usageInfoPA: RowDataInfo[] = [
  {
    id: "paName",
    label: "Soggetto aderente",
    render: (data) => <Typography>{(data?.paName) ? data.paName : "-"}</Typography>
  },
  {
    id: "address",
    label: "Sede legale",
    render: (data) => <Typography>{(data?.address) ? data.address : "-"}</Typography>
  },
  {
    id: "taxId",
    label: "Partita IVA",
    render: (data) => <Typography>{(data?.taxId) ? data.taxId : "-"}</Typography>
  },
  {
    id: "fiscalCode",
    label: "Codice Fiscale",
    render: (data) => <Typography>{(data?.ipaCode) ? data.ipaCode : "-"}</Typography>
  },
  {
    id: "ipaCode",
    label: "Codice IPA",
    render: (data) => <Typography>{(data?.ipaCode) ? data.ipaCode : "-"}</Typography>
  },
  {
    id: "pec",
    label: "PEC",
    render: (data) => <Typography>{(data?.pec) ? data.pec : "-"}</Typography>
  },
]

export const usagePeriodPA: RowDataInfo[] = [
  {
    id: "paName",
    label: "Nome PA",
    render: (data) => <Typography>{data?.paName}</Typography>
  },{
    id: "referenceMonth",
    label: "Periodo di riferimento",
    render: (data) => <Typography>{data?.referenceMonth}</Typography>
  },{
    id: "deadlineDate",
    label: "Data di scadenza",
    render: (data) =><Typography>{(data?.deadlineDate) ? format(new Date(data.deadlineDate), "dd-MM-yyyy HH:mm") : "-"}</Typography>
  },{
    id: "status",
    label: "Stato",
    render: (data) => <EstimateStatusChip data={data.status}/>
  },{
    id: "insertDate",
    label: "Data inserimento",
    render: (data) => <Typography>{(data?.lastModifiedTimestamp) ? format(new Date(data.lastModifiedTimestamp), "dd-MM-yyyy HH:mm") : "-"}</Typography>
  },
]

export const usageBillingDataPA: RowDataInfo[] = [
  {
    id: "sdiCode",
    label: "Codice SDI",
    render: (data) => <Typography>{(data?.sdiCode) ? data.sdiCode : "-"}</Typography>
  },
  {
    id: "splitPayment",
    label: "Soggetto Split Payment",
    render: (data) => <Typography>{(data?.splitPayment) ? "Si" : "No"}</Typography>
  },
  {
    id: "description",
    label: "Altre informazioni utili ai fini della fatturazione",
    render: (data) => <Typography>{(data?.description) ? data.description : "-"}</Typography>
  },
  {
    id: "mailAddress",
    label: "Indirizzo email amministrativo di riferimento per contatti ",
    render: (data) => <Typography>{(data?.mailAddress) ? data.mailAddress : "-"}</Typography>
  },
]

export const usageEstimationsPA: RowDataInfo[] = [
  {
    id: "totalDigitalNotif",
    label: "Numero notifiche per via digitale",
    render: (data) => <Typography>{data?.totalDigitalNotif}</Typography>
  },{
    id: "totalPaperAR",
    label: "Numero di notifiche per via analogica tramite Raccomandata A/R",
    render: (data) => <Typography>{data?.totalPaperInternationalNotif + data?.totalPaperInternationalNotif}</Typography>
  },{
    id: "totalPaper890Notif",
    label: "Numero di notifiche per via analogica L. 890/19",
    render: (data) => <Typography>{data?.totalPaper890Notif}</Typography>
  },{
    id: "totalDigital",
    label: "Totale notifiche digitali",
    render: (data) => <Typography>{data.a}</Typography>
  }, {
    id: "totalPaper",
    label: "Totale notifiche analogiche",
    render: (data) => <Typography>{data.b}</Typography>
  },{
    id: "totalNotifToWork",
    label: "Totale notifiche da processare",
    render: (data) => <Typography>{data.c}</Typography>
  },
]