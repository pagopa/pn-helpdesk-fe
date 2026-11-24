import { act, screen } from '@testing-library/react';
import { aggregate as mockAggregate } from '../../../api/mock_agg_response';
import { ConfirmationProvider } from '../../../components/confirmationDialog/ConfirmationProvider';
import { renderWithProviders } from '../../../mocks/mockReducer';
import PaAssociationPage from '../PaAssociationPage';
import apiRequests from '../../../api/apiRequests';
import { Mocked, vi, type Mock } from 'vitest';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/example/path',
    state: { aggregate: mockAggregate },
  }),
}));

describe('PaAssociationPage test', () => {
  beforeEach(() => {
    const apiSpyGetAssociablePaList = vi.spyOn(apiRequests, 'getAssociablePaList');
    apiSpyGetAssociablePaList.mockImplementation(() => Promise.resolve({ items: [] }));
  });

  it('render', async () => {
    const Wrapped = (
      <ConfirmationProvider>
        <PaAssociationPage />
      </ConfirmationProvider>
    );

    await act(async () => {
      renderWithProviders(Wrapped);
    });

    expect(screen.getByTestId('aggregate-accordion')).toBeInTheDocument();
    expect(screen.getByRole('table'));
    expect(screen.getAllByTestId('customCard'));
  });
});
