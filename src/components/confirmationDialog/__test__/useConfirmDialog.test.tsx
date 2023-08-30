import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { ConfirmationProvider } from '../ConfirmationProvider';
import useConfirmDialog from '../useConfirmDialog';

describe('useConfirmDialog test', () => {
  const title = 'Mocked title';
  const message = 'Mocked message';

  const MockComponent = () => {
    const confirmDialog = useConfirmDialog();
    const handleConfirm = () => {
      confirmDialog({ title, message })
        .then(() => {})
        .catch(() => {});
    };

    return (
      <div>
        <h3>Mocked</h3>
        <button onClick={() => handleConfirm()}>Conferma</button>
      </div>
    );
  };

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <ConfirmationProvider>{children}</ConfirmationProvider>
  );

  it('open confirm dialog', async () => {
    render(
      <Wrapper>
        <MockComponent />
      </Wrapper>
    );
    const confirmButton = screen.getByRole('button', { name: 'Conferma' });
    fireEvent.click(confirmButton);

    // Check if confirm dialog is open
    const dialogTitle = screen.getByText(title);
    const dialogMessage = screen.getByText(message);
    await waitFor(() => {
      expect(dialogTitle).toBeInTheDocument();
      expect(dialogMessage).toBeInTheDocument();
    });
  });
});
