import { FieldsProps } from '../../formFields/FormFields';
import { regex } from '../../../helpers/validations';
import { errorMessages } from '../../../helpers/messagesConstants';

const fields = [
  'taxId',
  'businessName',
  'denomination',
  'registeredOffice',
  'fiscalCode',
  'pec',
  'phoneNumber',
  'uniqueCode',
] as const;
export type FieldTypesDriver = typeof fields[number];

export type FieldsDriver = Record<FieldTypesDriver, FieldsProps>;

export const fieldsDriver: FieldsDriver = {
  taxId: {
    name: 'taxId',
    componentType: 'textfield',
    label: 'Partita Iva',
    hidden: false,
    inputProps: { maxLength: 11 },
    size: 0.5,
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
  businessName: {
    name: 'businessName',
    componentType: 'textfield',
    label: 'Ragione Sociale',
    hidden: false,
    size: 0.5,
    rules: {
      required: errorMessages.REQUIRED,
    },
    required: true,
  },
  denomination: {
    name: 'denomination',
    componentType: 'textfield',
    label: 'Denominazione',
    hidden: false,
    size: 0.5,
    rules: {
      pattern: {
        value: regex.ALPHA_NUMERIC_WITHOUT_SPECIAL_CHAR_PATTERN,
        message: errorMessages.INCORRECT,
      },
    },
    required: false,
  },
  registeredOffice: {
    name: 'registeredOffice',
    componentType: 'textfield',
    label: 'Sede legale',
    hidden: false,
    size: 0.5,
    rules: {
      pattern: {
        value: regex.ALPHA_NUMERIC_WITHOUT_SPECIAL_CHAR_PATTERN,
        message: errorMessages.INCORRECT,
      },
    },
    required: false,
  },
  fiscalCode: {
    name: 'fiscalCode',
    componentType: 'textfield',
    label: 'Codice Fiscale',
    hidden: false,
    size: 0.5,
    inputProps: { maxLength: 16, style: { textTransform: 'uppercase' } },
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
  pec: {
    name: 'pec',
    componentType: 'textfield',
    label: 'Pec',
    hidden: false,
    size: 0.5,
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
  phoneNumber: {
    name: 'phoneNumber',
    componentType: 'textfield',
    label: 'Numero telefonico',
    hidden: false,
    size: 0.5,
    inputProps: { maxLength: 30 },
    rules: {
      pattern: {
        value: regex.PHONE_NUMBER_PATTERN,
        message: errorMessages.INCORRECT,
      },
      minLength: {
        value: 5,
        message: errorMessages.INCORRECT,
      },
      maxLength: {
        value: 30,
        message: errorMessages.INCORRECT,
      },
    },
    required: false,
  },
  uniqueCode: {
    name: 'uniqueCode',
    componentType: 'textfield',
    label: 'Codice univoco',
    hidden: false,
    size: 0.5,
    inputProps: { minLength: 6, maxLength: 7 },
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
};
