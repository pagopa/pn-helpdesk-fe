import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { collapseAll, expandAll, selectExpanded } from "../../redux/accordionSlice";
import { responseNotificationData } from "../../redux/responseSlice";
import { Document, notificationStatus, TimelineElement } from "../../model/notification";
import AnalogEvent from "./AnalogEvent";
import CourtesyMessage from "./CourtesyMessage";
import DetailOfAddress from "./DetailOfAddress";
import NotificationReport from "./NotificationReport";

const ACCORDION_KEYS = ['notifica', 'courtesy', 'address', 'analogEvent'];


const NotificationData = () => {
    const data = useSelector(responseNotificationData);
    const dispatch = useDispatch();
    const expanded = useSelector(selectExpanded);

    const [countOfSendCourtesyMessage, setCountOfSendCourtesyMessage] = useState<number>(0);
    const [analogEvents, setAnalogEvents] = useState<Array<TimelineElement>>([]);
    const [statusOfNotification, setStatusOfNotification] = useState<string>('');
    const [sentAtNotification, setSentAtNotification] = useState<string>('');
    const [subjectOfNotification, setSubjectOfNotification] = useState<string>('');
    const [protocolNumberOfNotification, setProtocolNumberNotification] = useState<string>('');
    const [documents, setDocuments] = useState<Array<Document>>();
    const allExpanded = ACCORDION_KEYS.every(k => expanded[k]);

    const handleExpandAll = () => {
        if (allExpanded) {
            dispatch(collapseAll(ACCORDION_KEYS));
        } else {
            dispatch(expandAll(ACCORDION_KEYS));
        }
    };

    useEffect(() => {

        const courtesyCount = data.timeline.filter((el: TimelineElement) =>
            el.elementId.includes('SEND_COURTESY_MESSAGE') ||
            el.elementId.includes('SEND_DIGITAL')
        ).length;


        setCountOfSendCourtesyMessage(courtesyCount);

        setAnalogEvents(
            data.timeline.filter((el: TimelineElement) =>
                el.elementId.includes("SEND_ANALOG_PROGRESS") ||
                el.elementId.includes("SCHEDULE_ANALOG_WORKFLOW") ||
                el.elementId.includes("SCHEDULE_ANALOG_FEEDBACK") ||
                el.elementId.includes("SEND_ANALOG_FEEDBACK") ||
                el.elementId.includes("PREPARE_ANALOG_DOMICILE") ||
                el.elementId.includes("SEND_ANALOG_DOMICILE") ||
                el.elementId.includes("ANALOG_SUCCESS_WORKFLOW") ||
                el.elementId.includes("ANALOG_FAILURE_WORKFLOW")
            )
        );
        setSubjectOfNotification(data.subject);
        setStatusOfNotification(data.notificationStatus);
        setSentAtNotification(new Date(data.sentAt).toLocaleDateString());
        setProtocolNumberNotification(data.paProtocolNumber);
        setDocuments(data.documents);
    }, [data]);

    if (!data.iun) { return null; }

    return <Box sx={{ width: 'inherit' }}>
        <Stack direction={'row'}>
            <Typography sx={{ pr: 2, my: 2, fontWeight: 'bold' }}>Creata: {sentAtNotification}</Typography>
            <Typography sx={{ pr: 2, my: 2, fontWeight: 'bold' }}>Stato: {notificationStatus[statusOfNotification.toLocaleLowerCase()]}</Typography>
            <Typography sx={{ pr: 2, my: 2, fontWeight: 'bold' }}>Numero protocollo: {protocolNumberOfNotification}</Typography>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'}>
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
        {data.timeline.map((el) => {

            const addressFlag = el.elementId.includes('NORMALIZED_ADDRESS');
            const checkCourtesyMessage = el.elementId.includes('SEND_COURTESY_MESSAGE') || (el.elementId.includes('SEND_DIGITAL') && !el.elementId.includes('SEND_DIGITAL_FEEDBACK')) || el.elementId.includes('SEND_DIGITAL_FEEDBACK') || el.elementId.includes('DIGITAL_PROG');
            const sendCourtesyMessage = checkCourtesyMessage ?
                [`Type : ${el.details.digitalAddress?.type}`, ` Address : ${el.details.digitalAddress?.address}`, ` SendAt: ${el.details.sendDate ? new Date(el.details.sendDate).toLocaleDateString() : ""}`, `Source: ${el.details.digitalAddressSource}`, `Response: ${el.details.responseStatus}`, `Detail code: ${el.details.deliveryDetailCode}`, `Failure cause: ${el.details.deliveryFailureCause}`]
                : [];
            const isIosendCourtesyMessage = el.details.digitalAddress?.type === "APPIO";
            const ioResult = isIosendCourtesyMessage ? `AppIo-Result: ${el.details.ioSendMessageResult}` : undefined;

            const analogWorkflow = el.elementId.includes('SCHEDULE_ANALOG_WORKFLOW');

            return <>
                {addressFlag && <DetailOfAddress oldAddress={el.details.oldAddress} normalizeAddress={el.details.normalizedAddress}></DetailOfAddress>}
                {checkCourtesyMessage && <CourtesyMessage sendCourtesyMessage={sendCourtesyMessage} ioResult={ioResult} numberOfSendCourtesyMessage={countOfSendCourtesyMessage}></CourtesyMessage>}
                {analogWorkflow && <AnalogEvent analogEvents={analogEvents}></AnalogEvent>}
            </>;
        })}
        <Typography variant="h6" sx={{ mb: 2 }}>Documenti:</Typography>
        {documents && documents.map((el, idx) => (
            <Box key={idx} sx={{ width: "100%", minWidth: 0 }}>
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
                    {el.safeStorage?.download?.url}
                </Link>
            </Box>
        ))}
        <NotificationReport data={data} />
    </Box >;

};

export default NotificationData;