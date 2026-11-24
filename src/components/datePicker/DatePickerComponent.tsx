import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, isValid, parseISO, parse } from 'date-fns';
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

  const toDate = (value: string | Date) => {
    if (!value) return null;
    if (value instanceof Date) return value;
    const iso = parseISO(value);
    if (isValid(iso)) return iso;
    const parsed = parse(value, dateFormat, new Date());
    return isValid(parsed) ? parsed : null;
  };

  const pickerValue = toDate(props.value);

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
        : new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1)).toISOString();
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
