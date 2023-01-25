import type { CreateSuccess, GetListSuccess } from '@/types/common'
import { UserInfo } from '@/types/login'
import type {
  GetUserListOptions,
  AddUser,
  UpdateUserStatusSuccess
} from '@/types/user'
import { Service } from '..'
export const getUserList = (data?: GetUserListOptions, size = 10, page = 1) => {
  return Service.post<GetListSuccess<UserInfo>>({
    url: '/user',
    params: { size, page },
    data
  })
}

export const createUser = (addUser: AddUser) => {
  return Service.post<CreateSuccess>({
    url: '/user/create',
    data: addUser
  })
}
export const deleteUserById = (id: number) => {
  return Service.delete({
    url: `/user/${id}`
  })
}
export const updateUser = (id: number, updateUser: AddUser) => {
  return Service.patch({
    url: `/user/${id}`,
    data: updateUser
  })
}
export const updateUserStatus = (id: number) => {
  return Service.patch<UpdateUserStatusSuccess>({
    url: `/user/status/${id}`
  })
}
