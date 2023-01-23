
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