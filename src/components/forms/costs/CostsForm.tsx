import {
  Grid,
  FormHelperText,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Controller, useForm, useWatch} from "react-hook-form";
import {FormField} from "../../formFields/FormFields";

import {fieldsCosts, selectTypeCostItems} from "./fields";

const defaultFormValues: { [key: string]: any } = {
  "selectTypeCost": "CAP"
};

export default function CostsBox({fsu: boolean}:any) {
  const [fields, setFields] = useState<string[]>(["selectTypeCost"]);

  const [selectCostType, setSelectCostType] = useState<string>(
    Object.keys(selectTypeCostItems)[0]
  );


  const {
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: defaultFormValues,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const watchAllFields = useWatch({ name: selectTypeCostItems[selectCostType], control });
  const watchSelectedType = useWatch({ name: "selectTypeCost", control });


  useEffect(()=>{
    const values = getValues();
    console.log(values);
    if (values["selectTypeCost"]){
      reset({
        ...defaultFormValues,
        "selectTypeCost": values["selectTypeCost"],
      });
      setSelectCostType(values["selectTypeCost"].toString())
    }
  }, [watchSelectedType]);

  useEffect(() => {
    setFields(selectTypeCostItems[selectCostType]);
  }, [selectCostType])

  const onSubmit = async (data: { [x: string]: any }) => {
    console.log("onsubmit");
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Grid item container spacing={1} sx={{paddingTop:"1rem"}}>
        {
          fields.map(field => (
            <Grid
              item
              key={fieldsCosts[field].name + "Item"}
              width={fieldsCosts[field].size}
              sx={{paddingLeft: 0}}
            >
              <Controller
                key={field}
                control={control}
                name={field}
                rules={fieldsCosts[field].rules}
                render={({
                           field: { onChange, onBlur, value, name, ref },
                           fieldState: { invalid, isTouched, isDirty, error },
                           formState,
                         }) => (
                  <>
                    <FormField
                      error={error}
                      key={field}
                      field={fieldsCosts[field]}
                      onChange={onChange}
                      value={value}
                    />
                    <FormHelperText error>
                      {errors[field] ? errors[field].message : " "}
                    </FormHelperText>
                  </>
                )}
              />
            </Grid>
          ))
        }
      </Grid>
    </form>
  );
};