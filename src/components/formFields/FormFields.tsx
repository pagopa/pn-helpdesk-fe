import TextFieldComponent from "../textField/TextFieldComponent";
import RadioButtonsGroup from "../radioButtonsGroup/RadioButtonsGroup";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import SelectField from "../selectField/SelectField";
import { regex } from "../../helpers/validations";
import DatePickerComponent from "../datePicker/DatePickerComponent";
import DateRangePickerComponent from "../dataRangePicker/DataRangePickerComponent";
import { CalendarPickerView } from "@mui/lab";
import { errorMessages } from "../../helpers/messagesConstants";
import { format, isSameDay, isBefore } from "date-fns";

/**
 * Items for the Tipo Estrazione and their coresponding fields
 */
let MenuItems: { [key: string]: Array<string> } = {
  "Ottieni EncCF": ["ticketNumber", "taxId", "recipientType"],
  "Ottieni CF": ["personId"],
  "Ottieni notifica": ["ticketNumber", "iun"],
  "Ottieni notifiche di una PA": [
    "ticketNumber",
    "publicAuthorityName",
    "monthInterval",
  ],
  // use case 9 dissabled for now
  // "Ottieni log completi + organizzazione": ["ticketNumber", "taxId", "Time interval"],
  "Ottieni log completi": ["ticketNumber", "taxId", "iun", "personId"],
  "Ottieni log di processo": ["traceId", "Time interval"],
};

/**
 * @typedef {Object} FieldsProps
 */
type FieldsProps = {
  /**
   * the type of the component: "textfield" | "select" | "radioButtons"
   */
  componentType: string;
  /**
   * label to be shown with the field
   */
  label: string;
  /**
   * items in case the component is select menu
   */
  selectItems?: Array<string>;
  /**
   * if the field is shown or hidden
   */
  hidden: boolean;
  /**
   * name of the component
   */
  name: string;
  /**
   * options in case the component is redionButtons
   */
  options?: Array<{ [key: string]: string }>;
  /**
   * the type of the text field
   */
  type?: string;

  /**
   * validation rules
   */
  rules?: any;
  /**
   * if the component is a calendar, it is its type
   */
  view?: CalendarPickerView[];
  /**
   * the format of the date, if the component is a calendar
   */
  format?: string;
  /**
   * if the field is required
   */
  required?: boolean;
  /**
   * size of the field in percents
   */
  size?: string;
  /**
   * some additional input props for text fields
   */
  inputProps?: {};
  /**
   * some additional input props for text fields
   */
  InputProps?: {};
  /**
   * time interval limit for date ranges
   */
  intervalLimit?: Array<string | number>;
  /**
   * time interval min date
   */
  minDate?: string;
  /**
   * time interval max date
   */
  maxDate?: string;
  /**
   * disabling future for date range pickers
   */
  disableFuture?: boolean;
  /**
   * size for datapicker components input fields
   */
  inputSize?: string;
};

/**
 * array containing all fields of the app and their neccessary properties
 */
