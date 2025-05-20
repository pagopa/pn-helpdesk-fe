import { SyntheticEvent, useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import Slide, { SlideProps } from '@mui/material/Slide';
import { Typography } from '@mui/material';
import { infoMessages } from '../../helpers/messagesConstants';
import {
  updateSnackbarOpened,
  opened,
  statusCode,
  message,
  autoHideDuration,
} from '../../redux/snackbarSlice';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}

/**
 * connecting severity with the type of alert
 * @enum
 * @readonly
 * @type {string}
 */
enum Severity {
  'OK' = 'success',
  'Accepted' = 'warning',
  'Bad Request' = 'error',
  'Internal Server Error' = 'error',
  'Gateway Timeout' = 'error',
}

/**
 * connecting the alert with specific message
 * @readonly
 */
const defaultSeverityMessage: { [key: string]: string } = {
  OK: infoMessages.OK_RESPONSE,
  Accepted: infoMessages.ACCEPTED_RESPONSE,
  'Bad Request': infoMessages.BAD_REQUEST_RESPONSE,
  'Internal Server Error': infoMessages.INTERNEL_SERVER_ERROR_RESPONSE,
  'Gateway Timeout': infoMessages.TIMEOUT,
};

/**
 * General component presenting snackbar for alerts in the app.
 * @component
 * @param {Props} props
 */
const SnackbarComponent = () => {
  const [severity, setSeverity] = useState('');

  const snackbarOpened: boolean = useSelector(opened);

  const status: any = useSelector(statusCode);

  const snackbarMessage: any = useSelector(message);

  const autoHide: number | null = useSelector(autoHideDuration);

  const dispatch = useDispatch();

  /**
   * function handling the closing of the snackbar
   * @param   {Event | SyntheticEvent<any, Event>} e the close event
   * @param   {SnackbarCloseReason} reson the reason of closing
   */
  const handleClose = (
    event?: Event | SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason = 'escapeKeyDown'
  ) => {
    if (reason !== 'clickaway') {
      dispatch(updateSnackbarOpened(false));
    }
  };

  /* istanbul ignore next */
  const getSeverity = () => {
    if (status) {
      const statusNumber = Number(status);

      if (statusNumber === 202) {
        setSeverity('Accepted');
      } else if (statusNumber >= 200 && status < 300) {
        setSeverity('OK');
      } else if (statusNumber >= 400 && status < 500) {
        setSeverity('Bad Request');
      } else if (statusNumber >= 504) {
        setSeverity('Gateway Timeout');
      } else {
        setSeverity('Internal Server Error');
      }
    }
  };

  useEffect(() => getSeverity());

  return (
    <Snackbar
      open={snackbarOpened}
      autoHideDuration={autoHide}
      sx={{ '@media (min-width: 630px)': { top: '75px' } }}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={TransitionDown}
      onClose={(e: Event | SyntheticEvent<any, Event>, r: SnackbarCloseReason) => handleClose(e, r)}
    >
      <Alert
        onClose={handleClose}
        variant="filled"
        severity={Severity[severity as keyof typeof Severity]}
      >
        <Typography>{snackbarMessage || defaultSeverityMessage[severity]}</Typography>
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
