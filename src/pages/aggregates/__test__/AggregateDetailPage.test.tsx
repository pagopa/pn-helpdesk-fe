/**
 * @jest-environment jsdom
 */
import 'regenerator-runtime/runtime';
import { fireEvent, waitFor, screen, act } from '@testing-library/react';
import * as router from 'react-router';
import { ConfirmationProvider } from '../../../components/confirmationDialog/ConfirmationProvider';
import { renderWithProvidersAndPermissions } from '../../../mocks/mockReducer';
import apiRequests from '../../../api/apiRequests';
import AggregateDetailPage from '../AggregateDetailPage';
import * as routes from '../../../navigation/router.const';
import { aggregate, usage_plan_list, pa_list } from '../../../api/mock_agg_response';
import { Permission } from '../../../model/user-permission';

const navigate = jest.fn();

describe('AggregateDetailPage MODIFY', () => {
  const mockData1 = { ...usage_plan_list };
  const mockData2 = { ...aggregate };
  const mockData3 = { ...pa_list };

  beforeEach(async () => {
    const apiSpyUsagePlans = jest.spyOn(apiRequests, 'getUsagePlans');
    apiSpyUsagePlans.mockImplementation(() => Promise.resolve(mockData1));
    const apiSpyAggregate = jest.spyOn(apiRequests, 'getAggregateDetails');
    apiSpyAggregate.mockImplementation(() => Promise.resolve(mockData2));
    const apiSpyAssociatedPa = jest.spyOn(apiRequests, 'getAssociatedPaList');
    apiSpyAssociatedPa.mockImplementation(() => Promise.resolve(mockData3));
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    jest.spyOn(router, 'useParams').mockImplementation(() => ({ idAggregate: mockData2.id }));
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('Renders AggregateDetailPage MODIFY', async () => {
    await act(async () => {
      renderWithProvidersAndPermissions(
        <ConfirmationProvider>
          <AggregateDetailPage email="test@test.com" />
        </ConfirmationProvider>,
        [Permission.API_KEY_WRITE]
      );
    });

    expect(apiRequests.getUsagePlans).toHaveBeenCalled();
    expect(apiRequests.getAggregateDetails).toHaveBeenCalled();

    const save_button = await screen.findByText('Salva');
    const delete_button = await screen.findByText('Elimina');
    expect(save_button).toBeInTheDocument();
    expect(delete_button).toBeInTheDocument();
    expect(screen.getByTestId('aggregate-form')).toBeInTheDocument();
    const pa_table = screen.getByLabelText('Tabella di Pubbliche amministrazioni');
    expect(pa_table).toBeInTheDocument();
  });

  it('Click Associa', async () => {
    await act(async () => {
      renderWithProvidersAndPermissions(
        <ConfirmationProvider>
          <AggregateDetailPage email="test@test.com" />
        </ConfirmationProvider>,
        [Permission.API_KEY_WRITE]
      );
    });
    const associa_pa_button = await screen.findByRole('button', { name: 'Associa PA' });
    expect(associa_pa_button).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(associa_pa_button);
    });
    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith(routes.ADD_PA, {
        state: { aggregate: { ...mockData2, associatedPa: mockData3.items } },
      })
    );
  });

  it('Click Trasferisci', async () => {
    await act(async () => {
      renderWithProvidersAndPermissions(
        <ConfirmationProvider>
          <AggregateDetailPage email="test@test.com" />
        </ConfirmationProvider>,
        [Permission.API_KEY_WRITE]
      );
    });
    const trasferisci_pa_button = await screen.findByRole('button', { name: 'Trasferisci PA' });
    expect(trasferisci_pa_button).toBeInTheDocument();
    fireEvent.click(trasferisci_pa_button);
    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith(routes.TRANSFER_PA, {
        state: { aggregate: { id: mockData2.id, name: mockData2.name } },
      })
    );
  });
});

describe('AggregateDetailPage CREATE', () => {
  beforeEach(async () => {
    const apiSpyUsagePlans = jest.spyOn(apiRequests, 'getUsagePlans');
    apiSpyUsagePlans.mockImplementation(() => Promise.resolve(usage_plan_list));
  });

  it('Renders AggregateDetailPage CREATE with Read permission', async () => {
    await act(async () => {
      renderWithProvidersAndPermissions(
        <ConfirmationProvider>
          <AggregateDetailPage email="test@test.com" />
        </ConfirmationProvider>,
        [Permission.API_KEY_READ]
      );
    });
    const pa_table = screen.queryByLabelText('Tabella di Pubbliche amministrazioni');
    const create_aggregate_button = screen.queryByRole('button', { name: 'Crea' });
    const trasferisci_pa_button = screen.queryByRole('button', { name: 'Trasferisci PA' });
    const associa_pa_button = screen.queryByRole('button', { name: 'Associa PA' });
    expect(pa_table).not.toBeInTheDocument();
    expect(create_aggregate_button).not.toBeInTheDocument();
    expect(trasferisci_pa_button).not.toBeInTheDocument();
    expect(associa_pa_button).not.toBeInTheDocument();
  });

  it('Renders AggregateDetailPage CREATE with Write permission', async () => {
    await act(async () => {
      renderWithProvidersAndPermissions(
        <ConfirmationProvider>
          <AggregateDetailPage email="test@test.com" />
        </ConfirmationProvider>,
        [Permission.API_KEY_WRITE]
      );
    });
    const create_aggregate_button = await screen.findByRole('button', { name: 'Crea' });
    expect(create_aggregate_button).toBeDisabled();
    const pa_table = screen.queryByLabelText('Tabella di Pubbliche amministrazioni');
    const trasferisci_pa_button = screen.queryByRole('button', { name: 'Trasferisci PA' });
    const associa_pa_button = screen.queryByRole('button', { name: 'Associa PA' });
    expect(pa_table).not.toBeInTheDocument();
    expect(trasferisci_pa_button).not.toBeInTheDocument();
    expect(associa_pa_button).not.toBeInTheDocument();
  });
});

describe('AggregateDetailPage FAILED_PROMISE', () => {
  beforeEach(async () => {
    const apiSpyUsagePlans = jest.spyOn(apiRequests, 'getUsagePlans');
    apiSpyUsagePlans.mockImplementation(() => Promise.resolve(usage_plan_list));
  });
  
  it('Renders AggregateDetailPage FAILED_PROMISE', async () => {
    const apiSpyUsagePlans = jest.spyOn(apiRequests, 'getUsagePlans');
    apiSpyUsagePlans.mockImplementation(() => Promise.reject());
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);

    await act(async () => {
      renderWithProvidersAndPermissions(
        <ConfirmationProvider>
          <AggregateDetailPage email="test@test.com" />
        </ConfirmationProvider>,
        [Permission.API_KEY_READ]
      );
    });
    await waitFor(() => expect(apiRequests.getUsagePlans).toHaveBeenCalled());
    await waitFor(() => expect(navigate).toHaveBeenCalledWith(routes.AGGREGATES_LIST));
  });
});
