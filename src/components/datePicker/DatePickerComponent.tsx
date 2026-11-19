import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, isValid, parse } from 'date-fns';
import { FieldsProps } from '../formFields/FormFields';

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
  value: string | Date;
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
  const dateFormat = field.format || 'yyyy-MM-dd';
  const pickerValue =
    props.value instanceof Date
      ? props.value
      : props.value
      ? parse(props.value, dateFormat, new Date())
      : null;

  /**
   * handle change of the date field
   * @param date the selected date
   */
  const handleChange = (date: Date | null) => {
    if (!date || !isValid(date)) {
      return;
    }

    const value =
      field.name !== 'referenceMonth'
        ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        format(date, dateFormat)
        : format(
            new Date(new Date(new Date(date).setUTCDate(1)).setHours(0, 0, 0, 0)),
            "yyyy-MM-dd'T'HH:mm:ss.sss'Z'"
          );
    props.onChange(value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        views={field.view}
        key={field.label}
        label={field.label}
        value={pickerValue && isValid(pickerValue) ? pickerValue : null}
        onChange={handleChange}
        disableFuture
        onClose={props.onBlur}
        format={dateFormat}
        slotProps={{
          textField: {
            onBlur: props.onBlur,
            required: field.required,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
