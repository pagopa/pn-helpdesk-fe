/**
 * @jest-environment jsdom
 */
import React from "react";
import "regenerator-runtime/runtime";
import { render, screen } from "@testing-library/react";
import TextFieldComponent from "../TextFieldComponent";

describe("Testfield Component", () => {
  const field = {
    name: "publicAuthorityName",
    componentType: "textfield",
    label: "Codice IPA",
    hidden: false,
    rules: {
      required: "Error",
    },
    required: false,
  };

  it("renders", () => {
    render(<TextFieldComponent field={field} onBlur={jest.fn} />);
    const component = screen.getByLabelText("Codice IPA");
    expect(component).toBeTruthy();
  });
});
