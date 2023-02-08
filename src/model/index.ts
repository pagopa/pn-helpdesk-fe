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
  name: string,
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
  cost: Cost[]

}

export type Cost = {
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
  ERROR_UPLOADING_FILE_S3="ERROR_UPLOADING_FILE_S3"
}


export const mockListCost: Cost[] = [
  {
    type: "NATIONAL",
    cap: ["23000", "32111"],
    nationalProductType: "AR",
    internationalProductType: undefined,
    price: 3.24,
    priceAdditional: 3.24,
    zone: undefined,
  },
  {
    type: "INTERNATIONAL",
    cap: undefined,
    nationalProductType: undefined,
    internationalProductType: "AR",
    price: 3.24,
    priceAdditional: 3.24,
    zone: "ZONE_1",
  }]
