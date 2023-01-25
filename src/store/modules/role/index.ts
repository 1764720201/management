import { getRoleList } from '@/service/module/role'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialState } from './state'
import { GetRoleOptions } from '@/types/role'

export const getRoleListAction = createAsyncThunk(
  'get/rolelist',
  async (params: { data?: GetRoleOptions; size?: number; page?: number }) => {
    const data = await getRoleList(params?.data, params?.size, params?.page)
    return data
  }
)
const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoleListAction.fulfilled, (state, { payload }) => {
      Object.assign(state.roleList, payload)
    })
  }
})
export default roleSlice.reducer
