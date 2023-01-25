import type { GetListSuccess } from '@/types/common'
import type { Department } from '@/types/department'
import type { FormObject } from '@/types/search'

export const initialState = {
  departmentList: <GetListSuccess<Department>>{},
  serchForm: <FormObject[]>[
    {
      label: '部门名称',
      name: 'name',
      type: 'input'
    },
    {
      label: '部门领导',
      name: 'leaderName',
      type: 'input'
    },
    {
      label: '创建时间',
      name: 'createTime',
      type: 'timePicker'
    }
  ]
}
