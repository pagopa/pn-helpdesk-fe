import {
  Grid,
  FormHelperText, Button, DialogContent, DialogActions,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Controller, useForm, useWatch} from "react-hook-form";
import {FormField} from "../../formFields/FormFields";
import {fieldsCosts, fieldsOfType} from "./fields";
import {useAppDispatch} from "../../../redux/hook";
import {Cost} from "../../../model";


interface CostFormProps {
  fsu: boolean,
  data ?: Cost,
  position ?: number,
  onSave : (data:Cost, position?:number) => void,
  onCancel: () => void
}

export default function CostsForm(props:CostFormProps) {
  const [fields, setFields] = useState<string[]>((props?.data?.type) ? fieldsOfType[props?.data?.type] : ["type"]);
  const [typeOfCost, setTypeOfCost] = useState<String | undefined>( undefined);

  const {
    handleSubmit,
    control,
    getValues,
    reset,
  } = useForm({
    defaultValues: props.data,
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
    props.onSave?.(data, props.position)
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
                        field={fieldsCosts[item]}
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
        <Button onClick={props.onCancel}>Annulla</Button>
        <Button autoFocus onClick={handleSubmit(onSubmit)}>
          Salva
        </Button>
      </DialogActions>
    </form>
  );
};