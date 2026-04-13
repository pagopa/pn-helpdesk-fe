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
            deliveryDetailCode?: string | null;
            deliveryFailureCause?: string | null;
            responseStatus?: string | null;
            registeredLetterCode?: string | null;
            [key: string]: any;
        };
    }>;
};

type SendAnalog = {
    deliveryDetailCode: string;
    deliveryFailureCause: string;
    responseStatus: string;
    registeredLetterCode: string;
} | null;

const PhysicalAddress: React.FC<{ address: any }> = ({ address }) => (
    <>
        {address.fullname && <Typography variant="body1">Nome: {address.fullname}</Typography>}
        {address.address && <Typography variant="body1">Indirizzo: {address.address}</Typography>}
        {address.addressDetails && <Typography variant="body1">Dettagli: {address.addressDetails}</Typography>}
        {address.zip && <Typography variant="body1">CAP: {address.zip}</Typography>}
        {address.municipality && <Typography variant="body1">Comune: {address.municipality}</Typography>}
        {address.province && <Typography variant="body1">Provincia: {address.province}</Typography>}
        {address.foreignState && <Typography variant="body1">Stato estero: {address.foreignState}</Typography>}
    </>
);

const SendAnalogDetails: React.FC<{ sendAnalog: SendAnalog }> = ({ sendAnalog }) => (
    <>
        {sendAnalog?.responseStatus && <Typography variant="body1">Status risposta: {sendAnalog.responseStatus}</Typography>}
        {sendAnalog?.registeredLetterCode && <Typography variant="body1">Raccomandata: {sendAnalog.registeredLetterCode}</Typography>}
    </>
);

const SendAnalogFeedbackDetails: React.FC<{ feedback: any }> = ({ feedback }) => (
    <>
        {feedback?.responseStatus && <Typography variant="body1">Status risposta: {feedback.responseStatus}</Typography>}
    </>
);

// Helper per il testo del summary
function getSummaryText(sendAnalog: SendAnalog, sendAnalogFeedback: any): string {
    if (sendAnalog) {
        const code = sendAnalog.deliveryDetailCode || sendAnalog.deliveryFailureCause;
        return code ? ` - ${code} - ${codiciStatusTimeline[code]}` : "";
    }
    if (sendAnalogFeedback?.deliveryDetailCode) {
        return `- ${sendAnalogFeedback.deliveryDetailCode} - ${codiciStatusTimeline[sendAnalogFeedback.deliveryDetailCode]}`;
    }
    return "";
}

function parseAnalogElement(el: any) {
    const schedulingDate =
        el.elementId.includes("SCHEDULE_ANALOG_WORKFLOW") && el.details?.schedulingDate
            ? new Date(el.details.schedulingDate).toLocaleDateString()
            : null;

    const sendAnalog: SendAnalog =
        el.elementId.includes("SEND_ANALOG_PROGRESS") && el.details
            ? {
                deliveryDetailCode: el.details.deliveryDetailCode,
                deliveryFailureCause: el.details.deliveryFailureCause,
                responseStatus: el.details.responseStatus,
                registeredLetterCode: el.details.registeredLetterCode,
            }
            : null;

    const sendAnalogFeedback =
        el.elementId.includes("SEND_ANALOG_FEEDBACK") && el.details
            ? {
                deliveryDetailCode: el.details.deliveryDetailCode,
                responseStatus: el.details.responseStatus,
                deliveryFailureCause: el.details.deliveryFailureCause,
            }
            : null;

    const physicalAddress =
        (el.elementId.includes("ANALOG_SUCCESS_WORKFLOW") || el.elementId.includes("ANALOG_FAILURE_WORKFLOW"))
            ? el.details?.physicalAddress
            : null;

    return { schedulingDate, sendAnalog, sendAnalogFeedback, physicalAddress };
}

// Componente principale semplificato
const AnalogEvent: React.FC<AnalogEvent> = ({ analogEvents }) => (
    <AccordionTimeline
        keyValue='analogEvent'
        accordionSummaryChild={<Typography variant="body1">Workflow Analogico ({analogEvents.length} eventi)</Typography>}
        accordionDetailsChild={analogEvents.map((el: any, i: number) => {
            const { schedulingDate, sendAnalog, sendAnalogFeedback, physicalAddress } = parseAnalogElement(el);

            return (
                <Accordion key={`analog-${i}`}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="body1">
                            {i + 1}: {el.category}{getSummaryText(sendAnalog, sendAnalogFeedback)}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box component="div" display="flex" flexDirection="column" gap={1}>
                            {schedulingDate && <Typography variant="body1">Schedulato il: {schedulingDate}</Typography>}
                            {physicalAddress && <PhysicalAddress address={physicalAddress} />}
                            {sendAnalog && <SendAnalogDetails sendAnalog={sendAnalog} />}
                            {sendAnalogFeedback && <SendAnalogFeedbackDetails feedback={sendAnalogFeedback} />}
                        </Box>
                    </AccordionDetails>
                </Accordion>
            );
        })}
        sxDetails={{ display: "flex", flexDirection: "column", gap: 2 }}
    />
);

export default AnalogEvent;
