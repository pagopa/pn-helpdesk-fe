import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { AxiosHeaders, AxiosResponse } from 'axios';
import { CreateMalfunctionDialog } from '../CreateMalfunctionDialog';
import { FunctionalityName } from '../../../model/monitor';
import apiRequests from '../../../api/apiRequests';
import { Mocked, vi, type Mock } from 'vitest';

const mockStore = configureStore([thunk]);

// API handlers
const server = setupServer(
  rest.post('/downtime/v1/events', (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ success: true }))
  ),
  rest.options('/downtime/v1/events', (req, res, ctx) => res(ctx.status(204)))
);

// Mock date picker
vi.mock('@mui/x-date-pickers', () => ({
  ...vi.importActual('@mui/x-date-pickers'),
  DateTimePicker: ({ label, value, onChange }: any) => (
    <input
      data-testid="mock-date-picker"
      value={value?.toString()}
      onChange={(e) => onChange(new Date(e.target.value))}
      placeholder={label}
    />
  ),
}));

// Mock API
vi.mock('../../../api/apiRequests', () => ({
  __esModule: true,
  default: {
    createEvent: vi.fn(),
  },
}));

const mockedApi = apiRequests as Mocked<typeof apiRequests>;
const mockedResponse: AxiosResponse<void> = {
  data: undefined,
  status: 200,
  statusText: 'OK',
  headers: new AxiosHeaders(),
  config: { headers: new AxiosHeaders() },
};

// Props e store
const defaultProps = {
  refreshStatus: vi.fn(),
  setIsModalOpen: vi.fn(),
  updateSnackbar: vi.fn<(response?: AxiosResponse) => void>(),
  isModalOpen: true,
  modalPayload: {
    functionality: 'NOTIFICATION_CREATE' as FunctionalityName,
    status: 'KO',
  },
};

function renderComponent() {
  const store = mockStore({});
  return render(
    <Provider store={store}>
      <CreateMalfunctionDialog {...defaultProps} />
    </Provider>
  );
}

// Helpers
async function checkCheckbox() {
  const checkbox = screen
    .getByTestId('checkbox')
    .querySelector('input[type="checkbox"]') as HTMLInputElement;
  await userEvent.click(checkbox);
  await waitFor(() => expect(checkbox).toBeChecked());
}

async function submitForm() {
  const submitButton = screen.getByTestId('create-event-ko');
  await userEvent.click(submitButton);
}

async function cancelDialog() {
  const cancelButton = screen.getByTestId('cancel-event');
  await userEvent.click(cancelButton);
}

// Setup test lifecycle
beforeAll(() => server.listen());
beforeEach(() => {
  mockedApi.createEvent.mockClear();
  mockedApi.createEvent.mockResolvedValue(mockedResponse);
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ---------------------- TESTS ----------------------

describe('CreateMalfunctionDialog', () => {
  it('renders correctly', () => {
    renderComponent();
    expect(screen.getByTestId('create-malfunction-dialog-testid')).toBeInTheDocument();
    expect(screen.getByTestId('create-event-Creazione Notifiche')).toBeInTheDocument();
    expect(screen.getByTestId('create-event-label')).toBeInTheDocument();
  });

  it('shows error if checkbox not checked and calls API when checked', async () => {
    renderComponent();

    // Primo invio senza checkbox
    await submitForm();
    expect(await screen.findByText(/Questo campo è obbligatorio/i)).toBeInTheDocument();

    // Selezione checkbox e reinvio
    await checkCheckbox();
    await submitForm();

    await waitFor(() => {
      expect(mockedApi.createEvent).toHaveBeenCalledTimes(1);
    });
  });

  it('closes dialog on "Annulla"', async () => {
    renderComponent();
    await cancelDialog();
    expect(defaultProps.setIsModalOpen).toHaveBeenCalledWith(false);
  });
});
