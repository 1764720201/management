type UserListOptions = {
  status: number
  username: string
  cellphone: string
  createTime: string
  relname: string
}
export type GetUserListOptions = Partial<UserListOptions>

interface Password {
  password: string
}
interface AddUserInfo extends Password {
  username: string
  relname: string
  cellphone: string
  roles: number[]
  departments: number[]
}
export type AddUser = Partial<AddUserInfo>
export interface CurrentUser extends AddUserInfo {
  id: number
}
export type UpdateUserStatusSuccess = {
  data: { id: number; status: number }
  message: string
}
