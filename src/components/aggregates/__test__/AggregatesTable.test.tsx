import { fireEvent, RenderResult, waitFor, screen, act } from '@testing-library/react';
import * as router from 'react-router';
import apiRequests from '../../../api/apiRequests';
import { aggregates_list } from '../../../api/mock_agg_response';
import AggregatesTable from '../AggregatesTable';
import { renderWithProvidersAndPermissions } from '../../../mocks/mockReducer';
import { ConfirmationProvider } from '../../confirmationDialog/ConfirmationProvider';
import { formatDate } from '../../../helpers/formatter.utility';
import * as routes from '../../../navigation/router.const';
import { getAggregatesResponse } from '../../../api/apiRequestTypes';
import { Permission } from '../../../model/user-permission';

const navigate = jest.fn();

describe('AggregatesTable Component with Write permission', () => {
  // eslint-disable-next-line functional/no-let
  let result: RenderResult | undefined;

  const mockData = { ...aggregates_list } as getAggregatesResponse;
  const formattedData = mockData.items.map((agg) => ({
    ...agg,
    createdAt: formatDate(agg.createdAt, true),
    lastUpdate: agg.lastUpdate ? formatDate(agg.lastUpdate, true) : ``,
  }));
  mockData.items = formattedData;

  beforeEach(async () => {
    // mock api
    const apiSpyGetAggregates = jest.spyOn(apiRequests, 'getAggregates');
    apiSpyGetAggregates.mockImplementation((params) => {
      if (params.name !== '') {
        const filteredItems = mockData.items.filter((agg) => agg.name === params.name);
        return Promise.resolve({
          ...mockData,
          items: filteredItems,
        });
      }

      return Promise.resolve(mockData);
    });

    const apiSpyDeleteAggregate = jest.spyOn(apiRequests, 'deleteAggregate');
    apiSpyDeleteAggregate
      .mockImplementationOnce((id) => Promise.resolve({ id }))
      .mockImplementation(() => Promise.reject({ detail: 'Errore' }));

    // mock navigation
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    jest.restoreAllMocks();
    result = undefined;
  });

  it('renders aggregates table with write permission', async () => {
    result = renderWithProvidersAndPermissions(
      <ConfirmationProvider>
        <AggregatesTable />
      </ConfirmationProvider>,
      [Permission.API_KEY_WRITE]
    );

    const filterForm = result?.container.querySelector('form');
    expect(filterForm).toBeInTheDocument();
    const aggregatesTable = screen.getByRole('table');
    expect(aggregatesTable).toBeInTheDocument();
    const pageSelector = result?.queryByTestId('pageSelector');
    expect(pageSelector).toBeInTheDocument();
    await waitFor(() => {
      // Aggregates fetched and displayed
      expect(result?.container.querySelectorAll('tbody tr')).toHaveLength(mockData.items.length);
    });

    // check presence of delete button in table rows
    expect(result?.getAllByRole('button', { name: 'Cancella aggregato' })).toHaveLength(
      mockData.items.length
    );
  });

  it('renders aggregates table with read permission', async () => {
    result = renderWithProvidersAndPermissions(
      <ConfirmationProvider>
        <AggregatesTable />
      </ConfirmationProvider>,
      [Permission.API_KEY_READ]
    );

    const filterForm = result?.container.querySelector('form');
    expect(filterForm).toBeInTheDocument();
    const aggregatesTable = screen.getByRole('table');
    expect(aggregatesTable).toBeInTheDocument();
    const pageSelector = result?.queryByTestId('pageSelector');
    expect(pageSelector).toBeInTheDocument();
    await waitFor(() => {
      // Aggregates fetched and displayed
      expect(result?.container.querySelectorAll('tbody tr')).toHaveLength(mockData.items.length);
    });

    // check absence of delete button in table rows
    expect(result?.queryByRole('button', { name: 'Cancella aggregato' })).not.toBeInTheDocument();
  });

  it('handle click on column', async () => {
    result = renderWithProvidersAndPermissions(
      <ConfirmationProvider>
        <AggregatesTable />
      </ConfirmationProvider>,
      [Permission.API_KEY_WRITE]
    );

    await waitFor(() => {
      // Aggregates fetched and displayed
      expect(result?.container.querySelectorAll('tbody tr')).toHaveLength(mockData.items.length);
    });
    const firstTd = result?.container.querySelector('tbody tr:first-child td:first-child');
    expect(firstTd).toBeInTheDocument();
    fireEvent.click(firstTd!);
    await waitFor(() =>
      expect(navigate).toBeCalledWith(routes.GET_UPDATE_AGGREGATE_PATH(mockData.items[0].id))
    );
  });

  it('delete aggregate', async () => {
    result = renderWithProvidersAndPermissions(
      <ConfirmationProvider>
        <AggregatesTable />
      </ConfirmationProvider>,
      [Permission.API_KEY_WRITE]
    );

    await waitFor(() => {
      // Aggregates fetched and displayed
      expect(result?.container.querySelectorAll('tbody tr')).toHaveLength(mockData.items.length);
    });
    const lastTd = result?.container.querySelector('tbody tr:first-child td:last-child');
    expect(lastTd).toBeInTheDocument();
    fireEvent.click(lastTd!);

    // Confirmation modal opened
    await waitFor(() => expect('Elimina aggregazione'));

    const confirmButton = await waitFor(() => screen.getByRole('button', { name: 'Conferma' }));
    fireEvent.click(confirmButton);
    await waitFor(() => {
      // Aggregates refetched and displayed
      expect(result?.container.querySelectorAll('tbody tr')).toHaveLength(mockData.items.length);
    });
  });

  it('filter single aggregate by name', async () => {
    result = renderWithProvidersAndPermissions(
      <ConfirmationProvider>
        <AggregatesTable />
      </ConfirmationProvider>,
      [Permission.API_KEY_WRITE]
    );

    await waitFor(() => {
      // Aggregates fetched and displayed
      expect(result?.container.querySelectorAll('tbody tr')).toHaveLength(mockData.items.length);
    });

    const aggregateNameInput = screen.getByRole('textbox', { name: 'Nome aggregazione' });
    const filterButton = screen.getByRole('button', { name: 'Filtra' });
    const firstAggregateName = mockData.items[0].name;

    fireEvent.change(aggregateNameInput, { target: { value: firstAggregateName } });
    await waitFor(() => {
      expect(aggregateNameInput).toHaveValue(firstAggregateName);
    });

    await act(async () => {
      fireEvent.click(filterButton);
    });
    await waitFor(() => {
      expect(result?.container.querySelectorAll('tbody tr')).toHaveLength(1);
      expect(screen.getByText(firstAggregateName)).toBeInTheDocument();
    });
  });
});

describe('AggregatesTable Component error', () => {
  beforeEach(() => {
    // mock api
    const apiSpyGetAggregates = jest.spyOn(apiRequests, 'getAggregates');
    apiSpyGetAggregates.mockRejectedValue({});
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('handles error in api rest', async () => {
    renderWithProvidersAndPermissions(
      <ConfirmationProvider>
        <AggregatesTable />
      </ConfirmationProvider>,
      [Permission.API_KEY_WRITE]
    );
    await waitFor(() =>
      expect(screen.getByText(/Non ci sono elementi da visualizzare/i)).toBeInTheDocument()
    );
  });
});
