import type { GetByOptions } from '@/types/common'
import { createDepartment } from '@/service/module/department'
import { EditDepartment } from '@/types/department'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialState } from './state'
import type { GoodsOption } from '@/types/goods'
import { getGoodsList } from '@/service/module/goods'
export const createDepartmentAction = createAsyncThunk(
  'create/goods',
  async (editDepartment: EditDepartment) => {
    const data = await createDepartment(editDepartment)
    return data
  }
)
export const getGoodsListAction = createAsyncThunk(
  'get/goods',
  async (params: {
    data?: GetByOptions<GoodsOption>
    size?: number
    page?: number
  }) => {
    const data = await getGoodsList(params.data, params.size, params.page)
    return data
  }
)
export const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGoodsListAction.fulfilled, (state, { payload }) => {
      console.log(payload)
      state.goodsList = payload
    })
  }
})
export default goodsSlice.reducer
