import { useEffect } from 'react';
import { Grid, Button, FormHelperText } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FieldsProperties, FormField } from '../../formFields/FormFields';
import useConfirmDialog from '../../confirmationDialog/useConfirmDialog';
import * as snackbarActions from '../../../redux/snackbarSlice';
import * as spinnerActions from '../../../redux/spinnerSlice';
import apiRequests from '../../../api/apiRequests';
import {
  ErrorResponse,
  createAggregateType,
  getAggregateResponse,
  UsagePlan,
} from '../../../api/apiRequestTypes';
import * as routes from '../../../navigation/router.const';

type FormType = {
  [k: string]: any;
};

const defaultFormValues: FormType = {
  id: '',
  name: '',
  description: '',
  usagePlanName: '',
  rate: 0,
  burst: 0,
};

type Props = {
  isCreate: boolean;
  isUserWriter: boolean;
  aggregate: getAggregateResponse | undefined;
  usagePlans: Array<UsagePlan>;
};

const AggregateForm = ({ aggregate, isCreate, isUserWriter, usagePlans }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const confirmDialog = useConfirmDialog();
  const fields = [
    { ...FieldsProperties['Nome Aggregazione'], disabled: !isUserWriter },
    { ...FieldsProperties['Descrizione Aggregazione'], disabled: !isUserWriter },
    {
      ...FieldsProperties['Usage Plan'],
      selectItems: usagePlans.map((u) => u.name),
      disabled: !isUserWriter,
    },
    { ...FieldsProperties.Rate, disabled: !isUserWriter },
    { ...FieldsProperties.Burst, disabled: !isUserWriter },
  ];

  const {
    control,
    watch,
    formState: { errors, isValid },
    reset,
    clearErrors,
    setValue,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: defaultFormValues,
  });
  const values = watch();

  useEffect(() => {
    if (values.usagePlanName) {
      const usagePlanIndex = usagePlans?.findIndex((item) => item.name === values.usagePlanName);
      const { rate, burst } = usagePlans[usagePlanIndex];
      setValue('rate', rate);
      setValue('burst', burst);
    }
  }, [values.usagePlanName, setValue, usagePlans]);

  useEffect(() => {
    if (aggregate && Object.keys(aggregate).length !== 0) {
      reset({
        id: aggregate?.id,
        name: aggregate?.name,
        description: aggregate?.description,
        usagePlanName: aggregate?.usagePlan.name,
        rate: aggregate?.usagePlan.rate,
        burst: aggregate?.usagePlan.burst,
      });
    }
  }, [aggregate, reset]);

  const handleCreate = () => {
    // POST /aggregate
    const usagePlanIndex = usagePlans?.findIndex((item) => item.name === values.usagePlanName);
    const usagePlanId = usagePlans[usagePlanIndex].id;
    const payload = {
      name: values.name,
      description: values.description,
      usagePlanId,
    };
    // returns random id
    dispatch(spinnerActions.updateSpinnerOpened(true));
    const request = apiRequests.createAggregate(payload);
    if (request) {
      request
        .then((res) => {
          reset();
          dispatch(snackbarActions.updateSnackbacrOpened(true));
          dispatch(snackbarActions.updateStatusCode('200'));
          dispatch(snackbarActions.updateMessage(`Aggregato creato con successo`));
          navigate(routes.GET_UPDATE_AGGREGATE_PATH(res.id));
        })
        .catch(() => {
          dispatch(snackbarActions.updateSnackbacrOpened(true));
          dispatch(snackbarActions.updateStatusCode('400'));
          dispatch(snackbarActions.updateMessage(`Non è stato possibile creare l'aggregato`));
        })
        .finally(() => dispatch(spinnerActions.updateSpinnerOpened(false)));
    }
  };

  const handleSave = () => {
    // PUT /aggregate/{id}
    const usagePlanIndex = usagePlans?.findIndex((item) => item.name === values.usagePlanName);
    const usagePlanId = usagePlans[usagePlanIndex].id;
    const payload: createAggregateType = {
      name: values.name,
      description: values.description,
      usagePlanId,
    };
    // returns id
    dispatch(spinnerActions.updateSpinnerOpened(true));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const request = apiRequests.modifyAggregate(payload, aggregate!.id);
    if (request) {
      request
        .then(() => {
          dispatch(snackbarActions.updateSnackbacrOpened(true));
          dispatch(snackbarActions.updateStatusCode('200'));
          dispatch(snackbarActions.updateMessage(`Aggregato modificato con successo`));
        })
        .catch(() => {
          dispatch(snackbarActions.updateSnackbacrOpened(true));
          dispatch(snackbarActions.updateStatusCode('400'));
          dispatch(snackbarActions.updateMessage(`Non è stato possibile modificare l'aggregato`));
        })
        .finally(() => dispatch(spinnerActions.updateSpinnerOpened(false)));
    }
  };

  const handleDelete = () => {
    // DELETE /aggregate/{id}
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const payload = aggregate!.id;
    dispatch(spinnerActions.updateSpinnerOpened(false));
    const request = apiRequests.deleteAggregate(payload);
    if (request) {
      request
        .then(() => {
          dispatch(snackbarActions.updateSnackbacrOpened(true));
          dispatch(snackbarActions.updateStatusCode('200'));
          dispatch(snackbarActions.updateMessage(`Aggregato eliminato con successo`));
          navigate(routes.AGGREGATES_LIST);
        })
        .catch((err) => {
          dispatch(snackbarActions.updateSnackbacrOpened(true));
          dispatch(snackbarActions.updateStatusCode('400'));
          if (err.response && err.response.data) {
            const error = err.response.data as ErrorResponse;
            dispatch(snackbarActions.updateMessage(error.detail));
          } else {
            dispatch(snackbarActions.updateMessage(`Non è stato possibile eliminare l'aggregato`));
          }
        })
        .finally(() => dispatch(spinnerActions.updateSpinnerOpened(false)));
    }
  };

  const handleCreateClick = () => {
    confirmDialog({ title: 'Crea aggregato', message: 'Sicuro di voler creare questo aggregato?' })
      .then(() => {
        handleCreate();
      })
      .catch(() => {});
  };

  const handleSaveClick = () => {
    confirmDialog({ title: 'Salva modifiche', message: 'Sicuro di voler salvare le modifiche?' })
      .then(() => {
        handleSave();
      })
      .catch(() => {});
  };

  const handleDeleteClick = () => {
    confirmDialog({
      title: 'Elimina modifiche',
      message: 'Sicuro di voler eliminare le modifiche?',
    })
      .then(() => {
        handleDelete();
      })
      .catch(() => {});
  };

  const CreateButton = (
    <Button variant="outlined" type="submit" disabled={!isValid} onClick={handleCreateClick}>
      Crea
    </Button>
  );

  const UpdateButton = (
    <Button variant="outlined" type="submit" disabled={!isValid} onClick={handleSaveClick}>
      Salva
    </Button>
  );

  const DeleteButton = (
    <Button
      variant="outlined"
      type="submit"
      color="error"
      disabled={!isValid}
      onClick={handleDeleteClick}
    >
      Elimina
    </Button>
  );

  return (
    <>
      <form data-testid="aggregate-form">
        <Grid item container>
          <Grid item container spacing={2} alignItems="center">
            {fields.map(
              (field) =>
                !field.hidden && (
                  <Grid
                    item
                    key={field.name + 'Item'}
                    xs={12}
                    lg={field.size ? field.size : 3}
                    xl={field.size ? field.size : 3}
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
                            {errors[field.name] ? (errors[field.name]?.message as string) : ' '}
                          </FormHelperText>
                        </>
                      )}
                    />
                  </Grid>
                )
            )}
          </Grid>
        </Grid>
      </form>
      {isUserWriter && (
        <Grid item container spacing={2}>
          {isCreate ? (
            <Grid item>{CreateButton}</Grid>
          ) : (
            <>
              <Grid item>{UpdateButton}</Grid>
              <Grid item>{DeleteButton}</Grid>
            </>
          )}
        </Grid>
      )}
    </>
  );
};

export default AggregateForm;
