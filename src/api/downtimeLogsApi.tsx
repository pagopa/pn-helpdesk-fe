import { getConfiguration } from '../services/configuration.service';
import { BoStatusUpdateEvent, Configuration, DowntimeBoApi } from './downtimeLogs';

const configuration = () => {
  const { API_DOWNTIME_LOGS_ENDPOINT } = getConfiguration();
  const conf = new Configuration();
  const token = sessionStorage.getItem('token');
  const accessToken = sessionStorage.getItem('accessToken');
  conf.baseOptions = {
    headers: {
      Authorization: `Bearer ${token}`,
      Auth: accessToken,
    },
  };
  conf.basePath = API_DOWNTIME_LOGS_ENDPOINT;
  return conf;
};

export const apiDowntimeLogs = () => new DowntimeBoApi(configuration());

export const getMalfunctionPreview = async (data: BoStatusUpdateEvent) => {
  try {
    const response = await apiDowntimeLogs().getMalfunctionPreview('xPagopaPnUid', data, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const createMalfunctionEvent = async (data: BoStatusUpdateEvent) => {
  try {
    const response = await apiDowntimeLogs().addStatusChangeEventBo('xPagopaPnUid', data);
    return response;
  } catch (error: any) {
    throw error;
  }
};
