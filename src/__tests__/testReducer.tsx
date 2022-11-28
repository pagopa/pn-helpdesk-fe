import { BrowserRouter as Router } from 'react-router-dom';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'
import { PreloadedState } from '@reduxjs/toolkit';
import { AppStore, RootState, setupStore } from '../redux/store';
import { PropsWithChildren } from 'react';

function reducer(
  ui: any,
  {
    preloadedState,
    store,
    ...renderOptions
  }:any = {}
) {
  function Wrapper({ children }: any) {
    const mockStore = configureMockStore([]);
    const store = mockStore({
      response: {
        opened: false,
        responseData: {}
      },
      snackbar: {
        opened: false
      },
      spinner: {
        opened: false
      },
      aggregate: {
        aggregates : [],
        filters : {
          name : ""
        },
        pagination : {
          limit : 10,
          page: 0,
          total: 0,
          pagesKey: []
        }
      }
    });
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}><Router>{children}</Router></Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export { reducer };
