// import { apiClient } from "./apiClient";
import { getLogsProcessesType, getNotificationsInfoLogsType, getNotificationsMonthlyStatsLogsType, 
    getPersonIdType, getPersonTaxIdType, getPersonsLogsType, getAssociatedPaListType, getAggregationMovePaType, getAggregateParams } from "./apiRequestTypes";
import { http as apiClient } from "./axiosClient"

/**
 * Return the person's ID depending on the input received
 * @param {getPersonIdType} data 
 */
const getPersonId = async (payload: getPersonIdType)  => {
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

const getPersonTaxId = async (payload: getPersonTaxIdType)  => {
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

const getAggregates = async (data: getAggregateParams) => {
    return await apiClient.getAggregates(data)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        }) 
}

const deleteAggregate = async (id: string) => {
    return await apiClient.deleteAggregate(id)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        }) 
}

 /**
 * Move PAs to another aggregation
 */
  const getAssociatedPaList = async (id: string, data?: getAssociatedPaListType) => {
    return await apiClient.getAssociatedPaList(id)
     .then((result: any) => {
         return result;
     })
     .catch((error: any) => {
         throw error;
     }) 
 }

/**
 * Move PAs to another aggregation
 */
 const getAggregationMovePa = async (id: string, data?: getAggregationMovePaType) => {
    return await apiClient.getAggregationMovePa(id)
     .then((result: any) => {
         return result;
     })
     .catch((error: any) => {
         throw error;
     }) 
 }

export default { getPersonId, getPersonTaxId, getPersonsLogs, /*getOperatorsLogs,*/
    getNotificationsInfoLogs, getNotificationsMonthlyStatsLogs, getLogsProcesses, getAssociatedPaList, getAggregationMovePa, getAggregates, deleteAggregate }
