import { FieldsProps } from "../../formFields/FormFields";
import {regex} from "../../../helpers/validations";
import {errorMessages} from "../../../helpers/messagesConstants";



export const fieldsCosts: { [key:string]: FieldsProps } = {
  "selectTypeCost": {
    name: "typeCost",
    componentType: "select",
    label: "Seleziona il tipo di costo *",
    hidden: false,
    size: "50%",
    // inputProps: {width:"webkit-fill-available"},
    // rules: {
    //   pattern: {
    //     value: regex.ALPHA_NUMERIC_WITHOUT_SPECIAL_CHAR_PATTERN,
    //     message: errorMessages.INCORRECT,
    //   },
    //   required: errorMessages.REQUIRED,
    // },
    required: true,
  },
  "inputBaseCost": {
    name: "baseCost",
    componentType: "textfield",
    label: "Costo base (€)",
    hidden: false,
    size: "50%",
    inputProps: { minLength: 1 },
    rules: {
      pattern: {
        value: regex.AMOUNT,
        message: errorMessages.INCORRECT,
      },
      minLength: {
        value: 1,
        message: errorMessages.INCORRECT,
      },
      required: errorMessages.REQUIRED,
    },
    required: true,
  },
  "selectCapCost": {
    name: "capCost",
    componentType: "select",
    label: "Seleziona Cap",
    hidden: false,
    size: "50%",
    // inputProps: {width:"webkit-fill-available"},
    // rules: {
    //   pattern: {
    //     value: regex.ALPHA_NUMERIC_WITHOUT_SPECIAL_CHAR_PATTERN,
    //     message: errorMessages.INCORRECT,
    //   },
    //   required: errorMessages.REQUIRED,
    // },
    required: true,
  },
  "inputAdditionalCost": {
    name: "additionalCost",
    componentType: "textfield",
    label: "Costo aggiuntivo per pagina (€)",
    hidden: false,
    size: "50%",
    inputProps: { minLength: 1 },
    rules: {
      pattern: {
        value: regex.AMOUNT,
        message: errorMessages.INCORRECT,
      },
      minLength: {
        value: 1,
        message: errorMessages.INCORRECT,
      },
      required: errorMessages.REQUIRED,
    },
    required: true,
  },
  "selectZoneCost": {
    name: "zoneCost",
    componentType: "select",
    label: "Seleziona Zona",
    hidden: false,
    size: "50%",
    // inputProps: {width:"webkit-fill-available"},
    // rules: {
    //   pattern: {
    //     value: regex.ALPHA_NUMERIC_WITHOUT_SPECIAL_CHAR_PATTERN,
    //     message: errorMessages.INCORRECT,
    //   },
    //   required: errorMessages.REQUIRED,
    // },
    required: true,
  },
  "selectProductType": {
    name: "productType",
    componentType: "select",
    label: "Seleziona la tipologia di prodotto",
    hidden: false,
    size: "100%",
    // inputProps: {width:"webkit-fill-available"},
    // inputProps: { maxLength: 11 },
    // rules: {
    //   pattern: {
    //     value: regex.TAX_ID_PATTERN,
    //     message: errorMessages.INCORRECT,
    //   },
    //   minLength: {
    //     value: 11,
    //     message: errorMessages.INCORRECT,
    //   },
    //   maxLength: {
    //     value: 11,
    //     message: errorMessages.INCORRECT,
    //   },
    //   required: errorMessages.REQUIRED,
    // },
    required: true,
  },

}