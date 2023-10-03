import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, Container, FormHelperText, Grid, Typography } from '@mui/material';
import { format, subMonths } from 'date-fns';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import streamSaver from 'streamsaver';
import { v4 as uuid } from 'uuid';
import { getPersonIdType, getPersonTaxIdType } from '../../../api/apiRequestTypes';
import apiRequests from '../../../api/apiRequests';
import { infoMessages } from '../../../helpers/messagesConstants';
import * as responseActions from '../../../redux/responseSlice';
import * as snackbarActions from '../../../redux/snackbarSlice';
import * as spinnerActions from '../../../redux/spinnerSlice';
import { FieldsProperties, FieldsProps, FormField, MenuItems } from '../../formFields/FormFields';
import ResponseData from '../../responseData/ResponseData';

/**
 * default values of the form fields
 */
const defaultFormValues: { [key: string]: any } = {
  ticketNumber: '',
  taxId: '',
  personId: '',
  iun: '',
  publicAuthorityName: '',
  'Tipo Estrazione': 'Ottieni EncCF',
  recipientType: 'PF',
  deanonimization: false,
  'Date Picker': format(new Date(), 'yyyy-MM-dd'),
  'Time interval': [
    format(subMonths(new Date(), 3), 'yyyy-MM-dd'),
    format(new Date(), 'yyyy-MM-dd'),
  ],
  traceId: '',
  monthInterval: [
    format(
      new Date(new Date(new Date().setUTCDate(1)).setHours(0, 0, 0, 0)),
      "yyyy-MM-dd'T'HH:mm:ss.sss'Z'"
    ),
    format(new Date(new Date().setHours(0, 0, 0, 0)), "yyyy-MM-dd'T'HH:mm:ss.sss'Z'"),
  ],
  jti: '',
};

/**
 * Generating the app form using the form fields
 * @component
 */

