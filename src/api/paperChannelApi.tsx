import {
  Configuration,
  CostDTO,
  DeliveryDriverApi,
  DeliveryDriverDTO, SelectListApi,
  TenderCreateRequestDTO,
} from "./paperChannel";
import {DeliveryDriver, Tender} from "../model";


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
  conf.basePath = "https://webapi.dev.pn.pagopa.it";
  return conf;
}


export const apiPaperChannel = () => {
  return new DeliveryDriverApi(configuration());
}

const apiCaps = () => {
  return new SelectListApi(configuration());
}


export const createTender = async (body:Tender) => {
  try {
    const request = {
      name: body.name,
      startDate: body.startDate,
      endDate: body.endDate,
      code: body.code,
    } as TenderCreateRequestDTO
    const response = await apiPaperChannel().createUpdateTender(request);
    return response.data.tender
  } catch (e){
    throw e;
  }
}

export const createDeliveryDriver = async (tenderCode:string, body:DeliveryDriver) => {
  try {
    const request = {
      ...body,
    } as DeliveryDriverDTO
    const response = await apiPaperChannel().createUpdateDriver(tenderCode, request);
    return response.data
  } catch (e){
    throw e
  }

}

export const createCost = async (tenderCode:string, driverCode:string, body:CostDTO) => {
  try {
    await apiPaperChannel().createUpdateCost(tenderCode, driverCode, body);
  } catch (e){
    throw e;
  }

}

export const retrieveCaps = async (inputText:string) => {
  try {
    const response = await apiCaps().getAllCap(inputText);
    return response.data
  } catch (e){
    throw e;
  }
}

export const retrieveTenderDetails = async (tenderCode:string) => {
  try {
    const response = await apiPaperChannel().getTenderDetails(tenderCode);
    return response.data
  } catch (e){
    throw e;
  }
}