let FieldsProperties: { [key: string]: FieldsProps } = {
  "Tipo Estrazione": {
    name: "Tipo Estrazione",
    componentType: "select",
    label: "Tipo Estrazione",
    hidden: false,
    selectItems: Object.keys(MenuItems),
  },
  "Ticket Number": {
    name: "ticketNumber",
    componentType: "textfield",
    label: "Numero Ticket",
    hidden: false,
    rules: {
      pattern: {
        value: regex.ALPHA_NUMERIC_WITHOUT_SPECIAL_CHAR_PATTERN,
        message: errorMessages.INCORRECT,
      },
      required: errorMessages.REQUIRED,
    },
    required: false,
  },
  "Codice Fiscale": {
    name: "taxId",
    componentType: "textfield",
    label: "Codice Fiscale",
    hidden: false,
    inputProps: { maxLength: 16, style: { textTransform: "uppercase" } },
    rules: {
      pattern: {
        value: regex.FISCAL_CODE_PATTERN,
        message: errorMessages.INCORRECT,
      },
      minLength: {
        value: 16,
        message: errorMessages.INCORRECT,
      },
      maxLength: {
        value: 16,
        message: errorMessages.INCORRECT,
      },
      required: errorMessages.REQUIRED,
    },
    required: false,
  },
  IUN: {
    name: "iun",
    componentType: "textfield",
    label: "IUN",
    inputProps: { maxLength: 25 },
    size: "30%",
    hidden: false,
    rules: {
      required: errorMessages.REQUIRED,
      pattern: {
        value: regex.IUN,
        message: errorMessages.INCORRECT,
      },
    },
    required: false,
  },
  "Unique Identifier": {
    name: "personId",
    componentType: "textfield",
    label: "Codice Univoco",
    hidden: false,
    size: "45%",
    rules: {
      pattern: {
        value: regex.UNIQUE_IDENTIFIER_PATTERN,
        message: errorMessages.INCORRECT,
      },
      minLength: {
        value: 1,
        message: errorMessages.UNIQUES_IDENTIFIER_LENGTH,
      },
      maxLength: {
        value: 100,
        message: errorMessages.UNIQUES_IDENTIFIER_LENGTH,
      },
      required: errorMessages.REQUIRED,
    },
    required: false,
  },
  "Codice IPA": {
    name: "publicAuthorityName",
    componentType: "textfield",
    label: "Nome PA",
    hidden: false,
    rules: {
      required: errorMessages.REQUIRED,
    },
    required: false,
  },
  "Trace ID": {
    name: "traceId",
    componentType: "textfield",
    label: "Trace ID",
    hidden: false,
    size: "45%",
    rules: {
      required: errorMessages.REQUIRED,
    },
    required: false,
  },
  Month: {
    name: "referenceMonth",
    componentType: "datePicker",
    label: "Mese",
    hidden: false,
    rules: {
      required: errorMessages.REQUIRED,
      valueAsDate: {
        value: true,
        message: errorMessages.INCORRECT,
      },
      validate: {
        required: (value: string) => {
          return value !== "Invalid date" || errorMessages.REQUIRED;
        },
      },
    },
    view: ["month", "year"],
    type: "month",
    format: "yyyy-MM",
    required: false,
  },
  "Month Interval": {
    name: "monthInterval",
    componentType: "dateRangePicker",
    label: "Month interval",
    hidden: false,
    required: false,
    intervalLimit: [1, "months"],
    format: "dd-MM-yyyy",
    disableFuture: false,
    size: "60%",
    maxDate: format(
      new Date(
        new Date(
          new Date(new Date().setUTCMonth(new Date().getMonth() + 1)).setHours(
            0,
            0,
            0,
            0
          )
        ).setUTCDate(0)
      ),
      "yyyy-MM-dd'T'HH:mm:ss.sss'Z'"
    ),
    rules: {
      required: errorMessages.REQUIRED,
      validate: {
        validateInterval: (dates: Array<any>) => {
          let startDate = new Date(dates[0]);
          let endDate = new Date(dates[1]);
          // the end date should be the 1st of the next month of start date or before that;
          //two dates need to be in the same month
          let maxDate = new Date(
            new Date(new Date(startDate).setUTCDate(2)).setUTCMonth(
              startDate.getUTCMonth() + 1
            )
          );
          return isBefore(endDate, maxDate) || errorMessages.ONE_MONTH_INTERVAL;
        },
        checkDates: (dates: Array<any>) => {
          let startDate = new Date(dates[0]);
          let endDate = new Date(dates[1]);
          return (
            isBefore(startDate, endDate) ||
            isSameDay(startDate, endDate) ||
            errorMessages.DATES_ORDER
          );
        },
      },
    },
  },
  "Time interval": {
    name: "Time interval",
    componentType: "dateRangePicker",
    label: "Time interval",
    hidden: false,
    required: false,
    intervalLimit: [3, "months"],
    size: "60.5%",
    disableFuture: true,
    rules: {
      required: errorMessages.REQUIRED,
      validate: {
        validateInterval: (dates: Array<any>) => {
          let startDate = new Date(dates[0]);
          let endDate = new Date(dates[1]);
          return (
            endDate.getMonth() - startDate.getMonth() < 3 ||
            (endDate.getMonth() - startDate.getMonth() === 3 &&
              startDate.getDate() >= endDate.getDate()) ||
            errorMessages.DATES_INTERVAL
          );
        },
        checkDates: (dates: Array<any>) => {
          let startDate = new Date(dates[0]);
          let endDate = new Date(dates[1]);
          return (
            isBefore(startDate, endDate) ||
            isSameDay(startDate, endDate) ||
            errorMessages.DATES_ORDER
          );
        },
      },
    },
  },
  "Date Picker": {
    name: "Date Picker",
    componentType: "datePicker",
    label: "Date",
    hidden: false,
    type: "date",
    rules: {
      required: errorMessages.REQUIRED,
      valueAsDate: {
        value: true,
        message: errorMessages.INCORRECT,
      },
    },
    view: ["day"],
    format: "yyyy-MM-dd",
    required: false,
  },
  "Person Radio Buttons": {
    name: "recipientType",
    componentType: "radioButtons",
    label: "Tipo personale",
    hidden: false,
    rules: {
      required: errorMessages.REQUIRED,
    },
    options: [
      {
        option: "Persona Fisica",
        value: "PF",
      },
      {
        option: "Persona Giuridica",
        value: "PG",
      },
    ],
  },
  "Deanonymization Checkbox": {
    name: "deanonimization",
    componentType: "checkbox",
    label: "Deanonimizzazione dati",
    hidden: false,
  },
  email: {
    name: "email",
    componentType: "textfield",
    label: "Email",
    hidden: false,
    rules: {
      required: errorMessages.INCORRECT_EMAIL,
      pattern: {
        value: regex.EMAIL,
        message: errorMessages.INCORRECT_EMAIL,
      },
    },
  },
  password: {
    name: "password",
    componentType: "textfield",
    label: "Password",
    hidden: false,
    type: "password",
    rules: {
      required: errorMessages.INCORRECT_PASSWORD,
      pattern: {
        value: regex.PASSWORD,
        message: errorMessages.INCORRECT_PASSWORD,
      },
    },
  },
};

