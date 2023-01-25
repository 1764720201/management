import type { GetListSuccess } from '@/types/common'
import type { UserInfo } from '@/types/login'
import type { FormObject } from '@/types/search'

export const initialState = {
  userList: <GetListSuccess<UserInfo>>{},
  searchForm: <FormObject[]>[
    {
      label: '菜单名称',
      name: 'username',
      type: 'input'
    },
    {
      label: '真实姓名',
      name: 'relname',
      type: 'input'
    },
    {
      label: '手机号码',
      name: 'cellphone',
      type: 'input'
    },
    {
      label: '状态',
      name: 'status',
      type: 'select',
      options: [
        {
          value: 0,
          label: '启用'
        },
        {
          value: 1,
          label: '禁用'
        }
      ]
    },
    {
      label: '创建时间',
      name: 'createTime',
      type: 'Time'
    }
  ]
}
