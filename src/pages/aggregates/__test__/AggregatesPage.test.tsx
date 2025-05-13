import { fireEvent, screen, act } from '@testing-library/react';
import * as router from 'react-router';
import { ConfirmationProvider } from '../../../components/confirmationDialog/ConfirmationProvider';
import { renderWithProviders, renderWithProvidersAndPermissions } from '../../../mocks/mockReducer';
import { Permission } from '../../../model/user-permission';
import * as routes from '../../../navigation/router.const';
import AggregatesPage from '../AggregatesPage';
import apiRequests from '../../../api/apiRequests';

const navigate = jest.fn();

describe('AggregatesPage test', () => {
  beforeEach(() => {
    // mock navigation
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    const apiSpyUsagePlans = jest.spyOn(apiRequests, 'getAggregates');
    apiSpyUsagePlans.mockImplementation(() =>
      Promise.resolve({
        items: [],
        lastEvaluatedId: '',
        lastEvaluatedName: '',
        total: 0,
      })
    );
  });

  it('render', async () => {
    await act(async () => {
      renderWithProviders(
        <ConfirmationProvider>
          <AggregatesPage />
        </ConfirmationProvider>
      );
    });

    expect(screen.getByText('Gestione Aggregazioni ApiKey')).toBeInTheDocument();
  });

  it('click nuova aggregazione', async () => {
    await act(async () => {
      renderWithProvidersAndPermissions(
        <ConfirmationProvider>
          <AggregatesPage />
        </ConfirmationProvider>,
        [Permission.API_KEY_WRITE]
      );
    });

    const nuovaAggregazioneButton = screen.getByRole('button', { name: 'Nuova aggregazione' });
    expect(nuovaAggregazioneButton).toBeInTheDocument();
    fireEvent.click(nuovaAggregazioneButton);

    expect(navigate).toBeCalledWith(routes.CREATE_AGGREGATE);
  });
});
