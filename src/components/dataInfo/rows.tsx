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
    render: (data) => <Typography>{(data?.name) ? data.name : "-"}</Typography>
  },
  {
    id: "businessName",
    label: "Sede legale",
    render: (data) => <Typography>{(data?.businessName) ? data.businessName : "-"}</Typography>
  },
  {
    id: "taxId",
    label: "Partita IVA",
    render: (data) => <Typography>{(data?.taxId) ? data.taxId : "-"}</Typography>
  },

  {
    id: "ipaCode",
    label: "Codice IPA",
    render: (data) => <Typography>{(data?.ipaCode) ? data.ipaCode : "-"}</Typography>
  },
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
    id: "otherInfo",
    label: "Altre informazioni utili ai fini della fatturazione",
    render: (data) => <Typography>{(data?.otherInfo) ? data.otherInfo : "-"}</Typography>
  },
  {
    id: "pec",
    label: "PEC",
    render: (data) => <Typography>{(data?.pec) ? data.pec : "-"}</Typography>
  },
  {
    id: "otherMail",
    label: "Indirizzo email amministrativo di riferimento per contatti ",
    render: (data) => <Typography>{(data?.otherMail) ? data.otherMail : "-"}</Typography>
  },
]

export const usagePeriod: RowDataInfo[] = [
  {
    id: "paName",
    label: "Nome PA",
    render: (data) => <Typography>{data?.name}</Typography>
  },{
    id: "reference",
    label: "Periodo di riferimento",
    render: (data) => <Typography>{data?.period}</Typography>
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
    render: (data) => <Typography>{(data?.insertDate) ? format(new Date(data.insertDate), "dd-MM-yyyy HH:mm") : "-"}</Typography>
  },
]

export const usageEstimations: RowDataInfo[] = [
  {
    id: "totalDigitalNotif",
    label: "Numero notifiche per via digitale",
    render: (data) => <Typography>{data?.name}</Typography>
  },{
    id: "name",
    label: "Numero di notifiche per via analogica tramite Raccomandata A/R",
    render: (data) => <Typography>{data?.period}</Typography>
  },{
    id: "name",
    label: "Numero di notifiche per via analogica L. 890/19",
    render: (data) =><Typography>{(data?.expiredDate) ? format(new Date(data.expiredDate), "dd-MM-yyyy HH:mm") : "-"}</Typography>
  },{
    id: "name",
    label: "Totale notifiche digitali",
    render: (data) => <Typography>{data.num}</Typography>
  },{
    id: "name",
    label: "Totale notifiche analogiche per territorio nazionale",
    render: (data) => <Typography>{data.num}</Typography>
  },{
    id: "name",
    label: "Totale notifiche analogiche per territorio diverso da nazionale",
    render: (data) => <Typography>{data.num}</Typography>
  },{
    id: "name",
    label: "Totale notifiche da processare",
    render: (data) => <Typography>{data.num}</Typography>
  },
]