import React from "react";

export type FilterRequest = {
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
