

export type Page<T> = {
  page: number,
  size: number,
  total: number,

  content: Array<T>

}