import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getEventsType } from "./apiRequestTypes";

const headers: Readonly<Record<string, string | boolean>> = {
    Accept: "*/*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "x-pagopa-pn-uid": "EVENTO2022",
};

class HttpDowntimeLogs {
    private instance: AxiosInstance | null = null;

    private get httpDowntimeLogs(): AxiosInstance {
        return this.instance != null ? this.instance : this.initHttpDowntimeLogs();
    }

    initHttpDowntimeLogs() {
        const httpDowntimeLogs = axios.create({
            baseURL: process.env.REACT_APP_API_ENDPOINT_DOWNTIME_LOGS,
            headers,
        });

        httpDowntimeLogs.interceptors.response.use(
            (response: any) => response,
            (error: any) => {
                throw error;
            }
        );

        httpDowntimeLogs.interceptors.request.use(
            (request: any) => {
                if (request.data) {
                    const token = sessionStorage.getItem("token")
                    const accessToken = sessionStorage.getItem("accessToken")
                    request.headers = {
                        ...request.headers,
                        Authorization: `Bearer ${token}`,
                        Auth: accessToken
                    }
                }
                return request
            }
        );

        this.instance = httpDowntimeLogs;
        return httpDowntimeLogs;
    }

    getStatus<T = any, R = AxiosResponse<T>>(): Promise<R> {
        return this.httpDowntimeLogs.get<T, R>("http://localhost:9091/healthcheck")
    }

    getEvents<T = any, R = AxiosResponse<T>>(payload: getEventsType): Promise<R> {
        return this.httpDowntimeLogs.post<T, R>("http://localhost:9091/downtime-internal/v1/events", payload)
    }

}

export const httpDowntimeLogs = new HttpDowntimeLogs();