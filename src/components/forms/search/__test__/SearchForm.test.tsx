/**
 * @jest-environment jsdom
 */
import React from "react";
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom/extend-expect";
import { screen, act, cleanup } from "@testing-library/react";
import { reducer } from "../../../../mocks/mockReducer";
import SearchForm from "../SearchForm";
import userEvent from "@testing-library/user-event";
import * as auth from "../../../../Authentication/auth";

describe("SearchForm", () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.spyOn(auth, "getUser").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        return resolve("test");
      });
    });
    reducer(<SearchForm />);
  });

  it("renders component", () => {
    expect(
      screen.getByRole("heading", { name: /Ricerca/i })
    ).toBeInTheDocument();
  });

  it("renders input fields", async () => {
    const ticketNumber = await screen.findByRole("textbox", {
      name: "Numero Ticket",
    });
    const fiscalCode = await screen.findByRole("textbox", {
      name: "Codice Fiscale",
    });
    const recipientTypeRadionGroup = await screen.findByRole("radiogroup");
    const recipientTypeRadionInputs = await screen.findAllByRole("radio");

    expect(ticketNumber).toBeInTheDocument();
    expect(fiscalCode).toBeInTheDocument();
    expect(recipientTypeRadionGroup).toBeInTheDocument();
    expect(recipientTypeRadionInputs.length).toEqual(2);

    recipientTypeRadionInputs.forEach((input) => {
      expect(input.getAttribute("name")).toEqual("recipientType");
      expect(["PF", "PG"].includes(input.getAttribute("value")!)).toBeTruthy();
    });
  });

  it("renders resetta filtri button", async () => {
    const button = await screen.findByRole("button", {
      name: "Resetta filtri",
    });
    expect(button).toBeInTheDocument();
    expect(button.getAttribute("disabled")).toEqual(null);
  });

  it("renders ricerca button and be disabled", async () => {
    const button = await screen.findByRole("button", {
      name: "Ricerca",
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("disabled");
  });

  it("fill fields and click ricerca", async () => {
    const ticketNumber = await screen.findByRole("textbox", {
      name: "Numero Ticket",
    });
    const fiscalCode = await screen.findByRole("textbox", {
      name: "Codice Fiscale",
    });

    const user = userEvent.setup();
    await act(async () => {
      await user.clear(ticketNumber);
      await user.type(ticketNumber, "abc");
    });
    await act(async () => {
      await user.clear(fiscalCode);
      await user.type(fiscalCode, "MLLSNT82P65Z404U");
    });
    const button = await screen.findByRole("button", {
      name: "Ricerca",
    });
    await act(() => user.click(button));
    expect(button).not.toBeDisabled();
  });

  it("fill fields and click resetta filtri", async () => {
    const ticketNumber = await screen.findByRole("textbox", {
      name: "Numero Ticket",
    });
    const fiscalCode = await screen.findByRole("textbox", {
      name: "Codice Fiscale",
    });

    const user = userEvent.setup();

    await act(async () => {
      await user.clear(ticketNumber);
      await user.type(ticketNumber, "abc");
    });
    await act(async () => {
      await user.clear(fiscalCode);
      await user.type(fiscalCode, "MLLSNT82P65Z404U");
    });

    const button = await screen.findByRole("button", {
      name: "Resetta filtri",
    });
    await act(() => user.click(button));
    expect(ticketNumber).toHaveValue("");
    expect(fiscalCode).toHaveValue("");
  });

  it("change Tipo estrazione", async () => {
    const selectMenu = screen.getByRole("button", {
      name: "Ottieni EncCF",
    });
    expect(selectMenu).toBeInTheDocument();

    const user = userEvent.setup();
    await act(() => user.click(selectMenu));
    const ottieniLogCompleti = await screen.findByRole("option", {
      name: "Ottieni log completi",
    });
    expect(ottieniLogCompleti).toBeInTheDocument();

    await act(() => user.click(ottieniLogCompleti));
    expect(selectMenu.textContent).toEqual("Ottieni log completi");
  });

  it("change Tipo estrazione to Ottieni log completi and make request", async () => {
    const selectMenu = screen.getByRole("button", {
      name: "Ottieni EncCF",
    });
    expect(selectMenu).toBeInTheDocument();

    const user = userEvent.setup();
    await act(() => user.click(selectMenu));
    const ottieniLogCompleti = await screen.findByRole("option", {
      name: "Ottieni log completi",
    });
    expect(ottieniLogCompleti).toBeInTheDocument();

    await act(() => user.click(ottieniLogCompleti));
    expect(selectMenu.textContent).toEqual("Ottieni log completi");

    const ticketNumber = await screen.findByRole("textbox", {
      name: "Numero Ticket",
    });
    const fiscalCode = await screen.findByRole("textbox", {
      name: "Codice Fiscale",
    });

    await act(async () => {
      await user.clear(ticketNumber);
      await user.type(ticketNumber, "abc");
    });
    await act(async () => {
      await user.clear(fiscalCode);
      await user.type(fiscalCode, "MLLSNT82P65Z404U");
    });
    const button = await screen.findByRole("button", {
      name: "Ricerca",
    });
    await act(() => user.click(button));
  });

  it("change Tipo estrazione to Ottieni notifiche di una PA and make request", async () => {
    const selectMenu = screen.getByRole("button", {
      name: "Ottieni EncCF",
    });
    expect(selectMenu).toBeInTheDocument();

    const user = userEvent.setup();
    await act(() => user.click(selectMenu));
    const ottieniLogCompleti = await screen.findByRole("option", {
      name: "Ottieni notifiche di una PA",
    });
    expect(ottieniLogCompleti).toBeInTheDocument();

    await act(() => user.click(ottieniLogCompleti));
    expect(selectMenu.textContent).toEqual("Ottieni notifiche di una PA");

    const ticketNumber = await screen.findByRole("textbox", {
      name: "Numero Ticket",
    });
    const nomePa = await screen.findByRole("textbox", {
      name: "Nome PA",
    });

    await act(async () => {
      await user.clear(ticketNumber);
      await user.type(ticketNumber, "abc");
    });
    await act(async () => {
      await user.clear(nomePa);
      await user.type(nomePa, "icn");
    });
    const button = await screen.findByRole("button", {
      name: "Ricerca",
    });
    await act(() => user.click(button));
  });

  it("change Tipo estrazione to Ottieni log di sessione", async () => {
    const selectMenu = screen.getByRole("button", {
      name: "Ottieni EncCF",
    });
    expect(selectMenu).toBeInTheDocument();

    const user = userEvent.setup();
    await act(() => user.click(selectMenu));
    const OttieniLogDiSessione = await screen.findByRole("option", {
      name: "Ottieni log di sessione",
    });
    expect(OttieniLogDiSessione).toBeInTheDocument();

    await act(() => user.click(OttieniLogDiSessione));
    expect(selectMenu.textContent).toEqual("Ottieni log di sessione");

    const ticketNumber = await screen.findByRole("textbox", {
      name: "Numero Ticket",
    });
    expect(ticketNumber).toBeInTheDocument();

    const jti = await screen.findByRole("textbox", {
      name: "Identificativo di sessione (jti)",
    });
    expect(jti).toBeInTheDocument();

    const checkbox = await screen.findByRole("checkbox");
    expect(checkbox).toBeInTheDocument();

    const datePickers = await screen.findAllByRole("textbox", {
      name: /Choose date/i,
    });
    expect(datePickers).toHaveLength(2);

    await act(async () => {
      await user.clear(ticketNumber);
      await user.type(ticketNumber, "abc");
    });
    await act(async () => {
      await user.clear(jti);
      await user.type(jti, "kj5l-77-abc");
    });
    const button = await screen.findByRole("button", {
      name: "Ricerca",
    });
    await act(() => user.click(button));
  });
});
