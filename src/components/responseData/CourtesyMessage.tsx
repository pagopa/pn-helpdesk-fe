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
    <Box sx={{ ml: 2 }}>
        <Typography variant="body2" component="div">
            - <Box component="span" >{sendDate}: </Box>
            SEND_COURTESY_MESSAGE: <Box component="span" >{numberOfSendCourtesyMessage} </Box>
            Canale: <Box component="span" >{channel} </Box>
            Destinazione: <Box component="span" >{destination} </Box>
            {ioResult && (
                <>  Risultato AppIo: <Box component="span" sx={{ fontWeight: 'bold' }}> {ioResult}</Box></>
            )}
        </Typography>
    </Box>
);

export default CourtesyMessage;
