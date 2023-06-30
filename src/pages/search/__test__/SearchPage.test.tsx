/**
 * @jest-environment jsdom
 */
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, screen } from "@testing-library/react";
import SearchPage from "../SearchPage";
import { reducer } from "../../../mocks/mockReducer";
import * as auth from "../../../Authentication/auth";
import React from "react";

describe("SearchPage", () => {
  afterEach(cleanup);

  beforeEach(() => {
    jest.spyOn(React, "useEffect").mockImplementation(() => jest.fn());
    reducer(<SearchPage />);
  });

  it("renders header and footer", () => {
    expect(screen.getAllByRole("banner").length).toEqual(2);
  });

  it("renders form", () => {
    expect(
      screen.getByRole("heading", { name: /Ricerca/i })
    ).toBeInTheDocument();
  });
});
