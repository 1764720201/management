import { UserInfo } from './login'

export interface CurrentDepartment {
  id: number
  name: string
  leaderId: number
  parentId?: number
}
export interface EditDepartmentInfo {
  name: string
  leader: string
  parentDepartment?: string
}
export type EditDepartment = Partial<EditDepartmentInfo>
export type DepartmentOptions = {
  name: string
  leaderName: string
  createTime: Date[]
}
export interface Department {
  id: number
  name: string
  createTime: string
  updateTime: string
  leader?: UserInfo
  parent?: Department
  children?: Department[]
}
