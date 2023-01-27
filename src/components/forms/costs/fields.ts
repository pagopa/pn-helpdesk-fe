import {FieldsProps} from "../../formFields/FormFields";
import {regex} from "../../../helpers/validations";
import {errorMessages} from "../../../helpers/messagesConstants";

export let selectTypeCostItems: { [key: string]: Array<string> } = {
  "CAP": ["selectTypeCost", "inputBaseCost", "selectCapCost", "inputAdditionalCost", "selectProductType"],
  "Zone": ["selectTypeCost", "inputBaseCost", "selectZoneCost", "inputAdditionalCost", "selectProductType"],
};

export const fieldsCosts: { [key:string]: FieldsProps } = {
  "selectTypeCost": {
    name: "typeCost",
    componentType: "select",
    label: "Tipo di costo",
    hidden: false,
    size: "50%",
    selectItems: Object.keys(selectTypeCostItems)
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
    required: true,
    selectItems: ["Zona 1", "Zona 2", "Zona 3"]
  },
  "selectProductType": {
    name: "productType",
    componentType: "select",
    label: "Seleziona la tipologia di prodotto",
    hidden: false,
    size: "100%",
    required: true,
  },

}