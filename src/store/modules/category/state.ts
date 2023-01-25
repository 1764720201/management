import type { Category } from '@/types/category'
import type { GetListSuccess } from '@/types/common'
import type { FormObject } from '@/types/search'

export const initialState = {
  categoryList: <GetListSuccess<Category>>{},
  serchForm: <FormObject[]>[
    {
      label: '类别名称',
      name: 'name',
      type: 'input'
    },
    {
      label: '创建时间',
      name: 'createTime',
      type: 'timePicker'
    }
  ]
}
