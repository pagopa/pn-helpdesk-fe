
export interface PhysicalAddress {
    at?: string;
    address: string;
    addressDetails?: string;
    zip: string;
    municipality: string;
    municipalityDetails?: string;
    province: string;
    foreignState?: string;
}

interface Digest {
    sha256: string;
}

interface Ref {
    key: string;
    versionToken: string;
}

interface Attachment {
    digests: Digest;
    contentType: string;
    ref: Ref;
}

export interface PagoPa {
    noticeCode: string;
    creditorTaxId: string;
    applyCost: boolean;
    attachment?: Attachment;
}

export interface Payment {
    pagoPa?: PagoPa;
}

export interface Recipient {
    recipientType: 'PF' | 'PG';
    taxId: string;
    denomination: string;
    physicalAddress: PhysicalAddress;
    payments?: Array<Payment>;
    timeline: Array<TimelineElement>;
}

interface DownloadInfo {
    url: string | null;
    retryAfter: number | null;
}


export interface Document {
    digests: Digest;
    contentType: string;
    ref: Ref;
    docIdx: string;
    safeStorage: {
        key: string;
        versionId: string | null;
        documentType: string;
        documentStatus: string;
        contentType: string;
        contentLength: number;
        checksum: string;
        retentionUntil: string;
        tags: Record<string, string>;
        download: DownloadInfo;
    };
}

interface LegalFact {
    key: string;
    category: string;
}

interface TimelineAttachment {
    id: string;
    documentType: string;
    url: string;
    date: string;
}

export interface TimelineDetails {
    recIndex?: number;
    notificationRequestId?: string;
    paProtocolNumber?: string;
    legalFactId?: string;
    physicalAddress?: PhysicalAddress;
    digitalAddressSource?: string;
    isAvailable?: boolean;
    attemptDate?: string;
    deliveryMode?: string;
    contactPhase?: string;
    sentAttemptMade?: number;
    sendDate?: string | number | Date;
    digitalAddress?: { type: string; address: string };
    schedulingAnalogDate?: string;
    schedulingDate?: string;
    serviceLevel?: string;
    notificationDate?: string;
    deliveryDetailCode?: string;
    attachments?: Array<TimelineAttachment>;
    sendRequestId?: string;
    registeredLetterCode?: string;
    responseStatus?: string;
    eventTimestamp?: string;
    notificationCost?: number;
    numberOfPages?: number;
    aarKey?: string;
    generatedAarUrl?: string;
    oldAddress?: PhysicalAddress;
    normalizedAddress?: PhysicalAddress;
    productType?: string;
    analogCost?: number;
    envelopeWeight?: number;
    prepareRequestId?: string;
    deliveryFailureCause: string;
    ioSendMessageResult: string;
}

export interface TimelineElement {
    elementId: string;
    timestamp: string;
    ingestionTimestamp: string;
    eventTimestamp: string;
    notificationSentAt: string;
    legalFactsIds: Array<LegalFact>;
    category: string;
    details: TimelineDetails;
}

interface NotificationStatusHistory {
    status: string;
    activeFrom: string;
    relatedTimelineElements: Array<string>;
}

export interface NotificationDataModel {
    abstract?: string;
    paProtocolNumber: string;
    subject: string;
    recipients: Array<Recipient>;
    documents: Array<Document> | Array<string>;
    notificationFeePolicy: string;
    physicalCommunicationType: string;
    senderDenomination: string;
    senderTaxId: string;
    group?: string;
    taxonomyCode: string;
    paFee: number;
    vat: number;
    pagoPaIntMode: string;
    additionalLanguages: Array<string>;
    senderPaId: string;
    iun: string;
    sentAt: string;
    documentsAvailable: boolean;
    notificationStatus: string;
    notificationStatusHistory: Array<NotificationStatusHistory>;
    timeline: Array<TimelineElement>;
}

export const emptyNotification: NotificationDataModel = {
    paProtocolNumber: '',
    subject: '',
    recipients: [],
    documents: [],
    notificationFeePolicy: '',
    physicalCommunicationType: '',
    senderDenomination: '',
    senderTaxId: '',
    taxonomyCode: '',
    paFee: 0,
    vat: 0,
    pagoPaIntMode: '',
    additionalLanguages: [],
    senderPaId: '',
    iun: '',
    sentAt: '',
    documentsAvailable: false,
    notificationStatus: '',
    notificationStatusHistory: [],
    timeline: [],
};

export interface RecipientWithTimeline {
    denomination: string;
    taxId: string;
    recipientType: string;
    timeline: Array<TimelineElement>;
}

