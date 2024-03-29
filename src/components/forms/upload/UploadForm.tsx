import { Card, Grid, Stack, Typography } from '@mui/material';
import SingleFileInput from '@pagopa/mui-italia/dist/components/SingleFileInput/SingleFileInput';
import { useEffect, useState } from 'react';
import { calcSha256String } from '../../../helpers/utils';
import { UPLOAD_STATUS_ENUM } from '../../../model';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getPresignedUrl, uploadFile } from '../../../redux/uploading/actions';
import { resetStateUpload } from '../../../redux/uploading/reducers';

export function UploadBox() {
  const [file, setFile] = useState<{ file: File; sha: string } | undefined>(undefined);
  const uploadState = useAppSelector((state) => state.uploadAndDownload);
  const dispatch = useAppDispatch();

  const handleSelect = async (file: File) => {
    const sha = await calcSha256String(file);
    setFile({ file, sha: sha.hashBase64 });
    dispatch(resetStateUpload());
  };

  const handleRemove = () => {
    setFile(undefined);
    dispatch(resetStateUpload());
  };

  const fetchData = () => {
    if (
      file &&
      uploadState.upload.presignedUrl &&
      uploadState.upload.status === UPLOAD_STATUS_ENUM.RETRIEVED_PRESIGNED_URL
    ) {
      void dispatch(
        uploadFile({
          url: uploadState.upload.presignedUrl,
          file: file.file,
          sha: file.sha,
        })
      );
    } else if (file && uploadState.upload.status === UPLOAD_STATUS_ENUM.WAITING_FILE) {
      void dispatch(getPresignedUrl({}));
    }
  };

  useEffect(() => {
    void fetchData();
  }, [file, uploadState.upload]);

  const statusDescription = () => {
    switch (uploadState.upload.status) {
      case UPLOAD_STATUS_ENUM.RETRIEVING_PRESIGNED_URL:
        return 'In attesa del url di caricamento';
      case UPLOAD_STATUS_ENUM.UPLOADING_FILE_S3:
        return 'Caricamento file in corso';
      case UPLOAD_STATUS_ENUM.ERROR_PRESIGNED_URL:
        return 'Errore con il recupero del url di caricamento';
      case UPLOAD_STATUS_ENUM.ERROR_UPLOADING_FILE_S3:
        return 'Errore con il caricamento del file';
      default:
        return null;
    }
  };

  return (
    <Card
      elevation={24}
      sx={{
        width: 1,
        padding: '1rem 2rem',
        boxShadow: '0px 3px 3px -2px ',
        backgroundColor: 'background.paper',
      }}
    >
      <Grid container rowSpacing={2}>
        <Grid item>
          <Typography variant="h4">Upload</Typography>
        </Grid>
        <Grid container spacing={1}>
          <Grid item container xs={12} sm={6}>
            <Stack direction={'column'} spacing={2}>
              <Typography variant="subtitle1">Carica file xlsx dei recapitisti</Typography>
              <Typography variant="body1" data-testid={'status-description-upload'}>
                {statusDescription()}
              </Typography>
            </Stack>
          </Grid>
          <Grid item container xs={12} sm={6}>
            <SingleFileInput
              data-testid={'file-input'}
              label="Documento (richiesto)"
              loading={uploadState.upload.loading}
              error={!!uploadState.upload.error}
              value={file ? file.file : null}
              accept={[
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-excel',
              ]}
              onFileSelected={handleSelect}
              onFileRemoved={handleRemove}
              dropzoneLabel="Trascinare e rilasciare un file .xlsx o fare click per selezionarne uno"
              rejectedLabel="Tipo di file non supportato"
            />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
