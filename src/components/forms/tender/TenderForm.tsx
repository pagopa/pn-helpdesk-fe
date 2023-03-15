import React, {useState} from "react";
import {
  Card,
  Typography,
  Grid,
  Stack,
  FormHelperText
} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {FormField} from "../../formFields/FormFields";
import {Tender} from "../../../model";
import {format} from "date-fns";
import {fieldsTender} from "./fields";
import {LoadingButton} from "@mui/lab";
import {createTender} from "../../../api/paperChannelApi";
import * as snackbarActions from "../../../redux/snackbarSlice";
import {useAppDispatch} from "../../../redux/hook";



const initialValue = (data?:Tender):{ [x: string]: any } => (
  {
    name: data?.name || "",
    dateInterval:[(data?.startDate) ? data?.startDate : format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.ss'Z'"),
                  (data?.endDate) ? data?.endDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.ss'Z'")]
  }
)

interface TenderFormProps {
  initialValue ?: Tender;
  onChanged ?: (value:Tender) => void
}

export function TenderForm(props:TenderFormProps) {
  const fields = ["name", "dateInterval"];
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue(props.initialValue),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = (data: { [x: string]: any }) => {
    _creationTender(tenderMap(data))
  }

  const _creationTender = async (tender:Tender) => {
    const updateString = (props.initialValue?.code) ? "aggiornata" : "salvata"
    try {
      setLoading(true)
      const response = await createTender(tender);
      setLoading(false);
      props.onChanged?.(response);
      dispatch(snackbarActions.updateSnackbacrOpened(true));
      dispatch(snackbarActions.updateStatusCode(200));
      dispatch(snackbarActions.updateMessage("Gara " + updateString + " correttamente"));
    } catch(e){
      setLoading(false)
      dispatch(snackbarActions.updateSnackbacrOpened(true));
      dispatch(snackbarActions.updateStatusCode(400));
      dispatch(snackbarActions.updateMessage("Gara non " + updateString + " correttamente"));

    }
  }

  const tenderMap = (data: { [x: string]: any }) => {
    const fromDate = data["dateInterval"][0];
    const onDate = data["dateInterval"][1];

    const tender: Tender = {
      name: data["name"],
      startDate: fromDate,
      endDate: onDate,
      code: (props?.initialValue) ? props.initialValue.code : undefined,
      status: "CREATED"
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
          <LoadingButton data-testid={"btn-save-tender"}
                         loading={loading}
                         variant={"contained"}
                         type={"submit"}>
            Salva
          </LoadingButton>
        </Grid>
      </Card>
    </form>
  );
}

