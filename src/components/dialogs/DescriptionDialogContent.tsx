import { Grid, Typography, TextField, Box, FormHelperText } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
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
import { useRef } from 'react';

interface DescriptionDialogContentProps {
  modalEventDate: Date | null;
  setModalEventDate: (date: Date | null) => void;
  setDateError: (error: string) => void;
  dateError: string;
  isEmptyHtml: (html?: string) => boolean;
  functionalityStatus: string;
  setModalEventHtmlDescription: (html?: string) => void;
  modalEventHtmlDescription: string | undefined;
  setHtmlDescriptionError: (error: string) => void;
  htmlDescriptionError: string;
}

export function DescriptionDialogContent({
  modalEventDate,
  setModalEventDate,
  setDateError,
  dateError,
  isEmptyHtml,
  functionalityStatus,
  setModalEventHtmlDescription,
  modalEventHtmlDescription,
  setHtmlDescriptionError,
  htmlDescriptionError,
}: DescriptionDialogContentProps) {
  const rteRef = useRef<RichTextEditorRef>(null);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDateError('');
    }
    setModalEventDate(date);
  };

  const handleDescriptionChange = (html: string) => {
    if (!isEmptyHtml(html)) {
      setHtmlDescriptionError('');
    }
    setModalEventHtmlDescription(html);
  };
  return (
    <>
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
        <FormHelperText error>{dateError ? dateError : ''}</FormHelperText>
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
    </>
  );
}
