import React, {useState} from "react";
import {
  Card,
  Typography,
  Grid, Stack,
} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {FormField} from "../../formFields/FormFields";
import {FormHelperText} from "@mui/material";
import {Tender} from "../../../model";
import {format} from "date-fns";
import {fieldsTender} from "./fields";
import {LoadingButton} from "@mui/lab";
import {createTender} from "../../../api/paperChannelApi";



const initialValue = (data?:Tender):{ [x: string]: any } => (
  {
    name: data?.name,
    dateInterval:[(data?.startDate) ? data?.startDate : new Date(), (data?.endDate) ? data?.endDate: new Date()]
  }
)

interface TenderFormBoxProps {
  initialValue ?: Tender;
  onChanged ?: (value:Tender) => void
}

export default function TenderFormBox(props:TenderFormBoxProps) {
  const fields = ["name", "dateInterval"];
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue(props.initialValue),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data: { [x: string]: any }) => {
    setLoading(true);
    createTender(tenderMap(data), handleSuccessSaved, handelErrorSaved);
  }

  const handleSuccessSaved = (value:Tender) => {
    setLoading(false);
    props.onChanged?.(value);
  }

  const handelErrorSaved = (e:any) => {
    setLoading(false);
  }

  const tenderMap = (data: { [x: string]: any }) => {
    const fromDate = (data["dateInterval"][0] && data["dateInterval"][0] instanceof Date) ? format( data["dateInterval"][0], "yyyy-MM-dd'T'HH:mm:ss.sss'Z'") : data["dateInterval"][0];
    const onDate = (data["dateInterval"][1] && data["dateInterval"][1] instanceof Date) ? format( data["dateInterval"][1], "yyyy-MM-dd'T'HH:mm:ss.sss'Z'") : data["dateInterval"][1];

    const tender: Tender = {
      name: data["name"],
      startDate: fromDate,
      endDate: onDate,
      code: (props?.initialValue) ? props.initialValue.code : undefined
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
          <LoadingButton loading={loading} variant={"contained"} type={"submit"}>Salva</LoadingButton>
        </Grid>
      </Card>
    </form>
  );
}

