import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  getLogsProcessesType,
  getNotificationsInfoLogsType,
  getNotificationsMonthlyStatsLogsType,
  getPersonIdType,
  getPersonsLogsType,
  getPersonTaxIdType,
  getEventsType,
  getSessionLogsType,
} from "./apiRequestTypes";
import { createAxiosInstance } from "./axiosInstanceCreator";

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null
      ? this.instance
      : createAxiosInstance(process.env.REACT_APP_API_ENDPOINT!);
  }

  getPersonTaxId<T = any, R = AxiosResponse<T>>(
    payload: getPersonTaxIdType
  ): Promise<R> {
    return this.http.post<T, R>("/persons/v1/tax-id", payload);
  }

  getPersonId<T = any, R = AxiosResponse<T>>(
    payload: getPersonIdType
  ): Promise<R> {
    return this.http.post<T, R>("/persons/v1/person-id", payload);
  }

  getPersonsLogs<T = any, R = AxiosResponse<T>>(
    payload: getPersonsLogsType
  ): Promise<R> {
    return this.http.post<T, R>("logs/v1/persons", payload);
  }

  /*getOperatorsLogs<T = any, R = AxiosResponse<T>>(payload: getOperatorsLogsType): Promise<R> {
    return this.http.post<T, R>("logs/operators", payload )
  }*/

  getNotificationsInfoLogs<T = any, R = AxiosResponse<T>>(
    payload: getNotificationsInfoLogsType
  ): Promise<R> {
    return this.http.post<T, R>("logs/v1/notifications/info", payload);
  }

  getNotificationsMonthlyStatsLogs<T = any, R = AxiosResponse<T>>(
    payload: getNotificationsMonthlyStatsLogsType
  ): Promise<R> {
    return this.http.post<T, R>("logs/v1/notifications/monthly", payload);
  }

  getLogsProcesses<T = any, R = AxiosResponse<T>>(
    payload: getLogsProcessesType
  ): Promise<R> {
    return this.http.post<T, R>("logs/v1/processes", payload);
  }

  getStatus<T = any, R = AxiosResponse<T>>(): Promise<R> {
    return this.http.get<T, R>("/downtime/v1/status");
  }

  getEvents<T = any, R = AxiosResponse<T>>(payload: getEventsType): Promise<R> {
    return this.http.post<T, R>("/downtime/v1/events", payload);
  }

  getSessionLogs<T = any, R = AxiosResponse<T>>(
    payload: getSessionLogsType
  ): Promise<R> {
    return this.http.post<T, R>("/logs/v1/sessions", payload);
  }
}

export const http = new Http();
