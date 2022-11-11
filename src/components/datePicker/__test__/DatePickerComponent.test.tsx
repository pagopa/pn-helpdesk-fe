/**
 * @jest-environment jsdom
 */
import React from "react";
import "regenerator-runtime/runtime";
import { screen } from "@testing-library/react";
import { FieldsProps } from "../../formFields/FormFields";
import DatePickerComponent from "../DatePickerComponent";
import { reducer } from "../../../mocks/mockReducer";
import userEvent from "@testing-library/user-event";
import { act } from "react-test-renderer";

const field: FieldsProps = {
  name: "referenceMonth",
  componentType: "datePicker",
  label: "Mese",
  hidden: false,
  view: ["month", "year"],
  type: "month",
  format: "yyyy-MM",
  required: false,
};

describe("DatePickerComponent", () => {
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

  it("renders date picker component with value", () => {
    reducer(
      <DatePickerComponent
        field={field}
        value="2022-11"
        onChange={jest.fn()}
        onBlur={jest.fn()}
      />
    );
    const input = screen.getByRole("textbox", {
      name: "Mese",
    }) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("2022-11");
  });

  it("test changing value", async () => {
    const handleChange = jest.fn();
    const handleBlur = jest.fn();

    reducer(
      <DatePickerComponent
        field={field}
        value={"2022-09"}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
    const calendarButton = await screen.findByRole("button");
    expect(calendarButton).toBeInTheDocument();
    const user = userEvent.setup();

    await act(async () => {
      await user.click(calendarButton);
    });

    screen.findByRole("button", { name: "Nov" }).then(async (btn) => {
      await act(async () => {
        await user.click(btn);
      });

      screen.findByRole("button", { name: "2022" }).then(async (btnY) => {
        await act(async () => {
          await user.click(btnY);
        });

        const input = (await screen.findByRole("textbox", {
          name: "Mese",
        })) as HTMLInputElement;
        expect(input.value).toBe("2022-11");
        expect(handleChange).toHaveBeenCalled();
      });
    });
  });
});
