import { GetMenuSuccess } from '@/types/menu'
import { Service } from '..'

export const getMenuList = (page = 1, size = 10) => {
  return Service.get<GetMenuSuccess>({
    url: '/permission',
    params: {
      page,
      size
    }
  })
}
