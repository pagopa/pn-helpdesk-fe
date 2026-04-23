// NotificationReport.tsx
import { Box, Button, Paper, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import { NotificationDataModel } from "../../model/notification";
import { buildTimelineText } from "../../helpers/timeline.utils";

type Props = {
    data: NotificationDataModel;
};

const buildReportText = (data: NotificationDataModel): string => {
    const sentAt = new Date(data.sentAt).toLocaleDateString("it-IT", {
        day: "2-digit", month: "2-digit", year: "numeric",
        hour: "2-digit", minute: "2-digit"
    });

    const lines: Array<string> = [];

    lines.push(`La notifica con IUN [${data.iun}] inviata da [${data.senderDenomination}] (CF: [${data.senderTaxId}]) il [${sentAt}] avente`);
    lines.push(`* Oggetto della Notifica: ${data.subject}`);
    lines.push(`* Numero di protocollo: ${data.paProtocolNumber}`);
    lines.push("");

    lines.push("Destinatari:");
    data.recipients.forEach((recipient) => {
        lines.push(`* ${recipient.denomination} (CF ${recipient.taxId})`);

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
        lines.push(`   * Indirizzo: ${addrParts}`);

        if (recipient.payments?.length) {
            lines.push(`   * Pagamenti: (${data.paFee}/${data.vat}) - ${data.pagoPaIntMode}`);
            recipient.payments.forEach((p) => {
                if (p.pagoPa) {
                    lines.push(`      * pagoPA: ${p.pagoPa.creditorTaxId} ${p.pagoPa.noticeCode} (cost: ${p.pagoPa.applyCost})`);
                }
            });
        }
    });
    lines.push("");

    lines.push("* Allegati:");
    data.documents.forEach((doc) => {
        lines.push(`   * ${doc.docIdx} - ${doc.ref.key} - ${doc.digests.sha256}`);
    });
    lines.push("");
    lines.push("* Dettagli:");
    lines.push(` notificationFeePolicy: ${data.notificationFeePolicy}`);
    lines.push(` Tipo raccomandata:   ${data.physicalCommunicationType}`);
    if (data.group) {
        lines.push(` Gruppo/i  * ${data.group}`);
    }
    lines.push(` Codice tassonomico ${data.taxonomyCode}`);
    lines.push("");

    lines.push(`* Stato attuale della notifica: [${data.notificationStatus}]`);
    lines.push("");

    lines.push("Dettaglio del Workflow (Timeline)");
    lines.push("Di seguito riportiamo la cronologia degli eventi che tracciano il ciclo di vita della notifica:");
    lines.push("");
    lines.push("Dettaglio del Workflow (Timeline)");
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
            <Box display="flex" justifyContent="flex-end" mb={1}>
                <Button
                    variant="outlined"
                    startIcon={<ContentCopyIcon />}
                    onClick={handleCopy}
                >
                    {copied ? "Copiato!" : "Copia testo"}
                </Button>
            </Box>
            <Paper variant="outlined" sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
                <Typography
                    component="pre"
                    variant="body2"
                    sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: "0.85rem" }}
                >
                    {text}
                </Typography>
            </Paper>
        </Box>
    );
};

export default NotificationReport;