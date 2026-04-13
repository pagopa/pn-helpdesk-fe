import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { responseNotificationData } from "../../redux/responseSlice";
import { TimelineElement } from "../../model/notification";
import AnalogEvent from "./AnalogEvent";
import CourtesyMessage from "./CourtesyMessage";
import DetailOfAddress from "./DetailOfAddress";


const NotificationData = () => {
    const data = useSelector(responseNotificationData);
    const [countOfSendCourtesyMessage, setCountOfSendCourtesyMessage] = useState<number>(0);
    const [analogEvents, setAnalogEvents] = useState<Array<TimelineElement>>([]);
    const [statusOfNotification, setStatusOfNotification] = useState<string>('');
    const [sentAtNotification, setSentAtNotification] = useState<string>('');
    const [subjectOfNotification, setSubjectOfNotification] = useState<string>('');
    const [protocolNumberOfNotification, setProtocolNumberNotification] = useState<string>('');

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
    }, [data]);

    if (!data.iun) { return null; }


    return <Box sx={{ width: 'inherit' }}>
        <Stack direction={'row'}>
            <Typography sx={{ px: 2, my: 2, fontWeight: 'bold' }}>Creata: {sentAtNotification}</Typography>
            <Typography sx={{ px: 2, my: 2, fontWeight: 'bold' }}>Stato: {statusOfNotification}</Typography>
            <Typography sx={{ px: 2, my: 2, fontWeight: 'bold' }}>Numero protocollo: {protocolNumberOfNotification}</Typography>

        </Stack>
        <Typography sx={{ px: 2, my: 2, fontWeight: 'bold' }}>Soggetto: {subjectOfNotification}</Typography>

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
    </Box >;

};

export default NotificationData;