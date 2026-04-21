import { act, render } from '@testing-library/react';
import { useEffect } from 'react';
import { Auth, Amplify } from 'aws-amplify';
import { Permission, UserData } from '../../model/user-permission';
import { getConfiguration } from '../../services/configuration.service';
import { useAuth, CUSTOM_PERMISSION_KEY, initAmplify } from '../auth';

jest.mock('../aws-exports', () => ({
  __esModule: true,
  default: { aws_project_region: 'eu-south-1' },
}));

jest.mock('aws-amplify', () => ({
  ...jest.requireActual('aws-amplify'),
  Auth: {
    currentSession: () =>
      Promise.resolve({
        getIdToken: () => ({
          getJwtToken: () => 'mock-id-token',
          decodePayload: () => ({
            email: 'toto@not.a.mail.it',
            'custom:backoffice_tags': 'log-extract-read,api-key-write,non-existent-tag',
            // no 'identities' → email/password flow
          }),
        }),
        getRefreshToken: () => ({ getToken: () => 'mock-refresh-token' }),
        getAccessToken: () => ({ getJwtToken: () => 'mock-access-token' }),
      }),
    currentAuthenticatedUser: () =>
      Promise.resolve({
        attributes: {
          email: 'toto@not.a.mail.it',
          'custom:backoffice_tags': 'log-extract-read,api-key-write,non-existent-tag',
        },
      }),
  },
}));

// eslint-disable-next-line functional/no-let
let mockParsedUserData: UserData | null = null;

function FakeApp() {
  const { getUserData } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      mockParsedUserData = await getUserData();
    };
    // eslint-disable-next-line
    fetchUserData();
  }, [getUserData]);

  return mockParsedUserData ? (
    <div data-testid="email">{mockParsedUserData.email || 'no mail'}</div>
  ) : (
    <div data-testid="waiting" />
  );
}

describe('auth hook', () => {
  it('getUserData function', async () => {
    await act(async () => void render(<FakeApp />));
    expect(mockParsedUserData).toBeTruthy();
    expect(mockParsedUserData?.permissions).toHaveLength(2);
    expect(mockParsedUserData?.permissions).toContain(Permission.API_KEY_WRITE);
    expect(mockParsedUserData?.permissions).toContain(Permission.LOG_EXTRACT_READ);
    expect(mockParsedUserData?.email).toEqual('toto@not.a.mail.it');
  });

  it('getUserData function - federated login (Google)', async () => {
    jest.spyOn(Auth, 'currentSession').mockResolvedValueOnce({
      getIdToken: () => ({
        getJwtToken: () => 'mock-id-token-federated',
        decodePayload: () => ({
          email: 'google.user@example.com',
          [CUSTOM_PERMISSION_KEY]: 'log-extract-read,api-key-write',
          identities: [{ providerName: getConfiguration().COGNITO_PROVIDER_NAME, providerType: 'SAML', userId: '123' }],
        }),
      }),
      getRefreshToken: () => ({ getToken: () => 'mock-refresh-token-federated' }),
      getAccessToken: () => ({ getJwtToken: () => 'mock-access-token-federated' }),
    } as any);

    mockParsedUserData = null as UserData | null;
    
    await act(async () => render(<FakeApp />));

    expect(mockParsedUserData).toBeTruthy();
    expect(mockParsedUserData?.permissions).toHaveLength(2);
    expect(mockParsedUserData?.permissions).toContain(Permission.API_KEY_WRITE);
    expect(mockParsedUserData?.permissions).toContain(Permission.LOG_EXTRACT_READ);
    expect(mockParsedUserData?.email).toEqual('google.user@example.com');
    expect(sessionStorage.getItem('token')).toEqual('mock-id-token-federated');
    expect(sessionStorage.getItem('refreshToken')).toEqual('mock-refresh-token-federated');
    expect(sessionStorage.getItem('accessToken')).toEqual('mock-access-token-federated');
  });

  it('loginWithSSO calls Auth.federatedSignIn with configured provider', async () => {
    const mockFederatedSignIn = jest.fn().mockResolvedValue({});
    (Auth as any).federatedSignIn = mockFederatedSignIn;

    function FakeSSOApp() {
      const { loginWithSSO } = useAuth();
      return <button onClick={() => void loginWithSSO()}>SSO</button>;
    }

    const { getByRole } = render(<FakeSSOApp />);
    await act(async () => {
      getByRole('button').click();
    });

    expect(mockFederatedSignIn).toHaveBeenCalledWith({ customProvider: 'mock-provider-name' });
  });

  it('loginWithSSO propagates errors', async () => {
    const error = new Error('federatedSignIn failed');
    (Auth as any).federatedSignIn = jest.fn().mockRejectedValue(error);

    // eslint-disable-next-line functional/no-let
    let caughtError: Error | null = null;

    function FakeSSOErrorApp() {
      const { loginWithSSO } = useAuth();
      return (
        <button onClick={() => loginWithSSO().catch((e: any) => { caughtError = e; })}>
          SSO
        </button>
      );
    }

    const { getByRole } = render(<FakeSSOErrorApp />);
    await act(async () => {
      getByRole('button').click();
    });

    expect(caughtError).toEqual(error);
  });

  it('getUserData returns null when currentSession fails', async () => {
    jest.spyOn(Auth, 'currentSession').mockRejectedValueOnce(new Error('no session'));

    // eslint-disable-next-line functional/no-let
    let result: UserData | null | undefined;

    function FakeNullApp() {
      const { getUserData } = useAuth();
      useEffect(() => {
        void getUserData().then((data) => {
          result = data;
        });
      }, [getUserData]);
      return null;
    }

    await act(async () => void render(<FakeNullApp />));

    expect(result).toBeNull();
  });
});

describe('initAmplify', () => {
  it('configures Amplify with aws-exports', async () => {
    const configureSpy = jest.spyOn(Amplify, 'configure').mockReturnValue({});
    await initAmplify();
    expect(configureSpy).toHaveBeenCalledWith({ aws_project_region: 'eu-south-1' });
    configureSpy.mockRestore();
  });

  it('throws when Amplify.configure fails', async () => {
    jest.spyOn(Amplify, 'configure').mockImplementation(() => {
      throw new Error('configure failed');
    });
    await expect(initAmplify()).rejects.toThrow();
    jest.restoreAllMocks();
  });
});
