import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useRef, useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';
import {
  RichTextEditor,
  MenuControlsContainer,
  MenuButtonBold,
  MenuButtonItalic,
  MenuButtonUnderline,
  MenuDivider,
  MenuButtonBulletedList,
  RichTextEditorRef,
} from 'mui-tiptap';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { FunctionalityName, modalPayloadType } from '../../model';
import apiRequests from '../../api/apiRequests';
import { getEventsType } from '../../api/apiRequestTypes';
import * as spinnerActions from '../../redux/spinnerSlice';

interface MonitorDialogProps {
  modalPayload: modalPayloadType;
  getEvents: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  updateSnackbar: (r: any) => void;
  setModalFunctionalityName: (name: keyof typeof FunctionalityName | undefined) => void;
  modalFunctionalityName: keyof typeof FunctionalityName | undefined;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export function MonitorDialog({
  modalPayload,
  getEvents,
  isModalOpen,
  setIsModalOpen,
  updateSnackbar,
  modalFunctionalityName,
}: MonitorDialogProps) {
  const dispatch = useDispatch();

  const [dateError, setDateError] = useState('');
  const [htmlDescriptionError, setHtmlDescriptionError] = useState('');
  const [checkboxError, setCheckboxError] = useState(false);
  const [modalEventDate, setModalEventDate] = useState<Date | null>(new Date());
  const [modalEventHtmlDescription, setModalEventHtmlDescription] = useState<string | undefined>();
  const [isPreviewShowed, setIsPreviewShowed] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    if (!isModalOpen) {
      setModalEventDate(new Date());
      setModalEventHtmlDescription('');
      setDateError('');
      setHtmlDescriptionError('');
    }
  }, [isModalOpen]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDateError('');
    }
    setModalEventDate(date);
  };

  const handleDescriptionChange = (html?: string) => {
    if (html) {
      setHtmlDescriptionError('');
    }
    setModalEventHtmlDescription(html);
  };
  const handleConfirmCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      setCheckboxError(false);
    }
  };

  const handleClick = () => {
    if (!isPreviewShowed) {
      setIsPreviewShowed(true);
    } else {
      setIsModalOpen(false);
    }
  };
  const functionalityStatus = modalPayload.status;
  const rteRef = useRef<RichTextEditorRef>(null);

  const getCta = () => {
    if (functionalityStatus === 'OK' && isPreviewShowed) {
      return 'Risolvi';
    } else if (functionalityStatus === 'OK' && !isPreviewShowed) {
      return 'Continua';
    } else {
      return 'Inserisci';
    }
  };

  const getTitle = () => {
    const functionalityName = modalFunctionalityName && FunctionalityName[modalFunctionalityName];
    let modalType = '';
    if (isPreviewShowed) {
      modalType = 'Anteprima documento';
    } else {
      modalType = functionalityStatus === 'KO' ? 'Inserisci evento' : 'Risolvi evento';
    }
    return `${modalType} | ${functionalityName}`;
  };

  const events = () => {
    if (!modalEventDate) {
      setDateError('Seleziona una data');
      return;
    }
    if (functionalityStatus === 'OK' && !modalEventHtmlDescription) {
      setHtmlDescriptionError('Inserisci informazioni aggiuntive');
      return;
    }

    // RESOLVE KO - step 1
    if (functionalityStatus === 'OK' && !isPreviewShowed) {
      const params = [
        {
          ...modalPayload,
          timestamp: format(
            new Date(modalEventDate.setSeconds(0, 0)).setMilliseconds(0),
            "yyyy-MM-dd'T'HH:mm:ss.sssXXXXX"
          ),
          htmlDescription: modalEventHtmlDescription,
        },
      ];
      console.log('risoluzione: ', params);
      setIsPreviewShowed(true);
    }

    // RESOLVE KO - step 2
    if (functionalityStatus === 'OK' && isPreviewShowed) {
      if (!isChecked) {
        // todo: remove when preview is developed
        setIsChecked(true);
      }
      const params = [
        {
          ...modalPayload,
          timestamp: format(
            new Date(modalEventDate.setSeconds(0, 0)).setMilliseconds(0),
            "yyyy-MM-dd'T'HH:mm:ss.sssXXXXX"
          ),
          htmlDescription: modalEventHtmlDescription,
          confirmCheck: false,
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
          setIsPreviewShowed(false);
        });
      setIsChecked(false);
    }

    // INSERT KO
    if (functionalityStatus === 'KO') {
      if (!isChecked) {
        setCheckboxError(true);
        return;
      }
      const params = [
        {
          ...modalPayload,
          timestamp: format(
            new Date(modalEventDate.setSeconds(0, 0)).setMilliseconds(0),
            "yyyy-MM-dd'T'HH:mm:ss.sssXXXXX"
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
          setIsModalOpen(false);
        });
      setIsChecked(false);
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">{getTitle()}</DialogTitle>
      {isPreviewShowed === true ? (
        <DialogContent>Preview</DialogContent>
      ) : (
        <DialogContent>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <DialogContentText>
                {functionalityStatus === 'OK' ? 'Risolvi' : 'Inserisci'} un malfunzionamento legato
                all’area di {modalFunctionalityName && FunctionalityName[modalFunctionalityName]}
              </DialogContentText>
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                Data e ora {functionalityStatus === 'OK' ? 'fine' : 'inizio'} dell’evento
              </Typography>
              <DateTimePicker
                disableFuture
                maxDateTime={new Date()}
                label="Data e ora evento"
                value={modalEventDate}
                onChange={(date: Date | null) => handleDateChange(date)}
                renderInput={(params: any) => (
                  <TextField
                    onKeyDown={(e) => e.preventDefault()}
                    {...params}
                    error={dateError ? true : false}
                  />
                )}
              />
            </Grid>
            {functionalityStatus === 'OK' && (
              <>
                <Grid item>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Informazioni aggiuntive
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Inserire casistiche specifiche di malfunzionamento
                  </Typography>
                  <Box
                    sx={{
                      border: htmlDescriptionError ? '1px solid rgba(216, 87, 87, 1)' : 'none',
                      borderRadius: '4px',
                    }}
                  >
                    <RichTextEditor
                      onUpdate={({ editor }) => {
                        const html = editor?.getHTML();
                        handleDescriptionChange(html);
                      }}
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
                      content={modalEventHtmlDescription}
                    />
                  </Box>
                  <FormHelperText error>{htmlDescriptionError}</FormHelperText>
                </Grid>
              </>
            )}
            {functionalityStatus === 'OK' ? (
              <></>
            ) : (
              <Grid item>
                <FormControl error={checkboxError}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={isChecked} onChange={handleConfirmCheckChange} />}
                      label="Sono consapevole che inserire un evento di malfunzionamento 
  richiede una successiva risoluzione, che produce un’attestazione dedicata."
                    />
                  </FormGroup>

                  {checkboxError && (
                    <FormHelperText color="error">Questo campo è obbligatorio</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )}
          </Grid>
          <FormHelperText error>{dateError ? dateError : ''}</FormHelperText>
        </DialogContent>
      )}
      <DialogActions sx={{ justifyContent: 'end', p: '0 24px 20px 0' }}>
        <Button variant="outlined" onClick={handleClick} sx={{ padding: '0 18px' }}>
          {functionalityStatus === 'OK' && isPreviewShowed ? 'Indietro' : 'Annulla'}
        </Button>
        <Button
          variant="contained"
          autoFocus
          onClick={functionalityStatus === 'OK' && !isPreviewShowed ? handleClick : events}
          id="createEvent"
        >
          {getCta()}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
