import { useDispatch, useSelector } from "react-redux";
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
    if (!data || !data.timeline) { return null; }
    const dispatch = useDispatch();
    const expanded = useSelector(selectExpanded);
    const allExpanded = ACCORDION_KEYS.every(k => expanded[k]);

    const handleExpandAll = () => {
        if (allExpanded) {
            dispatch(collapseAll(ACCORDION_KEYS));
        } else {
            dispatch(expandAll(ACCORDION_KEYS));
        }
    };

    const countOfSendCourtesyMessage = data.timeline.filter((el: TimelineElement) =>
        el.elementId.includes('SEND_COURTESY_MESSAGE') ||
        el.elementId.includes('SEND_DIGITAL')
    ).length;

    const analogEvents =
        data.timeline.filter((el: TimelineElement) =>
            el.elementId.includes("SEND_ANALOG_PROGRESS") ||
            el.elementId.includes("SCHEDULE_ANALOG_WORKFLOW") ||
            el.elementId.includes("SCHEDULE_ANALOG_FEEDBACK") ||
            el.elementId.includes("SEND_ANALOG_FEEDBACK") ||
            el.elementId.includes("PREPARE_ANALOG_DOMICILE") ||
            el.elementId.includes("SEND_ANALOG_DOMICILE") ||
            el.elementId.includes("ANALOG_SUCCESS_WORKFLOW") ||
            el.elementId.includes("ANALOG_FAILURE_WORKFLOW"));
    const subjectOfNotification = data.subject;
    const statusOfNotification = data.notificationStatus;
    const sentAtNotification = new Date(data.sentAt).toLocaleDateString();
    const protocolNumberOfNotification = data.paProtocolNumber;
    const documents = data.documents;


    if (!data.iun) { return null; }

    return <Box key={data.iun} sx={{ width: 'inherit' }}>
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
                [`Type : ${el.details.digitalAddress?.type}`, ` Address : ${el.details.digitalAddress?.address}`, ` SendAt: ${el.details.sendDate ? new Date(el.details.sendDate).toLocaleDateString() : ""}`, `IoSendMessageResult : ${el.details.ioSendMessageResult ? el.details.ioSendMessageResult : "-"}`]
                : [];
            const isIosendCourtesyMessage = el.details.digitalAddress?.type === "APPIO";
            const ioResult = isIosendCourtesyMessage ? `AppIo-Result: ${el.details.ioSendMessageResult}` : undefined;

            const analogWorkflow = el.elementId.includes('SCHEDULE_ANALOG_WORKFLOW');

            return <>
                {addressFlag && <DetailOfAddress accordionKey={el.elementId} oldAddress={el.details.oldAddress} normalizeAddress={el.details.normalizedAddress}></DetailOfAddress>}
                {checkCourtesyMessage && <CourtesyMessage accordionKey={el.elementId} sendCourtesyMessage={sendCourtesyMessage} ioResult={ioResult} numberOfSendCourtesyMessage={countOfSendCourtesyMessage}></CourtesyMessage>}
                {analogWorkflow && <AnalogEvent accordionKey={el.elementId} analogEvents={analogEvents}></AnalogEvent>}
            </>;
        })}
        <Typography sx={{ mb: 2, fontWeight: 'bold' }}>Documenti:</Typography>
        {documents && documents.map((el: string | Document, idx: number) => (
            <Box key={idx} sx={{ width: "100%", minWidth: 0 }}>
                {typeof el === 'string' ? (
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            fontStyle: "italic",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >
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
    </Box >;

};

export default NotificationData;