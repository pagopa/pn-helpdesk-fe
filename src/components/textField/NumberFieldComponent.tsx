import React from "react";
import {NumericFormat, NumericFormatProps} from "react-number-format";

import { TextField } from "@mui/material";
import { FieldsProps } from "../formFields/FormFields";

type Props = {
  field: FieldsProps;
  onChange?: any;
  value?: any;
  onBlur: any;
  error?: any;
};

const NumberFieldComponent = (props: Props) => {
  const field = props.field;
  return (
    <TextField
      required={field.required}
      fullWidth
      type={field.type}
      hidden={field.hidden!}
      value={props.value}
      id={field.label}
      label={field.label}
      variant="outlined"
      error={!!props.error}
      onBlur={props.value && props.value.length ? props.onBlur : () => {}}
      //onChange={(e) => props.onChange(e)}
      InputProps={{
        inputComponent: NumericFormatCustom as any
      }}
      disabled={props.field.disabled}
    />
  );
};
export default NumberFieldComponent;

interface CustomProps {
  onChange: (event: { target: { name: string; value: number|undefined } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.floatValue,
            },
          });
        }}
        allowNegative={false}
        decimalScale={2}
        decimalSeparator=","
      />
    );
  },
);