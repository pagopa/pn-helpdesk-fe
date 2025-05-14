import {
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
import { useEffect, useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';

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
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export function CreateMalfunctionDialog({
  modalPayload,
  getEvents,
  isModalOpen,
  setIsModalOpen,
  updateSnackbar,
}: MonitorDialogProps) {
  const dispatch = useDispatch();
  console.log(modalPayload);
  const [dateError, setDateError] = useState('');
  const [checkboxError, setCheckboxError] = useState(false);
  const [modalEventDate, setModalEventDate] = useState<Date | null>(new Date());
  const [isChecked, setIsChecked] = useState(false);

  const functionalityName =
    FunctionalityName[modalPayload.functionality[0] as unknown as keyof typeof FunctionalityName];

  useEffect(() => {
    if (!isModalOpen) {
      setModalEventDate(new Date());
      setDateError('');
    }
  }, [isModalOpen]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDateError('');
    }
    setModalEventDate(date);
  };

  const handleConfirmCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      setCheckboxError(false);
    }
  };

  const handleClick = () => {
    setIsModalOpen(false);
  };

  const events = () => {
    if (!modalEventDate) {
      setDateError('Seleziona una data');
      return;
    }

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
        setIsChecked(false);
      });
  };

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">Inserisci evento | {functionalityName}</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <DialogContentText>
              Inserisci un malfunzionamento legato all’area di {functionalityName}
            </DialogContentText>
          </Grid>
          <Grid item>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
              Data e ora inizio dell’evento
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
        </Grid>
        <FormHelperText error>{dateError ? dateError : ''}</FormHelperText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'end', p: '0 24px 20px 0' }}>
        <Button variant="outlined" onClick={handleClick} sx={{ padding: '0 18px' }}>
          Annulla
        </Button>
        <Button variant="contained" autoFocus onClick={events} id="createEvent">
          Inserisci
        </Button>
      </DialogActions>
    </Dialog>
  );
}
