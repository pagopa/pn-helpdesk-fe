import { Typography } from '@mui/material';
import React from 'react';
import AccordionTimeline from '../accordionData/AccordionTimeline';

type Props = {
    sendCourtesyMessage: Array<string>;
    ioResult?: string;
    numberOfSendCourtesyMessage: number;

};

const CourtesyMessage: React.FC<Props> = ({ sendCourtesyMessage, ioResult, numberOfSendCourtesyMessage }) => (
    <AccordionTimeline keyValue='courtesy'
        accordionSummaryChild={<Typography component="span">Messaggio di cortesia</Typography>}
        accordionDetailsChild={<>
            <Typography variant="body1">
                Numero di messaggi di cortesia: {numberOfSendCourtesyMessage}
            </Typography>
            {sendCourtesyMessage.map((el, idx) =>
                <Typography key={idx} variant="body1">
                    {el}
                </Typography>)}
            <Typography variant='body1'>{ioResult}</Typography>
        </>
        }
    ></AccordionTimeline>
);

export default CourtesyMessage;
