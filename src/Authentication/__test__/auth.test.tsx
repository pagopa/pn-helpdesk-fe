import { act, render } from '@testing-library/react';
import { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Permission, UserData } from '../../model/user-permission';
import { getConfiguration } from '../../services/configuration.service';
import { useAuth, CUSTOM_PERMISSION_KEY } from '../auth';

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
});
