/**
 * @jest-environment jsdom
 */
import React from "react";
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom/extend-expect";
import {
  screen,
  act,
  cleanup,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { reducer } from "../../../../mocks/mockReducer";
import userEvent from "@testing-library/user-event";
import LoginForm from "../LoginForm";

describe("LoginForm", () => {
  const setEmailMock = jest.fn();

  afterEach(cleanup);

  beforeEach(() => {
    reducer(<LoginForm setEmail={setEmailMock} />);
  });

  it("renders component", () => {
    expect(
      screen.getByRole("img", { name: "PagoPA (Monogram)" })
    ).toBeInTheDocument();
  });

  it("renders input fields", async () => {
    const email = screen.getByRole("textbox", { name: "Email" });
    const password = screen.getByLabelText("Password");
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  it("renders login button", () => {
    const button = screen.getByRole("button", { name: "LOGIN" });
    expect(button).toBeInTheDocument();
  });

  it("submit form without inputs", async () => {
    const button = screen.getByRole("button", { name: "LOGIN" });
    const user = userEvent.setup();
    await act(async () => await user.click(button));

    expect(await screen.findByText("Email non corretta")).toBeInTheDocument();
    expect(
      await screen.findByText("Password non corretta")
    ).toBeInTheDocument();
  });

  it("open and close the tooltip", async () => {
    const forgotPassword = screen.getByText("Password dimenticata?");
    expect(forgotPassword).toBeInTheDocument();

    const user = userEvent.setup();

    await act(async () => {
      await user.click(forgotPassword);
    });

    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toBeInTheDocument();

    const email = screen.getByRole("textbox", {
      name: "Email",
    });
    await act(async () => {
      await user.click(email);
    });
    await waitForElementToBeRemoved(() => screen.queryByRole("tooltip"));
    expect(tooltip).not.toBeInTheDocument();
  });
});
