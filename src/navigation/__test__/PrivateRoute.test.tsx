import { act, render, screen } from '@testing-library/react';
import { Permission } from '../../model/user-permission';
import PrivateRoute from '../PrivateRoute';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <div data-testid="navigate-to-home" />,
}));

jest.mock('../../hooks/useHasPermissions', () => ({
  useHasPermissions: (roles: Array<Permission>) => roles.length === 1,
}));

describe('PrivateRoute component', () => {
  it('user not enabled', async () => {
    await act(
      async () =>
        void render(
          <PrivateRoute roles={[Permission.API_KEY_READ, Permission.API_KEY_WRITE]}>
            <div data-testid="actual-component" />
          </PrivateRoute>
        )
    );
    const allowedComponent = screen.queryByTestId('actual-component');
    const blockedComponent = screen.queryByTestId('navigate-to-home');
    expect(allowedComponent).not.toBeInTheDocument();
    expect(blockedComponent).toBeInTheDocument();
  });

  it('user enabled', async () => {
    await act(
      async () =>
        void render(
          <PrivateRoute roles={[Permission.API_KEY_READ]}>
            <div data-testid="actual-component" />
          </PrivateRoute>
        )
    );
    const allowedComponent = screen.queryByTestId('actual-component');
    const blockedComponent = screen.queryByTestId('navigate-to-home');
    expect(allowedComponent).toBeInTheDocument();
    expect(blockedComponent).not.toBeInTheDocument();
  });
});
