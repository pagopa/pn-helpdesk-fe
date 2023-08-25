import React, { useCallback, useState } from 'react';
import { screen } from '@testing-library/react';
import { UserContext } from '../../../contexts/UserContext';
import { Permission, UserData } from '../../../model/user-permission';
import HomePage from '../HomePage';
import { renderWithProviders } from '../../../mocks/mockReducer';

const mockedUser = {
  email: 'test@test.com',
  permissions: Object.values(Permission),
};

const MockedUserContext = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(mockedUser);

  const clearCurrentUser = useCallback(() => setCurrentUser(null), [setCurrentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, clearCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

describe('HomePage test', () => {
  it('Checks that all elements are rendered', () => {
    renderWithProviders(
      <MockedUserContext>
        <HomePage />
      </MockedUserContext>
    );

    const cards = screen.getAllByRole('heading');

    expect(cards).toHaveLength(6);
    expect(screen.getByText('Ricerca ed estrazione dati')).toBeInTheDocument();
    expect(screen.getByText('Monitoraggio Piattaforma Notifiche')).toBeInTheDocument();
    expect(screen.getByText('Gestione gare')).toBeInTheDocument();
    expect(screen.getByText('Gestione Aggregazioni ApiKey')).toBeInTheDocument();
    expect(screen.getByText('Trasferimento di PA')).toBeInTheDocument();
  });
});
