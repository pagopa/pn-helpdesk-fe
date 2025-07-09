import { AxiosInstance, AxiosResponse } from 'axios';
import { compileRoute } from '../helpers/api.utility';
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
  searchPaType,
  searchApikeyResponse,
  changePdndResponse,
  updatePdndRequest,
} from './apiRequestTypes';
import { createAxiosInstance } from './axiosInstanceCreator';
import { getConfiguration } from '../services/configuration.service';

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    const { API_AGGREGATE_ENDPOINT } = getConfiguration();
    return this.instance != null ? this.instance : createAxiosInstance(API_AGGREGATE_ENDPOINT);
  }

  getAggregates<T = getAggregatesResponse>(payload: getAggregateParams): Promise<AxiosResponse<T>> {
    return this.http.get(
      compileRoute({
        path: 'aggregate',
        query: payload,
      })
    );
  }

  searchPa<T = searchPaResponse>(payload: searchPaType): Promise<AxiosResponse<T>> {
    return this.http.get(
      compileRoute({
        path: 'pa',
        query: payload,
      })
    );
  }

  searchApiKey<T = searchApikeyResponse>(paId: string): Promise<AxiosResponse<T>> {
    return this.http.get(
      compileRoute({
        path: 'api-keys',
        query: {
          paId,
        },
      })
    );
  }

  modifyPdnd<T = changePdndResponse>(payload: updatePdndRequest): Promise<AxiosResponse<T>> {
    return this.http.put(
      compileRoute({
        path: 'api-keys/interop',
      }),
      payload
    );
  }

  getAggregateDetails<T = getAggregateResponse>(id: string): Promise<AxiosResponse<T>> {
    return this.http.get(
      compileRoute({
        path: 'aggregate/:id',
        params: {
          id: id,
        },
      })
    );
  }

  createAggregate<T = aggregateId>(payload: createAggregateType): Promise<AxiosResponse<T>> {
    return this.http.post(
      compileRoute({
        path: 'aggregate',
      }),
      payload
    );
  }

  modifyAggregate<T = aggregateId>(
    payload: modifyAggregateType,
    id: string
  ): Promise<AxiosResponse<T>> {
    return this.http.put(
      compileRoute({
        path: 'aggregate/:id',
        params: {
          id: id,
        },
      }),
      payload
    );
  }

  deleteAggregate<T = aggregateId>(id: string): Promise<AxiosResponse<T>> {
    return this.http.delete(
      compileRoute({
        path: 'aggregate/:id',
        params: {
          id: id,
        },
      })
    );
  }

  getAssociatedPaList<T = getAssociatedPaListResponse>(id: string): Promise<AxiosResponse<T>> {
    return this.http.get(
      compileRoute({
        path: 'aggregate/:id/associated-pa',
        params: {
          id: id,
        },
      })
    );
  }

  movePa<T = addPaResponse>(id: string, data: Array<Pa>): Promise<AxiosResponse<T>> {
    const payload = { items: data };

    return this.http.post(
      compileRoute({
        path: 'aggregate/:id/move-pa',
        params: {
          id: id,
        },
      }),
      payload
    );
  }

  getAssociablePaList<T = getAssociablePaListResponse>(name?: string): Promise<AxiosResponse<T>> {
    return this.http.get(
      compileRoute({
        path: 'aggregate/associable-pa',
      })
    );
  }

  addPa<T = addPaResponse>(id: string, selectedPaList: Array<Pa>): Promise<AxiosResponse<T>> {
    return this.http.post(
      compileRoute({
        path: 'aggregate/:id/add-pa',
        params: {
          id: id,
        },
      }),
      { items: selectedPaList }
    );
  }

  getUsagePlans<T = getUsagePlansType>(): Promise<AxiosResponse<T>> {
    return this.http.get(
      compileRoute({
        path: `usage-plan`,
      })
    );
  }
}

export const http = new Http();
