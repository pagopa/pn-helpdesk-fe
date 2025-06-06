import { act, fireEvent, render, screen } from '@testing-library/react';
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

const handlers = [
  rest.post('/downtime/v1/events', (req, res, ctx) => {
    console.log('MSW: intercepted POST!');
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
  rest.options('/downtime/v1/events', (req, res, ctx) => {
    console.log('MSW: intercepted OPTIONS!');
    return res(ctx.status(204));
  }),
];

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

jest.mock('../../../api/apiRequests', () => ({
  __esModule: true,
  default: {
    createEvent: jest.fn(),
    getPreview: () => new Promise((resolve) => resolve('Prova')),
  },
}));

const mockedResponse: AxiosResponse<void> = {
  data: undefined,
  status: 200,
  statusText: 'OK',
  headers: new AxiosHeaders(),
  config: {
    headers: new AxiosHeaders(),
  },
};

const mockedApi = apiRequests as jest.Mocked<typeof apiRequests>;

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

describe('ResolveMalfunctionDialog component', () => {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  beforeEach(() => {
    mockedApi.createEvent.mockClear();
    mockedApi.createEvent.mockResolvedValue(mockedResponse);
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('render ResolveMalfunctionDialog', () => {
    renderComponent();
    expect(screen.getByTestId('resolve-malfunction-dialog-testid')).toBeInTheDocument();
    expect(screen.getByText('Risolvi evento | Creazione Notifiche')).toBeInTheDocument();
    expect(screen.getByTestId('rich-text-description')).toBeInTheDocument();
  });

  it('setIsModalOpen is false when Annulla button is clicked', async () => {
    renderComponent();
    expect(screen.getByTestId('resolve-malfunction-dialog-testid')).toBeInTheDocument();
    const cancelButton = screen.getByRole('button', { name: 'Annulla' });
    await userEvent.click(cancelButton);
    expect(defaultProps.setIsModalOpen).toHaveBeenCalledWith(false);
  });

  it('show error if description is not filled and go to next step when filled', async () => {
    renderComponent();

    const continueButton = screen.getByRole('button', { name: 'Continua' });
    await userEvent.click(continueButton);

    expect(
      await screen.findByText((content) => content.includes('Inserisci informazioni aggiuntive'))
    ).toBeInTheDocument();

    const richTextContainer = screen.getByTestId('rich-text-description');

    const richTextContainerEditor = richTextContainer
      .querySelector('.ProseMirror')
      ?.querySelector('p');

    if (richTextContainerEditor) {
      await act(async () => {
        fireEvent.change(richTextContainerEditor, {
          target: { textContent: 'Prova' },
        });
      });
    }

    await userEvent.click(continueButton);
    expect(screen.getByTestId('resolve-malfunction-dialog-testid')).toBeInTheDocument();
    expect(screen.getByText('Anteprima documento | Creazione Notifiche')).toBeInTheDocument();
  });
});
