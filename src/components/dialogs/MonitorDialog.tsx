import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { useRef } from 'react';
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
import { FunctionalityName, modalPayloadType } from '../../model';

interface MonitorDialogProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  modalPayload: modalPayloadType;
  modalFunctionalityName: keyof typeof FunctionalityName | undefined;
  modalEventDate: Date;
  handleChange: (date: Date | null) => void;
  timestampError: string;
  modalDescription: string | undefined;
  htmlDescriptionError: string;
  events: () => void;
}

export function MonitorDialog(props: MonitorDialogProps) {
  const functionalityStatus = props.modalPayload.status;
  const rteRef = useRef<RichTextEditorRef>(null);

  return (
    <Dialog
      open={props.isModalOpen}
      onClose={() => props.setIsModalOpen(false)}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">
        {functionalityStatus === 'OK' ? 'Risolvi' : 'Inserisci'} evento |{' '}
        {props.modalFunctionalityName && FunctionalityName[props.modalFunctionalityName]}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <DialogContentText>
              {functionalityStatus === 'OK' ? 'Risolvi' : 'Inserisci'} un malfunzionamento legato
              all’area di{' '}
              {props.modalFunctionalityName && FunctionalityName[props.modalFunctionalityName]}
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
              value={props.modalEventDate}
              onChange={(date: Date | null) => props.handleChange(date)}
              renderInput={(params: any) => (
                <TextField
                  onKeyDown={(e) => e.preventDefault()}
                  {...params}
                  error={props.timestampError ? true : false}
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
                    border: props.htmlDescriptionError ? '1px solid red' : 'none',
                    borderRadius: '4px',
                  }}
                >
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
                    content={props.modalDescription}
                  />
                </Box>
                <FormHelperText error>{props.htmlDescriptionError}</FormHelperText>
              </Grid>
            </>
          )}
          {functionalityStatus === 'OK' ? (
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
        <FormHelperText error>{props.timestampError ? props.timestampError : ''}</FormHelperText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'end' }}>
        <Button
          variant="outlined"
          onClick={() => props.setIsModalOpen(false)}
          sx={{ padding: '0 18px' }}
        >
          Annulla
        </Button>
        <Button
          variant="contained"
          autoFocus
          onClick={props.events}
          id="buttonInserisciDisservizio"
        >
          {functionalityStatus === 'OK' ? 'Risolvi' : 'Inserisci'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
