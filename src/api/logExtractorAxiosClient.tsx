import { AxiosInstance, AxiosResponse } from 'axios';
import {
  getLogsProcessesType,
  getNotificationsInfoLogsType,
  getPersonIdType,
  getPersonsLogsType,
  getPersonTaxIdType,
  getEventsType,
  getSessionLogsType,
  postEventType,
} from './apiRequestTypes';
import { createAxiosInstance } from './axiosInstanceCreator';
import { getConfiguration } from '../services/configuration.service';

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    const { API_ENDPOINT } = getConfiguration();
    return this.instance != null ? this.instance : createAxiosInstance(API_ENDPOINT);
  }

  getPersonTaxId<T = any>(payload: getPersonTaxIdType): Promise<AxiosResponse<T>> {
    return this.http.post<T>('/persons/v1/tax-id', payload);
  }

  getPersonId<T = any>(payload: getPersonIdType): Promise<AxiosResponse<T>> {
    return this.http.post<T>('/persons/v1/person-id', payload);
  }

  getPersonsLogs<T = any>(payload: getPersonsLogsType): Promise<AxiosResponse<T>> {
    return this.http.post<T>('logs/v1/persons', payload);
  }

  /* getOperatorsLogs<T = any>(payload: getOperatorsLogsType): Promise<R> {
    return this.http.post<T, R>("logs/operators", payload )
  } */

  getNotificationsInfoLogs<T = any>(
    payload: getNotificationsInfoLogsType
  ): Promise<AxiosResponse<T>> {
    return this.http.post<T>('logs/v1/notifications/info', payload);
  }

  getLogsProcesses<T = any,>(payload: getLogsProcessesType): Promise<AxiosResponse<T>> {
    return this.http.post<T>('logs/v1/processes', payload);
  }

  getStatus<T = any>(): Promise<AxiosResponse<T>> {
    return this.http.get<T>('/downtime/v1/status');
  }

  getEvents<T = any>(payload: getEventsType): Promise<AxiosResponse<T>> {
    return this.http.post<T>('logs/v1/events', payload);
  }

  getSessionLogs<T = any>(payload: getSessionLogsType): Promise<AxiosResponse<T>> {
    return this.http.post<T>('/logs/v1/sessions', payload);
  }

  getDownloadUrl<T = any>(key: string): Promise<AxiosResponse<T>> {
    return this.http.get<T>('/logs/v1/status?key=' + key);
  }

  postEvent<T = any>(payload: postEventType): Promise<AxiosResponse<T>> {
    return this.http.post<T>('/downtime/v1/events', payload);
  }
}

export const http = new Http();
