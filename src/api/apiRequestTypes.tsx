/**
 * @typedef {Object} getPersonIdType
 */
type getPersonIdType = {
  recipientType: string;
  ticketNumber: string | undefined;
  taxId: string | undefined;
};

/**
 * @typedef {Object} getPersonTaxIdType
 */
type getPersonTaxIdType = {
  personId: string | undefined;
};

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
};

/**
 * @typedef {Object} getOperatorsLogsType
 */
type getOperatorsLogsType = {
  ticketNumber: string;
  taxId: string;
  dateFrom: string;
  dateTo: string;
};

/**
 * @typedef {Object} getNotificationsInfoLogsType
 */
type getNotificationsInfoLogsType = {
  ticketNumber: string;
  iun: number;
};

/**
 * @typedef {Object} getLogsProcessesType
 */
type getLogsProcessesType = {
  traceId: string;
  dateFrom: string;
  dateTo: string;
};
/**
 * @typedef {Object} getEventsType
 */
type getEventsType = [
  {
    status: string;
    timestamp: string;
    functionality: Array<string>;
    sourceType: string;
  }
];
/**
 * @typedef {Object} getEventsType
 */
type getSessionLogsType = {
  dateFrom: string;
  dateTo: string;
  jti: string;
  deanonimization: boolean;
};

/**
 * @typedef {Object} getAssociatedPaListResponse
 */
type getAssociatedPaListResponse = {
  items: Array<Pa>;
};

/**
 * @typedef {Object} createAggregateType
 */
type createAggregateType = {
  id?: string;
  name: string;
  description: string;
  usagePlanId: string;
};
/**
 * @typedef {Object} modifyAggregateType
 */
type modifyAggregateType = {
  name: string;
  description: string;
  usagePlanId: string;
};

/**
 * @typedef {Object} getAggregateDetailsType
 */
type getAggregateDetailsType = {
  id: string;
  name: string;
  usagePlanTemplate: string;
  createdAt: string;
  lastUpdate: string;
};

/**
 * @typedef {Object} getAggregateParams
 */
type getAggregateParams = {
  name?: string;
  limit?: number;
  lastEvaluatedId?: string;
  lastEvaluatedName?: string;
};

/**
 * @typedef {Object} AggregateSummary
 */
type AggregateSummary = {
  id: string;
  name: string;
  usagePlan: string;
  createdAt: string;
  lastUpdate?: string;
};

/**
 * @typedef {Object} getAggregatesResponse
 */
type getAggregatesResponse = {
  items: Array<AggregateSummary>;
  lastEvaluatedId: string;
  lastEvaluatedName: string;
  total: number;
};

/**
 * @typedef {Object} searchPaType
 */
type searchPaType = {
  limit?: number;
  lastEvaluatedId?: string;
  lastEvaluatedName?: string;
  paName?: string;
};
/**
 * @typedef {Object} searchApikeyResponse
 */
type searchApikeyResponse = {
  items: Array<virtualKey>;
  total: number;
};

/**
 * @typedef {Object} virtualKey
 */
type virtualKey = {
  id: string;
  name: string;
  groups: Array<string> | string;
  status: string;
  pdnd: boolean;
};

/**
 * @typedef {Object} searchPaResponse
 */
type searchPaResponse = {
  items: Array<Pa>;
  lastEvaluatedId: string;
  lastEvaluatedName: string;
  total: number;
};

/**
 * @typedef {Object} updatePdndRequest
 */
type updatePdndRequest = {
  items: Array<KeyType>;
};

/**
 * @typedef {Object} KeyType
 */
type KeyType = {
  id: string;
  pdnd: boolean;
};

/**
 * @typedef {Object} changePdndResponse
 */
type changePdndResponse = {
  unprocessedKey: Array<string>;
};

/**
 * @typedef {Object} Pa
 */
type Pa = {
  name: string;
  id: string;
  selected?: boolean;
};

/**
 * @typedef {Object} getAssociablePaListResponse
 */
type getAssociablePaListResponse = {
  items: Array<Pa>;
};

/**
 * @typedef {Object} UsagePlan
 */
type UsagePlan = {
  id: string;
  name: string;
  quota: number;
  rate: number;
  burst: number;
};

/**
 * @typedef {Object} getAggregateResponse
 */
type getAggregateResponse = {
  id: string;
  name: string;
  description: string;
  usagePlan: UsagePlan;
  createdAt: string;
  lastUpdate?: string;
  associatedPa?: Array<Pa>;
};

/**
 * @typedef {Object} addPaResponse
 */
type addPaResponse = {
  processed: number;
  unprocessed: number;
  unprocessedPA: Array<string>;
};

/**
 * @typedef {Object} getUsagePlansType
 */
type getUsagePlansType = {
  items: [
    {
      id: string;
      name: string;
      quota: number;
      rate: number;
      burst: number;
    }
  ];
};

/**
 * @typedef {Object} aggregateId
 */
type aggregateId = {
  id: string;
};

type ErrorResponse = {
  detail: string;
  errors: Array<string>;
  status: number;
  timestamp: string;
  title: string;
  traceid: string;
};

export type {
  getPersonIdType,
  getPersonTaxIdType,
  getPersonsLogsType,
  getOperatorsLogsType,
  getNotificationsInfoLogsType,
  getLogsProcessesType,
  getEventsType,
  getSessionLogsType,
  getAggregateParams,
  AggregateSummary,
  getAggregatesResponse,
  Pa,
  getAssociablePaListResponse,
  getAssociatedPaListResponse,
  UsagePlan,
  getAggregateResponse,
  addPaResponse,
  getUsagePlansType,
  createAggregateType,
  modifyAggregateType,
  getAggregateDetailsType,
  aggregateId,
  ErrorResponse,
  searchPaResponse,
  searchPaType,
  searchApikeyResponse,
  KeyType,
  changePdndResponse,
  updatePdndRequest,
  virtualKey,
};
