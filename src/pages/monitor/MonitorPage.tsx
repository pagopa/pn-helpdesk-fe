import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataGridComponent from '../../components/dataGrid/DataGridComponent';
import MainLayout from "../mainLayout/MainLayout";
import apiRequests from "../../api/apiRequests";
import { useDispatch } from 'react-redux';
import * as spinnerActions from "../../redux/spinnerSlice";
import { GridActionsCellItem } from "@mui/x-data-grid";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { functionalitiesNames } from "../../helpers/messagesConstants"
import { format } from "date-fns";

/**
 * Monitor page
 * @component
 */
const MonitorPage = ({ email }: any) => {

  const dispatch = useDispatch();

  const [rows, setRows] = useState(Array());


  useEffect(() => {
    dispatch(spinnerActions.updateSpinnerOpened(true));
    apiRequests.getStatus().then(res => {
      let rows = Array();
      if (res && res.data) {
        if (res.data.functionalities) {
          res.data.functionalities.forEach((item: string) => {
            let incident = res.data.openIncidents.filter((element: any) => element.functionality === item)
            let date = incident.length == 0 ? "" : incident[0].startDate;
            console.log(incident)
            let row = { id: res.data.functionalities.indexOf(item) + 1, functionality: functionalitiesNames[item], data: date, state: incident.length == 0 }
            rows.push(row);
          })
          setRows(rows);
          console.log(rows)
        }
      }
      dispatch(spinnerActions.updateSpinnerOpened(false));
    });

  }, [])

  const columns = [
    {
      field: 'functionality',
      headerName: 'Funzionalità',
      width: 200,
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'state',
      headerName: 'Stato',
      type: 'actions',
      width: 400,
      renderCell: ((params: any) => {
        return params.row.state ? <CheckCircleIcon color="success"/> : <CancelIcon color="error"/>
      }),
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'data',
      headerName: 'Data di creazione',
      type: 'string',
      width: 400,
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ((params: any) => {
        return params.row.data ? format(params.row.data, 'YYYY-MM-DD HH:MM:SS') : ""
      })
    },
    {
      field: 'actions',
      headerName: 'Cambio Stato',
      width: 200,
      type: 'actions',
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
      getActions: ((params: any) => {
       return params.row.state ? [<GridActionsCellItem
          // icon={<SecurityIcon />}
          label="Inserire KO"
          onClick={() => {
            console.log("ciao")
          }}
          showInMenu
        />] : [<GridActionsCellItem
          // icon={<FileCopyIcon />}
          label="Inserire OK"
          onClick={() => {
            console.log("ciao")
          }}
          showInMenu
        />]
        
        }),
    },
  ];

  return (
    <MainLayout email={email}>
      <DataGridComponent columns={columns} rows={rows} />
    </MainLayout>
  );
}
export default MonitorPage;
