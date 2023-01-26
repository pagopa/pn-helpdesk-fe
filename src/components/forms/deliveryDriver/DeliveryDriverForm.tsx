import {
  Card,
  Typography,
  Grid,
  FormHelperText,
  Button,
} from "@mui/material";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/hook";
import {Controller, useForm} from "react-hook-form";
import {FormField} from "../../formFields/FormFields";

import {fieldsDriver} from "./fields";
import {Add} from "@mui/icons-material";
import {DeliveryDriver} from "../../../model";
import {addedFSU, backStep} from "../../../redux/formTender/reducers";
import {showDialog} from "../../../redux/dialog/reducers";
import {TYPE_DIALOG} from "../../dialogs";

const initialValue = (data:DeliveryDriver):{ [x: string]: any } => (
  {
    ...data
  }
)

interface PropsDeliveryBox{
  fsu: boolean
}

export default function DeliveryDriverFormBox(props:PropsDeliveryBox) {

  const fields = ["taxId", "businessName", "denomination",
    "registeredOffice", "fiscalCode", "pec", "phoneNumber", "uniqueCode"];
  const formState = useAppSelector(state => state.tenderForm);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue((props.fsu) ? formState.formFsu: {} as DeliveryDriver),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data: { [x: string]: any }) => {
    const driver = {
      ...data,
      fsu: props.fsu
    } as DeliveryDriver
    dispatch(addedFSU({data:driver}));
  }

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Grid item container rowSpacing={2}>
        <Grid item container>
          <Card
            elevation={24}
            sx={{
              width: 1,
              padding: "1rem 2rem",
              boxShadow: "0px 3px 3px -2px ",
              backgroundColor: "background.paper",
            }}
          >
            <Grid container rowSpacing={2}>
              <Grid item>
                <Typography
                  variant="h5"
                  component="div">
                  Nuovo FSU
                </Typography>
              </Grid>
              <Grid item container>
                <Grid item container spacing={1} alignItems="center">
                  {
                    fields.map(field => (
                      <Grid
                        item
                        key={fieldsDriver[field].name + "Item"}
                        width={fieldsDriver[field].size}
                        sx={{paddingLeft: 0}}
                      >
                        <Controller
                          key={field}
                          control={control}
                          name={field}
                          rules={fieldsDriver[field].rules}
                          render={({
                                     field: { onChange, onBlur, value, name, ref },
                                     fieldState: { invalid, isTouched, isDirty, error },
                                     formState,
                                   }) => (
                            <>
                              <FormField
                                error={error}
                                key={field}
                                field={fieldsDriver[field]}
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
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item container>
          <Card
            elevation={24}
            sx={{
              width: 1,
              padding: "1rem 2rem",
              boxShadow: "0px 3px 3px -2px ",
              backgroundColor: "background.paper",
            }}
          >
            <Grid container
                  rowSpacing={2}
                  alignItems={"center"}
                  justifyContent="space-between">
              <Grid item>
                <Typography
                  variant="h5"
                  component="div">
                  Costi
                </Typography>

              </Grid>
              <Grid item>
                <Button variant={"outlined"} onClick={() => {
                  dispatch(showDialog({type: TYPE_DIALOG.DIALOG_COST_FORM}))
                }} startIcon={<Add />}>Aggiungi</Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item container direction="row" justifyContent="space-between">
          <Button onClick={() => dispatch(backStep({}))} variant={"outlined"}>Torna a {(props.fsu) ? "Gara" : "FSU"}</Button>
          <Button variant={"contained"} type={"submit"} >Avanti</Button>
        </Grid>
      </Grid>
    </form>
  );
};