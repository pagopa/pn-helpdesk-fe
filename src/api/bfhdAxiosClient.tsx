import { AxiosInstance, AxiosResponse } from 'axios';
import { getNotificationsVisualizationLogsType, } from './apiRequestTypes';
import { createAxiosInstance } from './axiosInstanceCreator';
import { getConfiguration } from '../services/configuration.service';

class Http {
    private instance: AxiosInstance | null = null;

    private get http(): AxiosInstance {
        const { API_ENDPOINT_BFHD } = getConfiguration();
        return this.instance != null ? this.instance : createAxiosInstance(API_ENDPOINT_BFHD);
    }

    getNotificationInfo<T = any>(payload: getNotificationsVisualizationLogsType): Promise<AxiosResponse<T>> {
        return this.http.post<T>('/logs/v1/notifications/info', payload);
    }
}
export const bfhdClient = new Http();
