import { Button, Card, FormHelperText, Link, Tooltip, Stack, Box } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MonogramPagoPACompany } from '@pagopa/mui-italia';

import { FieldsProperties, FormField } from '../../formFields/FormFields';
import { useAuth } from '../../../Authentication/auth';
import * as snackbarActions from '../../../redux/snackbarSlice';
import * as spinnerActions from '../../../redux/spinnerSlice';
import SSOLogin from '../../ssoLogin/SSOLogin';

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
    <Stack
      data-testid="LoginForm"
      sx={{
        backgroundColor: 'primary.main', justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }}
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
        <Stack direction="column" spacing={3}>

          {/* Contenitore Logo - Centrato */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MonogramPagoPACompany color="primary" shape="none" />
          </Box>

          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            {/* Stack principale che tiene in colonna tutti gli input e il bottone */}
            <Stack direction="column" spacing={1} sx={{ width: '100%' }}>

              {fields.map((field) => (
                <Stack direction="column" key={field} sx={{ width: '100%' }}>
                  <Controller
                    control={control}
                    name={field}
                    rules={FieldsProperties[field].rules}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <Box sx={{ width: '100%' }}>
                        <FormField
                          error={error}
                          field={FieldsProperties[field]}
                          onChange={onChange}
                          value={value}
                        />
                        <FormHelperText error={!!errors[field]}>
                          {errors[field] ? errors[field]?.message : ' '}
                        </FormHelperText>
                      </Box>
                    )}
                  />
                  {field === 'password' && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: -0.5 }}>
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
                    </Box>
                  )}
                </Stack>
              ))}

              {/* Bottone di Login */}
              <Button
                id="buttonLogin"
                fullWidth
                size="large"
                type="submit"
                variant="contained" // In MUI v9 si usa 'contained' se vuoi lo sfondo colorato di default
                sx={{
                  mt: 1,
                  // Nota: se usi variant="contained" non serve forzare il background e il colore bianco del testo, fa tutto MUI
                }}
              >
                LOGIN
              </Button>
            </Stack>
          </form>

        </Stack>
        <SSOLogin />
      </Card>
    </Stack>
  );
};

export default LoginForm;
