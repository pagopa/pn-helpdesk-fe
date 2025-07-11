import { Grid, Button, Box, Card, FormHelperText, Link, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MonogramPagoPACompany } from '@pagopa/mui-italia';

import { FieldsProperties, FormField } from '../../formFields/FormFields';
import { useAuth } from '../../../Authentication/auth';
import * as snackbarActions from '../../../redux/snackbarSlice';
import * as spinnerActions from '../../../redux/spinnerSlice';

/**
 * default values of the form fields
 */
const defaultFormValues: { [key: string]: string } = {
  email: '',
  password: '',
};

/**
 * Generating the login form using the form fields
 * @component
 */
const LoginForm = ({ setUser }: any) => {
  const { login } = useAuth();

  /**
   * form fields
   */
  const fields = ['email', 'password'];

  /**
   * dispatch redux actions
   */
  const dispatch = useDispatch();

  /**
   * tooltip about forgot password
   */
  const [tooltipOpen, setTooltipOpen] = useState(false);

  /**
   * form functionalities from react-hook-forms
   */
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormValues,
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  /**
   * for navigate to other pages
   */
  const navigate = useNavigate();

  /**
   * function handling the form submitting
   * @param data the data from the form
   */
  /* istanbul ignore next */
  const onSubmit = async (data: { [x: string]: string }) => {
    dispatch(spinnerActions.updateSpinnerOpened(true));
    await login({ email: data.email, password: data.password })
      .then((user: { [key: string]: any }) => {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          dispatch(spinnerActions.updateSpinnerOpened(false));
          setUser(user);
        } else {
          dispatch(spinnerActions.updateSpinnerOpened(false));
          navigate('/');
        }
      })
      .catch(() => {
        dispatch(spinnerActions.updateSpinnerOpened(false));
        dispatch(snackbarActions.updateSnackbarOpened(true));
        dispatch(snackbarActions.updateStatusCode('400'));
      });
  };

  return (
    <Box
      data-testid="LoginForm"
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
          <Grid item container alignItems="center" justifyContent="center">
            <Grid item>
              <MonogramPagoPACompany color="primary" shape="none" />
            </Grid>
          </Grid>
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <Grid item container direction="column" rowSpacing={3}>
              {fields.map((field) => (
                <Grid item container key={field}>
                  <Controller
                    control={control}
                    name={field}
                    rules={FieldsProperties[field].rules}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <>
                        <FormField
                          error={error}
                          key={field}
                          field={FieldsProperties[field]}
                          onChange={onChange}
                          value={value}
                        />
                        <FormHelperText error>
                          {errors[field] ? errors[field]?.message : ' '}
                        </FormHelperText>
                      </>
                    )}
                  />
                  {field === 'password' && (
                    <Grid item container justifyContent="flex-end">
                      <Tooltip
                        onClose={() => setTooltipOpen(false)}
                        open={tooltipOpen}
                        placement="bottom"
                        title="In caso di smarrimento della password contattare l'amministratore di sistema per richiedere il reset"
                      >
                        <Link sx={{ cursor: 'pointer' }} onClick={() => setTooltipOpen(true)}>
                          Password dimenticata?
                        </Link>
                      </Tooltip>
                    </Grid>
                  )}
                </Grid>
              ))}

              <Grid item>
                <Button
                  id="buttonLogin"
                  sx={{
                    backgroundColor: 'primary.main',
                    '&:hover': { backgroundColor: 'primary.dark' },
                  }}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="outlined"
                >
                  <Typography sx={{ color: 'white' }}>LOGIN</Typography>
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Card>
    </Box>
  );
};

export default LoginForm;
