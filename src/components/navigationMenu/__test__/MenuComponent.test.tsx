/**
 * @jest-environment jsdom
 */
import React from "react";
import "regenerator-runtime/runtime";

import { render, screen } from "@testing-library/react";
import NavigationMenu from "../NavigationMenu";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";

describe("Navigation menu component test", () => {
 beforeAll(() => {
   Object.defineProperty(window, "matchMedia", {
     writable: true,
     value: (query: string) => ({
       media: query,
       matches: query === "(pointer: fine)",
       onchange: () => {},
       addEventListener: () => {},
       removeEventListener: () => {},
       addListener: () => {},
       removeListener: () => {},
       dispatchEvent: () => false,
     }),
   });
 });

  it("renders icon of the menu", () => {
    render(
      <Router>
        <NavigationMenu />
      </Router>
    );
    const icon = screen.getByRole("button", { name: "menu" });
    expect(icon).toBeTruthy();
  });

  it("click button and show menu component", () => {
    render(
      <Router>
        <NavigationMenu />
      </Router>
    );
    const icon = screen.getByRole("button", {
      name: "menu",
    }) as HTMLButtonElement;
    expect(icon).toBeTruthy();
    act(() => {
      icon.click();
    });
    const drawerButton = screen.getByRole("button", {name: "Monitoraggio Piattaforma Notifiche"});
    act(() => {
      drawerButton.click();
    });
    expect(global.window.location.pathname).toContain("/monitoring");
  });

});
