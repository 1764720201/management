export type CreateSuccess = {
  code: number
  message: string
}
export type GetListSuccess<T> = {
  data: T[]
  total: number
}
export type Paging = {
  page?: number
  size?: number
}
export type GetByOptions<T> = Partial<T>
