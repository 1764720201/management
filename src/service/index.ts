import { LOGIN_TOKEN } from '@/constant'
import { localCache } from '@/utils/cache'
import { TIME_OUT, BASE_URL } from './config/index'
import Request from './request'

const Service = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccess: (config) => {
      const token = `Bearer ${localCache.getCache(LOGIN_TOKEN)}`
      if (config.headers && token) {
        config.headers = { Authorization: token }
      }
      return config
    }
  }
})

export { Service }
