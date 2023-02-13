import {FieldsProps} from "../../formFields/FormFields";
import {regex} from "../../../helpers/validations";
import {errorMessages} from "../../../helpers/messagesConstants";
import {OptionCustom} from "../../selectField/SelectCustomField";

export let fieldsOfType: { [key: string]: Array<string> } = {
  "NATIONAL": ["type",  "nationalProductType", "price", "priceAdditional", "cap"],
  "INTERNATIONAL": ["type", "internationalProductType", "price", "priceAdditional", "zone"],
};




export const OPTIONS_ZONE:OptionCustom[] = [
  {
    key: "ZONE_1",
    label: "Zona 1"
  },
  {
    key: "ZONE_2",
    label: "Zona 2"
  },
  {
    key: "ZONE_3",
    label: "Zona 3"
  }
]

export const INTERNATIONAL_PRODUCT_TYPE:OptionCustom[] = [
  {
    key: "AR",
    label: "Raccomandata A-R"
  },
  {
    key: "SEMPLICE",
    label: "Raccomandata Semplice"
  },
]

export const NATIONAL_PRODUCT_TYPE:OptionCustom[] = [
  {
    key: "AR",
    label: "Raccomandata A-R"
  },
  {
    key: "890",
    label: "Raccomandata 890"
  },
  {
    key: "SEMPLICE",
    label: "Raccomandata Semplice"
  }
]

export const COST_TYPE:OptionCustom[] = [
  {
    key: "NATIONAL",
    label:"Nazionale"
  },
  {
    key: "INTERNATIONAL",
    label: "Internazionale"
  }
]



export const fieldsCosts: { [key:string]: FieldsProps } = {
  "type": {
    name: "typeCost",
    componentType: "selectCustom",
    label: "Tipo di costo",
    hidden: false,
    size: "50%",
    optionItems: COST_TYPE,
    rules:{
      validate:{
        validateType: (value?:any) => {
          return !!(value)|| errorMessages.TYPE_COST_INVALID
        }
      }
    }
  },
  "price": {
    name: "price",
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
  "cap": {
    name: "cap",
    componentType: "capAutocomplete",
    label: "Cap",
    placeholder: "Seleziona o digita Cap",
    hidden: false,
    size: "100%",
    required: true,
    rules:{
      validate:{
        validateCaps: (caps: Array<string>) => {
          if (!caps) return errorMessages.CAPS_INVALID
          const error = caps.filter(cap => {
            const regexp = new RegExp(regex.CAP),
            test = regexp.test(cap);
            return !test;
          });
          return error.length === 0 || errorMessages.CAPS_INVALID

        }
      }
    }
  },
  "priceAdditional": {
    name: "priceAdditional",
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
  "zone": {
    name: "zoneCost",
    componentType: "selectCustom",
    label: "Seleziona Zona",
    hidden: false,
    size: "100%",
    required: true,
    optionItems: OPTIONS_ZONE,
    rules:{
      validate:{
        validateZone: (value?:any) => {
          return !!(value)|| errorMessages.ZONE_INVALID
        }
      }
    }
  },
  "nationalProductType": {
    name: "nationalProductType",
    componentType: "selectCustom",
    label: "Tipologia di prodotto",
    hidden: false,
    size: "50%",
    required: true,
    optionItems: NATIONAL_PRODUCT_TYPE,
    rules:{
      validate:{
        validateProductType: (value?:any) => {
          return !!(value)|| errorMessages.PRODUCT_TYPE_INVALID
        }
      }
    }
  },
  "internationalProductType": {
    name: "internationalProductType",
    componentType: "selectCustom",
    label: "Tipologia di prodotto",
    hidden: false,
    size: "50%",
    required: true,
    optionItems: INTERNATIONAL_PRODUCT_TYPE,
    rules:{
      validate:{
        validateProductType: (value?:any) => {
          return !!(value)|| errorMessages.PRODUCT_TYPE_INVALID
        }
      }
    }
  },

}

