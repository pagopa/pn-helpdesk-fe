/**
 * @jest-environment jsdom
 */

import React from "react";
import "regenerator-runtime/runtime";
import { screen } from "@testing-library/react";
import LoginPage from "../LoginPage";
import "regenerator-runtime/runtime";
import { reducer } from "../../../mocks/mockReducer";

describe("LoginPage", () => {
  beforeEach(() => {
    reducer(<LoginPage setEmail={jest.fn()} />);
  });

  it("includes change password form", () => {
    expect(screen.getByText("LOGIN")).toBeInTheDocument();
  });

  it("renders login form component", () => {
    expect(screen.getByTestId("LoginForm")).toBeInTheDocument();
  });
});
