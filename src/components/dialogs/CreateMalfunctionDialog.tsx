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
import { useDispatch } from 'react-redux';
import { AxiosError, AxiosResponse } from 'axios';
import apiRequests from '../../api/apiRequests';
import * as spinnerActions from '../../redux/spinnerSlice';
import { FunctionalityName, MonitorDialogProps } from '../../model/monitor';
import { formatPayload } from '../../helpers/monitor.utility';

// eslint-disable-next-line sonarjs/cognitive-complexity
export function CreateMalfunctionDialog({
  modalPayload,
  refreshStatus,
  isModalOpen,
  setIsModalOpen,
  updateSnackbar,
}: MonitorDialogProps) {
  const dispatch = useDispatch();
  const [dateError, setDateError] = useState('');
  const [modalEventDate, setModalEventDate] = useState<Date | null>(new Date());
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);

  const isErrorPresent = checkboxError || dateError;
  const functionalityName =
    FunctionalityName[modalPayload.functionality as unknown as keyof typeof FunctionalityName];

  const cleanDialog = () => {
    setModalEventDate(new Date());
    setDateError('');
    setCheckboxError(false);
    setIsChecked(false);
  };

  useEffect(() => {
    cleanDialog();
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

    apiRequests
      .createEvent(formatPayload(modalPayload, modalEventDate))
      .then((response: AxiosResponse) => {
        refreshStatus();
        updateSnackbar(response);
      })
      .catch((error: AxiosError) => {
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
            <FormHelperText error>{dateError ? dateError : ''}</FormHelperText>
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
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'end', p: '0 24px 20px 0' }}>
        <Button variant="outlined" onClick={handleClick} sx={{ padding: '0 18px' }}>
          Annulla
        </Button>
        <Button
          variant={isErrorPresent ? 'outlined' : 'contained'}
          color={isErrorPresent ? 'error' : 'primary'}
          autoFocus
          onClick={events}
          id="createEvent"
        >
          Inserisci KO
        </Button>
      </DialogActions>
    </Dialog>
  );
}
