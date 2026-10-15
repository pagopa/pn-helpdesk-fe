import { Typography, Box } from '@mui/material';
import React from 'react';
import { formatEventDate } from '../../helpers/utils';

type Props = {
    accordionKey: string; // Mantenuto per compatibilità di firma se necessario, ma non usato
    category: string;
    details: any;
    eventTimestamp?: string;
};

const LegalMessage: React.FC<Props> = ({ category, details, eventTimestamp }) => {

    const eventDateFormatted = formatEventDate(eventTimestamp);

    return (
        <Box sx={{ my: 1, ml: 2 }}>
            <Typography variant="body2" component="div">

                {eventDateFormatted && (
                    <> - <Box component="span" >{eventDateFormatted} </Box></>
                )}

                - <Box component="span" >{category}</Box>

                {details?.digitalAddress?.type && (
                    <> - <Box component="span" >{details.digitalAddress.type}</Box></>
                )}
                {details?.digitalAddress?.address && (
                    <> - <Box component="span" >{details.digitalAddress.address}</Box></>
                )}

                {details?.deliveryDetailCode && (
                    <> - <Box component="span" >{details.deliveryDetailCode}</Box></>
                )}

                {details?.responseStatus && (
                    <> - <Box component="span" >{details.responseStatus}</Box></>
                )}

                {details?.endWorkflowStatus && (
                    <> - <Box component="span" >{details.endWorkflowStatus}</Box></>
                )}

                {details?.deliveryFailureCause && (
                    <> - <Box component="span" >{details.deliveryFailureCause}</Box></>
                )}
            </Typography>
        </Box>
    );
};

export default LegalMessage;
