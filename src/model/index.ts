import React from "react";

export type FilterRequest = {
  tenderCode ?: string,
  page: number,
  tot: number,

}

export type Page<T> = {
  page: number,
  size: number,
  total: number,

  content: Array<T>
}


export type Tender = {
  code?:string
  description: string,
  startDate: string,
  endDate: string,
}

export type DeliveryDriver = {
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
  ERROR_UPLOADING_FILE_S3="ERROR_UPLOADING_FILE_S3"
}