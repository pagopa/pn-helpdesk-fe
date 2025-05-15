import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { postEventType } from '../../api/apiRequestTypes';
import * as spinnerActions from '../../redux/spinnerSlice';

interface MonitorDialogProps {
  modalPayload: modalPayloadType;
  postEvent: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  updateSnackbar: (r: any) => void;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
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
  const [isPreviewShowed, setIsPreviewShowed] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const isErrorPresent = htmlDescriptionError || dateError;

  const functionalityName =
    FunctionalityName[modalPayload.functionality[0] as unknown as keyof typeof FunctionalityName];

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

  function stripParagraphTags(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const paragraphs = Array.from(doc.body.childNodes);

    return paragraphs
      .map((node) => {
        if (node.nodeName === 'P') {
          return (node as HTMLElement).innerHTML;
        }
        return (node as HTMLElement).outerHTML || (node as Text).textContent || '';
      })
      .join('\n'); // o '<br />' se vuoi HTML leggibile
  }

  const handleDescriptionChange = (html: string) => {
    const plainHtml = stripParagraphTags(html);
    if (plainHtml) {
      setHtmlDescriptionError('');
    }
    setModalEventHtmlDescription(html);
  };

  const handleCancel = () => {
    if (isPreviewShowed) {
      setIsPreviewShowed(false);
    } else {
      setIsModalOpen(false);
    }
  };

  const functionalityStatus = modalPayload.status;
  const rteRef = useRef<RichTextEditorRef>(null);

  const events = () => {
    const plainHtmlDescription = modalEventHtmlDescription
      ? stripParagraphTags(modalEventHtmlDescription)
      : '';
    if (!modalEventDate) {
      setDateError('Seleziona una data');
      return;
    }
    if (!plainHtmlDescription) {
      setHtmlDescriptionError('Inserisci informazioni aggiuntive');
      return;
    }

    // RESOLVE KO - step 1
    if (!isPreviewShowed) {
      const params = {
        ...modalPayload,
        timestamp: format(
          new Date(modalEventDate.setSeconds(0, 0)).setMilliseconds(0),
          "yyyy-MM-dd'T'HH:mm:ss.sssXXXXX"
        ),
        htmlDescription: plainHtmlDescription,
      };
      console.log(params);
      setIsPreviewShowed(true);
    }

    // RESOLVE KO - step 2
    if (isPreviewShowed) {
      if (!isChecked) {
        // todo: remove when preview is developed
        setIsChecked(true);
      }
      const params = {
        ...modalPayload,
        timestamp: format(
          new Date(modalEventDate.setSeconds(0, 0)).setMilliseconds(0),
          "yyyy-MM-dd'T'HH:mm:ss.sssXXXXX"
        ),
        htmlDescription: plainHtmlDescription,
      };
      apiRequests
        .postEvent(params as postEventType)
        .then((res: any) => {
          dispatch(spinnerActions.updateSpinnerOpened(true));
          postEvent();
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
  };

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">
        {isPreviewShowed ? 'Anteprima documento' : 'Risolvi evento'} | {functionalityName}
      </DialogTitle>
      {isPreviewShowed === true ? (
        <DialogContent>Preview</DialogContent>
      ) : (
        <DialogContent>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <DialogContentText>
                {functionalityStatus === 'OK' ? 'Risolvi' : 'Inserisci'} un malfunzionamento legato
                all’area di {functionalityName}
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
          </Grid>
          <FormHelperText error>{dateError ? dateError : ''}</FormHelperText>
        </DialogContent>
      )}
      <DialogActions sx={{ justifyContent: 'end', p: '0 24px 20px 0' }}>
        <Button variant="outlined" onClick={handleCancel} sx={{ padding: '0 18px' }}>
          {isPreviewShowed ? 'Indietro' : 'Annulla'}
        </Button>
        <Button
          variant={isErrorPresent ? 'outlined' : 'contained'}
          color={isErrorPresent ? 'error' : 'primary'}
          autoFocus
          onClick={events}
          id="createEvent"
        >
          {isPreviewShowed ? 'Risolvi' : 'Continua'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