/**
 * @typedef {Object} Props
 */
type Props = {
  field: FieldsProps;
  onChange?: any;
  value?: any;
  onBlur?: any;
  error?: any;
};

/**
 * Generating different components by specific properties
 * @component
 * @param {Props} props
 */
const FormField = ({ field, onChange, value, onBlur, error }: Props) => {
  const componentType: string = field.componentType;
  return (
    <Grid item container>
      {componentType === "textfield" && (
        <TextFieldComponent
          error={error}
          value={value}
          onChange={onChange}
          field={field}
          onBlur={onBlur}
        />
      )}
      {componentType === "select" && (
        <SelectField value={value} field={field} onChange={onChange} />
      )}
      {componentType === "radioButtons" && (
        <RadioButtonsGroup
          value={value}
          field={field}
          onChange={onChange}
        ></RadioButtonsGroup>
      )}
      {componentType === "checkbox" && (
        <FormControlLabel
          label={field.label}
          control={<Checkbox value={value} onChange={onChange} />}
        />
      )}
      {componentType === "datePicker" && (
        <DatePickerComponent
          onBlur={onBlur}
          field={field}
          onChange={onChange}
          value={value}
        />
      )}
      {componentType === "dateRangePicker" && (
        <DateRangePickerComponent
          field={field}
          onBlur={onBlur}
          required={field.required!}
          onChange={onChange}
          intervalLimit={field.intervalLimit}
          error={error}
          datePickers={[
            {
              label: "Dal",
              view: ["day"],
              value: value[0],
            },
            {
              label: "Al",
              view: ["day"],
              value: value[1],
            },
          ]}
        />
      )}
    </Grid>
  );
};

export { MenuItems, FormField, FieldsProperties };
export type { FieldsProps };
