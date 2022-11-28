// import { apiClient } from "./apiClient";
import { formatDate } from "../helpers/formatter.utility";
import { getLogsProcessesType, getNotificationsInfoLogsType, getNotificationsMonthlyStatsLogsType, 
    getPersonIdType, getPersonTaxIdType, getPersonsLogsType, getAggregateParams, modifyAggregateType, createAggregateType, AggregateSummary, Pa } from "./apiRequestTypes";
import { http as apiClient } from "./axiosClient"

/**
 * Return the person's ID depending on the input received
 * @param {getPersonIdType} data 
 */
const getPersonId = async (payload: getPersonIdType) => {
    return await apiClient.getPersonId(payload)
        .then((result) => {
            return result
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
 * Return the person's fiscal code depending on the input received
 * @param {getPersonTaxIdType} data 
 */

const getPersonTaxId = async (payload: getPersonTaxIdType) => {
    return await apiClient.getPersonTaxId(payload)
        .then((result) => {
            return result
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
 * Download the logs' archive related to a person's own activities or on a notification
 * @param {getPersonsLogsType} data 
 */
const getPersonsLogs = async (data: getPersonsLogsType) => {
    return await apiClient.getPersonsLogs(data)
        .then((result: any) => {
            return result;

        })
        .catch((error: any) => {
            throw error;
        })
}

/**
 * Download the logs' archive related to a person activities and its operators' ones
 * @param {getOperatorsLogsType} data 
 */
/*const getOperatorsLogs = async (data: getOperatorsLogsType) => {
    return await apiClient.getOperatorsLogs(data)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        })  
}*/

/**
 * Download the logs' archive containing the full info of a notification
 * @param {getNotificationsInfoLogsType} data 
 */
const getNotificationsInfoLogs = async (data: getNotificationsInfoLogsType) => {
    return await apiClient.getNotificationsInfoLogs(data)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
 * Download the logs' archive containing the notifications sent in a specific month
 * @param {getNotificationsMonthlyStatsLogsType} data 
 */
const getNotificationsMonthlyStatsLogs = async (data: getNotificationsMonthlyStatsLogsType) => {
    return await apiClient.getNotificationsMonthlyStatsLogs(data)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
 * Extract all log paths by given a specific traceId
 */
const getLogsProcesses = async (data: getLogsProcessesType) => {
    return await apiClient.getLogsProcesses(data)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
* Get a list of all the aggregates
*/
const getAggregates = async (data: getAggregateParams) => {
    return await apiClient.getAggregates(data)
        .then((result) => {
            const items = result.data.items.map(
                (agg) => ({
                    ...agg, 
                    createdAt: formatDate(agg.createdAt, true), 
                    lastUpdate: agg.lastUpdate ? formatDate(agg.lastUpdate, true) : ``
                } as AggregateSummary) 
            )

            return {
                ...result.data,
                items
            };
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
* Get the details of an aggregation
*/
const getAggregateDetails = (id: string) => {
    return apiClient.getAggregateDetails(id)
        .then((result) => {
            return result.data;
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
* Create an aggregation
*/
const createAggregate = async (data: createAggregateType) => {
    return await apiClient.createAggregate(data)
        .then((result: any) => {
            return result.data;
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
* Modify an aggregation
*/
const modifyAggregate = async (data: modifyAggregateType, id: string) => {
    return await apiClient.modifyAggregate(data, id)
        .then((result: any) => {
            return result.data;
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
* Delete an aggregation
*/
const deleteAggregate = async (id: string) => {
    return await apiClient.deleteAggregate(id)
        .then((result: any) => {
            return result.data;
        })
        .catch((error: any) => {
            throw error;
        })
}

 /**
 * Get associated PAs given an aggregation id
 */
  const getAssociatedPaList = (id: string) => {
    return apiClient.getAssociatedPaList(id)
        .then((result) => {
            return result.data;
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
 * Move PAs to another aggregation
 */
const movePa = async (id: string, data: Array<Pa>) => {
    return await apiClient.movePa(id, data)
     .then((result) => {
         return result.data;
     })
     .catch((error: any) => {
         throw error;
     }) 
}

const getAssociablePaList = (name?: string) => {
    return apiClient.getAssociablePaList(name)
        .then((result) => {
            const items = result.data.items.map(
                (pa) => ({...pa, selected: false}) 
            )
            return {
                ...result.data,
                items
            };
        })
        .catch((error: any) => {
            throw error;
        }) 
}

const addPa = async (id: string, paSelectedList: Array<Pa>) => {
    //Remove selected attribute from pa objects
    let paList = paSelectedList.map((pa) => ({id: pa.id, name: pa.name}));

    return await apiClient.addPa(id, paList)
        .then((result: any) => {
            return result.data;
        })
        .catch((error: any) => {
            throw error;
        }) 
}

/**
* Get the list of usage plans
*/
const getUsagePlans = async () => {
    return await apiClient.getUsagePlans()
        .then((result: any) => {
            return result.data;
        })
        .catch((error: any) => {
            throw error;
        })
}

export default {
    getPersonId, getPersonTaxId, getPersonsLogs, /*getOperatorsLogs,*/
    getNotificationsInfoLogs, getNotificationsMonthlyStatsLogs, getLogsProcesses, getAssociatedPaList, movePa, getAggregates, modifyAggregate, createAggregate, getAggregateDetails, deleteAggregate, getUsagePlans, addPa, getAssociablePaList
}
