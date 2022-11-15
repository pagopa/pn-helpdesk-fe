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
  let store = mockStore({
    snackbar: {
      opened: true,
      statusCode: "400",
    },
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders component", () => {
    render(
      <Provider store={store}>
        <SnackbarComponent />
      </Provider>
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
