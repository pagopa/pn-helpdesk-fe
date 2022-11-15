/**
 * @jest-environment jsdom
 */
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, screen } from "@testing-library/react";
import "regenerator-runtime/runtime";
import SearchPage from "../SearchPage";
import { reducer } from "../../../mocks/mockReducer";

describe("SearchPage", () => {
  afterEach(cleanup);

  beforeEach(() => {
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
