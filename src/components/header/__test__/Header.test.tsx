/**
 * @jest-environment jsdom
 */
import React from "react";
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom/extend-expect";
import { screen, within } from "@testing-library/react";
import Header from "../Header";
import "regenerator-runtime/runtime";
import { reducer } from "../../../__tests__/testReducer";
import userEvent from "@testing-library/user-event";

const email = "test@test.com";

describe("Header Component", () => {
  it("renders header", () => {
    reducer(<Header email={email} />);
    expect(screen.getByRole("banner")).toBeDefined();
  });

  it("renders header items", () => {
    reducer(<Header email={email} />);
    expect(screen.getByText("PagoPA S.p.A.")).toBeTruthy();
    expect(screen.getByText(email)).toBeTruthy();
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    const icon = screen.getByTestId("MenuIcon");
    expect(icon).toBeDefined();
  });

  it("simulate log out button click", async () => {
    reducer(<Header email={email} />);
    const button = screen.getByTestId("LogoutIcon") as HTMLButtonElement;
    userEvent.click(button);
    const modal = screen.getByRole("dialog");
    expect(modal).toBeDefined();
    await within(modal as HTMLElement)
      .findAllByRole("button")
      .then(buttons => {
        expect(buttons).toHaveLength(2);
        userEvent.click(screen.getByText("Annulla"));
        expect(screen.getByText("Annulla")).not.toBeVisible();
      });
  });

  it("simulate log out", async () => {
    jest.setTimeout(10000);
    reducer(<Header email={email} />);
    const button = screen.getByTestId("LogoutIcon") as HTMLButtonElement;
    userEvent.click(button);
    const modal = screen.getByRole("dialog");
    expect(modal).toBeDefined();
      await within(modal as HTMLElement)
        .findAllByRole("button")
        .then(buttons => {
          expect(buttons).toHaveLength(2);
          userEvent.click(screen.getByText("Esci"));
            expect(window.location.pathname).toBe("/");
            expect(modal).not.toBeVisible();
        });
  });
});
