import React from 'react';

export type FilterRequest = {
  tenderCode?: string;
  driverCode?: string;
  page: number;
  tot: number;
  force?: boolean;

  fsu?: boolean;
};

export type Filter = {
  costCode: string;
};

export type Page<T> = {
  page: number;
  size: number;
  total: number;

  content: Array<T>;
};

export enum TenderStatusEnum {
  CREATED = 'CREATED',
  VALIDATED = 'VALIDATED',
  IN_PROGRESS = 'IN_PROGRESS',
  ENDED = 'ENDED',
}

export type Tender = {
  code?: string;
  name: string;
  startDate: string;
  endDate: string;
  status: TenderStatusEnum;
};

export type DeliveryDriver = {
  tenderCode: string;
  denomination: string;
  businessName: string;
  registeredOffice: string;
  pec: string;
  fiscalCode: string;
  taxId: string;
  phoneNumber: string;
  uniqueCode: string;
  fsu: boolean;
};

export type Cost = {
  uid?: string;
  type: 'NATIONAL' | 'INTERNATIONAL';
  nationalProductType: 'AR' | '890' | 'SEMPLICE' | undefined;
  internationalProductType: 'AR' | 'SEMPLICE' | undefined;
  price: number;
  priceAdditional: number;
  cap: Array<string> | undefined;
  zone: 'ZONE_1' | 'ZONE_2' | 'ZONE_3' | undefined;
};

export type StepView = {
  name: string;
  key: string;
  render: () => React.ReactNode;
};

export enum UPLOAD_STATUS_ENUM {
  WAITING_FILE = 'WAITING_FILE',
  RETRIEVING_PRESIGNED_URL = 'RETRIEVING_PRESIGNED_URL',
  RETRIEVED_PRESIGNED_URL = 'RETRIEVED_PRESIGNED_URL',
  ERROR_PRESIGNED_URL = 'ERROR_PRESIGNED_URL',
  UPLOADING_FILE_S3 = 'UPLOADING_FILE_S3',
  UPLOADED_FILE_S3 = 'UPLOADED_FILE_S3',
  ERROR_UPLOADING_FILE_S3 = 'ERROR_UPLOADING_FILE_S3',
  NOTIFY_IN_PROGRESS = 'NOTIFY_IN_PROGRESS',
  ERROR_VALIDATION_EXCEL = 'ERROR_VALIDATION_EXCEL',
  DATA_SAVED = 'DATA_SAVED',
}

export interface ErrorsNotify {
  detail: string;
  errors: Array<{ col: string; row: string; message: string }>;
}

export interface NotifyState {
  uid: string | undefined;
  retry: number | undefined;
  error: ErrorsNotify | undefined;
  loading: boolean;
}

export const mockListCost: Array<Cost> = [
  {
    type: 'NATIONAL',
    cap: ['23000', '32111'],
    nationalProductType: 'AR',
    internationalProductType: undefined,
    price: 3.24,
    priceAdditional: 3.24,
    zone: undefined,
  },
  {
    type: 'INTERNATIONAL',
    cap: undefined,
    nationalProductType: undefined,
    internationalProductType: 'AR',
    price: 3.24,
    priceAdditional: 3.24,
    zone: 'ZONE_1',
  },
];

export type modalPayloadType = {
  status: string;
  functionality: FunctionalityName;
};

export enum FunctionalityName {
  'NOTIFICATION_CREATE' = 'Creazione Notifiche',
  'NOTIFICATION_VISUALIZATION' = 'Visualizzazione notifiche',
  'NOTIFICATION_WORKFLOW' = 'Workflow Notifiche',
}
