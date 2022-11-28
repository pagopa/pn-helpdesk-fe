export const AGGREGATES = `/aggregates`;
export const AGGREGATE = `/aggregate`;
export const UPDATE_AGGREGATE = `${AGGREGATE}/:idAggregate`;
export const ADD_PA = `${AGGREGATE}/add-pa`;
export const TRANSFER_PA = `${AGGREGATE}/pa-transfer`;
export const GET_UPDATE_AGGREGATE_PATH = (idAggregate: string) => `${AGGREGATE}/${idAggregate}`;
