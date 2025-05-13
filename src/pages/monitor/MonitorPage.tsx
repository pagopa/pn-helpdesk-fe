import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { format } from 'date-fns';

import { Button, Typography } from '@mui/material';
import { GridColumns } from '@mui/x-data-grid';
import DataGridComponent from '../../components/dataGrid/DataGridComponent';
import MainLayout from '../mainLayout/MainLayout';
import apiRequests from '../../api/apiRequests';
import * as spinnerActions from '../../redux/spinnerSlice';
import { errorMessages, functionalitiesNames } from '../../helpers/messagesConstants';
import * as snackbarActions from '../../redux/snackbarSlice';
import { useHasPermissions } from '../../hooks/useHasPermissions';
import { Permission } from '../../model/user-permission';
import { FunctionalityName, modalPayloadType } from '../../model';
import { CreateMalfunctionDialog } from '../../components/dialogs/CreateMulfunctionDialog';
import { ResolveMalfunctionDialog } from '../../components/dialogs/ResolveMulfunctionDialog';

/**
 * Monitor page
 * @component
 */
const MonitorPage = () => {
  const dispatch = useDispatch();

  const [rows, setRows] = useState<Array<any>>([]);
  const [backEndStatus, setBackEndStatus] = useState<boolean>(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isResolveModalOpen, setIsResolveModalOpen] = useState<boolean>(false);
  const [modalFunctionalityName, setModalFunctionalityName] = useState<
    keyof typeof FunctionalityName | undefined
  >();
  const [modalPayload, setModalPayload] = useState<modalPayloadType>({
    status: '',
    functionality: [],
    sourceType: '',
  });

  const isUserWriter = useHasPermissions([Permission.LOG_DOWNTIME_WRITE]);

  const updateSnackbar = useCallback(
    (response: any) => {
      dispatch(snackbarActions.updateSnackbacrOpened(true));
      dispatch(snackbarActions.updateStatusCode(response.status));
      (response.data.detail || response.data.message) &&
        dispatch(snackbarActions.updateMessage(response.data.detail || response.message));
    },
    [dispatch]
  );

  // function to create event
  const getEvents = useCallback(() => {
    apiRequests
      .getStatus()
      .then((res) => {
        setBackEndStatus(true);
        (res.detail || res.data.message) && updateSnackbar(res);
        const rows: Array<any> = [];
        if (res && res.data && res.data.functionalities) {
          res.data.functionalities.forEach((item: string) => {
            const incident = res.data.openIncidents.filter(
              (element: any) => element.functionality === item
            );
            const date = incident.length === 0 ? '' : new Date(incident[0].startDate);
            const row = {
              id: Number(res.data.functionalities.indexOf(item)) + 1,
              functionality: functionalitiesNames[item],
              data: date,
              state: incident.length === 0,
              functionalityName: item,
            };
            rows.push(row);
          });
          setRows(rows);
        }
      })
      .catch(() => {
        setBackEndStatus(false);
        const functionality = [
          'NOTIFICATION_CREATE',
          'NOTIFICATION_VISUALIZATION',
          'NOTIFICATION_WORKFLOW',
        ];
        const rows: Array<any> = [];
        functionality.forEach((item: string) => {
          const row = {
            id: functionality.indexOf(item) + 1,
            functionality: functionalitiesNames[item],
            data: '',
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

  const columns: GridColumns = [
    {
      field: 'functionality',
      headerName: 'Funzionalità',
      width: 200,
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (param: any) => (
        <Typography id={`${param.row.functionality}-${param.id}`}>
          {param.row.functionality}
        </Typography>
      ),
    },
    {
      field: 'state',
      headerName: 'Stato',
      width: 400,
      renderCell: (param: any) =>
        param.row.state ? (
          <CheckCircleIcon id={`state-${param.id}`} color="success" />
        ) : (
          <CancelIcon id={`state-${param.id}`} color={backEndStatus ? 'error' : 'disabled'} />
        ),
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
      renderCell: (param: any) =>
        param.row.data ? (
          <Typography id={`${param.row.data}-${param.id}`}>
            {format(new Date(param.row.data), 'dd-MM-yyyy HH:mm')}
          </Typography>
        ) : (
          <Typography id={`empty-${param.id}`}>{''}</Typography>
        ),
    },
    {
      field: 'actions',
      headerName: 'Cambio Stato',
      width: 200,
      flex: 1,
      minWidth: 132,
      sortable: false,
      disableColumnMenu: true,
      hide: !backEndStatus && !isUserWriter,
      renderCell: (params: any) =>
        params.row.state ? (
          <Button
            size="small"
            id="KO-insert"
            key="Inserire KO"
            variant="outlined"
            color="primary"
            sx={{ minWidth: '132px' }}
            onClick={() => {
              setModalPayload({
                status: 'KO',
                functionality: Array(params.row.functionalityName)[0],
                sourceType: 'OPERATOR',
              });
              setIsCreateModalOpen(true);
              setModalFunctionalityName(Array(params.row.functionalityName)[0]);
            }}
          >
            Inserisci KO
          </Button>
        ) : (
          <Button
            size="small"
            id="KO-resolve"
            key="Risolvi OK"
            variant="contained"
            color="primary"
            sx={{ minWidth: '132px' }}
            onClick={() => {
              setModalPayload({
                status: 'OK',
                functionality: Array(params.row.functionalityName),
                sourceType: 'OPERATOR',
              });
              setIsResolveModalOpen(true);
              setModalFunctionalityName(Array(params.row.functionalityName)[0]);
            }}
          >
            Risolvi KO
          </Button>
        ),
    },
  ];

  return (
    <MainLayout>
      <DataGridComponent columns={columns} rows={rows} />
      <CreateMalfunctionDialog
        getEvents={getEvents}
        modalPayload={modalPayload}
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        modalFunctionalityName={modalFunctionalityName}
        setModalFunctionalityName={setModalFunctionalityName}
        updateSnackbar={updateSnackbar}
      />
      <ResolveMalfunctionDialog
        getEvents={getEvents}
        modalPayload={modalPayload}
        isModalOpen={isResolveModalOpen}
        setIsModalOpen={setIsResolveModalOpen}
        modalFunctionalityName={modalFunctionalityName}
        setModalFunctionalityName={setModalFunctionalityName}
        updateSnackbar={updateSnackbar}
      />
    </MainLayout>
  );
};
export default MonitorPage;
