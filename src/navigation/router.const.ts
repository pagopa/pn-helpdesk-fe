export const AGGREGATES_LIST = `/aggregates`;
export const AGGREGATE = `/aggregate`;
export const UPDATE_AGGREGATE = `${AGGREGATE}/:idAggregate`;
export const ADD_PA = `${AGGREGATE}/add-pa`;
export const TRANSFER_PA = `${AGGREGATE}/pa-transfer`;

export const GET_UPDATE_AGGREGATE_PATH = (idAggregate: string) => `${AGGREGATE}/${idAggregate}`;

export const TENDERS_TABLE_ROUTE = "/tender";
export const TENDER_DETAIL_ROUTE = `${TENDERS_TABLE_ROUTE}/details`;
export const CREATE_TENDER_ROUTE = `${TENDERS_TABLE_ROUTE}/create`;

export const MONITOR_ROUTE = "/monitor";
export const SEARCH_ROUTE = "/search";

export const LOGIN_ROUTE = "/login";

export const nameOfRoute: Record<string, string> = {
  [TENDERS_TABLE_ROUTE] : "Gare",
  [CREATE_TENDER_ROUTE] : "Nuova Gara",
  [TENDER_DETAIL_ROUTE]: "Dettagli Gara"
}

