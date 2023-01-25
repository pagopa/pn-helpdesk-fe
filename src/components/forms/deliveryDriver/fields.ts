import { FieldsProps } from "../../formFields/FormFields";
import {regex} from "../../../helpers/validations";
import {errorMessages} from "../../../helpers/messagesConstants";



export const fieldsDriver: { [key:string]: FieldsProps } = {
  "businessNameDriver": {
    name: "businessName",
    componentType: "textfield",
    label: "Ragione Sociale",
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
  "denominationDriver": {
    name: "denomination",
    componentType: "textfield",
    label: "Denominazione",
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
  "registeredOfficeDriver": {
    name: "registeredOffice",
    componentType: "textfield",
    label: "Sede legale",
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
  "fiscalCodeDriver": {
    name: "fiscalCode",
    componentType: "textfield",
    label: "Codice Fiscale",
    hidden: false,
    size: "50%",
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
    required: true,
  },
  "taxIdDriver": {
    name: "taxId",
    componentType: "textfield",
    label: "Partita Iva",
    hidden: false,
    size: "50%",
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
  "pecDriver": {
    name: "taxId",
    componentType: "textfield",
    label: "Pec",
    hidden: false,
    size: "50%",
    inputProps: { maxLength: 100 },
    rules: {
      pattern: {
        value: regex.TAX_ID_PATTERN,
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
      required: errorMessages.REQUIRED,
    },
    required: true,
  },
  "phoneNumberDriver": {
    name: "phoneNumber",
    componentType: "textfield",
    label: "Numero telefonico",
    hidden: false,
    size: "50%",
    inputProps: { maxLength: 100 },
    rules: {
      pattern: {
        value: regex.TAX_ID_PATTERN,
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
      required: errorMessages.REQUIRED,
    },
    required: true,
  },
  "uniqueCodeDriver": {
    name: "uniqueCode",
    componentType: "textfield",
    label: "Codice univoco",
    hidden: false,
    size: "50%",
    inputProps: { maxLength: 100 },
    rules: {
      pattern: {
        value: regex.TAX_ID_PATTERN,
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
      required: errorMessages.REQUIRED,
    },
    required: true,
  },
}