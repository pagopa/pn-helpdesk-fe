/**
 * @jest-environment jsdom
 */
import React from "react";
import "regenerator-runtime/runtime";
import { fireEvent, screen } from "@testing-library/react";
import { CalendarPickerView } from "@mui/lab";
import DateRangePickerComponent from "../DataRangePickerComponent";
import { reducer } from "../../../mocks/mockReducer";

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

  it("renders component with certain values", async () => {
    reducer(
      <DateRangePickerComponent
        field={fieldProps}
        datePickers={datePickers}
        onChange={jest.fn()}
        required={true}
        onBlur={jest.fn()}
      />
    );
    const inputs = await screen.findAllByRole("textbox");
    expect(inputs.length).toBe(2);

    const dal = (await screen.findByRole("textbox", {
      name: "Dal",
    })) as HTMLInputElement;
    const al = (await screen.findByRole("textbox", {
      name: "Al",
    })) as HTMLInputElement;

    expect(dal).toBeInTheDocument();
    expect(al).toBeInTheDocument();

    expect(dal.value).toBe("01-10-2022");
    expect(al.value).toBe("20-10-2022");
  });

  it("test changing dal value", async () => {
    const mockChangeFn = jest.fn();
    reducer(
      <DateRangePickerComponent
        field={fieldProps}
        datePickers={datePickers}
        onChange={mockChangeFn}
        required={true}
        onBlur={jest.fn()}
      />
    );

    const inputs = await screen.findAllByRole("textbox");
    expect(inputs.length).toBe(2);

    fireEvent.change(inputs[0], {
      target: { value: "14-10-2022" },
    });
    expect(inputs[0]).toHaveValue("14-10-2022");
    expect(mockChangeFn).toBeCalled();
  });

  it("test changing al value", async () => {
    const mockChangeFn = jest.fn();
    reducer(
      <DateRangePickerComponent
        field={fieldProps}
        datePickers={datePickers}
        onChange={mockChangeFn}
        required={true}
        onBlur={jest.fn()}
      />
    );

    const inputs = await screen.findAllByRole("textbox");
    expect(inputs.length).toBe(2);

    fireEvent.change(inputs[1], {
      target: { value: "14-10-2022" },
    });
    expect(inputs[1]).toHaveValue("14-10-2022");
    expect(mockChangeFn).toBeCalled();
  });
});
