import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CalendarPickerView } from '@mui/lab';
import { FormHelperText, Grid } from '@mui/material';
import { format, parseISO, isValid } from 'date-fns';
import { FieldsProps } from '../formFields/FormFields';

type DatePickerType = {
  label: string;
  view: Array<CalendarPickerView>;
  value: string; // Manteniamo la stringa come formato di scambio dati
};

type Props = {
  datePickers: Array<DatePickerType>;
  onChange: any;
  intervalLimit?: Array<number | string>;
  required: boolean;
  onBlur: any;
  field: FieldsProps;
  error?: any;
  value?: Array<string>; // Riceve l'array dal FormField
};

const DateRangePickerComponent = (props: Props) => {
  const getValidDate = (dateStr: string) => {
    if (!dateStr) { return null; }
    const parsed = parseISO(dateStr);
    const validDate = isValid(parsed) ? parsed : new Date(dateStr);
    return isValid(validDate) ? validDate : null;
  };

  /* istanbul ignore next */
  const handleChange = (newValue: any, index: number) => {
    if (!newValue || !isValid(newValue)) { return; }

    const formattedDate =
      props.field.name !== 'monthInterval'
        ? format(newValue, 'yyyy-MM-dd')
        : format(new Date(newValue.setHours(0, 0, 0, 0)), "yyyy-MM-dd'T'HH:mm:ss.sss'Z'");

    const currentValues = props.datePickers.map(dp => dp.value);
    currentValues[index] = formattedDate;

    props.onChange(currentValues);
  };

  return (
    <Grid item container spacing={2} data-testid="data-range-picker">
      {props.datePickers.map((date, index) => (
        <Grid item key={date.label} xs={12} lg={6} sx={{ paddingRight: '0px!important' }}>
          <DatePicker
            views={date.view}
            label={date.label}
            value={getValidDate(date.value)}
            onChange={(e) => handleChange(e, index)}
            onClose={props.onBlur}
            disableFuture={props.field.disableFuture}
            inputFormat={props.field.format || 'dd-MM-yyyy'}
            mask={'__-__-____'}
            maxDate={
              props.field.name === 'monthInterval' && props.field.maxDate
                ? new Date(props.field.maxDate)
                : undefined
            }
            renderInput={(params) => (
              <>
                <TextField
                  {...params}
                  onKeyDown={(e) => e.preventDefault()}
                  onBlur={props.onBlur}
                  required={props.required}
                  error={!!props.error}
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