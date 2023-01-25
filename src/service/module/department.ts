import type {
  CreateSuccess,
  GetListSuccess,
  GetByOptions
} from '@/types/common'
import type {
  Department,
  DepartmentOptions,
  EditDepartment
} from '@/types/department'
import { Service } from '..'

export const createDepartment = (editDepartment: EditDepartment) => {
  return Service.post<CreateSuccess>({
    url: '/department/create',
    data: editDepartment
  })
}
export const getAllDepartmentByOptions = (
  data?: GetByOptions<DepartmentOptions>,
  size = 10,
  page = 1
) => {
  return Service.post<GetListSuccess<Department>>({
    url: '/department',
    data,
    params: { size, page }
  })
}
export const getDepartmentById = (id: number) => {
  return Service.get<Department>({
    url: `/department/${id}`
  })
}
export const updateDepartmentById = (id: number, data: EditDepartment) => {
  return Service.patch({
    url: `/department/${id}`,
    data
  })
}
export const deleteDepartmentById = (id: number) => {
  return Service.delete({
    url: `/department/${id}`
  })
}
