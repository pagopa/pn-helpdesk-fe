import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CalendarPickerView } from '@mui/lab';
import moment from 'moment';
import { FieldsProps } from './FormFields';

/**
 * @typedef {Object} Props
 */
type Props = {
  /**
   * field properties 
   */
  field: FieldsProps,
  /**
     * value of the field if there is any
  */
  value: string,
  /**
  * function handling the change of the field 
  */
  onChange: any,
  /**
  * function handling onBlur event used for onCLose of the date picker
  */
  onBlur: any
}

/**
 * Component representing a date picker 
 * @component
 */
const DatePickerComponent = (props: Props) => {

  const field = props.field

  /**
   * handle change of the date field
   * @param e the selected date
   */
  /* istanbul ignore next */
  const handleChange = (e: any) => {
      e =  moment(e).format(field.format!.toUpperCase())
      props.onChange(e);
  }

    return(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          views={field.view}
          key={field.label}
          label={field.label}
          value={props.value}
          onChange={e => handleChange(e)}
          disableFuture
          onClose={props.onBlur}
          inputFormat={field.format}
          mask={"____-__-__"} 
          renderInput={(params) => <TextField {...params} onBlur={props.onBlur} required={field.required} />}
        />
    </LocalizationProvider>
    )
}

export default DatePickerComponent;

