import { GetByOptions, GetListSuccess } from '@/types/common'
import { CurrentGoods, EditGoods, Goods, GoodsOption } from '@/types/goods'
import { Service } from '..'

export const createGoods = (editGoods: EditGoods) => {
  return Service.post({
    url: '/goods/create',
    data: editGoods
  })
}
export const getGoodsList = (
  data?: GetByOptions<GoodsOption>,
  page = 1,
  size = 10
) => {
  return Service.post<GetListSuccess<Goods>>({
    url: '/goods',
    params: {
      page,
      size
    },
    data
  })
}
export const getGoodsById = (id: number) => {
  return Service.get<Goods>({
    url: `/goods/${id}`
  })
}
