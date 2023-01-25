import { Category, CategoryOptions, EditCategory } from '@/types/category'
import { GetByOptions, GetListSuccess } from '@/types/common'
import { Service } from '..'
export const createCategory = (editCategory: EditCategory) => {
  return Service.post({
    url: '/goods-type/create',
    data: {
      name: editCategory.name
    }
  })
}
export const getCategoryList = (
  data?: GetByOptions<CategoryOptions>,
  size = 10,
  page = 1
) => {
  return Service.post<GetListSuccess<Category>>({
    url: '/goods-type',
    data,
    params: {
      size,
      page
    }
  })
}
export const updateCategoryById = (id: number, editCategory: EditCategory) => {
  return Service.patch({
    url: `/goods-type/${id}`,
    data: editCategory
  })
}
export const deleteCategoryById = (id: number) => {
  return Service.delete({
    url: `/goods-type/${id}`
  })
}
export const getCategoryById = (id: number) => {
  return Service.get({
    url: `/goods-type/${id}`
  })
}
