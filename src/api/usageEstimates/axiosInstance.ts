import axios, {AxiosInstance} from "axios";

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "*/*",
  "Content-Type": "application/json",
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
    };

    return request;
  });

  return newInstance;
};