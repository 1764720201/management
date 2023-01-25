import type { Datum } from '@/types/menu'
import { MENU } from '@/constant'
import { localCache } from './cache'

const menu = localCache.getCache(MENU)
export const btnPermission = (
  pathname: string,
  type: 'create' | 'query' | 'delete' | 'update'
): boolean => {
  let callback = false
  menu.forEach((item: Datum) => {
    const data = item.children
      .find((item2) => item2.url === pathname)
      ?.children.map((item) => item.permission)
    if (data) {
      if (
        data.includes(
          location.pathname.replace('/home/', '').replace(/\//g, ':') +
            ':' +
            type
        )
      ) {
        callback = true
      }
    }
  })
  // return callback
  return true
}
