import { Card, Typography, Grid, Button, Box, LinearProgress, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getFile } from '../../../redux/uploading/actions';
import { downloadFile } from '../../../helpers/utils';
import { resetStateDownload } from '../../../redux/uploading/reducers';
import * as snackbarActions from '../../../redux/snackbarSlice';

interface DownloadBoxProps {
  tenderCode?: string;
}

export function DownloadBox(props: DownloadBoxProps) {
  const downloadState = useAppSelector((state) => state.uploadAndDownload);
  const dispatch = useAppDispatch();

  const handleOnClickDownload = async () => {
    await dispatch(getFile({ uid: undefined, tenderCode: props.tenderCode }));
  };

  useEffect(() => {
    void retrieveAsync();
  }, [downloadState.download]);

  const retrieveAsync = async () => {
    const download = downloadState.download;

    if (!download.retry && !download.error) {
      return;
    }

    if (download.uid && download.retry && download.loading) {
      setTimeout(
        () => dispatch(getFile({ uid: download.uid, tenderCode: props.tenderCode })),
        download.retry
      );
    } else {
      dispatch(snackbarActions.updateSnackbacrOpened(true));
      dispatch(snackbarActions.updateStatusCode(400));
      dispatch(snackbarActions.updateMessage('Error durante il download del file'));
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
          <Typography variant="h4">Download</Typography>
        </Grid>
        <Grid
          container
          direction={'row'}
          spacing={1}
          alignItems={'center'}
          justifyContent={'space-around'}
        >
          <Grid item container xs={12} sm={6}>
            <Typography variant={'subtitle1'}>Template/recapitisti attuali</Typography>
          </Grid>
          <Grid item container xs={12} sm={6}>
            {downloadState.download?.loading && downloadState.download.loading ? (
              <Box sx={{ width: '100%' }}>
                <LinearProgress data-testid={'progress-bar-download'} />
              </Box>
            ) : downloadState.download?.data && downloadState.download.data ? (
              <Grid container width={1} direction={'row'} alignItems={'center'}>
                <Grid item>
                  <Button
                    onClick={() => {
                      downloadFile(downloadState.download.data || '');
                    }}
                    data-testid={'button-download-exist-file'}
                  >
                    Scarica file
                  </Button>
                </Grid>
                <Grid>
                  <IconButton
                    data-testid={'button-cancel-state'}
                    onClick={() => {
                      dispatch(resetStateDownload());
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ) : (
              <Button
                id="idButtonDownload"
                data-testid={'button-start-download'}
                variant="contained"
                size="medium"
                onClick={handleOnClickDownload}
                color="primary"
              >
                Download
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
