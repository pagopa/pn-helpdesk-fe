import { isBefore, isSameDay } from 'date-fns';
import { FieldsProps } from '../../formFields/FormFields';
import { errorMessages } from '../../../helpers/messagesConstants';

const fields = ['name', 'dateInterval'] as const;
export type FieldTypesTender = typeof fields[number];

export type FieldsTender = Record<FieldTypesTender, FieldsProps>;

export const fieldsTender: FieldsTender = {
  name: {
    name: 'name',
    componentType: 'textfield',
    label: 'Identificativo',
    hidden: false,
    size: 5,
    rules: {
      required: errorMessages.REQUIRED,
    },
    required: true,
  },
  dateInterval: {
    name: 'dateInterval',
    componentType: 'dateRangePicker',
    label: 'Data inizio e fine',
    hidden: false,
    required: true,
    intervalLimit: ['months'],
    size: 5,
    disableFuture: false,
    rules: {
      required: errorMessages.REQUIRED,
      validate: {
        checkDates: (dates: Array<any>) => {
          const startDate = new Date(dates[0]);
          const endDate = new Date(dates[1]);
          return (
            isBefore(startDate, endDate) ||
            isSameDay(startDate, endDate) ||
            errorMessages.DATES_ORDER
          );
        },
      },
    },
  },
};
