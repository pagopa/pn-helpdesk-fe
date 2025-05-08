import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { format } from 'date-fns';
import { DateTimePicker } from '@mui/x-date-pickers';
import StarterKit from '@tiptap/starter-kit';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  FormHelperText,
  DialogActions,
  Button,
  Typography,
  DialogContentText,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import {
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  RichTextEditor,
  MenuButtonUnderline,
  RichTextEditorRef,
} from 'mui-tiptap';
import Underline from '@tiptap/extension-underline';
import { GridColumns } from '@mui/x-data-grid';
import DataGridComponent from '../../components/dataGrid/DataGridComponent';
import MainLayout from '../mainLayout/MainLayout';
import apiRequests from '../../api/apiRequests';
import * as spinnerActions from '../../redux/spinnerSlice';
import { errorMessages, functionalitiesNames } from '../../helpers/messagesConstants';
import { getEventsType } from '../../api/apiRequestTypes';
import * as snackbarActions from '../../redux/snackbarSlice';
import { useHasPermissions } from '../../hooks/useHasPermissions';
import { Permission } from '../../model/user-permission';

/**
 * Monitor page
 * @component
 */
const MonitorPage = () => {
  const dispatch = useDispatch();
  const rteRef = useRef<RichTextEditorRef>(null);

  const [rows, setRows] = useState<Array<any>>([]);
  const [backEndStatus, setBackEndStatus] = useState<boolean>(true);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalEventDate, setModalEventDate] = useState(new Date());
  const [modalFunctionalityName, setModalFunctionalityName] = useState<
    keyof typeof FunctionalityName | undefined
  >();
  const [modalDescription] = useState<string | undefined>();

  type modalPayloadType = {
    status: string;
    functionality: Array<string>;
    sourceType: string;
  };

  const [modalPayload, setModalPayload] = useState<modalPayloadType>({
    status: '',
    functionality: [],
    sourceType: '',
  });

  const [error, setError] = useState('');

  const isUserWriter = useHasPermissions([Permission.LOG_DOWNTIME_WRITE]);

  enum FunctionalityName {
    'NOTIFICATION_CREATE' = 'Creazione Notifiche',
    'NOTIFICATION_VISUALIZATION' = 'Visualizzazione notifiche',
    'NOTIFICATION_WORKFLOW' = 'Workflow Notifiche',
  }

  useEffect(() => {
    if (!isModalOpen) {
      setModalEventDate(new Date());
      setError('');
    }
  }, [isModalOpen]);

  const handleChange = (value: any) => {
    if (value) {
      setError('');
    }
    setModalEventDate(value);
    // setModalDescription(rteRef.current?.editor?.getHTML());
  };

  const updateSnackbar = useCallback(
    (response: any) => {
      dispatch(snackbarActions.updateSnackbacrOpened(true));
      dispatch(snackbarActions.updateStatusCode(response.status));
      (response.data.detail || response.data.message) &&
        dispatch(snackbarActions.updateMessage(response.data.detail || response.message));
    },
    [dispatch]
  );

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

  const events = () => {
    if (!modalEventDate) {
      setError('Seleziona una data');
    } else if (!modalDescription) {
      setError('Inserisci un valore');
    } else {
      const params = [
        {
          ...modalPayload,
          timestamp: format(
            new Date(modalEventDate.setSeconds(0, 0)).setMilliseconds(0),
            "yyyy-MM-dd'T'HH:mm:ss.sssXXXXX"
          ),
          description: modalDescription,
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
          setIsModalOpen(false);
        });
    }
  };

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
      type: 'status',
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
      type: 'actions',
      flex: 1,
      minWidth: 132,
      sortable: false,
      disableColumnMenu: true,
      hide: !backEndStatus && !isUserWriter,
      renderCell: (params: any) =>
        params.row.state ? (
          <Button
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
              setIsModalOpen(true);
              setModalFunctionalityName(Array(params.row.functionalityName)[0]);
            }}
          >
            Inserisci KO
          </Button>
        ) : (
          <Button
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
              setIsModalOpen(true);
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
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {modalPayload.status === 'OK' ? 'Risolvi' : 'Inserisci'} evento |{' '}
          {modalFunctionalityName && FunctionalityName[modalFunctionalityName]}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <DialogContentText>
                {modalPayload.status === 'OK' ? 'Risolvi' : 'Inserisci'} un malfunzionamento legato
                all’area di {modalFunctionalityName && FunctionalityName[modalFunctionalityName]}
              </DialogContentText>
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                Data e ora {modalPayload.status === 'OK' ? 'fine' : 'inizio'} dell’evento
              </Typography>
              <DateTimePicker
                disableFuture
                maxDateTime={new Date()}
                label="Data e ora evento"
                value={modalEventDate}
                onChange={(date) => handleChange(date)}
                renderInput={(params: any) => (
                  <TextField
                    onKeyDown={(e) => e.preventDefault()}
                    {...params}
                    error={error ? true : false}
                  />
                )}
              />
            </Grid>
            {modalPayload.status === 'OK' && (
              <>
                <Grid item>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Informazioni aggiuntive
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Inserire casistiche specifiche di malfunzionamento
                  </Typography>
                  <RichTextEditor
                    ref={rteRef}
                    extensions={[StarterKit, Underline]}
                    renderControls={() => (
                      <MenuControlsContainer>
                        <MenuButtonBold />
                        <MenuButtonItalic />
                        <MenuButtonUnderline />
                        <MenuDivider />
                        <MenuButtonBulletedList />
                      </MenuControlsContainer>
                    )}
                    content={modalDescription}
                  />
                </Grid>
              </>
            )}
            {modalPayload.status === 'OK' ? (
              <></>
            ) : (
              <Grid item>
                <FormGroup>
                  <FormControlLabel
                    required
                    control={<Checkbox />}
                    label="Sono consapevole che inserire un evento di malfunzionamento 
  richiede una successiva risoluzione, che produce un’attestazione dedicata."
                  />
                </FormGroup>
              </Grid>
            )}
          </Grid>
          <FormHelperText error>{error ? error : ' '}</FormHelperText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Button onClick={() => setIsModalOpen(false)} sx={{ padding: '0 18px' }}>
            Annulla
          </Button>
          <Button autoFocus onClick={events} id="buttonInserisciDisservizio">
            {modalPayload.status === 'OK' ? 'Risolvi' : 'Inserisci'}
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
};
export default MonitorPage;
