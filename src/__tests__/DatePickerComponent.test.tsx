/**
 * @jest-environment jsdom
 */
import React from "react";
import 'regenerator-runtime/runtime'
import { fireEvent, render, waitFor, screen, act } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import DatePickerComponent from '../Components/DatePickerComponent';
import { FieldsProps } from '../Components/FormFields';
import { TextField } from '@mui/material';

// configure({adapter: new Adapter()});

const field:FieldsProps  = {
            name: "referenceMonth",
            componentType: "datePicker",
            label: "Mese",
            hidden: false,
            view: ["month", "year"],
            type: "month",
            format: "yyyy-MM",
            required: false
    }

describe('DatePickerComponent', () => {

  it('renders date picker component', () => {
    const result = render(
        <Router>
            <DatePickerComponent field={field} value={new Date().toString()} onChange={jest.fn()} onBlur={jest.fn()}/>
        </Router>
    );
    expect(result).toBeDefined();
  });

  it('test on change', async () => {
    const handleChange = jest.fn();
    const handleBlur = jest.fn();

    render(<DatePickerComponent field={field} value={new Date().toString()} onChange={handleChange} onBlur={handleBlur} />);
    screen.findByLabelText("Mese").then(async(textfield) => {
      expect(textfield).toBeTruthy()
      fireEvent.change(textfield!, { target: { value: "2022-05-01" } });
      await waitFor(() => {
        expect(handleChange).toHaveBeenCalled();
        expect(textfield).toHaveValue("2022-05-01");
      });
    });    
  });

});
 


