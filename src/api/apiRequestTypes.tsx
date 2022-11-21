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
 * @typedef {Object} createAggregateType
 */
type createAggregateType = {
    id?: string,
    name: string,
    description: string,
    usagePlanId: string
}

/**
* @typedef {Object} modifyAggregateType
*/
type modifyAggregateType = {
    name: string,
    description: string,
    usagePlanId: string
}

/**
 * @typedef {Object} getAggregateDetailsType
 */
type getAggregateDetailsType = {
    id: string,
    name: string,
    usagePlanTemplate: string,
    createdAt: string,
    lastUpdate: string
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

/**
 * @typedef {Object} getUsagePlansType
 */
 type getUsagePlansType = {
    items: [
        {
            id: string,
            name: string,
            quota: number,
            rate: number,
            burst: number
        }
    ]
}

export type { getPersonIdType, getPersonTaxIdType, getPersonsLogsType, getOperatorsLogsType, getNotificationsInfoLogsType, getNotificationsMonthlyStatsLogsType, getLogsProcessesType, getAssociatedPaListType, getAggregateParams, getAggregatesResponse, getAssociablePaListResponse, getAssociatedPaListResponse, getAggregateResponse, addPaResponse, getUsagePlansType, createAggregateType, modifyAggregateType, getAggregateDetailsType }