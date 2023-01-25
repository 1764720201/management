import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialState } from './state'
import type { Paging } from '@/types/common'
import { getMenuList } from '@/service/module/menu'

export const getMenuListAction = createAsyncThunk(
  'get/menulist',
  async (params: Paging) => {
    const data = await getMenuList(params?.size, params?.page)
    return data
  }
)
const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMenuListAction.fulfilled, (state, { payload }) => {
      Object.assign(state.menuList, payload)
    })
  }
})
export default menuSlice.reducer
