import { GetMenuSuccess } from '@/types/menu'
import { AccountLogin, GetUserinfoSuccess, LoginSuccess } from '@/types/login'
import { Service } from '..'

export const login = (userinfo: AccountLogin) => {
  return Service.post<LoginSuccess>({
    url: '/user/login',
    data: {
      username: userinfo.username,
      password: userinfo.password
    }
  })
}
export const getUserInfoById = (userId: number) => {
  return Service.get<GetUserinfoSuccess>({
    url: `/user/${userId}`
  })
}
export const getMenuByUserId = (userId: number) => {
  return Service.get<GetMenuSuccess>({
    url: `/role/menu/${userId}`
  })
}
