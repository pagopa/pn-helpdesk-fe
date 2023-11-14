import { Grid, FormHelperText, Button, DialogContent, DialogActions } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { AxiosError } from 'axios';
import { FormField } from '../../formFields/FormFields';
import { Cost } from '../../../model';
import { CostDTO } from '../../../api/paperChannel';
import { createCost } from '../../../api/paperChannelApi';
import * as snackbarActions from '../../../redux/snackbarSlice';
import { useAppDispatch } from '../../../redux/hook';
import { fieldsCosts, fieldsOfType } from './fields';

interface CostFormProps {
  fsu: boolean;
  tenderCode: string;
  driverCode: string;
  cost?: Cost;
  onSave: () => void;
  onCancel?: () => void;
}

export function CostsForm(props: CostFormProps) {
  const [fields, setFields] = useState<Array<string>>(
    props?.cost?.type ? fieldsOfType[props?.cost?.type] : ['type']
  );
  const [typeOfCost, setTypeOfCost] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const { handleSubmit, control, getValues, reset } = useForm({
    defaultValues: props.cost,
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  // const watchAllFields = useWatch({ name: selectTypeCostItems[selectCostType], control });
  const watchTypeCost = useWatch({ name: 'type' as keyof Cost, control });

  useEffect(() => {
    const values = getValues();
    if (values.type && typeOfCost !== values.type) {
      reset({
        type: values.type,
        price: values.price,
        priceAdditional: values.priceAdditional,
      });
      setTypeOfCost(values.type);
      setFields(fieldsOfType[values.type]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchTypeCost]);

  const onSubmit = async (data: Cost) => {
    const value = {
      uid: props.cost?.uid,
      price: data.price,
      priceAdditional: data.priceAdditional,
      zone: data.zone,
      cap: data.cap,
      productType:
        data.type === 'NATIONAL' ? data.nationalProductType : data.internationalProductType,
    } as CostDTO;

    try {
      setSubmitting(true);
      await createCost(props.tenderCode, props.driverCode, value);
      setSubmitting(false);
      props.onSave?.();
    } catch (e) {
      let message = 'Errore durante il salvataggio del costo';
      let status = 400;
      if (e instanceof AxiosError && e.response?.status) {
        status = e.response.status;
        if (e.response?.data?.detail) {
          message = e.response.data.detail;
        }
      }
      setSubmitting(false);
      dispatch(snackbarActions.updateSnackbacrOpened(true));
      dispatch(snackbarActions.updateStatusCode(status));
      dispatch(snackbarActions.updateMessage(message));
    }
  };

  return (
    <form id={'costForm'} onSubmit={handleSubmit((data) => onSubmit(data))}>
      <DialogContent>
        <Grid item container spacing={1} sx={{ paddingTop: '1rem' }}>
          {fields.map((item) => (
            <Grid
              item
              key={fieldsCosts[item].name + 'Item'}
              width={fieldsCosts[item].size}
              sx={{ paddingLeft: 0 }}
            >
              <Controller
                key={item}
                control={control}
                name={item as keyof Cost}
                rules={fieldsCosts[item].rules}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <>
                    <FormField
                      error={error}
                      key={item}
                      field={
                        item === 'cap'
                          ? { ...fieldsCosts[item], fsu: props.fsu }
                          : fieldsCosts[item]
                      }
                      onChange={onChange}
                      value={value}
                    />
                    <FormHelperText error>{error?.message}</FormHelperText>
                  </>
                )}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props?.onCancel} variant="outlined" data-testid={'btn-cancel-cost'}>
          Annulla
        </Button>
        <LoadingButton
          variant="outlined"
          data-testid={'btn-save-cost'}
          loading={submitting}
          autoFocus
          onClick={handleSubmit(onSubmit)}
        >
          Salva
        </LoadingButton>
      </DialogActions>
    </form>
  );
}
