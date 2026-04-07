import { screen } from '@testing-library/react';
import { renderWithProvidersAndPermissions } from '../../../mocks/mockReducer';
import { Permission } from '../../../model/user-permission';
import HomePage from '../HomePage';

describe('HomePage test', () => {
  it('Checks that all elements are rendered', () => {
    renderWithProvidersAndPermissions(<HomePage />, Object.values(Permission));

    const cards = screen.getAllByRole('heading');

    expect(cards).toHaveLength(6);
    expect(screen.getByText('Ricerca ed estrazione dati')).toBeInTheDocument();
    expect(screen.getByText('Monitoraggio Piattaforma Notifiche')).toBeInTheDocument();
    expect(screen.getByText('Gestione gare')).toBeInTheDocument();
    expect(screen.getByText('Gestione Aggregazioni ApiKey')).toBeInTheDocument();
    expect(screen.getByText('Trasferimento di PA')).toBeInTheDocument();
  });

  it("Check that empty state is rendered when user doesn't have permissions", () => {
    renderWithProvidersAndPermissions(<HomePage />, []);

    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });
});
