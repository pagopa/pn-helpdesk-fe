import { act, render } from "@testing-library/react";
import { useEffect } from "react";
import { Permission, UserData } from "../../model/user-permission";
import { useAuth } from "../auth";

jest.mock("aws-amplify", () => ({
  ...jest.requireActual("aws-amplify"),
  Auth: {currentAuthenticatedUser: () => Promise.resolve({ attributes: {
    email: 'toto@not.a.mail.it', 'custom:backoffice_tags': 'log-extract-read,api-key-write,non-existent-tag'
  }})},
}));

let mockParsedUserData: UserData | null = null;

function FakeApp() {
  const { getUserData } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      mockParsedUserData = await getUserData();
    };
    fetchUserData();
  }, [getUserData]);

  return mockParsedUserData ? <div data-testid="email">{mockParsedUserData.email || "no mail"}</div> : <div data-testid="waiting" />;
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
});