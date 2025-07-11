import { FormControl } from '@mui/base';
import { Grid, Box, FormGroup, FormControlLabel, Checkbox, FormHelperText } from '@mui/material';

interface PreviewDialogContentProps {
  preview: string;
  checkboxError: boolean;
  isChecked: boolean;
  handleConfirmCheckChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PDFViewer = ({ base64 }: { base64: string }) => (
  <iframe src={`${base64}`} title="PDF Viewer" width="100%" height="500px" frameBorder="none" />
);

export function PreviewDialogContent({
  preview,
  checkboxError,
  isChecked,
  handleConfirmCheckChange,
}: PreviewDialogContentProps) {
  return (
    <Grid item>
      <Box sx={{ borderRadius: '4px' }}>
        <Grid container>
          <Grid item width="100%">
            <PDFViewer base64={preview} />
          </Grid>
          <Grid item>
            <FormControl error={checkboxError}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isChecked}
                      onChange={handleConfirmCheckChange}
                      data-testid="checkbox"
                    />
                  }
                  label="Il testo è corretto e verrà pubblicato."
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      {checkboxError && <FormHelperText error>Questo campo è obbligatorio</FormHelperText>}
    </Grid>
  );
}
