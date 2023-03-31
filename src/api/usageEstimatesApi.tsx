import {Estimate, EstimateSearchTable, InfoDownload, Page} from "../model";
import {usageEstimatesRepo} from "./usageEstimates";


const getAllEstimates = async (description:string, page:number, tot:number):Promise<Page<EstimateSearchTable>> => {
  try {
    const response = await usageEstimatesRepo.getAllEstimate(description, description, page, tot);
    return {
      content: response.data.content as EstimateSearchTable,
      page: response.data.number,
      size: response.data.size,
      total: response.data.totalElements,
    } as Page<EstimateSearchTable>
  } catch (error:any){
   throw error
  }
}

export const getDetailEstimate = async (paId:string, referenceMonth:string): Promise<Estimate> => {
  try {
    const response = await usageEstimatesRepo.getDetail(paId, referenceMonth);
    return response.data as Estimate;
  } catch (error:any){
    throw error
  }
}

const getFiles = async (paId: string): Promise<InfoDownload[]> => {
  try {
    const response = await usageEstimatesRepo.getFilesInfo(paId);
    return response.data as InfoDownload[]
  } catch (error: any) {
    throw error
  }
}

const getFileDownload = async (paId: string, id:string): Promise<InfoDownload> => {
  try {
    const response = await usageEstimatesRepo.getFileDownload(paId, id);
    return response.data as InfoDownload
  } catch (error: any) {
    throw error
  }
}
