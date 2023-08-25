import { act, render, screen } from '@testing-library/react';
import { useEffect } from 'react';
import { UserContextProvider } from '../../contexts/UserContextProvider';
import { Permission } from '../../model/user-permission';
import { useCurrentUser } from '../useCurrentUser';
import { useHasPermissions } from '../useHasPermissions';

function FakeIndex(props: { requiredPermissions: Array<Permission>; doLogUser: boolean }) {
  return (
    <UserContextProvider>
      <FakeApp requiredPermissions={props.requiredPermissions} doLogUser={props.doLogUser} />
    </UserContextProvider>
  );
}

function FakeApp(props: { requiredPermissions: Array<Permission>; doLogUser: boolean }) {
  const { setCurrentUser } = useCurrentUser();
  const hasPermissions = useHasPermissions(props.requiredPermissions);

  useEffect(() => {
    if (props.doLogUser) {
      setCurrentUser({
        email: 'toto@not.a.mail.it',
        permissions: [
          Permission.API_KEY_READ,
          Permission.API_KEY_WRITE,
          Permission.LOG_EXTRACT_READ,
        ],
      });
    }
  }, [setCurrentUser, props.doLogUser]);

  return hasPermissions ? <div data-testid="allowed" /> : <div data-testid="blocked" />;
}

describe('useHasPermission hook', () => {
  it('user not logged, hinder access even if no permissions asked', async () => {
    await act(async () => void render(<FakeIndex requiredPermissions={[]} doLogUser={false} />));
    const allowedComponent = screen.queryByTestId('allowed');
    const blockedComponent = screen.queryByTestId('blocked');
    expect(allowedComponent).not.toBeInTheDocument();
    expect(blockedComponent).toBeInTheDocument();
  });

  it('no permissions asked', async () => {
    await act(async () => void render(<FakeIndex requiredPermissions={[]} doLogUser={true} />));
    const allowedComponent = screen.queryByTestId('allowed');
    const blockedComponent = screen.queryByTestId('blocked');
    expect(allowedComponent).toBeInTheDocument();
    expect(blockedComponent).not.toBeInTheDocument();
  });

  it('ask a permission owned by the logged user', async () => {
    await act(
      async () =>
        void render(<FakeIndex requiredPermissions={[Permission.API_KEY_WRITE]} doLogUser={true} />)
    );
    const allowedComponent = screen.queryByTestId('allowed');
    const blockedComponent = screen.queryByTestId('blocked');
    expect(allowedComponent).toBeInTheDocument();
    expect(blockedComponent).not.toBeInTheDocument();
  });

  it('ask a permission not owned by the logged user', async () => {
    await act(
      async () =>
        void render(
          <FakeIndex requiredPermissions={[Permission.LOG_DOWNTIME_READ]} doLogUser={true} />
        )
    );
    const allowedComponent = screen.queryByTestId('allowed');
    const blockedComponent = screen.queryByTestId('blocked');
    expect(allowedComponent).not.toBeInTheDocument();
    expect(blockedComponent).toBeInTheDocument();
  });

  it('ask two permissions owned by the logged user', async () => {
    await act(
      async () =>
        void render(
          <FakeIndex
            requiredPermissions={[Permission.API_KEY_WRITE, Permission.API_KEY_READ]}
            doLogUser={true}
          />
        )
    );
    const allowedComponent = screen.queryByTestId('allowed');
    const blockedComponent = screen.queryByTestId('blocked');
    expect(allowedComponent).toBeInTheDocument();
    expect(blockedComponent).not.toBeInTheDocument();
  });

  it('ask two permissions, one is owned by the logged user, the other one is not', async () => {
    await act(
      async () =>
        void render(
          <FakeIndex
            requiredPermissions={[Permission.TENDER_READ, Permission.API_KEY_READ]}
            doLogUser={true}
          />
        )
    );
    const allowedComponent = screen.queryByTestId('allowed');
    const blockedComponent = screen.queryByTestId('blocked');
    expect(allowedComponent).not.toBeInTheDocument();
    expect(blockedComponent).toBeInTheDocument();
  });
});
