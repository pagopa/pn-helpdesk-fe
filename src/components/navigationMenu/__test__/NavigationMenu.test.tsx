/**
 * @jest-environment jsdom
 */
import React, {useCallback, useState} from "react";
import "regenerator-runtime/runtime";

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import NavigationMenu from "../NavigationMenu";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { Permission, UserData } from "../../../model/user-permission";
import { UserContext } from "../../../contexts/UserContext";

const mockedUser = {
  email: "test@test.com",
  permissions: Object.values(Permission)
};

const MockedUserContext = ({children}: {children: React.ReactNode}) => {
  const [_, setCurrentUser] = useState<UserData | null>(null);
  const currentUser = mockedUser;

  const clearCurrentUser = useCallback(() => setCurrentUser(null), [setCurrentUser]);

  return <UserContext.Provider value={{currentUser, setCurrentUser, clearCurrentUser}}>
    {children}
  </UserContext.Provider>
}

describe("NavigationMenu Component", () => {
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
    expect(icon).toBeInTheDocument();
  });

  it("click button and show menu component", async () => {
    render(
      <MockedUserContext>
        <Router>
          <NavigationMenu />
        </Router>
      </MockedUserContext>
    );
    const icon = screen.getByRole("button", {
      name: "menu",
    });
    expect(icon).toBeInTheDocument();

    const user = userEvent.setup();

    await act(async () => {
      await user.click(icon);
    });

    const drawerButton = await screen.findByText(
      "Monitoraggio Piattaforma Notifiche"
    );
    await act(async () => {
      await user.click(drawerButton);
    });
    expect(global.window.location.pathname).toContain("/monitoring");
  });

  it("simulate tab click", async () => {
    render(
      <MockedUserContext>
        <Router>
          <NavigationMenu />
        </Router>
      </MockedUserContext>
    );
    const icon = screen.getByRole("button", {
      name: "menu",
    });
    expect(icon).toBeInTheDocument();

    const user = userEvent.setup();

    await act(async () => {
      await user.click(icon);
    });

    const drawerButton = await screen.findByText(
      "Monitoraggio Piattaforma Notifiche"
    );
    expect(drawerButton).toBeInTheDocument();

    await act(async () => {
      await user.keyboard("[ShiftLeft]");
    });
  });

  it("simulate click escape", async () => {
    render(
      <MockedUserContext>
        <Router>
          <NavigationMenu />
        </Router>
      </MockedUserContext>
    );
    const icon = screen.getByRole("button", {
      name: "menu",
    });
    expect(icon).toBeInTheDocument();

    const user = userEvent.setup();

    await act(async () => {
      await user.click(icon);
    });

    const drawerButton = await screen.findByText(
      "Monitoraggio Piattaforma Notifiche"
    );
    expect(drawerButton).toBeInTheDocument();

    await act(async () => {
      await user.keyboard("{Escape}");
    });
    await waitForElementToBeRemoved(() =>
      screen.queryByText("Monitoraggio Piattaforma Notifiche")
    );
  });
});
