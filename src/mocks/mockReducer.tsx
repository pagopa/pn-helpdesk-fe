import { BrowserRouter as Router } from "react-router-dom";
import { act, render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { it } from "date-fns/locale";
import { RootState, store as realStore } from "../../src/redux/store";
import { EnhancedStore, PreloadedState } from "@reduxjs/toolkit";
import { PropsWithChildren } from "react";

function reducer(
  ui: any,
  { preloadedState, store, ...renderOptions }: any = {}
) {
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
        message: "",
        autoHideDuration: 2000,
      },
      spinner: {
        opened: false,
      },
      aggregate: {
        aggregates: [],
        filters: {
          name: "",
        },
        pagination: {
          limit: 10,
          page: 0,
          total: 0,
          pagesKey: [],
        },
      },
    });
    return (
      <LocalizationProvider locale={it} dateAdapter={AdapterDateFns}>
        <Provider store={store}>
          <Router>{children}</Router>
        </Provider>
      </LocalizationProvider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: EnhancedStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    // Automatically create a store instance if no store was passed in
    store = realStore,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export { reducer };
