import { RenderResult, act, fireEvent, screen, waitFor } from '@testing-library/react';
import apiRequests from '../../../api/apiRequests';
import { api_key, modify_pdnd } from '../../../api/mock_agg_response';
import { renderWithProviders } from '../../../mocks/mockReducer';
import { ConfirmationProvider } from '../../confirmationDialog/ConfirmationProvider';
import VirtualKeyTable from '../VirtualKeyTable';

describe('VirtualKeyTable without selected PA', () => {
  let result: RenderResult | undefined;

  it('renders alert info', () => {
    result = renderWithProviders(
      <ConfirmationProvider>
        <VirtualKeyTable id="" />
      </ConfirmationProvider>
    );

    expect(
      result.getByText(
        'Seleziona un elemento dalla sezione "Seleziona una PA" per visualizzare le corrispettive Virtual keys'
      )
    );
  });
});

describe('VirtualKeyTable with selected PA', () => {
  let result: RenderResult | undefined;
  const mockData = api_key;

  beforeEach(() => {
    // mock api
    const apiSpySearchApiKey = jest.spyOn(apiRequests, 'searchApiKey');
    apiSpySearchApiKey.mockImplementation(() => {
      const res = api_key;
      return Promise.resolve(res);
    });

    const apiSpyModifyPdnd = jest.spyOn(apiRequests, 'modifyPdnd');
    apiSpyModifyPdnd.mockImplementation(() => Promise.resolve(modify_pdnd));
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    jest.restoreAllMocks();
    result = undefined;
  });

  it('render', async () => {
    result = renderWithProviders(
      <ConfirmationProvider>
        <VirtualKeyTable id="001" />
      </ConfirmationProvider>
    );
    // Wait for table to be displayed
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    const pageSelector = result?.queryByTestId('pageSelector');
    expect(pageSelector).toBeInTheDocument();
    const saveButton = result?.queryByRole('button', { name: 'Salva modifiche' });
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeDisabled();

    // VirtualKeys fetched and displayed
    await waitFor(() => {
      expect(result?.container.querySelectorAll('tbody tr')).toHaveLength(mockData.items.length);
    });
  });

  it('click on rows checkbox', async () => {
    result = renderWithProviders(
      <ConfirmationProvider>
        <VirtualKeyTable id="001" />
      </ConfirmationProvider>
    );
    // Wait for table to be displayed
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    const pageSelector = result?.queryByTestId('pageSelector');
    expect(pageSelector).toBeInTheDocument();
    const saveButton = result?.queryByRole('button', { name: 'Salva modifiche' });
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeDisabled();

    // VirtualKeys fetched and displayed
    await waitFor(() => {
      expect(result?.container.querySelectorAll('tbody tr')).toHaveLength(mockData.items.length);
    });

    // Click on first checkbox
    const firstRowCheckboxMui = result?.getByTestId(`vkTable-row-checkbox-${mockData.items[0].id}`);
    const firstRowCheckboxElement = firstRowCheckboxMui?.querySelector('input[type="checkbox"]');
    fireEvent.click(firstRowCheckboxElement!);

    await waitFor(() => {
      expect(saveButton).not.toBeDisabled();
    });
  });

  it('click on column checkbox', async () => {
    result = renderWithProviders(
      <ConfirmationProvider>
        <VirtualKeyTable id="001" />
      </ConfirmationProvider>
    );
    // Wait for table to be displayed
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    const pageSelector = result?.queryByTestId('pageSelector');
    expect(pageSelector).toBeInTheDocument();
    const saveButton = result?.queryByRole('button', { name: 'Salva modifiche' });
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeDisabled();

    // VirtualKeys fetched and displayed
    await waitFor(() => {
      expect(result?.container.querySelectorAll('tbody tr')).toHaveLength(mockData.items.length);
    });

    // Click on first checkbox
    const selectAllCheckboxMui = result?.getByTestId(`vkTable-col-checkbox`);
    const selectAllCheckboxElement = selectAllCheckboxMui?.querySelector('input[type="checkbox"]');
    fireEvent.click(selectAllCheckboxElement!);

    await waitFor(() => {
      expect(saveButton).not.toBeDisabled();
    });
  });

  it('click on save button', async () => {
    result = renderWithProviders(
      <ConfirmationProvider>
        <VirtualKeyTable id="001" />
      </ConfirmationProvider>
    );
    // Wait for table to be displayed
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    const pageSelector = result?.queryByTestId('pageSelector');
    expect(pageSelector).toBeInTheDocument();
    const saveButton = result?.queryByRole('button', { name: 'Salva modifiche' });
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeDisabled();

    // VirtualKeys fetched and displayed
    await waitFor(() => {
      expect(result?.container.querySelectorAll('tbody tr')).toHaveLength(mockData.items.length);
    });

    // Click on first checkbox
    const firstRowCheckboxMui = result?.getByTestId(`vkTable-row-checkbox-${mockData.items[0].id}`);
    const firstRowCheckboxElement = firstRowCheckboxMui?.querySelector('input[type="checkbox"]');
    fireEvent.click(firstRowCheckboxElement!);

    await waitFor(() => {
      expect(saveButton).not.toBeDisabled();
    });

    // Click on save button
    fireEvent.click(saveButton!);

    // Confirmation modal opened
    await waitFor(() => expect('Applica modifiche'));
    const confirmButton = await waitFor(() => screen.getByRole('button', { name: 'Conferma' }));
    await act(async () => {
      fireEvent.click(confirmButton);
    });

    await waitFor(() => {
      // VirtualKeys refetched and displayed
      expect(result?.container.querySelectorAll('tbody tr')).toHaveLength(mockData.items.length);
    });
  });
});
