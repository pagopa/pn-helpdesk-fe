/**
 * @jest-environment jsdom
 */
import React from 'react';
import 'regenerator-runtime/runtime';
import { fireEvent, render, screen } from '@testing-library/react';
import SelectField from '../SelectField';

const props = {
  field: {
    name: 'Tipo Estrazione',
    componentType: 'select',
    label: 'Tipo Estrazione',
    hidden: false,
    selectItems: [
      'Ottieni EncCF',
      'Ottieni CF',
      'Ottieni notifica',
      'Ottieni log completi',
      'Ottieni log di processo',
    ],
  },
  onChange: jest.fn(),
  value: 'Ottieni EncCF',
};

describe('SelectField Component', () => {
  it('renders component', () => {
    render(<SelectField field={props.field} value={props.value} onChange={props.onChange} />);
    const selectField = screen.getByTestId(`select-${props.field.name}`);
    expect(selectField).toBeInTheDocument();
    fireEvent.click(selectField);
    const selectItems = screen.getAllByRole('combobox');
    expect(selectItems[0]).toBeInTheDocument();
  });
});
