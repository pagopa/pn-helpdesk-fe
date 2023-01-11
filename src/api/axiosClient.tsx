import axios, { AxiosInstance, AxiosResponse } from "axios";
import { compileRoute } from "../helpers/api.utility";
import { 
  getLogsProcessesType, 
  getNotificationsInfoLogsType, 
  getNotificationsMonthlyStatsLogsType, 
  getPersonIdType, 
  getPersonsLogsType, 
  getPersonTaxIdType, 
  getAggregateParams, 
  getAggregatesResponse, 
  Pa,
  getAssociablePaListResponse, 
  addPaResponse, 
  createAggregateType, 
  modifyAggregateType, 
  getUsagePlansType, 
  getAggregateResponse, 
  getAssociatedPaListResponse, 
  aggregateId, 
} from "./apiRequestTypes";
import { 
  aggregate,
  pa_list,
  usage_plan_list, 
  aggregates_list, 
  move_pa,
  pa_list_associated
} from "./mock_agg_response";

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
      baseURL: process.env.REACT_APP_API_ENDPOINT,
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

    return this._mock(aggregates_list);
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
    
    return this._mock(aggregate);
  }

  createAggregate<T = aggregateId>(payload: createAggregateType): Promise<AxiosResponse<T>> {
    if(!process.env.REACT_APP_MOCK_API) { 
      return this.http.post(compileRoute({
        prefix: "api-key-bo",
        path: "aggregate"
      }), payload);
    }

    const id = "agg_2";
    return this._mock(id);
  }

  modifyAggregate<T = aggregateId>(payload: modifyAggregateType, id: string): Promise<AxiosResponse<T>> {
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

  deleteAggregate<T = aggregateId>(id: string): Promise<AxiosResponse<T>> {
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
    
    return this._mock(pa_list_associated);
  }

  movePa<T = addPaResponse>(id: string, data: Array<Pa>): Promise<AxiosResponse<T>> {
    let payload = {items: data};
    if(!process.env.REACT_APP_MOCK_API) { 
      return this.http.post(compileRoute({
        prefix: "api-key-bo",
        path: "aggregate/:id/move-pa",
        params: {
          id: id
        }
      }), payload);
    }
    
    return this._mock(move_pa);
  }

  getAssociablePaList<T = getAssociablePaListResponse>(name?: string): Promise<AxiosResponse<T>> {
    if(!process.env.REACT_APP_MOCK_API) { 
      return this.http.get(compileRoute({
        prefix: "api-key-bo",
        path: "aggregate/associable-pa"
      }));
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
      }), {items:selectedPaList});
    }
    
    return this._mock(move_pa);
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