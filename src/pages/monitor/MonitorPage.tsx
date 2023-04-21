import React, { useCallback, useEffect, useState } from "react";
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
import { DateTimePicker } from "@mui/lab";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  FormHelperText,
  DialogActions,
  Button,
} from "@mui/material";
import { useHasPermissions } from "../../hooks/useHasPermissions";
import { Permission } from "../../model/user-permission";

/**
 * Monitor page
 * @component
 */
const MonitorPage = () => {
  const dispatch = useDispatch();

  const [rows, setRows] = useState<any[]>([]);

  const [backEndStatus, setBackEndStatus] = useState<boolean>(true);

  const [modalStatus, setModalStatus] = useState<boolean>(false);

  const [modalEventDate, setModalEventDate] = useState(new Date());

  const [modalPayload, setModalPaylod] = useState({});

  const [error, setError] = useState("");

  const isUserWriter = useHasPermissions([Permission.LOG_DOWNTIME_WRITE]);

  useEffect(() => {
    if (!modalStatus) {
      setModalEventDate(new Date());
      setError("");
    }
  }, [modalStatus]);

  const handleChange = (value: any) => {
    if (value) {
      setError("");
    }
    setModalEventDate(value);
  };

  const updateSnackbar = useCallback(
    (response: any) => {
      dispatch(snackbarActions.updateSnackbacrOpened(true));
      dispatch(snackbarActions.updateStatusCode(response.status));
      (response.data.detail || response.data.message) &&
        dispatch(
          snackbarActions.updateMessage(
            response.data.detail || response.message
          )
        );
    },
    [dispatch]
  );

  const getEvents = useCallback(() => {
    apiRequests
      .getStatus()
      .then((res) => {
        setBackEndStatus(true);
        (res.detail || res.data.message) && updateSnackbar(res);
        let rows: any[] = [];
        if (res && res.data) {
          if (res.data.functionalities) {
            res.data.functionalities.forEach((item: string) => {
              let incident = res.data.openIncidents.filter(
                (element: any) => element.functionality === item
              );
              let date =
                incident.length === 0 ? "" : new Date(incident[0].startDate);
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
  }, [updateSnackbar]);

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
  }, [dispatch, getEvents]);

  const events = () => {
    if (!modalEventDate) {
      setError("Inserire un valore");
    } else {
      const params = [
        {
          ...modalPayload,
          timestamp: format(
            new Date(modalEventDate.setSeconds(0,0)).setMilliseconds(0),
            "yyyy-MM-dd'T'HH:mm:ss.sss'Z'"
          ),
        },
      ];
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
        })
        .finally(() => {
          setModalStatus(false);
        });
    }
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
          ? format(new Date(params.row.data), "dd-MM-yyyy HH:mm")
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
      hide: !backEndStatus && !isUserWriter,
      getActions: (params: any) => {
        return params.row.state
          ? [
              <GridActionsCellItem
                key={"Inserire KO"}
                label="Inserire KO"
                onClick={() => {
                  setModalPaylod({
                    status: "KO",
                    functionality: Array(params.row.functionalityName),
                    sourceType: "OPERATOR",
                  });
                  setModalStatus(true);
                }}
                showInMenu
              />,
            ]
          : [
              <GridActionsCellItem
                key="Inserire OK"
                label="Inserire OK"
                onClick={() => {
                  setModalPaylod({
                    status: "OK",
                    functionality: Array(params.row.functionalityName),
                    sourceType: "OPERATOR",
                  });
                  setModalStatus(true);
                }}
                showInMenu
              />,
            ];
      },
    },
  ];

  return (
    <MainLayout>
      <DataGridComponent columns={columns} rows={rows} />
      <Dialog
        open={modalStatus}
        onClose={() => setModalStatus(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Nuovo evento</DialogTitle>
        <DialogContent>
          <Grid container columnSpacing={2} sx={{ pt: 2 }}>
            <Grid item>
              <DateTimePicker
                disableFuture
                maxTime={new Date()}
                label="Data e ora evento"
                value={modalEventDate}
                onChange={(e) => handleChange(e)}
                renderInput={(params) => (
                  <TextField
                    onKeyDown={(e) => e.preventDefault()}
                    {...params}
                    error={error ? true : false}
                  />
                )}
              />
            </Grid>
          </Grid>
          <FormHelperText error>{error ? error : " "}</FormHelperText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button
            onClick={() => setModalStatus(false)}
            sx={{ padding: "0 18px" }}
          >
            Annulla
          </Button>
          <Button autoFocus onClick={events}>
            Inserisci
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
};
export default MonitorPage;
