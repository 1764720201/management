import type { DepartmentOptions } from '@/types/department'
import type { GetByOptions } from '@/types/common'
import { getAllDepartmentByOptions } from '@/service/module/department'
import { createDepartment } from '@/service/module/department'
import { EditDepartment } from '@/types/department'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialState } from './state'
export const createDepartmentAction = createAsyncThunk(
  'create/department',
  async (editDepartment: EditDepartment) => {
    const data = await createDepartment(editDepartment)
    return data
  }
)
export const getAllDepartmentAction = createAsyncThunk(
  'get/department',
  async (params: {
    data?: GetByOptions<DepartmentOptions>
    size?: number
    page?: number
  }) => {
    const data = await getAllDepartmentByOptions(
      params.data,
      params.size,
      params.page
    )
    return data
  }
)
export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDepartmentAction.fulfilled, (state, { payload }) => {
      state.departmentList = payload
    })
  }
})
export default departmentSlice.reducer
