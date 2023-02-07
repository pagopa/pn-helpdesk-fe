import React from "react";
import {
  Card,
  Typography,
  Grid, Stack,
} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {FormField} from "../../formFields/FormFields";
import {FormHelperText} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../redux/hook";
import {Tender} from "../../../model";
import {format} from "date-fns";
import {fieldsTender} from "./fields";
import {createTender} from "../../../redux/formTender/actions";
import {LoadingButton} from "@mui/lab";



const initialValue = (data?:Tender):{ [x: string]: any } => (
  {
    description: data?.description,
    dateInterval:[(data?.startDate) ? data?.startDate : new Date(), (data?.endDate) ? data?.endDate: new Date()]
  }
)

export default function TenderFormBox() {
  const fields = ["description", "dateInterval"];
  const formState = useAppSelector(state => state.tenderForm);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue(formState.formTender.value),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data: { [x: string]: any }) => {
    dispatch(createTender(tenderMap(data)));
  }


  const tenderMap = (data: { [x: string]: any }) => {
    const fromDate = (data["dateInterval"][0] && data["dateInterval"][0] instanceof Date) ? format( data["dateInterval"][0], "yyyy-MM-dd'T'HH:mm:ss.sss'Z'") : data["dateInterval"][0];
    const onDate = (data["dateInterval"][1] && data["dateInterval"][1] instanceof Date) ? format( data["dateInterval"][1], "yyyy-MM-dd'T'HH:mm:ss.sss'Z'") : data["dateInterval"][1];

    const tender: Tender = {
      description: data["description"],
      startDate: fromDate,
      endDate: onDate,
      code: (formState.formTender?.value?.code) ? formState.formTender?.value?.code : undefined
    }
    return tender;
  }



  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{width:"100%"}}>
      <Card
        elevation={24}
        sx={{
          width: 1,
          padding: "1rem 2rem",
          boxShadow: "0px 3px 3px -2px ",
          backgroundColor: "background.paper",
        }}
      >
        <Stack spacing={3}>
          <Typography
            variant="h5"
            component="div">
            Informazione sulla Gara
          </Typography>

          <Grid item container direction="column" rowSpacing={2}>
            {
              fields.map(field => (
                <Controller
                  key={field}
                  control={control}
                  name={field}
                  rules={fieldsTender[field].rules}
                  render={({
                             field: { onChange, onBlur, value, name, ref },
                             fieldState: { invalid, isTouched, isDirty, error },
                             formState,
                           }) => (
                    <>
                      <FormField
                        error={error}
                        key={field}
                        field={fieldsTender[field]}
                        onChange={onChange}
                        value={value}
                      />
                      <FormHelperText error>
                        {errors[field] ? errors[field].message : " "}
                      </FormHelperText>
                    </>
                  )}
                />
              ))
            }
          </Grid>

        </Stack>
        <Grid item container direction="row" justifyContent={"right"}>
          <LoadingButton loading={formState.formTender.loading} variant={"contained"} type={"submit"}>Salva</LoadingButton>
        </Grid>
      </Card>
    </form>
  );
}

