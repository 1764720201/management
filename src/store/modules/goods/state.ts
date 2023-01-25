import type { GetListSuccess } from '@/types/common'
import { Goods } from '@/types/goods'
import type { FormObject } from '@/types/search'

export const initialState = {
  goodsList: <GetListSuccess<Goods>>{},
  serchForm: <FormObject[]>[
    {
      label: '商品名称',
      name: 'name',
      type: 'input'
    },
    {
      label: '商品地址',
      type: 'input',
      name: 'address'
    },
    {
      label: '状态',
      type: 'select',
      name: 'status',
      options: [
        {
          label: '在售',
          value: 0
        },
        {
          label: '已下架',
          value: 1
        }
      ]
    },
    {
      label: '创建时间',
      name: 'createTimeRange',
      type: 'timePicker'
    }
  ]
}
