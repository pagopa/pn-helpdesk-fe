import React from "react";

export interface Estimate {
  paId: string;
  status?: EstimateDtoStatusEnum;
  deadlineDate?: string;
  referenceMonth?: string;
  totalDigitalNotif?: number;
  totalPaper890Notif?: number;
  totalPaperNationalNotif?: number;
  totalPaperInternationalNotif?: number;
  lastModifiedTimestamp?: string;
}

export const EstimateDtoStatusEnum = {
  Created: 'CREATED',
  Validated: 'VALIDATED',
  InProgress: 'IN_PROGRESS',
  Ended: 'ENDED'
} as const;

export type EstimateDtoStatusEnum = typeof EstimateDtoStatusEnum[keyof typeof EstimateDtoStatusEnum];

export interface EstimateSearchTable {
  referenceMonth?: string;
  lastModifiedTimestamp?: string;
  status?: EstimateDtoStatusEnum;
  checkPDND?: boolean;
}

export interface InfoDownload {
  paId?: string;
  status?: InfoDownloadDTOStatusEnum;
}

export const InfoDownloadDTOStatusEnum = {
  Uploading: 'UPLOADING',
  Uploaded: 'UPLOADED'
} as const;

export type InfoDownloadDTOStatusEnum = typeof InfoDownloadDTOStatusEnum[keyof typeof InfoDownloadDTOStatusEnum];


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
  status: "CREATED" | "VALIDATED" | "IN_PROGRESS" | "ENDED"
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

