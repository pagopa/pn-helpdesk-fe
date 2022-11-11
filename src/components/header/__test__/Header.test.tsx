/**
 * @jest-environment jsdom
 */
import React from "react";
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom/extend-expect";
import {
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import Header from "../Header";
import "regenerator-runtime/runtime";
import { reducer } from "../../../mocks/mockReducer";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const email = "test@test.com";

describe("Header Component", () => {
  it("renders header", () => {
    reducer(<Header email={email} />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders header items", () => {
    reducer(<Header email={email} />);
    expect(screen.getByText("PagoPA S.p.A.")).toBeInTheDocument();
    expect(screen.getByText(email)).toBeInTheDocument();
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  it("simulate log out button click and Anulla after that", async () => {
    reducer(<Header email={email} />);

    const button = screen.getAllByRole("button")[1] as HTMLButtonElement;
    const user = userEvent.setup();
    await act(async () => {
      await user.click(button);
    });

    const modal = await screen.findByRole("dialog");
    expect(modal).toBeInTheDocument();

    const modalButtons = await within(modal as HTMLElement).findAllByRole(
      "button"
    );
    expect(modalButtons).toHaveLength(2);
    const esciButton = screen.getByRole("button", {
      name: "Annulla",
    }) as HTMLButtonElement;

    await act(async () => {
      await user.click(esciButton);
    });
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("simulate log out button click and Esci after that", async () => {
    reducer(<Header email={email} />);

    const button = screen.getAllByRole("button")[1] as HTMLButtonElement;
    const user = userEvent.setup();
    await act(async () => {
      await user.click(button);
    });

    const modal = await screen.findByRole("dialog");
    expect(modal).toBeInTheDocument();

    const modalButtons = await within(modal as HTMLElement).findAllByRole(
      "button"
    );
    expect(modalButtons).toHaveLength(2);
    const esciButton = screen.getByRole("button", {
      name: "Esci",
    }) as HTMLButtonElement;

    await act(async () => {
      await user.click(esciButton);
    });

    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
    expect(window.location.pathname).toBe("/");
    expect(modal).not.toBeVisible();
  });
});
