import React, { useEffect, useState } from "react";
import DataGridComponent from "../../components/dataGrid/DataGridComponent";
import MainLayout from "../mainLayout/MainLayout";
import apiRequests from "../../api/apiRequests";
import { useDispatch } from "react-redux";
import * as spinnerActions from "../../redux/spinnerSlice";
import { GridActionsCellItem } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  errorMessages,
  functionalitiesNames,
} from "../../helpers/messagesConstants";
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
    dispatch(spinnerActions.updateSpinnerOpened(true));
    getEvents();
    dispatch(spinnerActions.updateSpinnerOpened(false));
    return () => {
      clearInterval(idTokenInterval);
    };
  }, [dispatch]);

  const updateSnackbar = (response: any) => {
    dispatch(snackbarActions.updateSnackbacrOpened(true));
    dispatch(snackbarActions.updateStatusCode(response.status));
    response.data.message &&
      dispatch(snackbarActions.updateMessage(response.data.message));
  };

  const getEvents = () => {
    apiRequests
      .getStatus()
      .then((res) => {
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
                functionalityName: item,
              };
              rows.push(row);
            });
            setRows(rows);
          }
        }
      })
      .catch(() => {
        setBackEndStatus(false);
        let functionality: string[] = [
          "NOTIFICATION_CREATE",
          "NOTIFICATION_VISUALIZATION",
          "NOTIFICATION_WORKFLOW",
        ];
        let rows: any[] = [];
        functionality.forEach((item: string) => {
          let row = {
            id: functionality.indexOf(item) + 1,
            functionality: functionalitiesNames[item],
            data: "",
          };
          rows.push(row);
        });
        setRows(rows);
        updateSnackbar({
          status: 500,
          data: {
            message: errorMessages.BACKEND_DOWN_MESSAGE,
          },
        });
      });
  };

  const events = (params: any) => {
    apiRequests
      .getEvents(params as getEventsType)
      .then((res: any) => {
        dispatch(spinnerActions.updateSpinnerOpened(true));
        getEvents();
        dispatch(spinnerActions.updateSpinnerOpened(false));
        updateSnackbar(res);
      })
      .catch((error: any) => {
        dispatch(spinnerActions.updateSpinnerOpened(false));
        updateSnackbar(error.response);
      });
  };

  const columns = [
    {
      field: "functionality",
      headerName: "Funzionalità",
      width: 200,
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "state",
      headerName: "Stato",
      type: "actions",
      width: 400,
      renderCell: (params: any) => {
        return params.row.state ? (
          <CheckCircleIcon color="success" />
        ) : (
          <CancelIcon color={backEndStatus ? "error" : "disabled"} />
        );
      },
      flex: 1,
      minWidth: 100,
    },
    {
      field: "data",
      headerName: "Data di creazione",
      type: "date",
      width: 400,
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
      hide: !backEndStatus,
      renderCell: (params: any) => {
        return params.row.data
          ? format(
              new Date(params.row.data.substring(0, 16)),
              "dd-MM-yyyy HH:mm"
            )
          : "";
      },
    },
    {
      field: "actions",
      headerName: "Cambio Stato",
      width: 200,
      type: "actions",
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
      hide: !backEndStatus,
      getActions: (params: any) => {
        return params.row.state
          ? [
              <GridActionsCellItem
                label="Inserire KO"
                onClick={() => {
                  const payload = [
                    {
                      status: "KO",
                      timestamp: format(
                        new Date(),
                        "yyyy-MM-dd'T'HH:mm:ss.sss'Z'"
                      ),
                      functionality: Array(params.row.functionalityName),
                      sourceType: "OPERATOR",
                    },
                  ];
                  events(payload);
                }}
                showInMenu
              />,
            ]
          : [
              <GridActionsCellItem
                label="Inserire OK"
                onClick={() => {
                  const payload = [
                    {
                      status: "OK",
                      timestamp: format(
                        new Date(),
                        "yyyy-MM-dd'T'HH:mm:ss.sss'Z'"
                      ),
                      functionality: Array(params.row.functionalityName),
                      sourceType: "OPERATOR",
                    },
                  ];
                  events(payload);
                }}
                showInMenu
              />,
            ];
      },
    },
  ];

  return (
    <MainLayout email={email}>
      <DataGridComponent columns={columns} rows={rows} />
    </MainLayout>
  );
};
export default MonitorPage;
