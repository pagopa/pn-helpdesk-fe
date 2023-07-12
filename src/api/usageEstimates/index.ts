import {
  EstimateDetailResponse,
  EstimatesPageableRequest,
  EstimatesPageableResponse,
  PaResponse, ReportPageableRequest, ReportPageableResponse,
  StatusReportEnum
} from "../../model";
import {createAxiosInstance} from "../axiosInstanceCreator";


const pathEstimates = {
  GET_ALL: (paId: string, page:number, size:number) => `/pn-usage-estimates-bo/estimates?paId=${paId}&page=${page}&size=${size}`,
  DETAIL: (paId:string, referenceMonth:string) => `/pn-usage-estimates-bo/estimate/${paId}/detail/${referenceMonth}`,
  AUTOCOMPLETE_PA: (paName:string) => `/ext-registry/pa/v1/activated-on-pn?paNameFilter=${paName}`,
  GET_ALL_REPORTS: (paId: string, page: number, size: number, statusReport ?:StatusReportEnum) => {
    const url = `/pn-usage-estimates-bo/reports/${paId}?page=${page}&size=${size}`
    if (statusReport) {
      return `${url}&status=${statusReport}`
    }
    return url
  },
}

export const UsageEstimatesAPI = {

  getAllEstimate: async (props: EstimatesPageableRequest):Promise<EstimatesPageableResponse> => {
    const config = {
      headers: {
        originFe: "PN-PLATFORM-NOTIFICATION-FE"
      }
    }
    const response = await createAxiosInstance(process.env.REACT_APP_API_PLATFORM_USAGE_ESTIMATES!)
      .get<EstimatesPageableResponse>(pathEstimates.GET_ALL(props.paId, props.page, props.tot), config);
    return response.data;
  },

  getDetailEstimate: async (paId: string, referenceMonth: string) : Promise<EstimateDetailResponse> => {
    const response = await createAxiosInstance(process.env.REACT_APP_API_PLATFORM_USAGE_ESTIMATES!)
      .get<EstimateDetailResponse>(pathEstimates.DETAIL(paId, referenceMonth));
    return response.data
  },

  autocompletePa: async (paName: string) : Promise<PaResponse[]> => {
    const response = await createAxiosInstance("http://localhost:1080")
      .get<PaResponse[]>(pathEstimates.AUTOCOMPLETE_PA(paName));
    return response.data;
  }

}

export const ReportEstimatesAPI = {
  getAll: async (props: ReportPageableRequest):Promise<ReportPageableResponse> => {
    const response = await createAxiosInstance(process.env.REACT_APP_API_PLATFORM_USAGE_ESTIMATES!)
      .get<ReportPageableResponse>(pathEstimates.GET_ALL_REPORTS(props.paId!, props.page, props.tot, props.status));
    return response.data;
  },
}
