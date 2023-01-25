import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

interface Interceptors<T> {
  requestSuccess?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailture?: (err: AxiosError) => AxiosError
  responseSuccess?: (res: T) => T
  responseFailture?: (err: AxiosError) => AxiosError
}
export interface NewRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: Interceptors<T>
}
