import { LOGIN_TOKEN, MENU, USER_INFO } from '@/constant'
import { localCache } from './cache'

export const checkLogin = (): boolean => {
  const token = localCache.getCache(LOGIN_TOKEN)
  const userInfo = localCache.getCache(USER_INFO)
  const menu = localCache.getCache(MENU)
  if (token && userInfo && menu) {
    return true
  } else {
    return false
  }
}
