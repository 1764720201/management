import type { GetListSuccess } from '@/types/common'
import type { EditRole, GetRoleOptions, Role } from '@/types/role'
import { Service } from '..'

export const getRoleList = (data?: GetRoleOptions, size = 10, page = 1) => {
  return Service.post<GetListSuccess<Role>>({
    url: '/role',
    data,
    params: {
      size,
      page
    }
  })
}
export const createRole = (data: EditRole) => {
  return Service.post({
    url: '/role/create',
    data
  })
}
