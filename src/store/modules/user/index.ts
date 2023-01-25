import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { GetUserListOptions } from '@/types/user'
import { getUserList } from '@/service/module/user'
import { initialState } from './state'

export const getUserListAction = createAsyncThunk(
  'get/userlist',
  async (params: {
    data?: GetUserListOptions
    size?: number
    page?: number
  }) => {
    const data = await getUserList(params?.data, params?.size, params?.page)
    return data
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserListAction.fulfilled, (state, { payload }) => {
      Object.assign(state.userList, payload)
    })
  }
})
export default userSlice.reducer
