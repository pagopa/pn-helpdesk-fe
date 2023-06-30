import axios, { AxiosInstance } from "axios";
import { v4 as uuid } from "uuid";

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "*/*",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
};

export const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const newInstance = axios.create({
    baseURL,
    headers,
  });

  newInstance.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      throw error;
    }
  );

  newInstance.interceptors.request.use((request: any) => {
    const token = sessionStorage.getItem("token");
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${token}`,
      ...(process.env.NODE_ENV === "development" && {
        "x-pagopa-pn-uid": uuid(),
        "x-pagopa-pn-cx-type": "BO",
      }),
    };

    return request;
  });

  return newInstance;
};
