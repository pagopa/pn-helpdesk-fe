import React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

import { TextField } from '@mui/material';
import { FieldsProps } from '../formFields/FormFields';

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
      sx={field.hidden ? { display: 'none' } : {}}
      value={props.value}
      id={field.label}
      label={field.label}
      variant="outlined"
      error={!!props.error}
      onBlur={props.value && props.value.length ? props.onBlur : undefined}
      disabled={props.field.disabled}
      slots={{
        input: NumericFormatCustom,
      }}
      slotProps={{
        htmlInput: { ...props },
      }}
    />
  );
};
export default NumberFieldComponent;

const NumericFormatCustom = React.forwardRef<NumericFormatProps, any>(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;
  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange(values.floatValue);
      }}
      allowNegative={false}
      decimalScale={2}
      decimalSeparator=","
    />
  );
});
