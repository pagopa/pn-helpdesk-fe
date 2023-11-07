import { BrowserRouter as Router } from 'react-router-dom';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { it } from 'date-fns/locale';
import { EnhancedStore, PreloadedState } from '@reduxjs/toolkit';
import { PropsWithChildren } from 'react';
import { DeliveryDriver, FilterRequest, Page, UPLOAD_STATUS_ENUM } from '../model';
import { DeliveryDriverDTO, TenderDTO } from '../api/paperChannel';
import { RootState, store as realStore } from '../../src/redux/store';
import { Permission, UserData } from '../model/user-permission';
import { UserContext } from '../contexts/UserContext';

function reducer(ui: any, { ...renderOptions }: any = {}) {
  function Wrapper({ children }: any) {
    const mockStore = configureMockStore([]);
    const store = mockStore({
      response: {
        opened: false,
        responseData: {},
      },
      snackbar: {
        opened: false,
        statusCode: undefined,
        message: '',
        autoHideDuration: 2000,
      },
      spinner: {
        opened: false,
      },
      uploadAndDownload: {
        download: {
          loading: false,
        },
        upload: {
          loading: false,
          error: undefined,
          status: UPLOAD_STATUS_ENUM.WAITING_FILE,
        },
      },
      tenderForm: {
        tenderCode: undefined,
        loading: false,
        allData: {} as Page<DeliveryDriverDTO>,
      },
      tender: {
        loading: false,
        allData: {} as Page<TenderDTO>,
        selected: {} as TenderDTO,
        pagination: {
          page: 1,
          tot: 10,
          force: false,
        },
      },
      aggregate: {
        aggregates: [],
        filters: {
          name: '',
        },
        pagination: {
          limit: 10,
          page: 0,
          total: 0,
          pagesKey: [],
        },
      },
      pagination: {
        limit: 10,
        page: 0,
        total: 0,
        pagesKey: [],
      },
      deliveries: {
        loading: false,
        detail: undefined,
        allData: {} as Page<DeliveryDriver>,
        pagination: {
          page: 1,
          tot: 10,
        } as FilterRequest,
      },
    });
    return (
      <LocalizationProvider adapterLocale={it} dateAdapter={AdapterDateFns}>
        <Provider store={store}>
          <Router>{children}</Router>
        </Provider>
      </LocalizationProvider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: EnhancedStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    // Automatically create a store instance if no store was passed in
    store = realStore,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<any>): JSX.Element {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function renderWithProvidersAndPermissions(
  ui: React.ReactElement,
  permissions: Array<Permission> = [],
  {
    // Automatically create a store instance if no store was passed in
    store = realStore,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const currentUser: UserData = {
    email: 'test@test.com',
    permissions,
  };
  const setCurrentUser = () => {};
  const clearCurrentUser = () => {};

  function Wrapper({ children }: PropsWithChildren<any>): JSX.Element {
    return (
      <Provider store={store}>
        <UserContext.Provider value={{ currentUser, setCurrentUser, clearCurrentUser }}>
          <Router>{children}</Router>
        </UserContext.Provider>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export { reducer };
