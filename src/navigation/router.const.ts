export const AGGREGATES_LIST = `/aggregates`;
export const CREATE_AGGREGATE = `/aggregate`;
export const UPDATE_AGGREGATE = `${CREATE_AGGREGATE}/:idAggregate`;
export const ADD_PA = `${CREATE_AGGREGATE}/add-pa`;
export const TRANSFER_PA = `${CREATE_AGGREGATE}/pa-transfer`;

export const GET_UPDATE_AGGREGATE_PATH = (idAggregate: string) => `${CREATE_AGGREGATE}/${idAggregate}`;

export const TENDERS_TABLE_ROUTE = "/tender";
export const TENDER_DETAIL_ROUTE = `${TENDERS_TABLE_ROUTE}/details`;
export const CREATE_TENDER_ROUTE = `${TENDERS_TABLE_ROUTE}/create`;

export const SEARCH_USAGE_ESTIMATES_ROUTE = "/usage-estimates";
export const MONITOR_ROUTE = "/monitoring";
export const SEARCH_ROUTE = "/search";

export const LOGIN_ROUTE = "/login";

export const nameOfRoute: Record<string, string> = {
  [TENDERS_TABLE_ROUTE] : "Gare",
  [CREATE_TENDER_ROUTE] : "Nuova Gara",
  [TENDER_DETAIL_ROUTE]: "Dettagli Gara"
}

