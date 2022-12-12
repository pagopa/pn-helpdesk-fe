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

  it("includes login form", () => {
    expect(screen.getByText("LOGIN")).toBeInTheDocument();
  });
});
