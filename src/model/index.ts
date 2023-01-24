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

export type StepView = {
  name: string,
  key: string,
  render : () => React.ReactNode,

}
