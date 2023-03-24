import {Configuration} from "./paperChannel";

import {EstimateApi} from "./usageEstimates";

const configuration = () => {
  const conf = new Configuration();
  const token = sessionStorage.getItem("token")
  const accessToken = sessionStorage.getItem("accessToken")
  conf.baseOptions = {
    headers: {
      Authorization: `Bearer ${token}`,
      Auth: accessToken
    }
  }
  conf.basePath = process.env.REACT_APP_API_USAGE_ESTIMATES_ENDPOINT;
  return conf;
}

export const estimateApi = () => {
  return new EstimateApi(configuration());
}
