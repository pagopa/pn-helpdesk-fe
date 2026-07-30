import { useSelector } from "react-redux";
import { Box, Stack, Typography, Accordion, AccordionSummary, AccordionDetails, Link } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { responseNotificationData } from "../../redux/responseSlice";
import { notificationStatus, TimelineElement, RecipientWithTimeline } from "../../model/notification";
import AnalogEvent from "./AnalogEvent";
import CourtesyMessage from "./CourtesyMessage";
import LegalMessage from "./LegalMessage";

import DetailOfAddress from "./DetailOfAddress";
import NotificationReport from "./NotificationReport";

const getCourtesyCount = (timeline: Array<TimelineElement>) =>
    timeline.filter((el) => el.elementId.includes('SEND_COURTESY_MESSAGE')).length;

const getAnalogEvents = (timeline: Array<TimelineElement>) =>
    timeline.filter((el) =>
        el.elementId.includes("SEND_ANALOG_PROGRESS") ||
        el.elementId.includes("SCHEDULE_ANALOG_WORKFLOW") ||
        el.elementId.includes("SCHEDULE_ANALOG_FEEDBACK") ||
        el.elementId.includes("SEND_ANALOG_FEEDBACK") ||
        el.elementId.includes("PREPARE_ANALOG_DOMICILE") ||
        el.elementId.includes("SEND_ANALOG_DOMICILE") ||
        el.elementId.includes("ANALOG_SUCCESS_WORKFLOW") ||
        el.elementId.includes("ANALOG_FAILURE_WORKFLOW")
    );

const RecipientSection = ({ recipient }: { recipient: RecipientWithTimeline; rIdx: number }) => {
    const courtesyCount = getCourtesyCount(recipient.timeline);
    const analogEvents = getAnalogEvents(recipient.timeline);

    return (
        <Accordion sx={{ mb: 2, border: '1px solid #ccc', borderRadius: '4px' }} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 'bold' }}>
                    {recipient.denomination} ({recipient.taxId}) - {recipient.recipientType}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {recipient.timeline && recipient.timeline.length > 0 ? (
                    recipient.timeline.map((el, idx) => {
                        const isAddress = el.elementId.includes('NORMALIZED_ADDRESS');
                        const isAnalog = el.elementId.includes('SCHEDULE_ANALOG_WORKFLOW');

                        const isCourtesyOnly = el.elementId.includes('SEND_COURTESY_MESSAGE');

                        const isLegalDigital = el.elementId.includes('SEND_DIGITAL') ||
                            el.elementId.includes('DIGITAL_PROG') ||
                            el.elementId.includes('DIGITAL_DELIVERY_CREATION_REQUEST');

                        const courtesyDetails = isCourtesyOnly ? [
                            `Canale: ${el.details.digitalAddress?.type || "-"}`,
                            `Destinazione: ${el.details.digitalAddress?.address || "-"}`,
                            `Data Invio: ${el.details.sendDate ? new Date(el.details.sendDate).toLocaleDateString() : "-"}`
                        ] : [];

                        const isAppIo = el.details.digitalAddress?.type === "APPIO";
                        const ioResult = isAppIo ? `Risultato AppIo: ${el.details.ioSendMessageResult}` : undefined;

                        return (
                            <Box key={idx} sx={{ my: 1 }}>
                                {isAddress && (
                                    <DetailOfAddress
                                        accordionKey={el.elementId}
                                        oldAddress={el.details.oldAddress}
                                        normalizeAddress={el.details.normalizedAddress}
                                    />
                                )}

                                {isCourtesyOnly && (
                                    <CourtesyMessage
                                        accordionKey={el.elementId}
                                        sendCourtesyMessage={courtesyDetails}
                                        ioResult={ioResult}
                                        numberOfSendCourtesyMessage={courtesyCount}
                                    />
                                )}

                                {isLegalDigital && (
                                    <LegalMessage
                                        accordionKey={el.elementId}
                                        category={el.category}
                                        details={el.details}
                                    />
                                )}

                                {isAnalog && (
                                    <AnalogEvent
                                        accordionKey={el.elementId}
                                        analogEvents={analogEvents}
                                    />
                                )}
                            </Box>
                        );
                    })
                ) : (
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                        Nessun evento registrato per questo destinatario.
                    </Typography>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

const NotificationData = () => {
    const data = useSelector(responseNotificationData);

    if (!data || !data.timeline || !data?.iun) { return null; }

    const subjectOfNotification = data.subject;
    const statusOfNotification = data.notificationStatus;
    const sentAtNotification = new Date(data.sentAt).toLocaleDateString();
    const protocolNumberOfNotification = data.paProtocolNumber;
    const documents = data.documents || [];

    return (
        <Box sx={{ width: 'inherit' }}>
            <Stack direction={'row'}>
                <Typography sx={{ pr: 2, my: 2, fontWeight: 'bold' }}>Creata: {sentAtNotification}</Typography>
                <Typography sx={{ pr: 2, my: 2, fontWeight: 'bold' }}>Stato: {notificationStatus[statusOfNotification.toLocaleLowerCase()]}</Typography>
                <Typography sx={{ pr: 2, my: 2, fontWeight: 'bold' }}>Numero protocollo: {protocolNumberOfNotification}</Typography>
            </Stack>

            <Stack direction={'row'} justifyContent={'space-between'} sx={{ mb: 3 }}>
                <Typography sx={{ pr: 2, my: 2, fontWeight: 'bold' }}>Soggetto: {subjectOfNotification}</Typography>
            </Stack>

            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Destinatari e Timeline:</Typography>

            {data.recipients && data.recipients.map((recipient, idx) => (
                <RecipientSection key={idx} recipient={recipient} rIdx={idx} />
            ))}

            <Typography sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}>Documenti allegati alla notifica:</Typography>
            {documents.map((el, idx) => (
                <Box key={idx} sx={{ width: "100%", minWidth: 0, mb: 1 }}>
                    {typeof el === 'string' ? (
                        <Typography variant="body2" sx={{ color: "error.main", fontStyle: "italic", p: 1, bgcolor: '#fff5f5', borderRadius: '4px' }}>
                            {el}
                        </Typography>
                    ) : (
                        <Link
                            target="_blank"
                            href={`${el.safeStorage?.download?.url}`}
                            sx={{
                                display: "block",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "auto",
                            }}
                        >
                            {`PN-ATTACHMENT-${idx + 1}`}
                        </Link>
                    )}
                </Box>
            ))}

            <NotificationReport data={data} />
        </Box>
    );
};

export default NotificationData;