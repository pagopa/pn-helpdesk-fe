import {ModelType} from "./index";
import {format} from "date-fns";
import {Chip} from "@mui/material";
import React from "react";
import {GridColDef} from "@mui/x-data-grid";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import {ButtonsActionTenderTable} from "../buttonsGroup/ButtonsActionTenderTable";
import {ButtonsActionCostTable} from "../buttonsGroup/ButtonsActionCostTable";
import {CostDTO} from "../../generated";


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
      return <Chip label={params.row.status} />
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

const columnsDeliveryDriver: GridColDef[] = [
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

]

const emptyColumn: GridColDef[]= []

const columnsCost: GridColDef[] = [
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


const getColumn = (type:ModelType) => {
    switch (type) {
      case ModelType.TENDER:
        return columnsTender;
      case ModelType.DELIVERY_DRIVER:
        return columnsDeliveryDriver;
      case ModelType.COST:
        return columnsCost;
      default:
        return emptyColumn
    }
}

export {
  getColumn
}
