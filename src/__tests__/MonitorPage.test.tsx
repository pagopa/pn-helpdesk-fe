/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/react";
import "regenerator-runtime/runtime";
import MonitorPage from "../Pages/MonitorPage";
import { reducer } from "./testReducer";

describe("MonitorPage", () => {
  beforeEach(() => {
    reducer(<MonitorPage email="test@test.com" />);
  });

  it("render component", () => {
    expect(screen.getByText("Monitor page")).toBeTruthy();
  });
});
