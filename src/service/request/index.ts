import axios, { AxiosError } from 'axios'
import type { AxiosInstance } from 'axios'
import type { NewRequestConfig } from './type'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/constant'

class Request {
  instance: AxiosInstance
  constructor(config: NewRequestConfig) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      (config: NewRequestConfig) => {
        return config
      },
      (err: AxiosError) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err: AxiosError) => {
        if (err.response?.status === 401) {
          localCache.removeCache(LOGIN_TOKEN)
        }
        return err
      }
    )
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccess,
      config.interceptors?.requestFailture
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccess,
      config.interceptors?.responseFailture
    )
  }
  request<T>(config: NewRequestConfig<T>) {
    if (config.interceptors?.requestSuccess) {
      config = config.interceptors.requestSuccess(config)
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccess) {
            res = config.interceptors.responseSuccess(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T = any>(config: NewRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: NewRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: NewRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: NewRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}
export default Request