export const notificationStatus: Record<string, string> = {
    "delivered": "Consegnata",
    "delivering": "Invio in corso",
    "unreachable": "Destinatario irreperibile",
    "unreachable-multirecipient": "Destinatari irreperibili",
    "paid": "Pagata",
    "accepted": "Depositata",
    "effective-date": "Perfezionata per decorrenza termini",
    "effective-date-multirecipient": "Perfezionata per decorrenza termini",
    "viewed": "Avvenuto accesso",
    "viewed-multirecipient": "Avvenuto accesso",
    "canceled": "Annullata",
    "canceled-tooltip": "L'ente ha annullato l'invio della notifica",
    "returned-to-sender": "Resa al mittente",
    "notification-timeline-reworked": "Evento o più eventi aggiornati",
};

export const codiciStatusTimeline: Record<string, string> = {
    "M01": "perché il destinatario è irreperibile",
    "M02": "perché il destinatario è deceduto",
    "M03": "perché il destinatario è sconosciuto",
    "M04": "perché il destinatario si è transferito",
    "M05": "perché l'invio è stato rifiutato",
    "M06": "perché l'indirizzo è inesatto",
    "M07": "perché l'indirizzo è inesistente",
    "M08": "perché l'indirizzo è insufficiente",
    "M09": "per altre motivazioni",

    "F01": "per furto della busta",
    "F02": "per smarrimento della busta",
    "F03": "per deterioramento della busta",
    "F04": "per rapina della busta",

    "CON998": "Scartato NODOC - errore in fase di recupero del documento depositato su safe-storage",
    "CON997": "Scartato CAP/INTERNAZIONALE - KO della verifica Smistamento",
    "CON996": "Scartato PDF - KO della verifica PDF",
    "CON995": "Errore Stampa - mancato completamento del processo di invio del flusso di stampa",
    "CON993": "Errore Stampa (parziale) - errore specifico per un sottoinsieme degli elementi del pacchetto di stampa",
    "CON080": "Stampato ed Imbustato",
    "CON020": "Affido conservato",
    "CON010": "Distinta Elettronica inviata a Recapitista",
    "CON011": "Distinta Elettronica Sigillata",
    "CON012": "OK Distinta Elettronica da Recapitista",
    "CON992": "KO Distinta Elettronica da Recapitista",
    "CON09A": "Materialità Pronta",
    "CON016": "PICKUP Sigillata",
    "CON018": "Accettazione Recapitista",
    "CON991": "Mancata Accettazione Recapitista",

    "RECRS010": "Inesito",
    "RECRS011": "In giacenza",
    "RECRS001C": "Consegnato - Fascicolo Chiuso",
    "RECRS002A": "Mancata consegna - pre-esito",
    "RECRS002B": "Mancata consegna - In Dematerializzazione",
    "RECRS002C": "Mancata consegna - Fascicolo Chiuso",
    "RECRS002D": "Irreperibilità Assoluta - pre-esito",
    "RECRS002E": "Irreperibilità Assoluta - In Dematerializzazione",
    "RECRS002F": "Irreperibilità Assoluta - Fascicolo Chiuso",
    "RECRS003C": "Consegnato presso Punti di Giacenza - Fascicolo Chiuso",
    "RECRS004A": "Mancata consegna presso Punti di Giacenza - pre-esito",
    "RECRS004B": "Mancata consegna presso Punti di Giacenza - In Dematerializzazione",
    "RECRS004C": "Mancata consegna presso Punti di Giacenza - Fascicolo Chiuso",
    "RECRS005A": "Compiuta giacenza pre-esito",
    "RECRS005B": "Compiuta giacenza - In Dematerializzazione",
    "RECRS005C": "Compiuta giacenza - Fascicolo Chiuso",
    "RECRS006": "Furto/Smarrimento/deterioramento",
    "RECRS013": "Non Rendicontabile",
    "RECRS015": "Causa Forza Maggiore",

    "RECRN010": "Inesito",
    "RECRN011": "In giacenza",
    "RECRN001A": "Consegnato - pre-esito",
    "RECRN001B": "Consegnato - In Dematerializzazione",
    "RECRN001C": "Consegnato - Fascicolo Chiuso",
    "RECRN002A": "Mancata consegna - pre-esito",
    "RECRN002B": "Mancata consegna - In Dematerializzazione",
    "RECRN002C": "Mancata consegna - Fascicolo Chiuso",
    "RECRN002D": "Irreperibilità Assoluta - pre-esito",
    "RECRN002E": "Irreperibilità Assoluta - In Dematerializzazione",
    "RECRN002F": "Irreperibilità Assoluta - Fascicolo Chiuso",
    "RECRN003A": "Consegnato presso Punti di Giacenza - pre-esito",
    "RECRN003B": "Consegnato presso Punti di Giacenza - In Dematerializzazione",
    "RECRN003C": "Consegnato presso Punti di Giacenza - Fascicolo Chiuso",
    "RECRN004A": "Mancata consegna presso Punti di Giacenza - pre-esito",
    "RECRN004B": "Mancata consegna presso Punti di Giacenza - In Dematerializzazione",
    "RECRN004C": "Mancata consegna presso Punti di Giacenza - Fascicolo Chiuso",
    "RECRN005A": "Compiuta giacenza pre-esito",
    "RECRN005B": "Compiuta giacenza - In Dematerializzazione",
    "RECRN005C": "Compiuta giacenza - Fascicolo Chiuso",
    "RECRN006": "Furto/Smarrimento/deterioramento",
    "RECRN013": "Non Rendicontabile",
    "RECRN015": "Causa Forza Maggiore",

    "RECAG001A": "Consegnato - pre-esito",
    "RECAG001B": "Consegnato - In Dematerializzazione",
    "RECAG001C": "Consegnato - Fascicolo Chiuso",
    "RECAG002A": "Consegnato a persona abilitata - pre-esito",
    "RECAG002B": "Consegnato a persona abilitata - In Dematerializzazione",
    "RECAG002C": "Consegnato a persona abilitata - Fascicolo Chiuso",
    "RECAG003A": "Mancata consegna - pre-esito",
    "RECAG003B": "Mancata consegna - In Dematerializzazione",
    "RECAG003C": "Mancata consegna - Fascicolo Chiuso",
    "RECAG003D": "Irreperibilità Assoluta - pre-esito",
    "RECAG003E": "Irreperibilità Assoluta - In Dematerializzazione",
    "RECAG003F": "Irreperibilità Assoluta - Fascicolo Chiuso",
    "RECAG004": "Furto/Smarrimento/deterioramento",
    "RECAG005A": "Consegnato presso Punti di Giacenza - pre-esito",
    "RECAG005B": "Consegnato presso Punti di Giacenza - In Dematerializzazione",
    "RECAG005C": "Consegnato presso Punti di Giacenza - Fascicolo Chiuso",
    "RECAG006A": "Consegna a persona abilitata presso Punti di Giacenza - pre-esito",
    "RECAG006B": "Consegna a persona abilitata presso Punti di Giacenza - In Dematerializzazione",
    "RECAG006C": "Consegna a persona abilitata presso Punti di Giacenza - Fascicolo Chiuso",
    "RECAG007A": "Mancata consegna presso Punti di Giacenza - pre-esito",
    "RECAG007B": "Mancata consegna presso Punti di Giacenza - In Dematerializzazione",
    "RECAG007C": "Mancata consegna presso Punti di Giacenza - Fascicolo Chiuso",
    "RECAG008A": "Compiuta giacenza - pre-esito",
    "RECAG008B": "Compiuta giacenza - In Dematerializzazione",
    "RECAG008C": "Compiuta giacenza - Fascicolo Chiuso",
    "RECAG010": "Inesito",
    "RECAG011A": "In giacenza",
    "RECAG011B": "In giacenza - In Dematerializzazione",
    "RECAG012": "Accettazione 23L",
    "RECAG013": "Non Rendicontabile",
    "RECAG015": "Causa Forza Maggiore",

    "RECRI002": "Ingresso nel paese estero",
    "RECRI003A": "Consegnato - pre-esito",
    "RECRI003B": "Consegnato - In Dematerializzazione",
    "RECRI003C": "Consegnato - Fascicolo Chiuso",
    "RECRI004A": "Non Consegnato - pre-esito",
    "RECRI004B": "Non Consegnato - In Dematerializzazione",
    "RECRI004C": "Non Consegnato - Fascicolo Chiuso",
    "RECRI005": "Furto/Smarrimento/deterioramento",

    "RECRSI001": "Avviato all'estero",
    "RECRSI002": "Ingresso nel paese estero",
    "RECRSI003C": "Consegnato - Fascicolo Chiuso",
    "RECRSI004A": "Non Consegnato - pre-esito",
    "RECRSI004B": "Non Consegnato - In Dematerializzazione",
    "RECRSI004C": "Non Consegnato - Fascicolo Chiuso",
    "RECRSI005": "Furto/Smarrimento/deterioramento",

    "REC090": "Archiviazione fisica materialità di ritorno"
};