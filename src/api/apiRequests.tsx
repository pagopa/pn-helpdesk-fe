import { formatDate } from "../helpers/formatter.utility";
import {
  getLogsProcessesType,
  getNotificationsInfoLogsType,
  getNotificationsMonthlyStatsLogsType,
  getPersonIdType,
  getPersonTaxIdType,
  getPersonsLogsType,
  getEventsType,
  getSessionLogsType,
  getAggregateParams,
  modifyAggregateType,
  createAggregateType,
  AggregateSummary,
  Pa,
  searchPaType,
  updatePdndRequest
} from "./apiRequestTypes";
import { http as logExtractoraggregateApiClient } from "./logExtractorAxiosClient";
import { http as aggregateApiClient } from "./aggregateAxiosClient";

/**
 * Return the person's ID depending on the input received
 * @param {getPersonIdType} data
 */
const getPersonId = async (payload: getPersonIdType) => {
  return await logExtractoraggregateApiClient
    .getPersonId(payload)
    .then((result) => {
      return result;
    })
    .catch((error: any) => {
      throw error;
    });
};

/**
 * Return the person's fiscal code depending on the input received
 * @param {getPersonTaxIdType} data
 */

const getPersonTaxId = async (payload: getPersonTaxIdType) => {
  return await logExtractoraggregateApiClient
    .getPersonTaxId(payload)
    .then((result) => {
      return result;
    })
    .catch((error: any) => {
      throw error;
    });
};

/**
 * Download the logs' archive related to a person's own activities or on a notification
 * @param {getPersonsLogsType} data
 */
const getPersonsLogs = async (data: getPersonsLogsType) => {
  return await logExtractoraggregateApiClient
    .getPersonsLogs(data)
    .then((result: any) => {
      return result;
    })
    .catch((error: any) => {
      throw error;
    });
};

/**
 * Download the logs' archive containing the full info of a notification
 * @param {getNotificationsInfoLogsType} data
 */
const getNotificationsInfoLogs = async (data: getNotificationsInfoLogsType) => {
  return await logExtractoraggregateApiClient
    .getNotificationsInfoLogs(data)
    .then((result: any) => {
      return result;
    })
    .catch((error: any) => {
      throw error;
    });
};

/**
 * Download the logs' archive containing the notifications sent in a specific month
 * @param {getNotificationsMonthlyStatsLogsType} data
 */
const getNotificationsMonthlyStatsLogs = async (
  data: getNotificationsMonthlyStatsLogsType
) => {
  return await logExtractoraggregateApiClient
    .getNotificationsMonthlyStatsLogs(data)
    .then((result: any) => {
      return result;
    })
    .catch((error: any) => {
      throw error;
    });
};

/**
 * Extract all log paths by given a specific traceId
 */
const getLogsProcesses = async (data: getLogsProcessesType) => {
  return await logExtractoraggregateApiClient
    .getLogsProcesses(data)
    .then((result: any) => {
      return result;
    })
    .catch((error: any) => {
      throw error;
    });
};

const getStatus = async () => {
  return await logExtractoraggregateApiClient
    .getStatus()
    .then((result: any) => {
      return result;
    })
    .catch((error: any) => {
      if (error.response.status === 500) {
        return error.response;
      }
      throw error;
    });
};

const getEvents = async (data: getEventsType) => {
  return await logExtractoraggregateApiClient
    .getEvents(data)
    .then((result: any) => {
      return result;
    })
    .catch((error: any) => {
      throw error;
    });
};

const getSessionLogs = async (data: getSessionLogsType) => {
  return await logExtractoraggregateApiClient
    .getSessionLogs(data)
    .then((result: any) => {
      return result;
    })
    .catch((error: any) => {
      throw error;
    });
};
/**
 * Get a list of all the aggregates
 */
