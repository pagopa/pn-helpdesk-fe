import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { FunctionalityName, modalPayloadType } from '../../model';
import apiRequests from '../../api/apiRequests';
import { postEventType } from '../../api/apiRequestTypes';
import * as spinnerActions from '../../redux/spinnerSlice';
import { PreviewDialogContent } from './PreviewDialogContent';
import { DescriptionDialogContent } from './DescriptionDialogContent';

interface MonitorDialogProps {
  modalPayload: modalPayloadType;
  postEvent: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  updateSnackbar: (r: any) => void;
}

const isEmptyHtml = (html?: string): boolean => {
  if (!html) {
    return true;
  }
  const div = document.createElement('div');
  div.innerHTML = html;
  return !div.textContent || div.textContent.trim() === '';
};

export function ResolveMalfunctionDialog({
  modalPayload,
  postEvent,
  isModalOpen,
  setIsModalOpen,
  updateSnackbar,
}: MonitorDialogProps) {
  const dispatch = useDispatch();

  const [dateError, setDateError] = useState('');
  const [htmlDescriptionError, setHtmlDescriptionError] = useState('');
  const [modalEventDate, setModalEventDate] = useState<Date | null>(new Date());
  const [modalEventHtmlDescription, setModalEventHtmlDescription] = useState<string | undefined>();
  const [isSecondStep, setIsSecondStep] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  const [preview, setPreview] = useState('');

  const isErrorPresent = htmlDescriptionError || dateError || checkboxError;

  const functionalityName =
    FunctionalityName[modalPayload.functionality as unknown as keyof typeof FunctionalityName];
  const functionalityStatus = modalPayload.status;

  useEffect(() => {
    setModalEventDate(new Date());
    setModalEventHtmlDescription('');
    setDateError('');
    setHtmlDescriptionError('');
    setCheckboxError(false);
    setPreview('');
    setIsSecondStep(false);
  }, [isModalOpen]);

  const handleCancel = () => {
    if (isSecondStep) {
      setIsSecondStep(false);
      setCheckboxError(false);
    } else {
      setIsModalOpen(false);
    }
  };

  const handleConfirmCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      setCheckboxError(false);
    }
  };

  const events = () => {
    if (!modalEventDate) {
      setDateError('Seleziona una data');
      return;
    }

    if (isEmptyHtml(modalEventHtmlDescription)) {
      setHtmlDescriptionError('Inserisci informazioni aggiuntive');
      return;
    }

    // RESOLVE KO - step 1
    if (!isSecondStep) {
      const params = {
        ...modalPayload,
        timestamp: format(
          new Date(modalEventDate.setSeconds(0, 0)).setMilliseconds(0),
          "yyyy-MM-dd'T'HH:mm:ss.sssXXXXX"
        ),
        htmlDescription: modalEventHtmlDescription,
      };

      apiRequests
        .getPreview(params as postEventType)
        .then((res: any) => {
          dispatch(spinnerActions.updateSpinnerOpened(true));
          postEvent();
          dispatch(spinnerActions.updateSpinnerOpened(false));
          setIsSecondStep(true);
          setPreview(res);
        })
        .catch((error: any) => {
          dispatch(spinnerActions.updateSpinnerOpened(false));
          updateSnackbar(error.response);
        })
        .finally(() => {
          setIsChecked(false);
        });
    }

    // RESOLVE KO - step 2
    if (isSecondStep) {
      if (!isChecked) {
        setCheckboxError(true);
        return;
      }

      const params = {
        ...modalPayload,
        timestamp: format(
          new Date(modalEventDate.setSeconds(0, 0)).setMilliseconds(0),
          "yyyy-MM-dd'T'HH:mm:ss.sssXXXXX"
        ),
        htmlDescription: modalEventHtmlDescription,
      };

      apiRequests
        .postEvent(params as postEventType)
        .then((res: any) => {
          dispatch(spinnerActions.updateSpinnerOpened(true));
          postEvent();
          dispatch(spinnerActions.updateSpinnerOpened(false));
          console.log('creazione evento:', res);
        })
        .catch((error: any) => {
          dispatch(spinnerActions.updateSpinnerOpened(false));
          updateSnackbar(error.response);
        })
        .finally(() => {
          setIsModalOpen(false);
          setIsSecondStep(false);
          setIsChecked(false);
        });
    }
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth={isSecondStep}
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">
        {isSecondStep ? 'Anteprima documento' : 'Risolvi evento'} | {functionalityName}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <DialogContentText>
              {functionalityStatus === 'OK' ? 'Risolvi' : 'Inserisci'} un malfunzionamento legato
              all’area di {functionalityName}
            </DialogContentText>
          </Grid>
          {isSecondStep === true ? (
            <PreviewDialogContent
              preview={preview}
              checkboxError={checkboxError}
              isChecked={isChecked}
              handleConfirmCheckChange={handleConfirmCheckChange}
            />
          ) : (
            <DescriptionDialogContent
              setDateError={setDateError}
              dateError={dateError}
              setModalEventDate={setModalEventDate}
              isEmptyHtml={isEmptyHtml}
              setHtmlDescriptionError={setHtmlDescriptionError}
              setModalEventHtmlDescription={setModalEventHtmlDescription}
              functionalityStatus={functionalityStatus}
              modalEventDate={modalEventDate}
              modalEventHtmlDescription={modalEventHtmlDescription}
              htmlDescriptionError={htmlDescriptionError}
            />
          )}
        </Grid>
        <FormHelperText error>{dateError ? dateError : ''}</FormHelperText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'end', p: '0 24px 20px 0' }}>
        <Button variant="outlined" onClick={handleCancel} sx={{ padding: '0 18px' }}>
          {isSecondStep ? 'Indietro' : 'Annulla'}
        </Button>
        <Button
          variant={isErrorPresent ? 'outlined' : 'contained'}
          color={isErrorPresent ? 'error' : 'primary'}
          autoFocus
          onClick={events}
          id="createEvent"
        >
          {isSecondStep ? 'Conferma e Pubblica' : 'Continua'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
