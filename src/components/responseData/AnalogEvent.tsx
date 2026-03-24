import { Accordion, AccordionSummary, Typography, AccordionDetails, Box } from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionTimeline from '../accordionData/AccordionTimeline';
import { codiciStatusTimeline } from '../../model/notification';

type AnalogEvent = {
    analogEvents: Array<{
        elementId: string;
        category: string;
        details?: {
            schedulingDate?: string | null;
            serviceLevel?: string | null;
            deliveryDetailCode?: string | null;
            deliveryFailureCause?: string | null;
            responseStatus?: string | null;
            registeredLetterCode?: string | null;
            [key: string]: any;
        };
    }>;
};

type SendAnalog = {
    serviceLevel: string;
    deliveryDetailCode: string;
    deliveryFailureCause: string;
    responseStatus: string;
    registeredLetterCode: string;
} | null;

const AnalogEvent: React.FC<AnalogEvent> = ({ analogEvents }) => (
    <AccordionTimeline
        keyValue='analogEvent'
        accordionSummaryChild={<Typography variant="body1">
            Workflow Analogico ({analogEvents.length} eventi)
        </Typography>}
        accordionDetailsChild={
            analogEvents.map((el: any, i: number) => {
                const isScheduled = el.elementId.includes("SCHEDULE_ANALOG_WORKFLOW");

                const schedulingDate =
                    isScheduled && el.details?.schedulingDate
                        ? new Date(el.details.schedulingDate).toLocaleDateString()
                        : null;

                const sendAnalog: SendAnalog =
                    el.elementId.includes("SEND_ANALOG_PROGRESS") && el.details
                        ? {
                            serviceLevel: el.details.serviceLevel,
                            deliveryDetailCode: el.details.deliveryDetailCode,
                            deliveryFailureCause: el.details.deliveryFailureCause,
                            responseStatus: el.details.responseStatus,
                            registeredLetterCode: el.details.registeredLetterCode,
                        }
                        : null;

                const sendAnalogFeedback =
                    el.elementId.includes("SEND_ANALOG_FEEDBACK") && el.details
                        ? {
                            serviceLevel: el.details.serviceLevel,
                            deliveryDetailCode: el.details.deliveryDetailCode,
                            responseStatus: el.details.responseStatus,
                            deliveryFailureCause: el.details.deliveryFailureCause,
                        }
                        : null;

                return (
                    <Accordion key={`analog-${i}`}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="body1">
                                Evento {i + 1}: {el.category}
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Box component="div" display="flex" flexDirection="column" gap={1}>
                                {schedulingDate && (
                                    <Typography variant="body1">
                                        Schedulato il: {schedulingDate}
                                    </Typography>
                                )}

                                {sendAnalog && (
                                    <>
                                        {sendAnalog.deliveryDetailCode && (
                                            <Typography variant="body1">
                                                Codice dettaglio: {`${sendAnalog.deliveryDetailCode} - ${codiciStatusTimeline[sendAnalog.deliveryDetailCode]}`}
                                            </Typography>
                                        )}
                                        {sendAnalog.deliveryFailureCause && (
                                            <Typography variant="body1">
                                                Causa fallimento: {`${sendAnalog.deliveryFailureCause} - ${codiciStatusTimeline[sendAnalog.deliveryFailureCause]}`}
                                            </Typography>
                                        )}
                                        {sendAnalog.serviceLevel && (
                                            <Typography variant="body1">
                                                Livello servizio: {sendAnalog.serviceLevel}
                                            </Typography>
                                        )}
                                        {sendAnalog.responseStatus && (
                                            <Typography variant="body1">
                                                Status risposta: {sendAnalog.responseStatus}
                                            </Typography>
                                        )}
                                        {sendAnalog.registeredLetterCode && (
                                            <Typography variant="body1">
                                                Raccomandata: {sendAnalog.registeredLetterCode}
                                            </Typography>
                                        )}
                                    </>
                                )}

                                {sendAnalogFeedback && (
                                    <>
                                        {sendAnalogFeedback.deliveryDetailCode && (
                                            <Typography variant="body1">
                                                Codice dettaglio: {`${sendAnalogFeedback.deliveryDetailCode} - ${codiciStatusTimeline[sendAnalogFeedback.deliveryDetailCode]}`}
                                            </Typography>
                                        )}
                                        {sendAnalogFeedback.serviceLevel && (
                                            <Typography variant="body1">
                                                Livello servizio: {sendAnalogFeedback.serviceLevel}
                                            </Typography>
                                        )}
                                        {sendAnalogFeedback.responseStatus && (
                                            <Typography variant="body1">
                                                Status risposta: {sendAnalogFeedback.responseStatus}
                                            </Typography>
                                        )}
                                        {sendAnalogFeedback.deliveryFailureCause && (
                                            <Typography variant="body1">
                                                Causa fallimento: {`${sendAnalogFeedback.deliveryFailureCause} - ${codiciStatusTimeline[sendAnalogFeedback.deliveryFailureCause]}`}
                                            </Typography>
                                        )}
                                    </>
                                )}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                );
            })
        }
        sxDetails={{ display: "flex", flexDirection: "column", gap: 2 }}
    ></AccordionTimeline>
);


export default AnalogEvent;
