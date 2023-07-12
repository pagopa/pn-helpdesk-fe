import React from "react";

export interface EstimatesPageableRequest {
  paId: string;
  page: number;
  tot: number;
}

export interface EstimatesPageableResponse {
  actual: EstimatePeriod;
  history: PageableResponse<EstimateHistory>
}

export interface EstimateDetailRequest {
  paId: string,
  referenceMonth: string
}

export interface EstimateDetailResponse extends EstimatePeriod {
  paInfo: PaInfo
}

export interface ReportPageableRequest {
  paId: string | undefined,
  tot: number,
  page: number,
  status ?: StatusReportEnum
}

export interface ReportPageableResponse extends PageableResponse<ReportEstimate> {

}

export enum StatusReportEnum {
  DEANONIMIZING = "DEANONIMIZING",
  RAW = "RAW",
  ENQUEUED = "ENQUEUED",
  READY = "READY",
  ERROR = "ERROR",
}

export interface ReportEstimate {
  paId: string;
  reportKey: string;
  reportZipKey: string | undefined;
  url: string;
  referenceMonth: string;
  lastModifiedDate: string;
  errorMessage ?: string;
  generationDate: string;
  part: string;
}

export interface PaResponse {
  id: string;
  name: string
}

export interface Estimate {
  totalDigitalNotif: number;
  totalAnalogNotif: number;
  total890Notif: number;
}

export interface PaInfo {
  paId: string;
  paName: string;
  taxId: string;
  registeredOffice: string;
  fiscalCode: string;
  ipaCode: string;
  pec: string;
  sdiCode: string;
}

export interface EstimateHistory {
  paId: string;
  referenceMonth: string;
  lastModifiedDate: string;
  deadlineDate: string;
  status: EstimateStatusEnum;
}

export interface EstimatePeriod {
  status: EstimateStatusEnum;
  showEdit: boolean;
  deadlineDate: string;
  referenceMonth: string;
  lastModifiedDate?: string;
  estimate: Estimate;
  billing: Profilation;
}

export interface Profilation {
  sdiCode: string;
  splitPayment: boolean;
  description: string;
  mailAddress: string;
}

export enum EstimateStatusEnum {
  DRAFT= 'DRAFT',
  VALIDATED ='VALIDATED',
  ABSENT ='ABSENT',
}

export type FilterRequest = {
  tenderCode ?: string,
  driverCode ?: string,
  page: number,
  tot: number,
  force?: boolean
  fsu?: boolean
}

export type Filter = {
  costCode: string
}

interface PageableResponse<T> {
  'number': number;
  size: number;
  totalElements: number;
  content: Array<T>
}

export type Page<T> = {
  page: number,
  size: number,
  total: number,
  content: Array<T>
}

export enum TenderStatusEnum {
  CREATED = "CREATED",
  VALIDATED = "VALIDATED",
  IN_PROGRESS = "IN_PROGRESS",
  ENDED = "ENDED"
}


export type Tender = {
  code?:string
  name: string,
  startDate: string,
  endDate: string,
  status: TenderStatusEnum
}

export type DeliveryDriver = {
  tenderCode: string
  denomination: string,
  businessName: string,
  registeredOffice: string,
  pec: string,
  fiscalCode: string,
  taxId: string,
  phoneNumber: string,
  uniqueCode: string,
  fsu: boolean

}

export type Cost = {
  uid ?:string
  type: "NATIONAL" | "INTERNATIONAL",
  nationalProductType: "AR" | "890" | "SEMPLICE" | undefined,
  internationalProductType: "AR" | "SEMPLICE" | undefined,
  price: number,
  priceAdditional: number,
  cap : string[] | undefined,
  zone : "ZONE_1" | "ZONE_2" | "ZONE_3" | undefined
}

export type StepView = {
  name: string,
  key: string,
  render : () => React.ReactNode,

}

export enum UPLOAD_STATUS_ENUM {
  WAITING_FILE="WAITING_FILE",
  RETRIEVING_PRESIGNED_URL="RETRIEVING_PRESIGNED_URL",
  RETRIEVED_PRESIGNED_URL="RETRIEVED_PRESIGNED_URL",
  ERROR_PRESIGNED_URL="ERROR_PRESIGNED_URL",
  UPLOADING_FILE_S3="UPLOADING_FILE_S3",
  UPLOADED_FILE_S3="UPLOADED_FILE_S3",
  ERROR_UPLOADING_FILE_S3="ERROR_UPLOADING_FILE_S3",
  NOTIFY_IN_PROGRESS = "NOTIFY_IN_PROGRESS",
  ERROR_VALIDATION_EXCEL = "ERROR_VALIDATION_EXCEL",
  DATA_SAVED="DATA_SAVED"
}

export interface ErrorsNotify {
  detail: string,
  errors: {col:string, row:string, message:string}[]
}

