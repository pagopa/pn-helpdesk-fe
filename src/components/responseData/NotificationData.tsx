import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Button, Link, Stack, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { collapseAll, expandAll, selectExpanded } from "../../redux/accordionSlice";
import { responseNotificationData } from "../../redux/responseSlice";
import { Document, notificationStatus, TimelineElement, RecipientWithTimeline } from "../../model/notification";
import AnalogEvent from "./AnalogEvent";
import CourtesyMessage from "./CourtesyMessage";
import DetailOfAddress from "./DetailOfAddress";
import NotificationReport from "./NotificationReport";

const ACCORDION_KEYS = ['notifica', 'courtesy', 'address', 'analogEvent'];



// 1. ESTRATTO FUORI DAL COMPONENTE per abbattere la complessità cognitiva
const getCourtesyCount = (timeline: Array<TimelineElement>) =>
    timeline.filter((el) =>
        el.elementId.includes('SEND_COURTESY_MESSAGE') ||
        el.elementId.includes('SEND_DIGITAL')
    ).length; // Risolto errore linter: ritorno implicito senza graffe

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
    ); // Risolto errore linter: ritorno implicito senza graffe

// 2. COMPONENTE DI SUPPORTO per isolare il rendering del singolo destinatario
// Questo abbatte la complessità cognitiva del componente principale da 19 a < 8!
const RecipientSection = ({ recipient, rIdx }: { recipient: RecipientWithTimeline; rIdx: number }) => {
    const courtesyCount = getCourtesyCount(recipient.timeline);
    const analogEvents = getAnalogEvents(recipient.timeline);

    return (
        <Accordion key={rIdx} sx={{ mb: 2, border: '1px solid #ccc', borderRadius: '4px' }} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 'bold' }}>
                    {recipient.denomination} ({recipient.taxId}) - {recipient.recipientType}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {recipient.timeline && recipient.timeline.length > 0 ? (
                    recipient.timeline.map((el, idx) => {
                        const isAddress = el.elementId.includes('NORMALIZED_ADDRESS');
                        const isCourtesy = el.elementId.includes('SEND_COURTESY_MESSAGE') ||
                            (el.elementId.includes('SEND_DIGITAL') && !el.elementId.includes('SEND_DIGITAL_FEEDBACK')) ||
                            el.elementId.includes('SEND_DIGITAL_FEEDBACK') ||
                            el.elementId.includes('DIGITAL_PROG');

                        const courtesyDetails = isCourtesy ? [
                            `Type : ${el.details.digitalAddress?.type}`,
                            ` Address : ${el.details.digitalAddress?.address}`,
                            ` SendAt: ${el.details.sendDate ? new Date(el.details.sendDate).toLocaleDateString() : ""}`,
                            `IoSendMessageResult : ${el.details.ioSendMessageResult ? el.details.ioSendMessageResult : "-"}`
                        ] : [];

                        const isAppIo = el.details.digitalAddress?.type === "APPIO";
                        const ioResult = isAppIo ? `AppIo-Result: ${el.details.ioSendMessageResult}` : undefined;
                        const isAnalog = el.elementId.includes('SCHEDULE_ANALOG_WORKFLOW');

                        return (
                            <Box key={idx} sx={{ my: 1 }}>
                                {isAddress && (
                                    <DetailOfAddress
                                        accordionKey={el.elementId}
                                        oldAddress={el.details.oldAddress}
                                        normalizeAddress={el.details.normalizedAddress}
                                    />
                                )}
                                {isCourtesy && (
                                    <CourtesyMessage
                                        accordionKey={el.elementId}
                                        sendCourtesyMessage={courtesyDetails}
                                        ioResult={ioResult}
                                        numberOfSendCourtesyMessage={courtesyCount}
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

// 3. COMPONENTE PRINCIPALE (Ora leggerissimo e conforme a tutte le regole di complessità)
const NotificationData = () => {
    const data = useSelector(responseNotificationData);
    const dispatch = useDispatch();
    const expanded = useSelector(selectExpanded);

    const [statusOfNotification, setStatusOfNotification] = useState<string>('');
    const [sentAtNotification, setSentAtNotification] = useState<string>('');
    const [subjectOfNotification, setSubjectOfNotification] = useState<string>('');
    const [protocolNumberOfNotification, setProtocolNumberNotification] = useState<string>('');
    const [documents, setDocuments] = useState<Array<Document | string>>([]);
    const allExpanded = ACCORDION_KEYS.every(k => expanded[k]);

    const handleExpandAll = () => {
        if (allExpanded) {
            dispatch(collapseAll(ACCORDION_KEYS));
        } else {
            dispatch(expandAll(ACCORDION_KEYS));
        }
    };

    useEffect(() => {
        if (!data) { return; }
        setSubjectOfNotification(data.subject);
        setStatusOfNotification(data.notificationStatus);
        setSentAtNotification(new Date(data.sentAt).toLocaleDateString());
        setProtocolNumberNotification(data.paProtocolNumber);
        setDocuments(data.documents || []);
    }, [data]);

    if (!data?.iun) { return null; }

    return (
        <Box sx={{ width: 'inherit' }}>
            {/* Header Informazioni Generali */}
            <Stack direction={'row'}>
                <Typography sx={{ pr: 2, my: 2, fontWeight: 'bold' }}>Creata: {sentAtNotification}</Typography>
                <Typography sx={{ pr: 2, my: 2, fontWeight: 'bold' }}>Stato: {notificationStatus[statusOfNotification.toLocaleLowerCase()]}</Typography>
                <Typography sx={{ pr: 2, my: 2, fontWeight: 'bold' }}>Numero protocollo: {protocolNumberOfNotification}</Typography>
            </Stack>

            <Stack direction={'row'} justifyContent={'space-between'} sx={{ mb: 3 }}>
                <Typography sx={{ pr: 2, my: 2, fontWeight: 'bold' }}>Soggetto: {subjectOfNotification}</Typography>
                <Button
                    onClick={handleExpandAll}
                    variant='contained'
                    sx={{
                        backgroundColor: 'primary.main',
                        '&:hover': { backgroundColor: 'primary.dark' },
                    }}>
                    {allExpanded ? "Chiudi tutti" : "Espandi tutti"}
                </Button>
            </Stack>

            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Destinatari e Timeline:</Typography>

            {/* Renderizzazione raggruppata pulita e type-safe */}
            {data.recipients && data.recipients.map((recipient, idx) => (
                <RecipientSection key={idx} recipient={recipient} rIdx={idx} />
            ))}

            {/* Sezione Documenti */}
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