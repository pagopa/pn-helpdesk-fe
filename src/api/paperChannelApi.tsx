import {Configuration, DeliveryDriverApi} from "../generated";

const configuration = () => {
  const conf = new Configuration();
  const token = sessionStorage.getItem("token")
  const accessToken = sessionStorage.getItem("accessToken")
  conf.baseOptions = {
    headers: {
      //Authorization: `Bearer ${token}`,
      //Auth: accessToken
    }
  }
  conf.basePath = process.env.REACT_APP_API_ENDPOINT;
  return conf;
}


export const apiPaperChannel = () => {
  return new DeliveryDriverApi(configuration());
}