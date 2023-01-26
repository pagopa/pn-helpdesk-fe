import {FieldsProps} from "../../formFields/FormFields";
import {regex} from "../../../helpers/validations";
import {errorMessages} from "../../../helpers/messagesConstants";
import {isBefore, isSameDay} from "date-fns";

export const fieldsTender: { [key:string]: FieldsProps } = {

  "description": {
    name: "description",
    componentType: "textfield",
    label: "Identificativo",
    hidden: false,
    size: "50%",
    rules: {
      pattern: {
        value: regex.ALPHA_NUMERIC_WITHOUT_SPECIAL_CHAR_PATTERN,
        message: errorMessages.INCORRECT,
      },
      required: errorMessages.REQUIRED,
    },
    required: true,
  },
  "dateInterval": {
    name: "dateInterval",
    componentType: "dateRangePicker",
    label: "Data inizio e fine",
    hidden: false,
    required: true,
    intervalLimit: ["months"],
    size: "60.5%",
    disableFuture: false,
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

}