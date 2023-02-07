import {Card, FormHelperText, Grid, Typography,} from "@mui/material";
import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {FormField} from "../../formFields/FormFields";

import {fieldsDriver} from "./fields";
import {DeliveryDriver} from "../../../model";

import {LoadingButton} from "@mui/lab";
import {createDeliveryDriver} from "../../../api/paperChannelApi";
import {useAppDispatch} from "../../../redux/hook";
import {addedFSU} from "../../../redux/formTender/reducers";

const initialValue = (data:DeliveryDriver):{ [x: string]: any } => (
  {
    ...data
  }
)

interface PropsDeliveryBox{
  fsu: boolean
  tenderCode: string
  initialValue: DeliveryDriver | undefined
}

export default function DeliveryDriverFormBox(props:PropsDeliveryBox) {
  const fields = ["taxId", "businessName", "denomination", "registeredOffice", "fiscalCode", "pec", "phoneNumber", "uniqueCode"];
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue((props.initialValue) ? props.initialValue : {} as DeliveryDriver),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data: { [x: string]: any }) => {
    const driver = {
      ...data,
      fsu: props.fsu
    } as DeliveryDriver
    setLoading(true);
    createDeliveryDriver(props.tenderCode, driver, handleSaved, handleError);
  }

  const handleSaved = (data:DeliveryDriver) => {
    setLoading(false);
    if (data.fsu){
      dispatch(addedFSU(data));
    }
  }

  const handleError = (e:any) => {
    setLoading(false);
  }


  return (
    <form data-testid='deliverydriverform' onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Card elevation={24}
            sx={{
              width: 1,
              padding: "1rem 2rem",
              boxShadow: "0px 3px 3px -2px ",
              backgroundColor: "background.paper",
            }}
          >
        <Grid container rowSpacing={2}>
          <Grid item>
            <Typography variant="h5" component="div"> Nuovo FSU </Typography>
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
        <Grid item container direction="row" justifyContent={"right"}>
          <LoadingButton loading={loading} variant={"contained"} type={"submit"}>Salva</LoadingButton>
        </Grid>
      </Card>
    </form>
  );
};