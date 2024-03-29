import { FieldsProps } from '../../formFields/FormFields';
import { regex } from '../../../helpers/validations';
import { errorMessages } from '../../../helpers/messagesConstants';
import { OptionCustom } from '../../selectField/SelectCustomField';

export const fieldsOfType: { [key: string]: Array<string> } = {
  NATIONAL: ['type', 'nationalProductType', 'price', 'priceAdditional', 'cap'],
  INTERNATIONAL: ['type', 'internationalProductType', 'price', 'priceAdditional', 'zone'],
};

export const OPTIONS_ZONE: Array<OptionCustom> = [
  {
    key: 'ZONE_1',
    label: 'Zona 1',
  },
  {
    key: 'ZONE_2',
    label: 'Zona 2',
  },
  {
    key: 'ZONE_3',
    label: 'Zona 3',
  },
];

export const INTERNATIONAL_PRODUCT_TYPE: Array<OptionCustom> = [
  {
    key: 'AR',
    label: 'Raccomandata A-R',
  },
  {
    key: 'RS',
    label: 'Raccomandata Semplice',
  },
];

export const NATIONAL_PRODUCT_TYPE: Array<OptionCustom> = [
  {
    key: 'AR',
    label: 'Raccomandata A-R',
  },
  {
    key: '890',
    label: 'Raccomandata 890',
  },
  {
    key: 'RS',
    label: 'Raccomandata Semplice',
  },
];

export const COST_TYPE: Array<OptionCustom> = [
  {
    key: 'NATIONAL',
    label: 'Nazionale',
  },
  {
    key: 'INTERNATIONAL',
    label: 'Internazionale',
  },
];

export const fieldsCosts: { [key: string]: FieldsProps } = {
  type: {
    name: 'typeCost',
    componentType: 'selectCustom',
    label: 'Tipo di costo',
    hidden: false,
    optionItems: COST_TYPE,
    size: 0.5,
    rules: {
      validate: {
        validateType: (value?: any) => !!value || errorMessages.TYPE_COST_INVALID,
      },
    },
  },
  price: {
    name: 'price',
    componentType: 'numberField',
    label: 'Costo base (€)',
    hidden: false,
    size: 0.5,
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
  cap: {
    name: 'cap',
    componentType: 'capAutocomplete',
    label: 'Cap',
    placeholder: 'Seleziona o digita Cap',
    hidden: false,
    size: 1,
    required: true,
    rules: {
      validate: {
        validateCaps: (caps: Array<string>) => {
          if (!caps) {
            return errorMessages.CAPS_INVALID;
          }
          const error = caps.filter((cap) => {
            const regexp = new RegExp(regex.CAP);
            const test = regexp.test(cap);
            return !test;
          });
          return error.length === 0 || errorMessages.CAPS_INVALID;
        },
      },
    },
  },
  priceAdditional: {
    name: 'priceAdditional',
    componentType: 'numberField',
    label: 'Costo aggiuntivo per pagina (€)',
    hidden: false,
    size: 0.5,
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
  zone: {
    name: 'zoneCost',
    componentType: 'selectCustom',
    label: 'Seleziona Zona',
    hidden: false,
    required: true,
    size: 1,
    optionItems: OPTIONS_ZONE,
    rules: {
      validate: {
        validateZone: (value?: any) => !!value || errorMessages.ZONE_INVALID,
      },
    },
  },
  nationalProductType: {
    name: 'nationalProductType',
    componentType: 'selectCustom',
    label: 'Tipologia di prodotto',
    hidden: false,
    required: true,
    optionItems: NATIONAL_PRODUCT_TYPE,
    size: 0.5,
    rules: {
      validate: {
        validateProductType: (value?: any) => !!value || errorMessages.PRODUCT_TYPE_INVALID,
      },
    },
  },
  internationalProductType: {
    name: 'internationalProductType',
    componentType: 'selectCustom',
    label: 'Tipologia di prodotto',
    hidden: false,
    required: true,
    size: 0.5,
    optionItems: INTERNATIONAL_PRODUCT_TYPE,
    rules: {
      validate: {
        validateProductType: (value?: any) => !!value || errorMessages.PRODUCT_TYPE_INVALID,
      },
    },
  },
};
