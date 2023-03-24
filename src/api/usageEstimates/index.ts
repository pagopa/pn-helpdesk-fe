import {AxiosInstance} from "axios";
import {createAxiosInstance} from "./axiosInstance";


const pathEstimates = {
  GET_ALL: (paId: string, taxId: string, page:number, tot:number) => `/template/v1/estimates?paId=${paId}&taxId=${taxId}&page=${page}&tot=${tot}`,
  DETAIL: (paId:string, referenceMonth:string) => `/template/v1/estimate/${paId}/detail/${referenceMonth}`,
  FILES_DOWNLOAD: (paId:string) => `/template/v1/estimate/${paId}/file-download`,
}

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
    return this.http.get(pathEstimates.FILES_DOWNLOAD(paId));
  }

}


export const usageEstimatesRepo = new UsageEstimatesRepo();

