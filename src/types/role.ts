export type Role = {
  id: number
  name: string
  intro: string
  createTime: string
  updateTime: string
}
export type OriginData = {
  id: number
  name: string
  children?: OriginData[]
}
type EditRoleInfo = {
  name: string
  intro: string
  permissions: []
}
export type EditRole = Partial<EditRoleInfo>
export type GetRoleOptions = Partial<Role>
