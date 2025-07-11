import { Button, Grid, Stack } from '@mui/material';
import { NoteAdd, Reply } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import {
  addedTender,
  clearFormState,
  goFSUStep,
  goUploadStep,
} from '../../redux/formTender/reducers';
import { AlertDialog } from '../dialogs';
import { TenderForm } from '../forms/tender/TenderForm';
import * as spinnerActions from '../../redux/spinnerSlice';
import { retrieveTenderDetails } from '../../api/paperChannelApi';
import * as snackbarActions from '../../redux/snackbarSlice';
import { Tender } from '../../model';
import { TENDERS_TABLE_ROUTE } from '../../navigation/router.const';

export function StepTender() {
  const formTender = useAppSelector((state) => state.tenderForm.formTender);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { tenderCode } = useParams();

  useEffect(() => {
    if (tenderCode && !formTender?.code) {
      void retrieveDetail(tenderCode);
    }
  }, []);

  const retrieveDetail = async (tenderCode: string) => {
    dispatch(spinnerActions.updateSpinnerOpened(true));
    try {
      const response = await retrieveTenderDetails(tenderCode);
      const tender = response.tender;
      if (tender.status !== 'CREATED') {
        dispatch(spinnerActions.updateSpinnerOpened(false));
        dispatch(snackbarActions.updateSnackbarOpened(true));
        dispatch(snackbarActions.updateStatusCode(404));
        dispatch(snackbarActions.updateMessage('La gara non può essere modifica!'));
        navigate(TENDERS_TABLE_ROUTE);
        return;
      }
      dispatch(spinnerActions.updateSpinnerOpened(false));
      dispatch(
        addedTender({
          ...tender,
        } as Tender)
      );
    } catch (e) {
      dispatch(spinnerActions.updateSpinnerOpened(false));
      dispatch(snackbarActions.updateSnackbarOpened(true));
      dispatch(snackbarActions.updateStatusCode(404));
      dispatch(snackbarActions.updateMessage('Gara non trovata !'));
      navigate(TENDERS_TABLE_ROUTE);
    }
  };

  const handleUpload = () => {
    dispatch(goUploadStep());
  };

  const handleGoFSU = () => {
    dispatch(goFSUStep());
  };

  const handleChangeTenderData = (newTender: Tender) => {
    dispatch(addedTender(newTender));
  };

  return (
    <Stack spacing={2} sx={{ width: 1 }}>
      <TenderForm
        key={`TENDER-${formTender?.code}`}
        initialValue={formTender}
        onChanged={handleChangeTenderData}
      />

      <Grid item container direction="row" justifyContent="space-between">
        <ButtonCancel />

        <Stack direction={'row'} spacing={3}>
          <Button
            data-testid={'btn-upload-tender'}
            variant={'outlined'}
            disabled={!formTender?.code}
            startIcon={<NoteAdd />}
            onClick={handleUpload}
          >
            Carica
          </Button>

          <Button
            data-testid={'btn-go-forward'}
            variant={'contained'}
            disabled={!formTender?.code}
            onClick={handleGoFSU}
          >
            Avanti
          </Button>
        </Stack>
      </Grid>
    </Stack>
  );
}

const ButtonCancel = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handlePositive = () => {
    setOpen(false);
    navigate(-1);
    dispatch(clearFormState());
  };

  const handleNegative = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant={'outlined'}
        data-testid={'btn-back-tenders'}
        startIcon={<Reply />}
      >
        Annulla
      </Button>
      <AlertDialog
        title={'Vuoi tornare alle gare ?'}
        message={'Confermando tornerai alla pagina di tutte le gare. Vuoi continuare'}
        open={open}
        onClickNegative={handleNegative}
        onClickPositive={handlePositive}
      />
    </>
  );
};
