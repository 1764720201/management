export type Category = {
  id: number
  name: string
  createTime: string
  updateTime: string
}
export type CategoryOptions = {
  name: string
  createTime: string[]
}
export type EditCategory = Partial<{
  name: string
}>
