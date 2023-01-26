import {
  Grid,
  FormHelperText,
} from "@mui/material";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {FormField} from "../../formFields/FormFields";

import {fieldsCosts} from "./fields";

const defaultFormValues: { [key: string]: any } = {
  "dateInterval": [new Date(), new Date()]
};

export default function CostsBox({fsu: boolean}:any) {

  const fields = ["selectTypeCost", "inputBaseCost", "selectCapCost", "inputAdditionalCost", "selectZoneCost", "selectProductType"];

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormValues,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

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