import { act, fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { DropdownMenu } from '../DropdownMenu';

describe('Dropdown menu test', () => {
  it('Icon Button rendered', async () => {
    render(
      <DropdownMenu id={'test-dropdown-menu-id'}>
        <h1>Test</h1>
      </DropdownMenu>
    );

    const element = screen.getByTestId('test-dropdown-menu-id');
    const menuElement = screen.queryByTestId('action-test-dropdown-menu-id');

    expect(menuElement).toBeNull();
    expect(element).toBeInTheDocument();
  });

  it('When click on Button show Menu', async function () {
    render(
      <DropdownMenu id={'test-dropdown-menu-id'}>
        <h1>Test</h1>
      </DropdownMenu>
    );

    const element = screen.getByTestId('test-dropdown-menu-id');
    fireEvent.click(element);

    expect(screen.getByTestId('action-test-dropdown-menu-id')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();

    const presentationRole = screen.getByRole('presentation');
    expect(presentationRole).toBeInTheDocument();
    expect(presentationRole.firstChild).toBeInTheDocument();
    fireEvent.click(presentationRole.firstChild!);
    await waitForElementToBeRemoved(() => screen.queryByTestId('action-test-dropdown-menu-id'));

    await act(async () => {
      expect(screen.queryByTestId('action-test-dropdown-menu-id')).not.toBeInTheDocument();
    });
  });
});
