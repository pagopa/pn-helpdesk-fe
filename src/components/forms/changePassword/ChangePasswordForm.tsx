import { Grid, Button, Box, Card, FormHelperText, Typography, InputAdornment } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../../Authentication/auth';
import { errorMessages, infoMessages } from '../../../helpers/messagesConstants';
import { FieldsProperties, FormField } from '../../formFields/FormFields';
import * as snackbarActions from '../../../redux/snackbarSlice';
import * as spinnerActions from '../../../redux/spinnerSlice';

/**
 * default values of the form fields
 */
const defaultFormValues: { [key: string]: string } = {
  newPassword: '',
  newPasswordConfirm: '',
};

/**
 * Generating the login form using the form fields
 * @component
 */
const ChangePasswordForm = ({ user }: any) => {
  const { changePassword } = useAuth();

  /**
   * form fields
   */
  const fields: Array<{ [key: string]: string }> = [
    {
      name: 'newPassword',
      label: 'Nuova password',
    },
    {
      name: 'newPasswordConfirm',
      label: 'Conferma password',
    },
  ];

  /**
   * dispatch redux actions
   */
  const dispatch = useDispatch();

  /**
   * for navigate to other pages
   */
  const navigate = useNavigate();

  /**
   * form functionalities from react-hook-forms
   */
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: defaultFormValues,
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  /**
   * function handling the form submitting
   * @param data the data from the form
   */
  /* istanbul ignore next */
  const onSubmit = async (data: { [x: string]: string }) => {
    dispatch(spinnerActions.updateSpinnerOpened(true));
    await changePassword(user, data.newPassword)
      .then(() => {
        dispatch(spinnerActions.updateSpinnerOpened(false));
        navigate('/search');
      })
      .catch(() => {
        dispatch(spinnerActions.updateSpinnerOpened(false));
        dispatch(snackbarActions.updateSnackbarOpened(true));
        dispatch(snackbarActions.updateStatusCode('400'));
      });
  };

  return (
    <Box
      data-testid="ChangePasswordForm"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: 'primary.main' }}
    >
      <Card
        elevation={24}
        sx={{
          width: 1 / 2,
          padding: '5%',
          boxShadow: '0px 3px 3px -2px ',
          backgroundColor: 'background.paper',
        }}
      >
        <Grid container direction="column" rowSpacing={2}>
          <Grid item container justifyContent="center">
            <LockIcon sx={{ height: '15%', width: '15%', color: '#0066CC' }} />
          </Grid>
          <Grid item container alignItems="center" justifyContent="center">
            <Grid item sx={{ paddingBottom: '2%' }}>
              <Typography color="text.primary" variant="h4">
                Cambio password
              </Typography>
            </Grid>
          </Grid>
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <Grid item container direction="column" rowSpacing={3}>
              {fields.map((currentField) => (
                <Grid item container key={currentField.name}>
                  <Controller
                    control={control}
                    name={currentField.name}
                    rules={{
                      ...FieldsProperties.password.rules,
                      validate: {
                        newPasswordEquality: () =>
                          getValues(fields[0].name) === getValues(fields[1].name) ||
                          errorMessages.PSSWORDS_EQUALITY,
                      },
                    }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <>
                        <FormField
                          error={error}
                          key={currentField.name}
                          field={{
                            ...FieldsProperties.password,
                            label: currentField.label,
                            InputProps: {
                              endAdornment:
                                currentField.name === 'newPassword' ? (
                                  <Tooltip
                                    title={infoMessages.PASSWORD_TOOLTIP_MSG}
                                    placement="right"
                                  >
                                    <InputAdornment position="end">
                                      <HelpIcon />
                                    </InputAdornment>
                                  </Tooltip>
                                ) : null,
                            },
                          }}
                          onChange={onChange}
                          value={value}
                        />
                        <FormHelperText error>
                          {errors[currentField.name]
                            ? (errors[currentField.name]?.message as string)
                            : ' '}
                        </FormHelperText>
                      </>
                    )}
                  />
                </Grid>
              ))}

              <Grid item>
                <Button
                  sx={{
                    backgroundColor: 'primary.main',
                    '&:hover': { backgroundColor: 'primary.dark' },
                  }}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="outlined"
                >
                  <Typography sx={{ color: 'white' }}>Cambia password</Typography>
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Card>
    </Box>
  );
};

export default ChangePasswordForm;
