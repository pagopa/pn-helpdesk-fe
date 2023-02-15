import {FieldsProps} from "../../formFields/FormFields";
import {regex} from "../../../helpers/validations";
import {errorMessages} from "../../../helpers/messagesConstants";
import {isBefore, isSameDay} from "date-fns";

export const fieldsTender: { [key:string]: FieldsProps } = {


  "name": {
    name: "name",
    componentType: "textfield",
    label: "Identificativo",
    hidden: false,
    size: "50%",
    rules: {

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