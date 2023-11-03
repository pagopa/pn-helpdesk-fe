import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CalendarPickerView } from '@mui/lab';
import { useState } from 'react';
import { FormHelperText, Grid } from '@mui/material';
import { format } from 'date-fns';
import { FieldsProps } from '../formFields/FormFields';

/**
 * @typedef {Object} DatePicker
 */
type DatePickerType = {
  /**
   * label of the field
   */
  label: string;
  /**
   * calendar type
   */
  view: Array<CalendarPickerView>;
  /**
   * value of the field if there is any
   */
  value: string;
};

/**
 * @typedef {Object} Props
 */
type Props = {
  /**
   * the two dates information
   */
  datePickers: Array<DatePickerType>;
  /**
   * function handling the change of the field
   */
  onChange: any;
  /**
   * the limit of the difference between the start date and the end date
   */
  intervalLimit?: Array<number | string>;
  /**
   * if the field is required
   */
  required: boolean;
  /**
   * function handling onBlur event used for onCLose of the date picker
   */
  onBlur: any;
  /**
   * field properties
   */
  field: FieldsProps;
  /**
   * if there is an error for that field
   */
  error?: any;
};

/**
 * Component representing a interaval dates picker
 * @component
 */
const DateRangePickerComponent = (props: Props) => {
  /**
   * the two dates information
   */
  const [dates, setDates] = useState(props.datePickers);

  /**
   * handle the change of some of the date fields
   * @param value  the selected date
   * @param field which field is changed
   */
  /* istanbul ignore next */
  const handleChange = (value: any, field: number) => {
    const date =
      props.field.name !== 'monthInterval'
        ? format(value, 'yyyy-MM-dd')
        : format(new Date(value.setHours(0, 0, 0, 0)), "yyyy-MM-dd'T'HH:mm:ss.sss'Z'");
    const prevState = [...dates];
    switch (field) {
      case 0:
        prevState[0] = { ...prevState[0], value: date };
        setDates(prevState);
        break;
      case 1:
        prevState[1] = { ...prevState[1], value: date };
        setDates(prevState);
        break;
    }
    props.onChange([prevState[0].value, prevState[1].value]);
  };

  return (
    <Grid item container spacing={2} data-testid="data-range-picker">
      {dates.map((date, index) => (
        <Grid item key={date.label} xs={12} lg={6} sx={{ paddingRight: '0px!important' }}>
          <DatePicker
            views={date.view}
            key={date.label}
            label={date.label}
            value={date.value}
            onChange={(e) => handleChange(e, index)}
            onClose={props.onBlur}
            disableFuture={props.field.disableFuture}
            inputFormat={props.field.format || 'dd-MM-yyyy'}
            mask={'__-__-____'}
            maxDate={
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              props.field.name === 'monthInterval' ? new Date(props.field.maxDate!) : undefined
            }
            renderInput={(params) => (
              <>
                <TextField
                  {...params}
                  onKeyDown={(e) => e.preventDefault()}
                  onBlur={props.onBlur}
                  required={props.required}
                  error={props.error ? true : false}
                  fullWidth
                />
                <FormHelperText error>{props.error ? props.error.message : ' '}</FormHelperText>
              </>
            )}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DateRangePickerComponent;
