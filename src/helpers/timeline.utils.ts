
import { TimelineElement, TimelineDetails } from "../model/notification";
import { codiciStatusTimeline } from "../model/notification";

const CATEGORIE_ESCLUSE = new Set([
    "VALIDATE_NORMALIZE_ADDRESSES_REQUEST",
    "SENDER_ACK_CREATION_REQUEST",
    "AAR_CREATION_REQUEST",
    "AAR_GENERATION",
    "PUBLIC_REGISTRY_CALL",
    "PUBLIC_REGISTRY_RESPONSE",
    "PROBABLE_SCHEDULING_ANALOG_DATE",
    "SCHEDULE_ANALOG_WORKFLOW",
    "SCHEDULE_REFINEMENT",
]);

const TRADUZIONI_CATEGORIA: Record<string, string> = {
    "REQUEST_ACCEPTED": "Notifica presa in carico dalla piattaforma",
    "NORMALIZED_ADDRESS": "Indirizzo del destinatario normalizzato",
    "GET_ADDRESS": "Ricerca indirizzo digitale",
    "SEND_COURTESY_MESSAGE": "Invio messaggio di cortesia",
    "PREPARE_ANALOG_DOMICILE": "Preparazione invio raccomandata",
    "SEND_ANALOG_DOMICILE": "Invio raccomandata analogica",
    "SEND_ANALOG_PROGRESS": "Aggiornamento stato raccomandata",
    "SEND_ANALOG_FEEDBACK": "Esito finale raccomandata",
    "ANALOG_SUCCESS_WORKFLOW": "Raccomandata consegnata con successo",
    "ANALOG_FAILURE_WORKFLOW": "Raccomandata non consegnata",
    "SEND_DIGITAL": "Invio notifica digitale (PEC/SERCQ)",
    "SEND_DIGITAL_FEEDBACK": "Esito invio digitale",
    "DIGITAL_PROG": "Avanzamento invio digitale",
    "SEND_DIGITAL_PROGRESS": "Avanzamento invio digitale",
    "NOTIFICATION_VIEWED": "Notifica visualizzata dal destinatario",
    "REFINEMENT": "Perfezionamento notifica per decorrenza termini",
    "SCHEDULE_REFINEMENT": "Pianificazione perfezionamento",
    "COMPLETELY_UNREACHABLE": "Destinatario completamente irreperibile",
    "NOTIFICATION_CANCELLED": "Notifica annullata",
};

const TRADUZIONI_SOURCE: Record<string, string> = {
    "PLATFORM": "piattaforma",
    "SPECIAL": "domicilio speciale",
    "GENERAL": "registro generale (ANPR/INAD)",
};

const TRADUZIONI_DIGITAL_TYPE: Record<string, string> = {
    "PEC": "PEC",
    "SERCQ": "SERCQ",
    "APPIO": "App IO",
    "TPP": "App di terze parti",
    "EMAIL": "Email",
    "SMS": "SMS",
};

function formatTimestamp(ts: string): string {
    return new Date(ts).toLocaleString("it-IT", {
        day: "2-digit", month: "2-digit", year: "numeric",
        hour: "2-digit", minute: "2-digit"
    });
}

const describeGetAddress = (details: TimelineDetails): string => {
    const source = TRADUZIONI_SOURCE[details.digitalAddressSource ?? ""] ?? details.digitalAddressSource;
    const disponibile = details.isAvailable ? "trovato" : "non trovato";
    return `Indirizzo digitale ${disponibile} - fonte: ${source}`;
};

const describeCourtesyMessage = (details: TimelineDetails): string => {
    const tipo = TRADUZIONI_DIGITAL_TYPE[details.digitalAddress?.type ?? ""] ?? details.digitalAddress?.type;
    return `Messaggio di cortesia inviato via ${tipo}`;
};

const describeAnalogAddress = (details: TimelineDetails): string => {
    const addr = details.physicalAddress;
    return addr
        ? `${addr.address ?? ""} ${addr.zip ?? ""} ${addr.municipality ?? ""} (${addr.province ?? ""})`
        : "indirizzo non disponibile";
};

const describeAnalogDomicile = (details: TimelineDetails): any => {
    const tentativo = (details.sentAttemptMade ?? 0) + 1;
    return `Tentativo ${tentativo} - ${describeAnalogAddress(details)}`;
};

