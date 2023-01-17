/**
 * @jest-environment jsdom
 */
import React from "react";
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";
import ChangePasswordForm from "../ChangePasswordForm";
import { reducer } from "../../../../mocks/mockReducer";
import userEvent from "@testing-library/user-event";
import { act } from "react-test-renderer";

describe("ChangePasswordForm", () => {
  it("renders component", () => {
    reducer(<ChangePasswordForm />);
    expect(
      screen.getByRole("heading", { name: "Cambio password" })
    ).toBeInTheDocument();
  });

  it("renders title", () => {
    reducer(<ChangePasswordForm />);
    expect(screen.getByText("Cambio password")).toBeInTheDocument();
  });

  it("renders button", () => {
    reducer(<ChangePasswordForm />);
    const button = screen.getByRole(/Button/i, {
      name: "Cambia password",
    });
    expect(button).toBeInTheDocument();
  });

  it("renders new password field", () => {
    reducer(<ChangePasswordForm />);
    const field = screen.getByLabelText("Nuova password");
    expect(field).toBeInTheDocument();
  });

  it("renders confirm new password field", () => {
    reducer(<ChangePasswordForm />);
    const field = screen.getByLabelText("Conferma password");
    expect(field).toBeInTheDocument();
  });

  it("click button and show errors", async () => {
    reducer(<ChangePasswordForm />);
    const button = screen.getByRole(/Button/i, {
      name: "Cambia password",
    });
    const user = userEvent.setup();
    await act(async () => {
      await user.click(button);
    });

    const errors = await screen.findAllByText("Password non corretta");
    expect(errors).toHaveLength(2);
  });
});
