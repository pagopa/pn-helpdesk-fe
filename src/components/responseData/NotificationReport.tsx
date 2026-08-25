// NotificationReport.tsx
import { Box, Button, Paper, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import { NotificationDataModel, notificationStatus, PagoPa, Recipient } from "../../model/notification";
import { buildTimelineText } from "../../helpers/timeline.utils";

type Props = {
    data: NotificationDataModel;
};

const getPaymentHeaderLine = (data: NotificationDataModel): string => {
    const feeInfo = [
        data?.paFee ? `Commissione PA: ${data.paFee}` : "Commissione PA: 0",
        data?.vat ? `IVA: ${data.vat}` : "IVA: 0",
        data?.pagoPaIntMode ? `Modalità: ${data.pagoPaIntMode}` : "Modalità: NONE"
    ].filter(Boolean);

    return feeInfo.length > 0
        ? `- Pagamenti: ${feeInfo.join(' - ')}`
        : '- Pagamenti presenti';
};

const formatSinglePagoPa = (pagoPa: PagoPa | undefined): string | null => {
    if (!pagoPa) { return null; }

    const details = [
        pagoPa.creditorTaxId && `CF: ${pagoPa.creditorTaxId}`,
        pagoPa.noticeCode && `Cod. Avviso: ${pagoPa.noticeCode}`
    ].filter(Boolean);

    let line = `- pagoPA: ${details.join(' ')}`.trim();

    if (pagoPa.applyCost !== undefined && pagoPa.applyCost !== null) {
        line += `, costi applicati: ${pagoPa.applyCost}`;
    }

    return line;
};

export const formatPaymentLines = (recipient: Recipient, data: NotificationDataModel): Array<string> => {
    const payments = recipient?.payments;
    if (!payments?.length) { return []; }

    const lines: Array<string> = [getPaymentHeaderLine(data)];

    payments.forEach((p: any) => {
        const pagoPaLine = formatSinglePagoPa(p?.pagoPa);
        if (pagoPaLine) {
            lines.push(pagoPaLine);
        }
    });

    return lines;
};

const buildReportText = (data: NotificationDataModel): string => {
    const sentAt = new Date(data.sentAt).toLocaleDateString("it-IT", {
        day: "2-digit", month: "2-digit", year: "numeric",
        hour: "2-digit", minute: "2-digit"
    });

    const lines: Array<string> = [];

    lines.push(`La notifica con IUN ${data.iun} inviata da ${data.senderDenomination}, CF: ${data.senderTaxId} il ${sentAt} avente`);
    lines.push(`- Oggetto della Notifica: ${data.subject}`);
    lines.push(`- Numero di protocollo: ${data.paProtocolNumber}`);
    lines.push("");

    lines.push("Destinatari:");
    data.recipients.forEach((recipient) => {
        lines.push(`- ${recipient.denomination} CF ${recipient.taxId}`);

        const addr = recipient.physicalAddress;
        const addrParts = [
            addr.address,
            addr.addressDetails,
            addr.municipalityDetails,
            addr.zip,
            addr.municipality,
            addr.province,
            addr.foreignState,
        ].filter(Boolean).join(", ");
        lines.push(`- Indirizzo: ${addrParts}`);

        const paymentLines = formatPaymentLines(recipient, data);
        lines.push(...paymentLines);
    });
    lines.push("");

    lines.push("Allegati:");
    data.documents.forEach((doc) => {
        if (typeof doc === "object") {
            lines.push(`- Documento ${doc.docIdx}: ${doc.ref.key} `);
            lines.push(`- sha256: ${doc.digests.sha256}`);
        } else {
            lines.push(`- Documento: ${doc}`);
        }
    });
    lines.push("");
    lines.push("Dettagli:");
    lines.push(`- Tipo tariffa: ${data.notificationFeePolicy}`);
    lines.push(`- Tipo raccomandata:   ${data.physicalCommunicationType}`);
    if (data.group) {
        lines.push(`- Gruppo/i : ${data.group}`);
    }
    lines.push(`- Codice tassonomico ${data.taxonomyCode}`);
    lines.push("");

    lines.push(`Stato attuale della notifica: ${data.notificationStatus} - ${notificationStatus[data.notificationStatus.toLowerCase()]}`);
    lines.push("");

    lines.push("Di seguito riportiamo la cronologia degli eventi che tracciano il ciclo di vita della notifica:");
    lines.push("");
    lines.push(buildTimelineText(data.timeline));
    lines.push("");

    lines.push("Esito e Perfezionamento");
    const status = data.notificationStatus.toUpperCase();
    if (status === "DELIVERED" || status === "VIEWED") {
        lines.push(`La notifica si è perfezionata digitalmente.`);
    } else if (status === "UNREACHABLE") {
        lines.push(`Non essendo stato possibile il recapito digitale, la notifica è passata al flusso analogico.`);
    } else {
        lines.push(`La notifica è attualmente in fase di lavorazione.`);
    }

    return lines.join("\n");
};

const NotificationReport: React.FC<Props> = ({ data }) => {
    const [copied, setCopied] = useState(false);

    const text = buildReportText(data);

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(e => console.log('e >> ', e));
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Paper variant="outlined" sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
                <Typography
                    component="pre"
                    variant="body2"
                    sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: "0.85rem" }}
                >
                    {text}
                </Typography>
            </Paper>
            <Box display="flex" justifyContent="flex-end" mt={1}>
                <Button
                    variant="outlined"
                    startIcon={<ContentCopyIcon />}
                    onClick={handleCopy}
                >
                    {copied ? "Copiato!" : "Copia testo"}
                </Button>
            </Box>
        </Box>
    );
};

export default NotificationReport;