const describeAnalogProgress = (details: TimelineDetails): string => {
    const code = details.deliveryDetailCode ?? "";
    const traduzione = codiciStatusTimeline[code] ?? code;
    const raccomandata = details.registeredLetterCode
        ? ` - Codice raccomandata: ${details.registeredLetterCode}`
        : "";
    return `${code} - ${traduzione}${raccomandata}`;
};

const describeAnalogFeedback = (details: TimelineDetails): string => {
    const esito = details.responseStatus === "OK" ? "Consegnata" : "Non consegnata";
    const code = details.deliveryDetailCode ?? "";
    const traduzione = codiciStatusTimeline[code] ? ` (${codiciStatusTimeline[code]})` : "";
    const causa = details.deliveryFailureCause
        ? ` - Causa: ${codiciStatusTimeline[details.deliveryFailureCause] ?? details.deliveryFailureCause}`
        : "";
    return `Esito: ${esito}${traduzione}${causa}`;
};

const describeAnalogSuccess = (details: TimelineDetails): string => {
    const addr = details.physicalAddress;
    const indirizzo = addr ? `${addr.address ?? ""} ${addr.municipality ?? ""}` : "";
    return indirizzo ? `Consegnata con successo a ${indirizzo}` : '';
};

const describeDigital = (details: TimelineDetails): string => {
    const tipo = TRADUZIONI_DIGITAL_TYPE[details.digitalAddress?.type ?? ""] ?? details.digitalAddress?.type ?? "";
    const indirizzo = details.digitalAddress?.address ?? "";
    return indirizzo ? `${tipo} ${indirizzo}` : "";
};

const describeDigitalFeedback = (details: TimelineDetails): string => {
    const esito = details.responseStatus === "OK" ? "Consegnato" : "Non consegnato";
    const code = details.deliveryDetailCode ?? "";
    const traduzione = codiciStatusTimeline[code] ? ` (${codiciStatusTimeline[code]})` : "";
    return `Esito digitale: ${esito}${traduzione}`;
};

// Mappa categoria -> funzione descrittiva
const DESCRITTORI: Partial<Record<string, (details: TimelineDetails) => string>> = {
    "GET_ADDRESS": describeGetAddress,
    "SEND_COURTESY_MESSAGE": describeCourtesyMessage,
    "PREPARE_ANALOG_DOMICILE": describeAnalogDomicile,
    "SEND_ANALOG_DOMICILE": describeAnalogDomicile,
    "SEND_ANALOG_PROGRESS": describeAnalogProgress,
    "SEND_ANALOG_FEEDBACK": describeAnalogFeedback,
    "ANALOG_SUCCESS_WORKFLOW": describeAnalogSuccess,
    "SEND_DIGITAL": describeDigital,
    "SEND_DIGITAL_PROGRESS": describeDigital,
    "DIGITAL_PROG": describeDigital,
    "SEND_DIGITAL_FEEDBACK": describeDigitalFeedback,
    "NORMALIZED_ADDRESS": (d) => `Indirizzo normalizzato per destinatario ${d.recIndex ?? 0}`,
    "REFINEMENT": () => `Notifica perfezionata per decorrenza termini`,
};

// Funzione principale ora è solo un lookup
const getEventDescription = (el: TimelineElement): string => {
    const descrittore = DESCRITTORI[el.category];
    return descrittore
        ? descrittore(el.details)
        : TRADUZIONI_CATEGORIA[el.category] ?? el.category;
};

export function buildTimelineText(timeline: Array<TimelineElement>): string {
    const lines: Array<string> = [];

    const seen = new Set<string>();
    const filtered = timeline.filter((el) => {
        if (CATEGORIE_ESCLUSE.has(el.category)) { return false; }
        const key = `${el.category}_${el.details.digitalAddressSource ?? ""}_${el.eventTimestamp}`;
        if (seen.has(key)) { return false; }
        seen.add(key);
        return true;
    });

    filtered.forEach((el) => {
        const ts = formatTimestamp(el.eventTimestamp);
        const label = TRADUZIONI_CATEGORIA[el.category] ?? el.category;
        const desc = getEventDescription(el);
        lines.push(`* [${ts}] ${label}: ${desc}`);
    });

    return lines.join("\n");
}