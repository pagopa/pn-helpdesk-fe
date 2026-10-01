import React from 'react';
import { Box, Typography } from '@mui/material';

type CourtesyMessageProps = {
    channel: string;
    destination: string;
    sendDate: string;
    ioResult?: string;
    numberOfSendCourtesyMessage: number;
};

const CourtesyMessage: React.FC<CourtesyMessageProps> = ({
    channel,
    destination,
    sendDate,
    ioResult,
    numberOfSendCourtesyMessage
}) => (
    <Box sx={{ my: 1 }}>
        <Typography variant="body2" component="div">
            Messaggi di cortesia: <Box component="span" sx={{ fontWeight: 'bold' }}>{numberOfSendCourtesyMessage}</Box> -
            Canale: <Box component="span" sx={{ fontWeight: 'bold' }}>{channel}</Box> -
            Destinazione: <Box component="span" sx={{ fontWeight: 'bold' }}>{destination}</Box> -
            Data Invio: <Box component="span" sx={{ fontWeight: 'bold' }}>{sendDate}</Box>
            {ioResult && (
                <> - Risultato AppIo: <Box component="span" sx={{ fontWeight: 'bold' }}>{ioResult}</Box></>
            )}
        </Typography>
    </Box>
);

export default CourtesyMessage;
