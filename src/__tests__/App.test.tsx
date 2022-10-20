import React from 'react';
import 'regenerator-runtime/runtime'
import { render, screen } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'

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
  }
});

it('renders', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByTestId("App")).toBeTruthy();
});

