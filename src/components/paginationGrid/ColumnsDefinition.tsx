import {ModelType} from "./index";
import {format} from "date-fns";
import React from "react";
import {GridColDef} from "@mui/x-data-grid";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import {ButtonsActionTenderTable} from "../buttonsGroup/ButtonsActionTenderTable";
import {ButtonsActionCostTable} from "../buttonsGroup/ButtonsActionCostTable";
import {CostDTO} from "../../api/paperChannel";
import {ButtonsActionDriverTable, ButtonShowCosts} from "../buttonsGroup/ButtonsActionDriverTable";
import {TenderStatusChip} from "../deliveriesDrivers/TenderStatusChip";
import {EstimateStatusEnum, StatusReportEnum, Tender} from "../../model";
import {EstimateStatusChip} from "../usageEstimates/EstimateStatus";
import {ReportStatusChip} from "../usageEstimates/ReportStatus";
import {ButtonLogReport} from "../usageEstimates/ButtonLogReport";
import {ButtonScheduleReport} from "../usageEstimates/ButtonScheduleReport";
import {ButtonDownloadReport} from "../usageEstimates/ButtonDownloadReport";

const columnsTender: GridColDef[] = [
  {
    field: "name",
    headerName: "Identificativo",
    width: 200,
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "startDate",
    headerName: "Data inizio",
    type: "date",
    width: 400,
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: any) => {
      return params.row.startDate
        ? format(new Date(params.row.startDate), "dd-MM-yyyy HH:mm")
        : "";
    },
  },
  {
    field: "endDate",
    headerName: "Data fine",
    type: "date",
    width: 400,
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: any) => {
      return params.row.endDate
        ? format(new Date(params.row.endDate), "dd-MM-yyyy HH:mm")
        : "";
    },
  },
  {
    field: "status",
    headerName: "Stato",
    type: "string",
    width: 400,
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: any) => {
      return <TenderStatusChip data={params.row as Tender}/>
    },
  },
  {
    field: "actions",
    headerName: "Azioni",
    type: "string",
    width: 400,
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: any) => {
      return <ButtonsActionTenderTable value={params.row}/>
    },
  },
]

const columnsDeliveryDriver: (withActions:boolean) => GridColDef[] = (withActions) => {
  const columns = [
    {
      field: "uniqueCode",
      headerName: "Codice Univoco",
      type: "string",
      width: 400,
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "businessName",
      headerName: "Ragione sociale",
      width: 200,
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "taxId",
      headerName: "Partita iva",
      type: "string",
      width: 400,
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "fsu",
      headerName: "FSU",
      type: "string",
      width: 400,
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        return (params.row.fsu) ? <CheckIcon/> : <ClearIcon/>
      },
    },
    {
      field: "cap/zone",
      headerName: "CAP/ZONE",
      type: "string",
      width: 400,
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        return <ButtonShowCosts value={params.row}/>
      },
    },
    {
      field: "action",
      headerName: "Azioni",
      type: "string",
      width: 100,
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        return <ButtonsActionDriverTable value={params.row}/>
      },
    },

  ]
  if (!withActions) {
    columns.pop()
  }
  return columns
}



const emptyColumn: GridColDef[]= []

const columnsCost : (withActions:boolean) =>  GridColDef[] = (withActions) => {
  const columns:GridColDef[]= [
    {
      field: "type",
      headerName: "Cap/Zona",
      width: 200,
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        if ( params.row?.cap){
          return params.row.cap?.join(",");
        }else{
          return params.row.zone
        }
      }
    },
    {
      field: "productType",
      headerName: "Prodotto",
      width: 400,
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        if (params.row?.internationalProductType) return params.row.internationalProductType
        if (params.row?.nationalProductType) return params.row.nationalProductType
        return null
      },
    },
    {
      field: "price",
      headerName: "Costo",
      width: 400,
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        return params.row?.price
      },
    },
    {
      field: "priceAdditional",
      headerName: "Costo aggiuntivo",
      width: 400,
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        return params.row?.priceAdditional
      },
    },
    {
      field: "actions",
      headerName: "Azioni",
      width: 400,
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        return <ButtonsActionCostTable value={params.row as CostDTO} />
      },
    },
  ]
  if (!withActions) {
    columns.pop()
  }
  return columns
}


const columnsEstimates: GridColDef[] = [
  {
    field: "referenceMonth",
    headerName: "Mese di riferimento",
    width: 200,
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "deadlineDate",
    headerName: "Data di scadenza",
    type: "date",
    width: 200,
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: any) => {
      return params.row.deadlineDate
        ? format(new Date(params.row.deadlineDate), "dd-MM-yyyy HH:mm")
        : "";
    },
  },
  {
    field: "status",
    headerName: "Stato",
    type: "string",
    width: 400,
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: any) => {
      return <EstimateStatusChip data={params.row.status}/>
    },
  },
  {
    field: "sendedToPDND",
    headerName: "Inviato a PDND",
    type: "string",
    width: 400,
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: any) => {
      return (params.row.status === EstimateStatusEnum.VALIDATED) && <CheckIcon/>
    },
  },
]

const columnsReport: GridColDef[] = [
  {
    field: "referenceMonth",
    headerName: "Mese di riferimento",
    width: 200,
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "generationDate",
    headerName: "Data generazione",
    type: "date",
    width: 200,
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: any) => {
      return params.row.generationDate
        ? format(new Date(params.row.generationDate), "dd-MM-yyyy HH:mm")
        : "";
    },
  },
  {
    field: "reportKey",
    headerName: "Report sorgente",
    width: 100,
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: any) => {
      return <ButtonDownloadReport report={params.row} type={"SOURCE"}/>
    },
  },
  {
    field: "status",
    headerName: "Stato",
    type: "string",
    width: 400,
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: any) => {
      return <ReportStatusChip data={params.row.status}/>
    },
  },
  {
    field: "reportZipKey",
    headerName: "File deanonimizzato",
    width: 100,
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: any) => {
      return <ButtonDownloadReport report={params.row} type={"TARGET"}/>
    },
  },
  {
    field: "errorMessage",
    headerName: "Log",
    type: "string",
    width: 100,
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: any) => {
      return params.row.errorMessage && <ButtonLogReport report={params.row}/>
    },
  },
  {
    field: "actions",
    headerName: "Azioni",
    type: "string",
    width: 100,
    flex: 1,
    minWidth: 100,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: any) => {
      return params.row.status === StatusReportEnum.ERROR && <ButtonScheduleReport report={params.row}/>
    },
  },
]


const getColumn = (type:ModelType) => {
    switch (type) {
      case ModelType.TENDER:
        return columnsTender;
      case ModelType.DELIVERY_DRIVER:
        return columnsDeliveryDriver(false);
      case ModelType.DELIVERY_DRIVER_WITH_ACTIONS:
        return columnsDeliveryDriver(true);
      case ModelType.COST:
        return columnsCost(false);
      case ModelType.COST_WITH_ACTIONS:
        return columnsCost(true);
      case ModelType.USAGE_ESTIMATES:
        return columnsEstimates;
      case ModelType.REPORTS_ESTIMATE:
        return columnsReport;
      default:
        return emptyColumn
    }
}

export {
  getColumn
}
