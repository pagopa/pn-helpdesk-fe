import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getAggregatesResponseMockPag1, getAggregatesResponseMockPag2 } from "./mockFile";
import { getLogsProcessesType, getNotificationsInfoLogsType, getNotificationsMonthlyStatsLogsType, getPersonIdType, getPersonsLogsType, getPersonTaxIdType, getAssociatedPaListType, getAggregationMovePaType, getAggregateParams, getAggregatesResponse, getAssociablePaListResponse, addPaResponse, createAggregateType, modifyAggregateType, getUsagePlansType, getAggregateResponse, getAssociatedPaListResponse } from "./apiRequestTypes";
import { aggregate, agg_list, pa_list, pa_list_associated, usage_plan_list } from "./pa_agg_response";
import { Aggregate, Pa } from "../types";
import { compileRoute } from "../helpers/api.utility";

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "*/*",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
};

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: "",
      headers,
    });

    http.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        throw error;
      }
    );

    http.interceptors.request.use(
      (request: any) => {
        const token = sessionStorage.getItem("token")
        const accessToken = sessionStorage.getItem("accessToken")
        request.headers = {
          ...request.headers,
          Authorization: `Bearer ${token}`,
          Auth: accessToken
        }
        return request
      }
    );
    this.instance = http;
    return http;
  }

  getPersonTaxId<T = any, R = AxiosResponse<T>>(payload: getPersonTaxIdType): Promise<R> {
    return this.http.post<T, R>("/persons/v1/tax-id", payload)
  }

  getPersonId<T = any, R = AxiosResponse<T>>(payload: getPersonIdType): Promise<R> {
    return this.http.post<T, R>("/persons/v1/person-id", payload)
  }

  getPersonsLogs<T = any, R = AxiosResponse<T>>(payload: getPersonsLogsType): Promise<R> {
    return this.http.post<T, R>("logs/v1/persons", payload)
  }

  /*getOperatorsLogs<T = any, R = AxiosResponse<T>>(payload: getOperatorsLogsType): Promise<R> {
    return this.http.post<T, R>("logs/operators", payload )
  }*/

  getNotificationsInfoLogs<T = any, R = AxiosResponse<T>>(payload: getNotificationsInfoLogsType): Promise<R> {
    return this.http.post<T, R>("logs/v1/notifications/info", payload)
  }

  getNotificationsMonthlyStatsLogs<T = any, R = AxiosResponse<T>>(payload: getNotificationsMonthlyStatsLogsType): Promise<R> {
    return this.http.post<T, R>("logs/v1/notifications/monthly", payload)
  }

  getLogsProcesses<T = any, R = AxiosResponse<T>>(payload: getLogsProcessesType): Promise<R> {
    return this.http.post<T, R>("logs/v1/processes", payload)
  }

  getAggregates<T = getAggregatesResponse, R = AxiosResponse<T>>(payload: getAggregateParams): Promise<getAggregatesResponse> {
    // return this.http.get<getAggregatesResponse, R>(compileRoute({
    //   prefix: 'api-key-backoffice',
    //   path: 'aggregate', 
    //   query: payload
    // }));
    console.log("call getAggregates with payload", payload);
    return new Promise((resolve, reject) => {
      if (payload.name === "error") {
        reject("Errore di sistema");
      } else if (payload.lastEvaluatedId === "") {
        console.log("response", getAggregatesResponseMockPag1);
        resolve(getAggregatesResponseMockPag1);
      } else if (payload.lastEvaluatedId === "agg10") {
        console.log("response", getAggregatesResponseMockPag2);
        resolve(getAggregatesResponseMockPag2)
      }

    })
  }

  getAggregateDetails<T = any, R = AxiosResponse<T>>(id: string): Promise<R> {
    // return this.http.get<getAggregateResponse, R>(compileRoute({
    //   prefix: "api-key-backoffice",
    //   path: "aggregate/:id",
    //   params: {
    //     id: id
    //   }
    // }));
    let foundAgg = agg_list.items.find(agg => agg.id === id);
    const agg = foundAgg ? foundAgg : aggregate;
    return Promise.resolve(agg as unknown as R)
  }

  createAggregate<T = string, R = AxiosResponse<T>>(payload: createAggregateType): Promise<string> {
    // return this.http.post<string, R>(compileRoute({
    //   prefix: "api-key-backoffice",
    //   path: "aggregate"
    // }), payload);
    return new Promise((resolve) => {
      const id = Math.floor((Math.random() * 100) + 1).toString();
      resolve(id);
    })
  }

  modifyAggregate<T = string, R = AxiosResponse<T>>(payload: modifyAggregateType, id: string): Promise<string> {
    // return this.http.put<string, R>(compileRoute({
    //   prefix: "api-key-backoffice",
    //   path: "aggregate/:id",
    //   params: {
    //     id: id
    //   }
    // }), payload);
    return new Promise((resolve) => {
      resolve(id);
    })
  }

  deleteAggregate<T = string, R = AxiosResponse<T>>(id: string): Promise<string> {
    // return this.http.delete<string, R>(compileRoute({
    //   prefix: "api-key-backoffice",
    //   path: "aggregate/:id",
    //   params: {
    //     id: id
    //   }
    // }));
    return new Promise((resolve) => {
      resolve(id);
    })
  }

  getAssociatedPaList<T = any, R = AxiosResponse<T>>(id: string): Promise<getAssociatedPaListResponse> {
    // return this.http.get<T, R>(compileRoute({
    //   prefix: "api-key-backoffice",
    //   path: "aggregate/:id/associated-pa",
    //   params: {
    //     id: id
    //   }
    // }));
    console.log("call getAssociatedPaList with payload", id);
    return Promise.resolve(pa_list_associated as unknown as getAssociatedPaListResponse)
  }

  getAggregationMovePa<T = any, R = AxiosResponse<T>>(id: string, payload?: getAggregationMovePaType): Promise<R> {
    /* return this.http.post<T, R>(`/aggregate/${id}/move-pa`, payload) */
    return Promise.resolve({ status: 200 } as unknown as R)
  }

  getAssociablePaList<T = any, R = AxiosResponse<T>>(name?: string): Promise<getAssociablePaListResponse> {
    //return this.http.get<GetAggregateResponse>(ENHANCE_ROUTE_WITH_QUERY('aggregate/associable-pa', name));
    console.log("call getAssociablePaList with payload", name);
    let pa_list : getAssociablePaListResponse = { items: [] };
    for(let i = 0; i < 7000; i++) {
        pa_list.items.push({
            id:"pa_"+i,
            name:"Pa indice " + i
        })
    }
    return Promise.resolve(pa_list)
  }

  addPa(id: string, selectedPaList: Array<Pa>): Promise <addPaResponse> {
    //return this.http.post<GetAggregateResponse>('aggregate/${id}/add-pa', selectedPaList);
    let response : addPaResponse = {
      processed: 0,
      unprocessed: 5,
      unprocessedPA: ['Comune di Milano', 'Comune di Sondrio', 'Comune di Napoli', 'Comune di Palermo', 'Comune di Arezzo']
    }
    return Promise.resolve(response);
  }

  getUsagePlans<T = any, R = AxiosResponse<T>>(): Promise<any> {
    // return this.http.get<T, R>(compileRoute({
    //   prefix: "api-key-backoffice",
    //   path: `usage-plan`,
    // }));
    return Promise.resolve(usage_plan_list);
  }
}

export const http = new Http();