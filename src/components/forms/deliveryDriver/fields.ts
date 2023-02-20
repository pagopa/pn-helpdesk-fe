import { FieldsProps } from "../../formFields/FormFields";
import {regex} from "../../../helpers/validations";
import {errorMessages} from "../../../helpers/messagesConstants";



export const fieldsDriver: { [key:string]: FieldsProps } = {
  "businessName": {
    name: "businessName",
    componentType: "textfield",
    label: "Ragione Sociale",
    hidden: false,
    rules: {
      pattern: {
        value: regex.ALPHA_NUMERIC_WITHOUT_SPECIAL_CHAR_PATTERN,
        message: errorMessages.INCORRECT,
      },
      required: errorMessages.REQUIRED,
    },
    required: true,
  },
  "taxId": {
    name: "taxId",
    componentType: "textfield",
    label: "Partita Iva",
    hidden: false,
    inputProps: { maxLength: 11 },
    rules: {
      pattern: {
        value: regex.TAX_ID_PATTERN,
        message: errorMessages.INCORRECT,
      },
      minLength: {
        value: 11,
        message: errorMessages.INCORRECT,
      },
      maxLength: {
        value: 11,
        message: errorMessages.INCORRECT,
      },
      required: errorMessages.REQUIRED,
    },
    required: true,
  },
  "denomination": {
    name: "denomination",
    componentType: "textfield",
    label: "Denominazione",
    hidden: false,
    rules: {
      pattern: {
        value: regex.ALPHA_NUMERIC_WITHOUT_SPECIAL_CHAR_PATTERN,
        message: errorMessages.INCORRECT,
      },
    },
    required: false,
  },
  "registeredOffice": {
    name: "registeredOffice",
    componentType: "textfield",
    label: "Sede legale",
    hidden: false,
    rules: {
      pattern: {
        value: regex.ALPHA_NUMERIC_WITHOUT_SPECIAL_CHAR_PATTERN,
        message: errorMessages.INCORRECT,
      },
    },
    required: false,
  },
  "fiscalCode": {
    name: "fiscalCode",
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
    },
    required: false,
  },

  "pec": {
    name: "pec",
    componentType: "textfield",
    label: "Pec",
    hidden: false,
    inputProps: { maxLength: 100 },
    rules: {
      pattern: {
        value: regex.EMAIL,
        message: errorMessages.INCORRECT,
      },
      minLength: {
        value: 5,
        message: errorMessages.INCORRECT,
      },
      maxLength: {
        value: 100,
        message: errorMessages.INCORRECT,
      },
    },
    required: false,
  },
  "phoneNumber": {
    name: "phoneNumber",
    componentType: "textfield",
    label: "Numero telefonico",
    hidden: false,
    inputProps: { maxLength: 10 },
    rules: {
      pattern: {
        value: regex.PHONE_NUMBER_PATTERN,
        message: errorMessages.INCORRECT,
      },
      minLength: {
        value: 10,
        message: errorMessages.INCORRECT,
      },
      maxLength: {
        value: 10,
        message: errorMessages.INCORRECT,
      },
    },
    required: false,
  },
  "uniqueCode": {
    name: "uniqueCode",
    componentType: "textfield",
    label: "Codice univoco",
    hidden: false,
    inputProps: {minLength:6, maxLength: 7 },
    rules: {
      pattern: {
        value: regex.UNIQUE_CODE_PATTERN,
        message: errorMessages.INCORRECT,
      },
      minLength: {
        value: 6,
        message: errorMessages.INCORRECT,
      },
      maxLength: {
        value: 7,
        message: errorMessages.INCORRECT,
      },
    },
    required: false,
  },
}