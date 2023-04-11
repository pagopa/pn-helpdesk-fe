import { AxiosInstance, AxiosResponse } from "axios";
import { compileRoute } from "../helpers/api.utility";
import {
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
  searchPaResponse,
  searchPaType
} from "./apiRequestTypes";
import { createAxiosInstance } from "./axiosInstanceCreator";
import {
  aggregate,
  pa_list,
  usage_plan_list,
  aggregates_list,
  move_pa,
  pa_list_associated,
  listKey
} from "./mock_agg_response";
class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : createAxiosInstance(process.env.REACT_APP_API_AGGREGATE_ENDPOINT!);
  }

  getAggregates<T = getAggregatesResponse>(payload: getAggregateParams): Promise<AxiosResponse<T>> {
    if (process.env.REACT_APP_MOCK_API_AGGREGATE === "true") {
      return this._mock(aggregates_list);
    }

    return this.http.get(compileRoute({
      path: 'aggregate',
      query: payload
    }));
  }

  searchPa<T = searchPaResponse>(payload: searchPaType): Promise<AxiosResponse<T>> {
    return this._mock(listKey);
  }

  getAggregateDetails<T = getAggregateResponse>(id: string): Promise<AxiosResponse<T>> {
    if (process.env.REACT_APP_MOCK_API_AGGREGATE === "true") {
      return this._mock();
    }

    return this.http.get(compileRoute({
      path: "aggregate/:id",
      params: {
        id: id
      }
    }));
  }

  createAggregate<T = aggregateId>(payload: createAggregateType): Promise<AxiosResponse<T>> {
    if (process.env.REACT_APP_MOCK_API_AGGREGATE === "true") {
      const id = "agg_2";
      return this._mock(id);
    }

    return this.http.post(compileRoute({
      path: "aggregate"
    }), payload);
  }

  modifyAggregate<T = aggregateId>(payload: modifyAggregateType, id: string): Promise<AxiosResponse<T>> {
    if (process.env.REACT_APP_MOCK_API_AGGREGATE === "true") {
      return this._mock(id);
    }

    return this.http.put(compileRoute({
      path: "aggregate/:id",
      params: {
        id: id
      }
    }), payload);
  }

  deleteAggregate<T = aggregateId>(id: string): Promise<AxiosResponse<T>> {
    if (process.env.REACT_APP_MOCK_API_AGGREGATE === "true") {
      return this._mock(id);
    }

    return this.http.delete(compileRoute({
      path: "aggregate/:id",
      params: {
        id: id
      }
    }));
  }

  getAssociatedPaList<T = getAssociatedPaListResponse>(id: string): Promise<AxiosResponse<T>> {
    if (process.env.REACT_APP_MOCK_API_AGGREGATE === "true") {
      return this._mock(pa_list_associated);
    }

    return this.http.get(compileRoute({
      path: "aggregate/:id/associated-pa",
      params: {
        id: id
      }
    }));
  }

  movePa<T = addPaResponse>(id: string, data: Array<Pa>): Promise<AxiosResponse<T>> {
    if (process.env.REACT_APP_MOCK_API_AGGREGATE === "true") {
      return this._mock(move_pa);
    }

    let payload = { items: data };

    return this.http.post(compileRoute({
      path: "aggregate/:id/move-pa",
      params: {
        id: id
      }
    }), payload);
  }

  getAssociablePaList<T = getAssociablePaListResponse>(name?: string): Promise<AxiosResponse<T>> {
    if (process.env.REACT_APP_MOCK_API_AGGREGATE === "true") {
      return this._mock(pa_list);
    }

    return this.http.get(compileRoute({
      path: "aggregate/associable-pa"
    }));
  }

  addPa<T = addPaResponse>(id: string, selectedPaList: Array<Pa>): Promise<AxiosResponse<T>> {
    if (process.env.REACT_APP_MOCK_API_AGGREGATE === "true") {
      return this._mock(move_pa);
    }

    return this.http.post(compileRoute({
      path: "aggregate/:id/add-pa",
      params: {
        id: id
      }
    }), { items: selectedPaList });
  }

  getUsagePlans<T = getUsagePlansType>(): Promise<AxiosResponse<T>> {
    if (process.env.REACT_APP_MOCK_API_AGGREGATE === "true") {
      return this._mock(usage_plan_list);
    }

    return this.http.get(compileRoute({
      path: `usage-plan`,
    }));
  }

  _mock(mock?: any): Promise<AxiosResponse> {
    return new Promise((res) => res({ data: mock, status: 200, statusText: '200' } as AxiosResponse));
  }
}

export const http = new Http();