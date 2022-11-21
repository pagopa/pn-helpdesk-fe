import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getAggregatesResponseMockPag1, getAggregatesResponseMockPag2 } from "./mockFile";
import { getLogsProcessesType, getNotificationsInfoLogsType, getNotificationsMonthlyStatsLogsType, getPersonIdType, getPersonsLogsType, getPersonTaxIdType, getAggregateParams, getAggregatesResponse, getAssociablePaListResponse, addPaResponse, createAggregateType, modifyAggregateType, getUsagePlansType, getAggregateResponse, getAssociatedPaListResponse } from "./apiRequestTypes";
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

  getAggregates<T = getAggregatesResponse>(payload: getAggregateParams): Promise<AxiosResponse<T>> {
    if(!process.env.REACT_APP_MOCK_API) {
      return this.http.get(compileRoute({
        prefix: 'api-key-bo',
        path: 'aggregate',
        query: payload
      })
      );
    }

    console.log("call getAggregates with payload", payload);
    return this._mock(getAggregatesResponseMockPag1);
  }

  getAggregateDetails<T = getAggregateResponse>(id: string): Promise<AxiosResponse<T>> {
    if(!process.env.REACT_APP_MOCK_API) { 
      return this.http.get(compileRoute({
        prefix: "api-key-bo",
        path: "aggregate/:id",
        params: {
          id: id
        }
      }));
    }
    
    let foundAgg = agg_list.items.find(agg => agg.id === id);
    const agg = foundAgg ? foundAgg : aggregate;
    return this._mock(agg);
  }

  createAggregate<T = string>(payload: createAggregateType): Promise<AxiosResponse<T>> {
    if(!process.env.REACT_APP_MOCK_API) { 
      return this.http.post(compileRoute({
        prefix: "api-key-bo",
        path: "aggregate"
      }), payload);
    }

    const id = Math.floor((Math.random() * 100) + 1).toString();
    return this._mock(id);
  }

  modifyAggregate<T = string>(payload: modifyAggregateType, id: string): Promise<AxiosResponse<T>> {
    if(!process.env.REACT_APP_MOCK_API) { 
      return this.http.put(compileRoute({
        prefix: "api-key-bo",
        path: "aggregate/:id",
        params: {
          id: id
        }
      }), payload);
    }

    return this._mock(id);
  }

  deleteAggregate<T = string>(id: string): Promise<AxiosResponse<T>> {
    if(!process.env.REACT_APP_MOCK_API) { 
      return this.http.delete(compileRoute({
        prefix: "api-key-bo",
        path: "aggregate/:id",
        params: {
          id: id
        }
      }));
    }

    return this._mock(id);
  }

  getAssociatedPaList<T = getAssociatedPaListResponse>(id: string): Promise<AxiosResponse<T>> {
    if(!process.env.REACT_APP_MOCK_API) { 
      return this.http.get(compileRoute({
        prefix: "api-key-bo",
        path: "aggregate/:id/associated-pa",
        params: {
          id: id
        }
      }));
    }
    
    // console.log("call getAssociatedPaList with payload", id);
    // return Promise.resolve(pa_list_associated as unknown as getAssociatedPaListResponse)
    let pa_list : getAssociablePaListResponse = { items: [] };
    for(let i = 0; i < 200; i++) {
        pa_list.items.push({
            id:"pa_"+i,
            name:"Pa indice " + i
        })
    }
    return this._mock(pa_list);
  }

  movePa<T = any, R = AxiosResponse<T>>(id: string, data?: Array<Pa>): Promise<R> {
    /* return this.http.post<T, R>(`/aggregate/${id}/move-pa`, payload) */
    if(!process.env.REACT_APP_MOCK_API) { 
      return this.http.post(compileRoute({
        prefix: "api-key-bo",
        path: "aggregate/:id/move-pa",
        params: {
          id: id
        }
      }), data);
    }
    return Promise.resolve({ status: 200 } as unknown as R)
  }

  getAssociablePaList<T = getAssociablePaListResponse>(name?: string): Promise<AxiosResponse<T>> {
    if(!process.env.REACT_APP_MOCK_API) { 
      return this.http.get(compileRoute({
        prefix: "api-key-bo",
        path: "aggregate/associable-pa"
      }));
    }

    console.log("call getAssociablePaList with payload", name);
    let pa_list : getAssociablePaListResponse = { items: [] };
    for(let i = 0; i < 7000; i++) {
        pa_list.items.push({
            id:"pa_"+i,
            name:"Pa indice " + i
        })
    }
    return this._mock(pa_list);
  }

  addPa<T = addPaResponse>(id: string, selectedPaList: Array<Pa>): Promise <AxiosResponse<T>> {
    if(!process.env.REACT_APP_MOCK_API) { 
      return this.http.post(compileRoute({
        prefix: "api-key-bo",
        path: "aggregate/:id/add-pa",
        params: {
          id: id
        }
      }), selectedPaList);
    }
    
    let response : addPaResponse = {
      processed: 0,
      unprocessed: 5,
      unprocessedPA: ['Comune di Milano', 'Comune di Sondrio', 'Comune di Napoli', 'Comune di Palermo', 'Comune di Arezzo']
    }
    return this._mock(response);
  }

  getUsagePlans<T = getUsagePlansType>(): Promise<AxiosResponse<T>> {
    if(!process.env.REACT_APP_MOCK_API) { 
      return this.http.get(compileRoute({
        prefix: "api-key-bo",
        path: `usage-plan`,
      }));
    }

    return this._mock(usage_plan_list);
  }

  _mock(mock?: any): Promise<AxiosResponse> {
    return new Promise((res) => res({ data: mock, status: 200, statusText: '200' } as AxiosResponse));
  }
}

export const http = new Http();