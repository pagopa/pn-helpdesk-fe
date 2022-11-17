export const AGGREGATES = `/aggregates`;
export const AGGREGATE = `/aggregate`;
export const UPDATE_AGGREGATE = `${AGGREGATE}/:idAggregate`;
export const ADD_PA = `${UPDATE_AGGREGATE}/add-pa`;
export const TRANSFER_PA = `${AGGREGATE}/pa-transfer`;
export const GET_UPDATE_AGGREGATE_PATH = (idAggregate: string) => `${AGGREGATE}/${idAggregate}`;
export const GET_ADD_PA_PATH = (idAggregate: string) => `${AGGREGATE}/${idAggregate}/add-pa`;