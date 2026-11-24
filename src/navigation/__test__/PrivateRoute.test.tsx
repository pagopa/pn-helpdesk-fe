import { act, render, screen } from '@testing-library/react';
import { Permission } from '../../model/user-permission';
import PrivateRoute from '../PrivateRoute';
import { Mocked, vi, type Mock } from 'vitest';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  Navigate: () => <div data-testid="navigate-to-home" />,
}));

vi.mock('../../hooks/useHasPermissions', () => ({
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
