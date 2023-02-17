import {
  Configuration,
  CostDTO,
  DeliveryDriverApi,
  DeliveryDriverDTO, NotifyResponseDto, NotifyUploadRequestDto,
  TenderCreateRequestDTO,
} from "../generated";
import {DeliveryDriver, Tender} from "../model";


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


export const createTender = async (body:Tender,
                                           callbackSuccess:(data:Tender)=>void,
                                           callbackError:(e:any)=>void) => {
  try {
    const request = {
      name: body.name,
      startDate: body.startDate,
      endDate: body.endDate,
      code: body.code,
    } as TenderCreateRequestDTO
    const response = await apiPaperChannel().createUpdateTender(request);
    callbackSuccess( {
      ...response.data.tender
    } as Tender);
  } catch (e){
    return callbackError(e);
  }
}

export const createDeliveryDriver = async (tenderCode:string, body:DeliveryDriver,
                                     callbackSuccess:(data:DeliveryDriver)=>void,
                                     callbackError:(e:any)=>void) => {
  try {
    const request = {
      ...body,
    } as DeliveryDriverDTO
    await apiPaperChannel().createUpdateDriver(tenderCode, request);
    callbackSuccess(body);
  } catch (e){
    return callbackError(e);
  }

}

export const createCost = async (tenderCode:string, driverCode:string, body:CostDTO,
                                           callbackSuccess:(data:CostDTO)=>void,
                                           callbackError:(e:any)=>void) => {
  try {
    await apiPaperChannel().createUpdateCost(tenderCode, driverCode, body);
    callbackSuccess(body);
  } catch (e){
    return callbackError(e);
  }

}


export const sendNotify = async (tender:string, uid:string,
                                 callbackSuccess:(data:NotifyResponseDto)=>void,
                                 callbackError:(e:any)=>void) => {
  try {
    const  request : NotifyUploadRequestDto = {
      uuid: uid
    }
    const response = await apiPaperChannel().notifyUpload(tender, request);
    callbackSuccess(response.data)
  } catch (e){
    return callbackError(e);
  }

}