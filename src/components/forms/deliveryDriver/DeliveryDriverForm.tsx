import { Card, FormHelperText, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { AxiosError } from 'axios';
import { DeliveryDriver } from '../../../model';

import { createDeliveryDriver } from '../../../api/paperChannelApi';
import * as snackbarActions from '../../../redux/snackbarSlice';
import { FormField } from '../../formFields/FormFields';
import { useAppDispatch } from '../../../redux/hook';
import { fieldsDriver, FieldTypesDriver } from './fields';

const initialValue = (data: DeliveryDriver): { [x: string]: any } => ({
  ...data,
});

interface PropsDeliveryBox {
  fsu: boolean;
  tenderCode: string;
  initialValue: DeliveryDriver | undefined;
  onChanged?: (value: DeliveryDriver) => void;
}

export function DeliveryDriverForm(props: PropsDeliveryBox) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue(props.initialValue ? props.initialValue : ({} as DeliveryDriver)),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = (data: { [x: string]: any }) => {
    const driver = {
      ...data,
      fsu: props.fsu,
    } as DeliveryDriver;
    void saveOrUpdate(driver);
  };

  const saveOrUpdate = async (driver: DeliveryDriver) => {
    try {
      setLoading(true);
      await createDeliveryDriver(props.tenderCode, driver);
      setLoading(false);
      props.onChanged?.(driver);
      dispatch(snackbarActions.updateSnackbarOpened(true));
      dispatch(snackbarActions.updateStatusCode(200));
      const updateString = props.initialValue ? 'aggiornato' : 'salvato';
      dispatch(snackbarActions.updateMessage('Recapitista ' + updateString + ' correttamente'));
    } catch (e) {
      let message = 'Errore durante il salvataggio del recapitista';
      if (e instanceof AxiosError && e.response?.data?.detail) {
        message = e.response?.data?.detail;
      }
      dispatch(snackbarActions.updateSnackbarOpened(true));
      dispatch(snackbarActions.updateStatusCode(400));
      dispatch(snackbarActions.updateMessage(message));
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
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
            <Typography variant="h5" component="div">
              {props.initialValue?.taxId
                ? props.fsu
                  ? 'Modifica FSU'
                  : 'Modifica recapitista'
                : props.fsu
                ? 'Nuovo FSU'
                : 'Nuovo recapitista'}
            </Typography>
          </Grid>
          <Grid item container>
            <Grid item container spacing={1} alignItems="center">
              {(Object.keys(fieldsDriver) as Array<FieldTypesDriver>).map((field) => (
                <Grid
                  item
                  key={fieldsDriver[field].name + 'Item'}
                  width={fieldsDriver[field].size}
                  sx={{ paddingLeft: 0 }}
                >
                  <Controller
                    key={field}
                    control={control}
                    name={field}
                    rules={fieldsDriver[field].rules}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <>
                        <FormField
                          error={error}
                          key={field}
                          field={fieldsDriver[field]}
                          onChange={onChange}
                          value={value}
                        />
                        <FormHelperText error>
                          {errors[field] ? (errors[field]?.message as string) : ' '}
                        </FormHelperText>
                      </>
                    )}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction="row" justifyContent={'right'}>
          <LoadingButton
            loading={loading}
            data-testid={'btn-save-driver'}
            variant={'contained'}
            type={'submit'}
          >
            Salva
          </LoadingButton>
        </Grid>
      </Card>
    </form>
  );
}
