import type { UploadChangeParam } from 'antd/es/upload'
import type { Category } from './category'

export type EditGoods = Partial<{
  name: string
  oldPrice: number
  intro: string
  picture: UploadChangeParam<Blob>
  repertory: number
  typeId: number
  address: string
}>
export type Goods = {
  id: number
  name: string
  price: number
  intro: string
  status: number
  picture: string
  repertory: number
  sales: number
  collects: number
  address: string
  createTime: string
  updateTime: string
  type: Category
}
export type GoodsOption = {
  name: string
  createTimeRange: Date[]
  status: number
  address: string
}
export type CurrentGoods = {
  name: string
  price: number
  picture: string
  intro: string
  repertory: number
  typeId: number
  address: string
}
