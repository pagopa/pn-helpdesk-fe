import { Permission, UserData } from "../../../model/user-permission";
import React, { useCallback, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import {render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "../HomePage";
import {renderWithProviders} from "../../../mocks/mockReducer";


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

describe("HomePage test", () => {
  it('Checks that all elements are rendered', () => {
    renderWithProviders(
      <MockedUserContext>
         <HomePage />
      </MockedUserContext>)

    const cards = screen.getAllByRole('heading')

    expect(cards).toHaveLength(5)
    expect(screen.getByText("Ricerca ed estrazione dati")).toBeInTheDocument()
    expect(screen.getByText("Monitoraggio Piattaforma Notifiche")).toBeInTheDocument()
    expect(screen.getByText("Gestione gare")).toBeInTheDocument()
    expect(screen.getByText("Gestione Aggregazioni ApiKey")).toBeInTheDocument()
    expect(screen.getByText("Trasferimento di PA")).toBeInTheDocument()
  })
})