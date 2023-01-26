import React from "react";
import {
  Card,
  Typography,
  Grid, Stack, Button,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import {FormField} from "../../formFields/FormFields";
import {FormHelperText} from "@mui/material";
import {NoteAdd, Reply} from "@mui/icons-material";
import {useAppDispatch} from "../../../redux/hook";
import {Tender} from "../../../model";
import {addedTender} from "../../../redux/formTender/reducers";
import {format} from "date-fns";
import {fieldsTender} from "./fields";



const defaultFormValues: { [key: string]: any } = {
  "dateInterval": [new Date(), new Date()]
};

export default function TenderFormBox() {
  const fields = ["nameTender", "dateInterval"];
  const dispatch = useAppDispatch();

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


    dispatch(addedTender({data: tenderMap(data), key: 1}))
  }

  const onSubmitWithUpload = async (data: { [x: string]: any }) => {
    dispatch(addedTender({data: tenderMap(data), key: 2}))
  }

  const tenderMap = (data: { [x: string]: any }) => {
    const fromDate = (data["dateInterval"][0] && data["dateInterval"][0] instanceof Date) ? format( data["dateInterval"][0], "yyyy-MM-dd'T'HH:mm:ss.sss'Z'") : data["dateInterval"][0];
    const onDate = (data["dateInterval"][1] && data["dateInterval"][1] instanceof Date) ? format( data["dateInterval"][1], "yyyy-MM-dd'T'HH:mm:ss.sss'Z'") : data["dateInterval"][1];

    const tender: Tender = {
      description: data["nameTender"],
      startDate: fromDate,
      endDate: onDate,
    }
    return tender;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{width:"100%"}}>
      <Stack spacing={2} sx={{width: 1}} >
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
        </Card>

        <Grid item container direction="row" justifyContent="space-between">
          <Button variant={"outlined"} startIcon={<Reply/>}>Annulla</Button>
          <Stack direction={"row"} spacing={3}>
            <Button variant={"outlined"} startIcon={<NoteAdd/>} onClick={handleSubmit(onSubmitWithUpload)}>Carica</Button>
            <Button variant={"contained"} type={"submit"} >Avanti</Button>
          </Stack>
        </Grid>
      </Stack>
    </form>
  );
}