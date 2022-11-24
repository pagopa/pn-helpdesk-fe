import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'

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

export { reducer };
