import { screen } from '@testing-library/react';
import { aggregate as mockAggregate } from '../../../api/mock_agg_response';
import { ConfirmationProvider } from '../../../components/confirmationDialog/ConfirmationProvider';
import { renderWithProviders } from '../../../mocks/mockReducer';
import PaAssociationPage from '../PaAssociationPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/example/path',
    state: { aggregate: mockAggregate },
  }),
}));

describe('PaAssociationPage test', () => {
  it('render', async () => {
    const Wrapped = (
      <ConfirmationProvider>
        <PaAssociationPage />
      </ConfirmationProvider>
    );
    renderWithProviders(Wrapped);

    expect(screen.getByTestId('aggregate-accordion')).toBeInTheDocument();
    expect(screen.getByRole('table'));
    expect(screen.getAllByTestId('customCard'));
  });
});
