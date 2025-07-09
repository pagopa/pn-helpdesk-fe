/**
 * @jest-environment jsdom
 */
import React from 'react';
import 'regenerator-runtime/runtime';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  it('renders component through userEvent', async () => {
    render(<SelectField field={props.field} value={props.value} onChange={props.onChange} />);
    // getting the first field that appears in the document with the testid
    const selectField = screen.getByTestId(`select-${props.field.name}`);
    expect(selectField).toBeInTheDocument();
    // once i verified that the field is in the document i can click on it
    // to open the select and check if the options are rendered
    // in fact the stuff to click is not the field itself, but an inner div
    // that has role 'combobox'
    const clickableInnerDiv = screen.getByRole('combobox');
    // to simulate the click on the 'combobox' we must go through user-event
    // if we do the exact same test using the fireEvent function provided by @testing-library/react
    // the click is not performed and therefore the items do not appear
    const user = userEvent.setup();
    await act(async () => {
      await user.click(clickableInnerDiv);
    });
    await waitFor(() => {
      const selectItems = screen.getAllByRole('option');
      expect(selectItems).toHaveLength(5);     // corresponding to the five options
    });
  });
});
