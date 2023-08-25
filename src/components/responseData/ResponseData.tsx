import { Divider, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { opened, responseData } from '../../redux/responseSlice';

/**
 * connecting the response type with specific message
 * @enum
 * @readonly
 * @type {string}
 */
enum ResponseType {
  password = 'Password',
  taxId = 'Codice Fiscale',
  internalId = 'Codice Univoco',
  downloadLink = 'Download',
}

/**
 * General component presenting the response data in the app: password or code.
 * @component
 * @param {Props} props
 */
const ResponseData = () => {
  const openedResponseData = useSelector(opened);

  const response = useSelector(responseData);

  return openedResponseData ? (
    <Grid item container direction="column" rowSpacing={2}>
      <Grid item>
        <Divider />
      </Grid>
      <Grid item container>
        <Grid item>
          <Typography color="text.primary" variant="h6">
            Dati di risposta:
          </Typography>
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item>
          <Typography align="center" color="text.primary">
            {`${ResponseType[Object.keys(response)[0] as keyof typeof ResponseType]}: ${
              Object.values(response)[0]
            }`}
          </Typography>
        </Grid>
        {(Object.values(response)[1] as keyof typeof ResponseType) && (
          <Grid item container>
            <Grid item>
              <Typography align="center" color="text.primary">
                <>
                  <a
                    target="_blank"
                    href={Object.values(response)[1] as keyof typeof ResponseType}
                    rel="noreferrer"
                  >
                    Download
                  </a>
                </>
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  ) : null;
};

export default ResponseData;
