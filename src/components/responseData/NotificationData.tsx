import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { responseNotificationData } from "../../redux/responseSlice";
import AccordionTimeline from "../accordionData/AccordionTimeline";
import AnalogEvent from "./AnalogEvent";
import CourtesyMessage from "./CourtesyMessage";
import DetailOfAddress from "./DetailOfAddress";




const NotificationData = () => {
    const data = useSelector(responseNotificationData);

    const countOfSendCourtesyMessage = data.timeline && data.timeline.filter((el: { elementId: string | Array<string> }) =>
        el.elementId.includes('SEND_COURTESY_MESSAGE') || el.elementId.includes('SEND_DIGITAL')
    ).length;

    const dateLocalSentAt = new Date(data.sentAt).toLocaleDateString();
    const dataGenerality = [`IUN: ${data.iun}`, `SENT AT: ${dateLocalSentAt}`, `SUBJECT: ${data.subject}`, `PAYMENTS: ${!!data.recipients?.[0]?.payments}`];
    const analogEvents = data.timeline && data.timeline.filter((el: { elementId: string | Array<string> }) =>
        el.elementId.includes("SEND_ANALOG_PROGRESS") ||
        el.elementId.includes("SCHEDULE_ANALOG_WORKFLOW") ||
        el.elementId.includes("SCHEDULE_ANALOG_FEEDBACK")
    );

    return <Box sx={{ width: 'inherit' }}>
        {data.iun && <AccordionTimeline keyValue='notifica'
            accordionSummaryChild={<Typography component="span">Generalitá notifica</Typography>}
            accordionDetailsChild={dataGenerality.map((el: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, idx: React.Key | null | undefined) => (
                <Typography key={idx}>{el}</Typography>
            ))}></AccordionTimeline>}

        {data && data.timeline.map((el) => {

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