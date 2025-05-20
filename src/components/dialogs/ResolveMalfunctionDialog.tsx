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
import { useDispatch } from 'react-redux';
import apiRequests from '../../api/apiRequests';
import * as spinnerActions from '../../redux/spinnerSlice';
import { formatPayload, isEmptyHtml, maxLength } from '../../helpers/monitor.utility';
import { FunctionalityName, MonitorDialogProps } from '../../model/monitor';
import { PreviewDialogContent } from './PreviewDialogContent';
import { DescriptionDialogContent } from './DescriptionDialogContent';

export function ResolveMalfunctionDialog({
  refreshStatus,
  modalPayload,
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

    if (!modalEventHtmlDescription || isEmptyHtml(modalEventHtmlDescription)) {
      setHtmlDescriptionError('Inserisci informazioni aggiuntive');
      return;
    }

    if (modalEventHtmlDescription?.length > maxLength) {
      setHtmlDescriptionError('Il campo è troppo lungo');
      return;
    }

    // RESOLVE KO - step 1
    if (!isSecondStep) {
      apiRequests
        .getPreview(formatPayload(modalPayload, modalEventDate, modalEventHtmlDescription))
        .then((res: any) => {
          refreshStatus();
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

      apiRequests
        .createEvent(formatPayload(modalPayload, modalEventDate, modalEventHtmlDescription))
        .then((res: any) => {
          refreshStatus();
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
