import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from '@mui/material';
import { Options } from './ConfirmationTypes';

type Props = {
    open: boolean,
    options: Options,
    onCancel: () => void,
    onConfirm: () => void,
    onClose: () => void,
}

/**
 * This modal is displayed when the useConfirm is called with a resolve and reject function.
 * @param title title to show
 * @param message message to show
 * @param open flag to hide/show modal
 * @param onCancel function that is called when modal is closed
 * @param onConfirm function that is called when confirm button is clicked
 */
const ConfirmationDialog = ({
    open,
    options,
    onCancel,
    onConfirm,
    onClose,
} : Props) => {
    const { title, message} = options;

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {
                title && <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
            }
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Annulla</Button>
                <Button onClick={onConfirm} autoFocus>Conferma</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;