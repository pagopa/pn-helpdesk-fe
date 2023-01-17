import { TextField } from "@mui/material";
import { FieldsProps } from "../formFields/FormFields";

/**
 * @typedef {Object} Props
 */
type Props = {
  /**
   * field properties
   */
  field: FieldsProps;
  /**
   * function for handling changes in this textfield
   */
  onChange?: any;
  /**
   * value of the field
   */
  value?: any;
  /**
   * function for handling blur of this textfield
   */
  onBlur: any;
  /**
   * if there is an error for that field
   */
  error?: any;
};

/**
 * Common textfield component used for generating the app fields
 * @component
 * @param {Props} props
 */
const TextFieldComponent = (props: Props) => {
  const field = props.field;
  return (
    <TextField
      required={field.required}
      inputProps={field.inputProps ? field.inputProps : {}}
      InputProps={field.InputProps ? field.InputProps : {}}
      fullWidth
      type={field.type}
      hidden={field.hidden!}
      value={props.value}
      id={field.label}
      label={field.label}
      variant="outlined"
      error={props.error ? true : false}
      onBlur={props.value && props.value.length ? props.onBlur : () => {}}
      onChange={(e) =>
        field.name === "taxId"
          ? props.onChange(e.target.value.toUpperCase())
          : props.onChange(e)
      }
      disabled={props.field.disabled}
    />
  );
};
export default TextFieldComponent;
