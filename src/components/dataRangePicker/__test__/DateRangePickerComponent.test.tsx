/**
 * @jest-environment jsdom
 */
import React from "react";
import "regenerator-runtime/runtime";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CalendarPickerView, LocalizationProvider } from "@mui/lab";
import { format } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { it as itLocale } from "date-fns/locale";
import userEvent from "@testing-library/user-event";
import DateRangePickerComponent from "../DataRangePickerComponent";

/**
 * @typedef {Object} DatePicker
 */
type DatePickerType = {
  /**
   * label of the field
   */
  label: string;
  /**
   * calendar type
   */
  view: CalendarPickerView[];
  /**
   * value of the field if there is any
   */
  value: string;
};

const datePickers: Array<DatePickerType> = [
  {
    label: "Dal",
    view: ["day"],
    value: "2022-10-01",
  },
  {
    label: "Al",
    view: ["day"],
    value: "2022-10-20",
  },
];

const fieldProps = {
  name: "Time interval",
  componentType: "dateRangePicker",
  label: "Time interval",
  hidden: false,
  required: false,
  intervalLimit: [3, "months"],
  disableFuture: true,
  format: "yyyy-MM-dd",
};

describe("DateRangePickerComponent", () => {
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
  });

  it("renders component", () => {
    render(
      <LocalizationProvider locale={itLocale} dateAdapter={AdapterDateFns}>
        <Router>
          <DateRangePickerComponent
            field={fieldProps}
            datePickers={datePickers}
            onChange={jest.fn()}
            required={true}
            onBlur={jest.fn()}
          />
        </Router>
      </LocalizationProvider>
    );
    expect(screen.getByText("Dal")).toBeTruthy();
    expect(screen.getByText("Al")).toBeTruthy();
  });

  it("test on change", async () => {
    render(
      <LocalizationProvider locale={itLocale} dateAdapter={AdapterDateFns}>
        <Router>
          <DateRangePickerComponent
            field={fieldProps}
            datePickers={datePickers}
            onChange={() => console.log("change")}
            required={true}
            onBlur={jest.fn()}
          />
        </Router>
      </LocalizationProvider>
    );
    const logSpy = jest.spyOn(console, "log");
    await screen.findAllByRole("button").then((buttons) => {
      const dalButton = buttons[0];
      expect(dalButton).toBeTruthy();
      userEvent.click(dalButton);
      screen.findByRole("button", { name: "14" }).then((dayButton) => {
        userEvent.click(dayButton);
        expect(screen.getAllByRole("textbox")[0]).toHaveValue("14-10-2022");
        expect(logSpy).toBeCalled();
      });
    });
  });
});
