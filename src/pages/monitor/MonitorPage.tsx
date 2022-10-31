import React, { useEffect, useState } from "react";
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
import { getEventsType } from "../../api/apiRequestTypes";
import * as snackbarActions from "../../redux/snackbarSlice";

/**
 * Monitor page
 * @component
 */
const MonitorPage = ({ email }: any) => {

  const dispatch = useDispatch();

  const [rows, setRows] = useState<any[]>([]);

  const [backEndStatus, setBackEndStatus] = useState<boolean>(true);

  useEffect(() => {
    const idTokenInterval = setInterval(async () => {
      getEvents();
    }, 60000);
    getEvents();
    return () => {
      clearInterval(idTokenInterval);
    };
  }, [dispatch]);

  const updateSnackbar = (response: any) => {
    dispatch(snackbarActions.updateSnackbacrOpened(true))
    dispatch(snackbarActions.updateStatusCode(response.status))
    response.data.message && dispatch(snackbarActions.updateMessage(response.data.message))
  }

  const getEvents = () => {
    dispatch(spinnerActions.updateSpinnerOpened(true));
    apiRequests.getStatus().then((res) => {
      setBackEndStatus(true);
      let rows: any[] = [];
      if (res && res.data) {
        if (res.data.functionalities) {
          res.data.functionalities.forEach((item: string) => {
            let incident = res.data.openIncidents.filter(
              (element: any) => element.functionality === item
            );
            let date = incident.length === 0 ? "" : incident[0].startDate;
            console.log(incident);
            let row = {
              id: res.data.functionalities.indexOf(item) + 1,
              functionality: functionalitiesNames[item],
              data: date,
              state: incident.length === 0,
              functionalityName: item
            };
            rows.push(row);
          });
          setRows(rows);
        }
      }
      dispatch(spinnerActions.updateSpinnerOpened(false));
    }).catch(() => {
      setBackEndStatus(false);
      let functionality: string[] = ['NOTIFICATION_CREATE', 'NOTIFICATION_VISUALIZATION', 'NOTIFICATION_WORKFLOW'];
      let rows: any[] = [];
      functionality.forEach((item: string) => {
        let row = {
          id: functionality.indexOf(item) + 1,
          functionality: functionalitiesNames[item],
          data: ""
        };
        rows.push(row);
      });
      setRows(rows);
      dispatch(spinnerActions.updateSpinnerOpened(false));
    }
    );
  };

  const getCurrentDate = (() => {
    var currentdate = new Date();
    var datetime = "" + currentdate.getFullYear() + "-"
      + (currentdate.getMonth() + 1) + "-"
      + currentdate.getDate() + "T"
      + (currentdate.getHours() < 10 ? "0" + currentdate.getHours() : currentdate.getHours()) + ":"
      + (currentdate.getMinutes() < 10 ? "0" + currentdate.getMinutes() : currentdate.getMinutes()) + ":"
      + (currentdate.getSeconds() < 10 ? "0" + currentdate.getSeconds() : currentdate.getSeconds()) + "."
      + "001Z";
    return datetime;
  })

  const events = ((params: any) => {
    apiRequests.getEvents(
      params as getEventsType
    ).then((res: any) => {
        getEvents() 
        updateSnackbar(res)
      })
      .catch((error: any) => {
        dispatch(spinnerActions.updateSpinnerOpened(false));
        updateSnackbar(error.response)
      });
  });

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
        return params.row.state ? <CheckCircleIcon color="success" /> : <CancelIcon color={backEndStatus ? "error" : "disabled"} />
      }),
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'data',
      headerName: 'Data di creazione',
      type: 'date',
      width: 400,
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
      hide: !backEndStatus,
      renderCell: ((params: any) => {
        return params.row.data
          ? format(new Date(params.row.data.slice(0, -5)), "dd-MM-yyyy HH:mm")
          : "";
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
      hide: !backEndStatus,
      getActions: ((params: any) => {
        return params.row.state ? [<GridActionsCellItem
          label="Inserire KO"
          onClick={() => {
            const payload = [{
              status: 'KO',
              timestamp: getCurrentDate(),
              functionality: Array(params.row.functionalityName),
              sourceType: 'OPERATOR'
            }]
            events(payload)
          }}
          showInMenu
        />] : [<GridActionsCellItem
          label="Inserire OK"
          onClick={() => {
            const payload = [{
              status: 'OK',
              timestamp: getCurrentDate(),
              functionality: Array(params.row.functionalityName),
              sourceType: 'OPERATOR'
            }]
            events(payload)
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
