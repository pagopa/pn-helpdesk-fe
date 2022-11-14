import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from '@mui/material';

type Props = {
    open: boolean;
    title: string;
    message: string;
    handleClose: () => void;
    handleConfirm: () => void;
}

/**
 * This modal is displayed when the user needs to allow an oction.
 * @param title title to show
 * @param message message to show
 * @param open flag to hide/show modal
 * @param handleClose function that is called when modal is closed
 * @param handleConfirm function that is called when confirm button is clicked
 */
const ConfirmationDialog = ({
    open,
    title,
    message,
    handleClose,
    handleConfirm
} : Props) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <Button onClick={handleConfirm} autoFocus>Conferma</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;