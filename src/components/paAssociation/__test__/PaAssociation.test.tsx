import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import * as router from 'react-router';
import apiRequests from '../../../api/apiRequests';
import { pa_list_associated } from '../../../api/mock_agg_response';
import { renderWithProviders } from '../../../mocks/mockReducer';
import * as routes from '../../../navigation/router.const';
import { ConfirmationProvider } from '../../confirmationDialog/ConfirmationProvider';
import PaAssociation from '../../paAssociation/PaAssociation';
import { Mocked, vi, type Mock } from 'vitest';

const navigate = vi.fn();

describe('PaAssociation tests', () => {
  // Override default timeout
  vi.setConfig({ testTimeout: 10000 });
  const mockApiGetAssociablePaList = vi.fn();
  const mockApiAddPaFn = vi.fn();
  const idAggregate = 'agg_1';

  beforeEach(async () => {
    // mock api
    const apiSpyGetAssociablePaList = vi.spyOn(apiRequests, 'getAssociablePaList');
    apiSpyGetAssociablePaList.mockImplementation(mockApiGetAssociablePaList);
    const items = pa_list_associated.items.map((pa) => ({ ...pa, selected: false }));
    apiSpyGetAssociablePaList.mockResolvedValue({ items });

    const apiSpyAddPa = vi.spyOn(apiRequests, 'addPa');
    apiSpyAddPa.mockImplementation(mockApiAddPaFn);
    apiSpyAddPa.mockResolvedValue({
      processed: 1,
      unprocessed: 0,
      unprocessedPA: [],
    });

    // mock navigation
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it('render associable-pa-card', async () => {
    renderWithProviders(
      <ConfirmationProvider>
        <PaAssociation idAggregate={idAggregate} />
      </ConfirmationProvider>
    );

    const associablePaTable = screen.queryByRole('table');
    expect(associablePaTable).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('pageSelector')).toBeInTheDocument());
    const tableBody = associablePaTable!.querySelector('tbody');
    const tableRows = tableBody!.querySelectorAll('tr');
    expect(tableRows).not.toHaveLength(0);
  });

  it('check pa and save', async () => {
    renderWithProviders(
      <ConfirmationProvider>
        <PaAssociation idAggregate={idAggregate} />
      </ConfirmationProvider>
    );

    const associablePaTable = screen.queryByRole('table');
    expect(associablePaTable).toBeInTheDocument();

    await waitFor(() => expect(screen.getByTestId('pageSelector')).toBeInTheDocument());
    const tableBody = associablePaTable!.querySelector('tbody');
    const tableRows = tableBody!.querySelectorAll('tr');
    expect(tableRows).not.toHaveLength(0);

    // Check Pa in table
    const firstCheckbox = within(associablePaTable!).getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);

    // Click save in selected pa card
    const saveButton = await waitFor(() => screen.getByRole('button', { name: 'Salva' }));
    expect(saveButton).toBeInTheDocument();
    const paListItems = screen.queryAllByTestId('paList-item');
    expect(paListItems).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Salva' }));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Conferma' })).toBeInTheDocument()
    );

    // Click confirm in dialog
    fireEvent.click(screen.getByRole('button', { name: 'Conferma' }));
    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith(routes.GET_UPDATE_AGGREGATE_PATH(idAggregate))
    );

    // await waitFor(() => expect(screen.getByText("Tutte le PA sono state associate con successo")).toBeInTheDocument())
  });
});
