/**
 * @jest-environment jsdom
 */
import React from "react";
import "regenerator-runtime/runtime";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Footer from "../Footer";

describe("Footer Component", () => {
  it("renders footer", () => {
    render(<Footer />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
