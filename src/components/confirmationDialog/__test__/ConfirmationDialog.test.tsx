
import { fireEvent, RenderResult, waitFor, screen, within, act } from '@testing-library/react';
import { reducer } from '../../../__tests__/testReducer';
import ConfirmationDialog from '../ConfirmationDialog';
import { Options } from '../ConfirmationTypes';

describe("ConfirmationDialog tests", () => {
    let result : RenderResult | undefined;
    
    let options : Options = {
        message: "Message Mocked",
        title: "Mocked Title"
    }

    const onConfirmMock = jest.fn();

    const onCancelMock = jest.fn();

    beforeEach(() => {
        result = reducer(<ConfirmationDialog open={true} options={options} onConfirm={onConfirmMock} onCancel={onCancelMock} />);
    })

    it("render", () => {
        const dialogTitle = screen.getByTestId("dialog-title");
        expect(dialogTitle).toBeInTheDocument();
        
        const dialogDescription = screen.getByTestId("dialog-description");
        expect(dialogDescription).toBeInTheDocument();
        const message = screen.getByText(options.message!);
        expect(message).toBeInTheDocument();
        const dialogActions = screen.getByTestId("dialog-actions");
        expect(dialogActions).toBeInTheDocument();
    })

    it("confirm button clicked", () => {
        const confirmButton = screen.getByRole("button", { name: "Conferma"} );
        fireEvent.click(confirmButton);
        waitFor(() => expect(onConfirmMock).toBeCalled())
    })

    it("cancel button clicked", () => {
        const cancelButton = screen.getByRole("button", { name: "Annulla"} );
        fireEvent.click(cancelButton);
        waitFor(() => expect(onCancelMock).toBeCalled())
    })
})