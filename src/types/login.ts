import { Datum } from './menu'
import { Role } from './role'

export type LoginMode = '账号登陆' | '手机登录'

type Department = {
  id: number
  name: string
  createTime: string
  updateTime: string
}
export type AccountLogin = {
  username: string
  password: string
  remember?: boolean
}
export interface Account {
  token: string
  userInfo: GetUserinfoSuccess
  menu: Datum[]
  ifLogin: boolean
}
type Date = {
  token: string
  userId: number
  username: string
}
export type LoginSuccess = {
  code: number
  message: string
  data: Date
}

export interface UserInfo {
  id: number
  username: string
  password: string
  cellphone: string
  relname: string
  createTime: string
  status: number
  updateTime: string
  avatarUrl: string
}
export interface GetUserinfoSuccess extends UserInfo {
  roles: Role[]
  departments: Department[]
}
