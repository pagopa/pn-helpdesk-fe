import { Aggregate, AggregateSummary, Pa } from "../types";

/**
 * @typedef {Object} getPersonIdType
 */
type getPersonIdType = {
    recipientType: string;
    ticketNumber: string | undefined;
    taxId: string | undefined;
}

/**
 * @typedef {Object} getPersonTaxIdType
 */
type getPersonTaxIdType = {
    personId: string | undefined;
}

/**
 * @typedef {Object} getPersonsLogsType
 */
type getPersonsLogsType = {
    ticketNumber: string;
    deanonimization: boolean;
    taxId?: string;
    referenceDate?: string;
    personId?: string;
    iun?: number;
    dateFrom?: string;
    dateTo?: string;
}

/**
 * @typedef {Object} getOperatorsLogsType
 */
type getOperatorsLogsType = {
    ticketNumber: string;
    taxId: string;
    dateFrom: string;
    dateTo: string;
}

/**
 * @typedef {Object} getNotificationsInfoLogsType
 */
type getNotificationsInfoLogsType = {
    ticketNumber: string;
    iun: number;
}

/**
 * @typedef {Object} getNotificationsMonthlyStatsLogsType
 */
type getNotificationsMonthlyStatsLogsType = {
    ticketNumber: string;
    publicAuthorityName: number;
    referenceMonth: string;
}

/**
 * @typedef {Object} getNotificationsMonthlyStatsLogsType
 */
type getLogsProcessesType = {
    traceId: string;
    dateFrom: string;
    dateTo: string;
}

/**
 * @typedef {Object} getAssociatedPaListType
 */
type getAssociatedPaListType = {
    items: [{
        id: string,
        name: string
    }]
}

/**
 * @typedef {Object} getAssociatedPaListResponse
 */
 type getAssociatedPaListResponse = {
    items: Array<Pa>
}

/**
 * @typedef {Object} getAggregationMovePaType
 */
type getAggregationMovePaType = {
    items: [{
        id: string,
        name: string
    }]
}

/**
 * @typedef {Object} getAggregateParams
 */
type getAggregateParams = {
    name?: string,
    limit?: number,
    lastEvaluatedId?: string,
    lastEvaluatedName?: string
}

/**
 * @typedef {Object} getAggregatesResponse
 */
type getAggregatesResponse = {
    items: Array<AggregateSummary>
    lastEvaluatedId: string,
    lastEvaluatedName: string,
    total: number
}

/**
 * @typedef {Object} getAssociablePaListResponse
 */
type getAssociablePaListResponse = {
    items: Array<Pa>
}

/**
 * @typedef {Object} getAggregateResponse
 */
type getAggregateResponse = Aggregate;

/**
 * @typedef {Object} addPaResponse
 */
type addPaResponse = {
    processed: number,
    unprocessed: number,
    unprocessedPA: Array<string>
}

export type { getPersonIdType, getPersonTaxIdType, getPersonsLogsType, getOperatorsLogsType, getNotificationsInfoLogsType, getNotificationsMonthlyStatsLogsType, getLogsProcessesType, getAssociatedPaListType, getAggregationMovePaType, getAggregateParams, getAggregatesResponse, getAssociablePaListResponse, getAssociatedPaListResponse, getAggregateResponse, addPaResponse }