import type { Role } from '@/types/role'
import type { GetListSuccess } from '@/types/common'
import { FormObject } from '@/types/search'
export const initialState = {
  roleList: <GetListSuccess<Role>>{},
  serchForm: <FormObject[]>[
    {
      label: '角色名称',
      name: 'name',
      type: 'input'
    },
    {
      label: '权限介绍',
      name: 'intro',
      type: 'input'
    },
    {
      label: '创建时间',
      name: 'createTime',
      type: 'timePicker'
    }
  ]
}
