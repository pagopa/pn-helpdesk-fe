import React from 'react';
import { Box, Typography } from '@mui/material';
import { TimelineElement } from '../../model/notification';
import { formatEventDate } from '../../helpers/utils';

type Props = {
    events: Array<TimelineElement>;
};

const GenericEvent: React.FC<Props> = ({ events }) => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {events.map((el: TimelineElement, i: number) => {
            const eventTimestamp = formatEventDate(el.timestamp);
            const scheduleRefinement = el.elementId.includes("SCHEDULE_REFINEMENT") && el.details
                ? {
                    schedulingDate: el.details.schedulingDate ? formatEventDate(el.details.schedulingDate) : "-",
                }
                : null;

            return (
                <Typography key={`generic-${i}`} variant="body2" component="div">
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        ml: 2
                    }}>
                        <Box component="span" sx={{ whiteSpace: 'nowrap', mr: 0.5 }}>
                            - {eventTimestamp}:
                        </Box>


                        <Box component="span" sx={{ mr: 0.5 }}>{el.category} -
                            <Box component="span" >
                                {scheduleRefinement && (
                                    <Box component="span">
                                        Schedulato: {scheduleRefinement.schedulingDate}
                                    </Box>)}
                            </Box>
                        </Box>
                    </Box>
                </Typography>
            );
        })}
    </Box>

);


export default GenericEvent;