const getAggregates = async (data: getAggregateParams) => {
  return await aggregateApiClient
    .getAggregates(data)
    .then((result) => {
      const items = result.data.items.map(
        (agg) =>
        ({
          ...agg,
          createdAt: formatDate(agg.createdAt, true),
          lastUpdate: agg.lastUpdate ? formatDate(agg.lastUpdate, true) : ``,
        } as AggregateSummary)
      );

      return {
        ...result.data,
        items,
      };
    })
    .catch((error: any) => {
      throw error;
    });
};

/**
 * Get the details of an aggregation
 */
const getAggregateDetails = (id: string) => {
  return aggregateApiClient
    .getAggregateDetails(id)
    .then((result) => {
      return result.data;
    })
    .catch((error: any) => {
      throw error;
    });
};

/**
 * Create an aggregation
 */
const createAggregate = async (data: createAggregateType) => {
  return await aggregateApiClient
    .createAggregate(data)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      throw error;
    });
};

/**
 * Create an aggregation
 */
const searchPa = async (data: searchPaType) => {
  return await aggregateApiClient
    .searchPa(data)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

/**
 * Create an 
 */
const searchApiKey = async (data: string) => {
  return await aggregateApiClient
    .searchApiKey(data)
    .then((result) => {
      let items = result.data.items;
      result.data.items = items.map((vk) => ({...vk, groups: Array.isArray(vk.groups) && vk.groups.length > 0 ? vk.groups.join(", ") : ""}));
      
      return result.data;
    })
    .catch((error) => {
      throw error;
    });
};

const modifyPdnd = async (data: updatePdndRequest) => {
  return await aggregateApiClient
    .modifyPdnd(data)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

/**
 * Modify an aggregation
 */
const modifyAggregate = async (data: modifyAggregateType, id: string) => {
  return await aggregateApiClient
    .modifyAggregate(data, id)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      throw error;
    });
};

/**
 * Delete an aggregation
 */
const deleteAggregate = async (id: string) => {
  return await aggregateApiClient
    .deleteAggregate(id)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      throw error;
    });
};

/**
 * Get associated PAs given an aggregation id
 */
const getAssociatedPaList = (id: string) => {
  return aggregateApiClient
    .getAssociatedPaList(id)
    .then((result) => {
      return result.data;
    })
    .catch((error: any) => {
      throw error;
    });
};

/**
 * Move PAs to another aggregation
 */
const movePa = async (id: string, data: Array<Pa>) => {
  return await aggregateApiClient
    .movePa(id, data)
    .then((result) => {
      return result.data;
    })
    .catch((error: any) => {
      throw error;
    });
};

const getAssociablePaList = (name?: string) => {
  return aggregateApiClient
    .getAssociablePaList(name)
    .then((result) => {
      const items = result.data.items.map((pa) => ({ ...pa, selected: false }));
      return {
        ...result.data,
        items,
      };
    })
    .catch((error: any) => {
      throw error;
    });
};

const addPa = async (id: string, paSelectedList: Array<Pa>) => {
  //Remove selected attribute from pa objects
  let paList = paSelectedList.map((pa) => ({ id: pa.id, name: pa.name }));

  return await aggregateApiClient
    .addPa(id, paList)
    .then((result: any) => {
      return result.data;
    })
    .catch((error: any) => {
      throw error;
    });
};

/**
 * Get the list of usage plans
 */
const getUsagePlans = async () => {
  return await aggregateApiClient
    .getUsagePlans()
    .then((result: any) => {
      return result.data;
    })
    .catch((error: any) => {
      throw error;
    });
};

const apiRequests = {
  getPersonId,
  getPersonTaxId,
  getPersonsLogs /*getOperatorsLogs,*/,
  getNotificationsInfoLogs,
  getNotificationsMonthlyStatsLogs,
  getLogsProcesses,
  getStatus,
  getEvents,
  getSessionLogs,
  getAssociatedPaList,
  movePa,
  getAggregates,
  modifyAggregate,
  createAggregate,
  getAggregateDetails,
  deleteAggregate,
  getUsagePlans,
  addPa,
  getAssociablePaList,
  searchPa,
  searchApiKey,
  modifyPdnd
};

export default apiRequests;
