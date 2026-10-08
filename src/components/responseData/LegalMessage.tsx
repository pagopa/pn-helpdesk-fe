import { Typography, Stack } from '@mui/material';
import React from 'react';
import AccordionTimeline from '../accordionData/AccordionTimeline';
import { formatEventDate } from '../../helpers/utils';

type Props = {
    accordionKey: string;
    category: string;
    details: any;
    eventTimestamp?: string;
};

const LegalMessage: React.FC<Props> = ({ accordionKey, category, details, eventTimestamp }) => {

    const eventDateFormatted = formatEventDate(eventTimestamp);

    return (
        <AccordionTimeline
            keyValue={accordionKey}
            accordionSummaryChild={
                <Typography variant="body2">
                    {eventDateFormatted}: {category}
                </Typography>
            }
            accordionDetailsChild={
                <Stack spacing={1}>
                    {details?.digitalAddress && (
                        <>
                            <Typography variant="body1">
                                Canale: {details.digitalAddress.type}
                            </Typography>
                            <Typography variant="body1">
                                Indirizzo: {details.digitalAddress.address}
                            </Typography>
                        </>

                    )}
                    {details?.deliveryDetailCode && (
                        <Typography variant="body1">
                            Codice Dettaglio: {details.deliveryDetailCode}
                        </Typography>
                    )}
                    {details?.responseStatus && (
                        <Typography variant="body1">
                            Esito Transazione: {details.responseStatus}
                        </Typography>
                    )}
                    {details?.endWorkflowStatus && (
                        <Typography variant="body1" >
                            Stato Finale Workflow: {details.endWorkflowStatus}
                        </Typography>
                    )}
                    {details?.deliveryFailureCause && (
                        <Typography variant="body1" >
                            Causa Errore: {details.deliveryFailureCause}
                        </Typography>
                    )}
                </Stack>
            }
        />
    );
};

export default LegalMessage;