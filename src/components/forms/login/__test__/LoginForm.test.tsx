/**
 * @jest-environment jsdom
 */
import React from "react";
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom/extend-expect";
import {
  fireEvent,
  waitFor,
  screen,
  act,
  cleanup,
} from "@testing-library/react";
import { reducer } from "../../../../__tests__/testReducer";
import userEvent from "@testing-library/user-event";
import LoginForm from "../LoginForm";

describe("LoginForm", () => {
  afterEach(cleanup);

  beforeEach(() => {
    reducer(<LoginForm />);
  });

  it("renders component", () => {
    expect(screen.getByTestId("LoginForm")).toBeTruthy();
  });

  it("renders input fields", () => {
    const email = screen.getByRole("textbox", { name: "Email" });
    const password = screen.getByLabelText("Password");
    expect(email).toBeTruthy();
    expect(password).toBeTruthy();
  });

  it("renders login button", () => {
    const button = screen.getByRole("button", { name: "LOGIN" });
    expect(button).toBeTruthy();
  });

  it("submit form and show errors", async () => {
    const button = screen.getByRole("button", { name: "LOGIN" });
    userEvent.click(button);
    act(() => button.click());
    await waitFor(() => {
      expect(screen.getByText("Email non corretta")).toBeTruthy();
    });
    await waitFor(() => {
      expect(screen.getByText("Password non corretta")).toBeTruthy();
    });
  });

  it("fill fields", () => {
    const email = screen.getByRole("textbox", { name: "Email" });
    const password = screen.getByLabelText("Password");
    fireEvent.change(email!, { target: { value: "test@test.com" } });
    fireEvent.change(password!, { target: { value: "I7ph_KKSq+ouL^$7" } });
    expect(email).toHaveValue("test@test.com");
    expect(password).toHaveValue("I7ph_KKSq+ouL^$7");
  });

  it("renders tooltip", () => {
    screen.getByText("Password dimenticata?").click();
      expect(screen.getByText("Password dimenticata?")).toBeTruthy();
      userEvent.click(screen.getByText("Password dimenticata?"));
      expect(screen.getByRole("tooltip")).toBeTruthy();
  });
});
