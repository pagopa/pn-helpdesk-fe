import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { AxiosHeaders, AxiosResponse } from 'axios';
import userEvent from '@testing-library/user-event';
import { ResolveMalfunctionDialog } from '../ResolveMalfunctionDialog';
import { FunctionalityName } from '../../../model/monitor';
import apiRequests from '../../../api/apiRequests';

const mockStore = configureStore([thunk]);
const server = setupServer(
  rest.post('/downtime/v1/events', (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ success: true }))
  ),
  rest.options('/downtime/v1/events', (req, res, ctx) => res(ctx.status(204)))
);

// Mock date picker
jest.mock('@mui/x-date-pickers', () => ({
  ...jest.requireActual('@mui/x-date-pickers'),
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
jest.mock('../../../api/apiRequests', () => ({
  __esModule: true,
  default: {
    createEvent: jest.fn(),
    getPreview: () => Promise.resolve('Prova'),
  },
}));

const mockedApi = apiRequests as jest.Mocked<typeof apiRequests>;
const mockedResponse: AxiosResponse<void> = {
  data: undefined,
  status: 200,
  statusText: 'OK',
  headers: new AxiosHeaders(),
  config: { headers: new AxiosHeaders() },
};

const defaultProps = {
  refreshStatus: jest.fn(),
  setIsModalOpen: jest.fn(),
  updateSnackbar: jest.fn<void, [AxiosResponse | undefined]>(),
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
      <ResolveMalfunctionDialog {...defaultProps} />
    </Provider>
  );
}

// Helpers
async function fillDescriptionAndContinue() {
  const continueButton = screen.getByRole('button', { name: 'Continua' });
  const editor = screen.getByTestId('rich-text-description').querySelector('.ProseMirror p');
  if (editor) {
    await act(async () => {
      fireEvent.change(editor, { target: { textContent: 'Prova' } });
    });
  }
  await userEvent.click(continueButton);
}

async function checkAndSubmit() {
  const checkbox = screen.getByTestId('checkbox').querySelector('input[type="checkbox"]');
  if (checkbox) {
    await userEvent.click(checkbox);
  }
  const submitButton = screen.getByRole('button', { name: 'Conferma e Pubblica' });
  await userEvent.click(submitButton);
}

// Test setup
beforeAll(() => server.listen());
beforeEach(() => {
  mockedApi.createEvent.mockClear();
  mockedApi.createEvent.mockResolvedValue(mockedResponse);
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ---------------------- TESTS ----------------------

describe('ResolveMalfunctionDialog', () => {
  it('renders correctly', () => {
    renderComponent();
    expect(screen.getByTestId('resolve-malfunction-dialog-testid')).toBeInTheDocument();
    expect(screen.getByText('Risolvi evento | Creazione Notifiche')).toBeInTheDocument();
    expect(screen.getByTestId('rich-text-description')).toBeInTheDocument();
  });

  it('calls setIsModalOpen(false) when "Annulla" is clicked', async () => {
    renderComponent();
    await userEvent.click(screen.getByRole('button', { name: 'Annulla' }));
    expect(defaultProps.setIsModalOpen).toHaveBeenCalledWith(false);
  });

  it('shows error if description is empty, continues when filled', async () => {
    renderComponent();
    await userEvent.click(screen.getByRole('button', { name: 'Continua' }));
    expect(await screen.findByText(/inserisci informazioni aggiuntive/i)).toBeInTheDocument();

    await fillDescriptionAndContinue();
    expect(screen.getByText('Anteprima documento | Creazione Notifiche')).toBeInTheDocument();
  });

  it('shows preview after filling description', async () => {
    renderComponent();
    await fillDescriptionAndContinue();
    expect(await screen.findByTitle('PDF Viewer')).toBeTruthy();
  });

  it('returns to first step when "Indietro" is clicked', async () => {
    renderComponent();
    await fillDescriptionAndContinue();
    await userEvent.click(screen.getByRole('button', { name: 'Indietro' }));
    expect(screen.getByTestId('rich-text-description')).toBeInTheDocument();
  });

  it('shows error if checkbox not checked and submits when checked', async () => {
    renderComponent();
    await fillDescriptionAndContinue();

    await userEvent.click(screen.getByRole('button', { name: 'Conferma e Pubblica' }));
    expect(await screen.findByText(/questo campo è obbligatorio/i)).toBeInTheDocument();

    await checkAndSubmit();
    await waitFor(() => expect(mockedApi.createEvent).toHaveBeenCalledTimes(1));
  });
});
