import {
  Grid,
  FormHelperText, Button, DialogContent, DialogActions,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Controller, useForm, useWatch} from "react-hook-form";
import {FormField} from "../../formFields/FormFields";
import {fieldsCosts, fieldsOfType} from "./fields";
import {Cost} from "../../../model";
import {CostDTO} from "../../../api/paperChannel";
import {createCost} from "../../../api/paperChannelApi";
import * as snackbarActions from "../../../redux/snackbarSlice";
import {useAppDispatch} from "../../../redux/hook";
import {LoadingButton} from "@mui/lab";
import {AxiosError} from "axios";


interface CostFormProps {
  fsu: boolean,
  tenderCode:string,
  driverCode: string
  cost ?: Cost,
  onSave : () => void,
  onCancel ?: () => void
}

export function CostsForm(props:CostFormProps) {
  const [fields, setFields] = useState<string[]>((props?.cost?.type) ? fieldsOfType[props?.cost?.type] : ["type"]);
  const [typeOfCost, setTypeOfCost] = useState<string | undefined>( undefined);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    getValues,
    reset,
  } = useForm({
    defaultValues: props.cost,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  //const watchAllFields = useWatch({ name: selectTypeCostItems[selectCostType], control });
  const watchTypeCost = useWatch({name: "type" as keyof Cost, control});

  useEffect(() => {
    const values = getValues();
    if (values.type && typeOfCost !== values.type){
      reset({
        type: values.type,
        price: values.price,
        priceAdditional: values.priceAdditional
      });
      setTypeOfCost(values.type);
      setFields(fieldsOfType[values.type]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchTypeCost]);



  const onSubmit = async (data:Cost) => {
    const value = {
      uid: props.cost?.uid,
      price: data.price,
      priceAdditional: data.priceAdditional,
      zone: data.zone,
      cap: data.cap,
      productType: (data.type === "NATIONAL") ? data!.nationalProductType : data!.internationalProductType
    } as CostDTO
    setSubmitting(true);
    createCost(props.tenderCode, props.driverCode, value, (response) => {
      setSubmitting(false);
      props.onSave?.();
    }, (e) => {
      let message = "Errore durante il salvataggio del costo"
      let status = 400
      if (e instanceof AxiosError && e.response?.status){
        status = e.response.status
        if (e.response?.data?.detail){
          message = e.response.data.detail
        }
      }
      setSubmitting(false);
      dispatch(snackbarActions.updateSnackbacrOpened(true));
      dispatch(snackbarActions.updateStatusCode(status));
      dispatch(snackbarActions.updateMessage(message));
    })
  }

  return (
    <form id={"costForm"} onSubmit={handleSubmit((data) => onSubmit(data))} >
      <DialogContent>
        <Grid item container spacing={1} sx={{paddingTop:"1rem"}}>
          {
            fields.map(item => (
              <Grid
                item
                key={fieldsCosts[item].name + "Item"}
                width={fieldsCosts[item].size}
                sx={{paddingLeft: 0}}
              >
                <Controller
                  key={item}
                  control={control}
                  name={item as keyof Cost}
                  rules={fieldsCosts[item].rules}
                  render={({
                             field: { onChange, onBlur, value, name, ref },
                             fieldState: { invalid, isTouched, isDirty, error },
                             formState,
                           }) => (
                    <>
                      <FormField
                        error={error}
                        key={item}
                        field={(item === "cap") ? {...fieldsCosts[item], fsu: props.fsu} :fieldsCosts[item]}
                        onChange={onChange}
                        value={value}
                      />
                      <FormHelperText error>
                        {error?.message}
                      </FormHelperText>
                    </>
                  )}
                />
              </Grid>
            ))
          }
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props?.onCancel}>Annulla</Button>
        <LoadingButton loading={submitting} autoFocus onClick={handleSubmit(onSubmit)}>
          Salva
        </LoadingButton>
      </DialogActions>
    </form>
  );
};