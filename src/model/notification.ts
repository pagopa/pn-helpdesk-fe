
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

interface PagoPa {
    noticeCode: string;
    creditorTaxId: string;
    applyCost: boolean;
    attachment?: Attachment;
}

interface Payment {
    pagoPa?: PagoPa;
}

interface Recipient {
    recipientType: 'PF' | 'PG';
    taxId: string;
    denomination: string;
    physicalAddress: PhysicalAddress;
    payments?: Array<Payment>;
}

interface Document {
    digests: Digest;
    contentType: string;
    ref: Ref;
    docIdx: string;
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

interface TimelineDetails {
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
    documents: Array<Document>;
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

