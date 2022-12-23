import { Divider, Grid, Typography } from "@mui/material";
import { opened, responseData } from "../../redux/responseSlice";
import { useSelector } from "react-redux";

/**
 * connecting the response type with specific message
 * @enum
 * @readonly
 * @type {string}
 */
enum ResponseType {
  password = "Password",
  taxId = "Codice Fiscale",
  internalId = "Codice Univoco",
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
            <>
              {
                ResponseType[
                  Object.keys(response)[0] as keyof typeof ResponseType
                ]
              }
              : {Object.values(response)[0]}
            </>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  ) : null;
};

export default ResponseData;
