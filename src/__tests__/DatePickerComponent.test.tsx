/**
 * @jest-environment jsdom
 */
import React from "react";
import 'regenerator-runtime/runtime'
import { fireEvent, render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import DatePickerComponent from '../Components/DatePickerComponent';
import { FieldsProps } from '../Components/FormFields';

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

  beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      media: query,
      matches: query === "(pointer: fine)",
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
  })

  it('renders date picker component', () => {
    render(
        <Router>
            <DatePickerComponent field={field} value={new Date().toString()} onChange={jest.fn()} onBlur={jest.fn()}/>
        </Router>
    );
    expect(screen.getByLabelText("Mese")).toBeDefined();
  })

  it('test changing value', async () => {
    const handleChange = jest.fn();
    const handleBlur = jest.fn();

    render(<DatePickerComponent field={field} value={new Date().toISOString()} onChange={handleChange} onBlur={handleBlur} />);
    const calendarButton = screen.getByRole("button");
      expect(calendarButton).toBeTruthy();
      calendarButton.click();
      screen.findByRole("button", { name: "Nov" }).then(btn => {
        btn.click();
        screen.findByRole("button", { name: "2022" }).then(btnY => {
          btnY.click();
          expect(screen.getByRole("textbox")).toHaveValue("2022-11");
          expect(handleChange).toHaveBeenCalled();

          const onChangeMock = jest.fn();
          const event = {
            preventDefault() {},
            target: { value: "2022-12" },
          };
          const field = screen.getByRole("textbox") as HTMLInputElement;
          fireEvent.change(field, event);

          expect(onChangeMock).toBeCalledWith("2022-12");
        })
      });
  })
});
 


