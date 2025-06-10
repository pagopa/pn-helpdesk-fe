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
      <CreateMalfunctionDialog {...defaultProps} />
    </Provider>
  );
}

describe('CreateMalfunctionDialog component', () => {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  beforeEach(() => {
    mockedApi.createEvent.mockClear();
    mockedApi.createEvent.mockResolvedValue(mockedResponse);
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('render CreateMalfunctionDialog', () => {
    renderComponent();

    expect(screen.getByTestId('create-malfunction-dialog-testid')).toBeInTheDocument();
    expect(screen.getByTestId('create-event-Creazione Notifiche')).toBeInTheDocument();

    expect(screen.getByTestId('create-event-label')).toBeInTheDocument();
  });

  it('show error if checkbox is not checked and call api when checked', async () => {
    renderComponent();

    const insertButton = screen.getByTestId('create-event-ko');
    await userEvent.click(insertButton);

    expect(
      await screen.findByText((content) => content.includes('Questo campo è obbligatorio'))
    ).toBeInTheDocument();

    const checkboxInput = screen
      .getByTestId('checkbox')
      .querySelector('input[type="checkbox"]') as HTMLInputElement;

    await userEvent.click(checkboxInput);
    await waitFor(() => {
      expect(checkboxInput).toBeChecked();
    });
    await userEvent.click(insertButton);

    await waitFor(() => {
      expect(mockedApi.createEvent).toHaveBeenCalledTimes(1);
    });
  });

  it('setIsModalOpen is false when Annulla button is clicked', async () => {
    renderComponent();
    expect(screen.getByTestId('create-malfunction-dialog-testid')).toBeInTheDocument();
    const cancelButton = screen.getByTestId('cancel-event');

    await userEvent.click(cancelButton);
    expect(defaultProps.setIsModalOpen).toHaveBeenCalledWith(false);
  });
});
