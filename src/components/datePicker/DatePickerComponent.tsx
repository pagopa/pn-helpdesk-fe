import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FieldsProps } from "../formFields/FormFields";
import { format } from "date-fns";

/**
 * @typedef {Object} Props
 */
type Props = {
  /**
   * field properties
   */
  field: FieldsProps;
  /**
   * value of the field if there is any
   */
  value: string;
  /**
   * function handling the change of the field
   */
  onChange: any;
  /**
   * function handling onBlur event used for onCLose of the date picker
   */
  onBlur: any;
};

/**
 * Component representing a date picker
 * @component
 */
const DatePickerComponent = (props: Props) => {
  const field = props.field;

  /**
   * handle change of the date field
   * @param e the selected date
   */
  /* istanbul ignore next */
  const handleChange = (e: any) => {
    e =
      field.name !== "referenceMonth"
        ? format(e, field.format!)
        : format(
            new Date(new Date(new Date(e).setUTCDate(1)).setHours(0, 0, 0, 0)),
            "yyyy-MM-dd'T'HH:mm:ss.sss'Z'"
          );
    props.onChange(e);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        views={field.view}
        key={field.label}
        label={field.label}
        value={props.value}
        onChange={(e) => handleChange(e)}
        disableFuture
        onClose={props.onBlur}
        inputFormat={field.format}
        mask={"__-__-____"}
        renderInput={(params) => (
          <TextField
            {...params}
            onBlur={props.onBlur}
            required={field.required}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
