import type { GetByOptions } from '@/types/common'
import { createDepartment } from '@/service/module/department'
import { EditDepartment } from '@/types/department'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialState } from './state'
import { getCategoryList } from '@/service/module/category'
import { CategoryOptions } from '@/types/category'
export const createDepartmentAction = createAsyncThunk(
  'create/category',
  async (editDepartment: EditDepartment) => {
    const data = await createDepartment(editDepartment)
    return data
  }
)
export const getCategoryListAction = createAsyncThunk(
  'get/category',
  async (params: {
    data?: GetByOptions<CategoryOptions>
    size?: number
    page?: number
  }) => {
    const data = await getCategoryList(params.data, params.size, params.page)
    return data
  }
)
export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoryListAction.fulfilled, (state, { payload }) => {
      console.log(payload)
      state.categoryList = payload
    })
  }
})
export default categorySlice.reducer
