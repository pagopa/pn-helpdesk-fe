import {Configuration, DeliveryDriverApi, DeliveryDriverDto} from "../generated";
import {DeliveryDriver} from "../model";


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

export const createDeliveryDriver = async (tenderCode:string, body:DeliveryDriver,
                                     callbackSuccess:(data:DeliveryDriver)=>void,
                                     callbackError:(e:any)=>void) => {
  try {
    const request = {
      ...body,
    } as DeliveryDriverDto
    await apiPaperChannel().createUpdateDriver(tenderCode, request);
    callbackSuccess(body);
  } catch (e){
    return callbackError(e);
  }

}