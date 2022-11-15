/**
 * @jest-environment jsdom
 */
import React from "react";
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom/extend-expect";
import SnackbarComponent from "../SnackbarComponent";
import { render, screen } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureMockStore([]);

describe("SnackbarComponent  Component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders component with status 200", () => {
    let store = mockStore({
      snackbar: {
        opened: true,
        statusCode: "200",
      },
    });
    render(
      <Provider store={store}>
        <SnackbarComponent />
      </Provider>
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Operazione completata con successo"
    );
  });

  it("renders component with status 400", () => {
    let store = mockStore({
      snackbar: {
        opened: true,
        statusCode: "400",
      },
    });
    render(
      <Provider store={store}>
        <SnackbarComponent />
      </Provider>
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Informazioni non valide"
    );
  });

  it("renders component with status 504", () => {
    let store = mockStore({
      snackbar: {
        opened: true,
        statusCode: "504",
      },
    });
    render(
      <Provider store={store}>
        <SnackbarComponent />
      </Provider>
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "L'intervallo temporale selezionato è troppo grande, selezionarne uno più piccolo"
    );
  });

  it("renders component with status 502 and click close button", async () => {
    let store = mockStore({
      snackbar: {
        opened: true,
        statusCode: "502",
      },
    });
    const { container } = render(
      <Provider store={store}>
        <SnackbarComponent />
      </Provider>
    );
    const snackbar = screen.getByRole("alert");
    expect(snackbar).toBeInTheDocument();
    expect(snackbar).toHaveTextContent(
      "Errore durante l'elaborazione della richiesta"
    );
  });
});
