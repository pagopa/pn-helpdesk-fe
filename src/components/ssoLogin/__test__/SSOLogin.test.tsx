import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { reducer } from '../../../mocks/mockReducer';
import SSOLogin from '../SSOLogin';
import { useAuth } from '../../../Authentication/auth';

jest.mock('../../../Authentication/auth', () => ({
  useAuth: jest.fn(),
}));

const mockLoginWithSSO = jest.fn();

beforeEach(() => {
  (useAuth as jest.Mock).mockReturnValue({ loginWithSSO: mockLoginWithSSO });
  mockLoginWithSSO.mockReset();
});

describe('SSOLogin', () => {
  it('renders the Google login button', () => {
    mockLoginWithSSO.mockResolvedValue({});
    reducer(<SSOLogin />);
    expect(screen.getByRole('button', { name: /accedi con google/i })).toBeInTheDocument();
  });

  it('disables the button after click', async () => {
    mockLoginWithSSO.mockResolvedValue({});
    reducer(<SSOLogin />);
    const button = screen.getByRole('button', { name: /accedi con google/i });
    const user = userEvent.setup();
    await user.click(button);
    expect(button).toBeDisabled();
  });

  it('re-enables button on error with message', async () => {
    mockLoginWithSSO.mockRejectedValue(new Error('SSO failed'));
    reducer(<SSOLogin />);
    const button = screen.getByRole('button', { name: /accedi con google/i });
    const user = userEvent.setup();
    await user.click(button);
    await waitFor(() => expect(button).not.toBeDisabled());
  });

  it('re-enables button on error without message', async () => {
    mockLoginWithSSO.mockRejectedValue({});
    reducer(<SSOLogin />);
    const button = screen.getByRole('button', { name: /accedi con google/i });
    const user = userEvent.setup();
    await user.click(button);
    await waitFor(() => expect(button).not.toBeDisabled());
  });
});