let password: string | null;
const SearchForm = () => {
  const href = document.location.href;
  streamSaver.mitm = href.substring(0, href.indexOf(document.location.pathname)) + '/mitm.html';

  /**
   * selected value of Tipo Estrazione select menu
   */
  const [selectedValue, setSelectedValue] = useState<string>(Object.keys(MenuItems)[0]);

  /**
   * the fields coresponding to the selected value
   */
  const [fields, setFields] = useState<Array<FieldsProps>>([]);

  /**
   * helps for watching the touched field and handle changes of them in the Otteni log completi case
   */
  const [prevDirtyFields, setPrevDirtyFields] = useState<Array<string>>([]);

  /**
   * helps for watching the touched field and handle changes of them in the Otteni log completi case
   */
  const [ricerca, setRicerca] = useState<boolean>(false);

  /**
   * dispatch redux actions
   */
  const dispatch = useDispatch();

  /**
   * form functionalities from react-hook-forms
   */
  const {
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
    reset,
    resetField,
    getValues,
    clearErrors,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: defaultFormValues,
  });

  /**
   * used for watching all fields when changing
   */
  const watchAllFields = useWatch({ name: MenuItems[selectedValue], control });

  /**
   * used for watching Tipo Estrazione select menu
   */
  const watchTipoEstrazione = useWatch({ name: 'Tipo Estrazione', control });

  /**
   * function handling changes of the Tipo Estrazione select menu
   * @param {SelectChangeEvent<string>} e the event of the field
   */
  useEffect(() => {
    const values = getValues();
    reset({
      ...defaultFormValues,
      'Tipo Estrazione': values['Tipo Estrazione'],
    });
    setSelectedValue(values['Tipo Estrazione'].toString());
    resetStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchTipoEstrazione]);

  useEffect(() => {
    setFields(filterFields(MenuItems[selectedValue]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  useLayoutEffect(
    () => () => {
      setFields(filterFields(MenuItems[selectedValue]));
      disableRicerca();
      resetStore();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /**
   * function handling the changes in the fields when the selected value of Tipo Estrazione is
   * "Ottieni log completi" so some fields are hidden and some are shown according
   * to which fields are filled
   */
  // eslint-disable-next-line sonarjs/cognitive-complexity
  useEffect(() => {
    let neededFields: Array<string> = [];
    disableRicerca();
    const values = getValues();
    if (selectedValue === 'Ottieni EncCF') {
      if (fields && fields.find((f) => f.name === 'piva')) {
        const piva = fields.find((f) => f.name === 'piva');
        if (piva) {
          piva.hidden = values.recipientType === 'PF';
          if (piva.hidden) {
            clearErrors('piva');
          }
        }
      }
      if (fields && fields.find((f) => f.name === 'taxId')) {
        const taxId = fields.find((f) => f.name === 'taxId');
        if (taxId) {
          taxId.hidden = values.recipientType === 'PG';
          if (taxId.hidden) {
            clearErrors('taxId');
          }
        }
      }
    }
    if (Object.keys(dirtyFields).sort().join('') === [...prevDirtyFields].sort().join('')) {
      return;
    }
    if (selectedValue === 'Ottieni log completi') {
      const common = Object.keys(dirtyFields).filter((field) =>
        ['deanonimization', 'ticketNumber', 'Time interval', 'recipientType'].includes(field)
      );
      if (Object.keys(dirtyFields).length === common.length) {
        neededFields = MenuItems['Ottieni log completi'].filter(
          (item) => item !== 'deanonimization'
        );
        clearErrors();
      } else {
        if (Object.keys(dirtyFields).includes('taxId')) {
          neededFields = ['ticketNumber', 'taxId', 'Time interval', 'recipientType'];
        }
        if (Object.keys(dirtyFields).includes('personId')) {
          neededFields = ['ticketNumber', 'personId', 'Time interval'];
        }
        if (Object.keys(dirtyFields).includes('iun')) {
          neededFields = ['ticketNumber', 'iun', 'deanonimization'];
        }
      }
      if (
        [...neededFields].sort().join('|') !==
        fields
          .map((field) => field.name)
          .sort()
          .join('|')
      ) {
        setFields(filterFields(neededFields));
      }
    }
    setPrevDirtyFields(Object.keys(dirtyFields));
  }, [watchAllFields]);

  /**
   *
   * @param {string[]} neededFields needed fields in the situation just as names
   * @returns {FieldsProps[]} needed fields with their specific properties ready for creating
   */
  const filterFields = (neededFields: Array<string>): Array<FieldsProps> => {
    const allFields = Object.values(FieldsProperties);
    return allFields.map((field) => {
      if (neededFields.includes(field.name) || field.name === 'Tipo Estrazione') {
        if (
          selectedValue === 'Ottieni log completi' &&
          [...neededFields].sort().join('') ===
            [...MenuItems['Ottieni log completi']].sort().join('') &&
          field.name !== 'ticketNumber'
        ) {
          return { ...field, required: false };
        }
        return { ...field, required: true };
      }
      return hideField(field);
    });
  };

  /**
   * function that changes the hide propety a field
   * @param field field to be hidden
   * @returns the hiddin field
   */
  const hideField = (field: FieldsProps) => {
    resetField(field.name);
    return { ...field, hidden: true };
  };

  /**
   * handling form submit
   * @param data values from the form
   */
  const onSubmit = (data: any) => {
    resetStore();
    dispatch(spinnerActions.updateSpinnerOpened(true));
    const payload = createPayload(data);
    if (selectedValue === 'Ottieni EncCF' || selectedValue === 'Ottieni CF') {
      createRequest(payload);
    } else {
      downloadZip(JSON.stringify(payload));
    }
  };

  const createRequest = (payload: any) => {
    let request;
    switch (selectedValue) {
      case 'Ottieni EncCF':
        request = apiRequests.getPersonId(payload as getPersonIdType);
        break;
      case 'Ottieni CF':
        request = apiRequests.getPersonTaxId(payload as getPersonTaxIdType);
        break;
      default:
        break;
    }
    if (request) {
      request
        .then((res) => {
          updateSnackbar(res);
          if (res.data.data) {
            const response =
              selectedValue === 'Ottieni CF'
                ? { taxId: res.data.data }
                : { internalId: res.data.data };
            updateResponse(response);
          }
          dispatch(spinnerActions.updateSpinnerOpened(false));
        })
        .catch((error) => {
          updateSnackbar({ data: { error }, status: 500 });

          dispatch(spinnerActions.updateSpinnerOpened(false));
        });
    }
  };

  const getUrl = (): string => {
    switch (selectedValue) {
      // case "Ottieni EncCF":
      //   return '/persons/v1/person-id';
      //   break;
      // case "Ottieni CF":
      //   return '/persons/v1/tax-id';
      //   break;
      case 'Ottieni notifica':
        return '/logs/v1/notifications/info';
      case 'Ottieni notifiche di una PA':
        return '/logs/v1/notifications/monthly';
      case 'Get process logs':
        return '/logs/v1/processes';
      case 'Ottieni log completi':
        return '/logs/v1/persons';
      case 'Ottieni log di processo':
        return '/logs/v1/processes';
      case 'Ottieni log di sessione':
        return '/logs/v1/sessions';
      default:
        return '';
    }
  };

  const downloadZip = (payload: any): any => {
    const url = process.env.REACT_APP_API_ENDPOINT! + getUrl();

    dispatch(spinnerActions.updateSpinnerOpened(true));
    const token = sessionStorage.getItem('token');

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'x-pagopa-pn-uid': uuid(),
        'x-pagopa-pn-cx-type': 'BO',
      },
      body: payload,
    })
      .then((res) => {
        if (res.status !== 200) {
          const msg =
            res.status === 204
              ? 'Nessun dato disponibile'
              : "Si è verificato un errore durante l'estrazione";
          updateSnackbar({ data: { message: msg }, status: 500 });

          dispatch(spinnerActions.updateSpinnerOpened(false));
          return;
        }

        void res.json().then((data) => {
          const fileName = data?.message;
          password = res.headers.get('password');

          updateResponse({ password });
          polling(fileName);
        });
      })
      .catch(() => {
        updateSnackbar({
          data: { message: "Si è verificato un errore durante l'estrazione" },
          status: 500,
        });

        dispatch(spinnerActions.updateSpinnerOpened(false));
      });
  };

  let timerId: any;

  const polling = (data: any): any => {
    if (!data || data === '') {
      return;
    }

    if (timerId) {
      clearTimeout(timerId);
    }

    apiRequests
      .getDownloadUrl(data)
      .then((ret) => {
        if (ret.data.message === 'notready') {
          timerId = setTimeout(() => polling(data), 5000);
        } else {
          dispatch(spinnerActions.updateSpinnerOpened(false));
          updateResponse({ password, downloadLink: ret.data.message });
          updateSnackbar({ data: { message: infoMessages.OK_RESPONSE } });
        }
      })
      .catch(() => {
        dispatch(spinnerActions.updateSpinnerOpened(false));
        updateSnackbar({ data: { error: 'Error preparing download' }, status: 500 });
      });
  };

  /**
   * Formatting the data ready to be sent
   * @param data data that has to be formatted
   * @returns formatted payload
   */
  const createPayload = (data: any): any => {
    const currentFields = fields
      .filter((field) => !field.hidden && field.name !== 'Tipo Estrazione')
      .map((field) => field.name);
    const payload = Object.assign(
      Object.keys(data)
        .filter((key) => currentFields.includes(key))
        .reduce(
          (obj, key) =>
            Object.assign(obj, {
              [key]: data[key],
            }),
          {}
        )
    );
    if (payload['Time interval']) {
      payload.dateFrom = payload['Time interval'][0];
      payload.dateTo = payload['Time interval'][1];
      delete payload['Time interval'];
    }
    // for use case 3 add deanonimization = true
    // for  use case 7 add deanonimization = false
    if (
      selectedValue === 'Ottieni log completi' &&
      // eslint-disable-next-line no-prototype-builtins
      (payload.hasOwnProperty('taxId') || payload.hasOwnProperty('personId'))
    ) {
      // eslint-disable-next-line no-prototype-builtins
      payload.deanonimization = payload.hasOwnProperty('taxId');
    }
    return payload;
  };

  /**
   * update the snackbar component depneding on the response
   * @param response
   */
  const updateSnackbar = (response: any, duration?: number) => {
    const message = response.data?.detail ?? response.data.message;
    message && dispatch(snackbarActions.updateMessage(message));
    dispatch(snackbarActions.updateSnackbacrOpened(true));
    dispatch(snackbarActions.updateStatusCode(response.status));
    if (duration) {
      dispatch(snackbarActions.updateAutoHideDuration(duration));
    }
  };

  /**
   * update the response data component depending on the response
   * @param response
   */
  const updateResponse = (response: any) => {
    dispatch(responseActions.updateResponseOpened(true));
    dispatch(responseActions.updateResponseData(response));
  };

  /**
   * reset the state of the redux store
   */
  const resetStore = () => {
    dispatch(snackbarActions.resetState());
  };

  /**
   * check if every necessaty field is filled
   * @returns true | false
   */
  const disableRicerca = () => {
    const necessaryFields = fields.filter((field) => !field.hidden).map((field) => field.name);
    const currentValues: any = Object.fromEntries(
      Object.entries(getValues()).filter(
        ([key]) => necessaryFields.includes(key) && key !== 'deanonimization'
      )
    );
    // eslint-disable-next-line
    if (Object.entries(currentValues).some(([_, value]) => value === '' || value === null)) {
      setRicerca(true);
    } else {
      setRicerca(false);
    }
  };

  return (
    <Container>
      <Grid container direction="column" rowSpacing={3}>
        <Grid item container>
          <Grid item>
            <Typography color="text.primary" variant="h4">
              Ricerca ed Estrazione Dati
            </Typography>
          </Grid>
        </Grid>
        <Grid item container rowSpacing={2}>
          <Card
            elevation={24}
            sx={{
              width: 1,
              padding: '5%',
              boxShadow: '0px 3px 3px -2px ',
              backgroundColor: 'background.paper',
            }}
          >
            <Grid container rowSpacing={2}>
              <Grid item width={1}>
                <form onSubmit={handleSubmit((data) => onSubmit(data))} style={{ width: '100%' }}>
                  <Grid item container>
                    <Grid item container spacing={2} alignItems="flex-start">
                      {fields.map(
                        (field) =>
                          !field.hidden && (
                            <Grid
                              item
                              key={field.name + 'Item'}
                              xs={12}
                              lg={field.size ? field.size : 3}
                              xl={field.size ? field.size : 3}
                              sx={{ pr: 0 }}
                            >
                              <Controller
                                control={control}
                                name={field.name}
                                rules={field.rules}
                                render={({
                                  field: { onChange, onBlur, value, name },
                                  fieldState: { error },
                                }) => (
                                  <>
                                    <FormField
                                      field={field}
                                      value={value}
                                      onBlur={onBlur}
                                      error={error}
                                      onChange={(value: any) => {
                                        onChange(value);
                                        value.nativeEvent &&
                                          value.nativeEvent.data === null &&
                                          clearErrors(name);
                                      }}
                                    />
                                    <FormHelperText error>
                                      {errors[field?.name] &&
                                      field.componentType !== 'dateRangePicker'
                                        ? (errors[field?.name]?.message as string)
                                        : ' '}
                                    </FormHelperText>
                                  </>
                                )}
                              />
                            </Grid>
                          )
                      )}
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent="space-between"
                      rowSpacing={2}
                      sx={{
                        flexDirection: { xs: 'column', lg: 'row' },
                      }}
                    >
                      <Grid item>
                        <Button
                          size="large"
                          fullWidth
                          variant="outlined"
                          startIcon={<RestartAltIcon />}
                          sx={{
                            '&:hover': { backgroundColor: 'action.hover' },
                          }}
                          onClick={() => {
                            reset({
                              ...defaultFormValues,
                              'Tipo Estrazione': getValues('Tipo Estrazione'),
                            });
                            dispatch(responseActions.resetState());
                          }}
                        >
                          Resetta filtri
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          size="large"
                          fullWidth
                          type="submit"
                          variant="contained"
                          sx={{
                            backgroundColor: 'primary.main',
                            '&:hover': { backgroundColor: 'primary.dark' },
                          }}
                          startIcon={<SearchIcon />}
                          disabled={Object.keys(errors).length > 0 || ricerca}
                        >
                          Ricerca
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <ResponseData></ResponseData>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchForm;
