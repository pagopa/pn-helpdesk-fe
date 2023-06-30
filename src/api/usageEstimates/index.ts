import {EstimateDetailResponse, EstimatesPageableRequest, EstimatesPageableResponse} from "../../model";
import {createAxiosInstance} from "./axiosInstance";


const pathEstimates = {
  GET_ALL: (paId: string, page:number, tot:number) => `/pn-usage-estimates-bo/estimates?paId=${paId}&page=${page}&tot=${tot}`,
  DETAIL: (paId:string, referenceMonth:string) => `/pn-usage-estimates-bo/estimate/${paId}/detail/${referenceMonth}`,
  FILES: (paId:string) => `/pn-usage-estimates/v1/estimate/${paId}/files`,
  FILE_DOWNLOAD: (paId:string, id:string) => `/pn-usage-estimates/v1/estimate/${paId}/file/${id}`,
}

export const UsageEstimatesAPI = {

  getAllEstimate: async (props: EstimatesPageableRequest):Promise<EstimatesPageableResponse> => {
    const config = {
      headers: {
        originFe: "PN-PLATFORM-NOTIFICATION-FE"
      }
    }
    const response = await createAxiosInstance("https://webapi.dev.notifichedigitali.it")
      .get<EstimatesPageableResponse>(pathEstimates.GET_ALL(props.paId, props.page, props.tot), config);
    return response.data;
  },

  getDetailEstimate: async (paId: string, referenceMonth: string) : Promise<EstimateDetailResponse> => {
    const response = await createAxiosInstance("https://webapi.dev.notifichedigitali.it")
      .get<EstimateDetailResponse>(pathEstimates.DETAIL(paId, referenceMonth));
    return response.data
  }

}

/*
class UsageEstimatesRepo {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : createAxiosInstance(process.env.REACT_APP_API_USAGE_ESTIMATES_ENDPOINT!);
  }


  getAllEstimate(paId:string, taxId: string, page:number, tot:number) {
    return this.http.get(pathEstimates.GET_ALL(paId, taxId, page, tot));
  }

  getDetail(paId: string, referenceMonth: string) {
    return this.http.get(pathEstimates.DETAIL(paId, referenceMonth));
  }

  getFilesInfo(paId: string) {
    return this.http.get(pathEstimates.FILES(paId));
  }

  getFileDownload(paId: string, id: string) {
    return this.http.get(pathEstimates.FILE_DOWNLOAD(paId, id));
  }

}


export const usageEstimatesRepo = new UsageEstimatesRepo();

*/