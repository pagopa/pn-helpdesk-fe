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
 * @typedef {Object} getNotificationsMonthlyStatsLogsType
 */
type getNotificationsMonthlyStatsLogsType = {
  ticketNumber: string;
  publicAuthorityName: number;
  referenceMonth: string;
};

/**
 * @typedef {Object} getNotificationsMonthlyStatsLogsType
 */
type getLogsProcessesType = {
  traceId: string;
  dateFrom: string;
  dateTo: string;
};

export type {
  getPersonIdType,
  getPersonTaxIdType,
  getPersonsLogsType,
  getOperatorsLogsType,
  getNotificationsInfoLogsType,
  getNotificationsMonthlyStatsLogsType,
  getLogsProcessesType,
};
