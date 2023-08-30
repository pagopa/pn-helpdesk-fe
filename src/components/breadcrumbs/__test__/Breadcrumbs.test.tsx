/**
 * @jest-environment jsdom
 */
import 'regenerator-runtime/runtime';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-test-renderer';
import Breadcrumbs from '../Breadcrumbs';
import { ConfirmationProvider } from '../../confirmationDialog/ConfirmationProvider';
const mockStore = configureMockStore([]);
const store = mockStore({
  response: {
    opened: false,
    responseData: {},
  },
  snackbar: {
    opened: false,
  },
  spinner: {
    opened: false,
  },
});

describe('Breadcrumbs', () => {
  type BreadcrumbsLinkProps = {
    linkLabel: string;
    linkRoute: string;
  };
  const links: Array<BreadcrumbsLinkProps> = [
    {
      linkLabel: 'Home - Test-id-01',
      linkRoute: '/',
    },
    {
      linkLabel: 'Aggregazioni - Test-id-02',
      linkRoute: '/aggregates',
    },
  ];

  it('Tests base route navigation', async () => {
    render(
      <Provider store={store}>
        <ConfirmationProvider>
          <BrowserRouter>
            <Breadcrumbs links={links} currentLocationLabel={'Gestione aggregazioni'} />
          </BrowserRouter>
        </ConfirmationProvider>
      </Provider>
    );
    const base_route = screen.getByText('Home - Test-id-01');
    expect(base_route).toBeInTheDocument();
    await act(async () => {
      base_route?.click();
    });
    expect(document.location.pathname).toBe('/');
  });

  it('Tests second route navigation', async () => {
    render(
      <Provider store={store}>
        <ConfirmationProvider>
          <BrowserRouter>
            <Breadcrumbs links={links} currentLocationLabel={'Gestione aggregazioni'} />
          </BrowserRouter>
        </ConfirmationProvider>
      </Provider>
    );
    const second_route = screen.getByText('Aggregazioni - Test-id-02');
    expect(second_route).toBeInTheDocument();
    await act(async () => {
      second_route?.click();
    });
    expect(document.location.pathname).toBe('/aggregates');
  });
});
