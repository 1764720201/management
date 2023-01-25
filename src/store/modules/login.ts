import { getMenuByUserId } from '@/service/module/login'
import { LOGIN_TOKEN, MENU, USER_INFO } from '@/constant'
import { getUserInfoById, login } from '@/service/module/login'
import { Account, AccountLogin } from '@/types/login'
import { localCache } from '@/utils/cache'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
export const fetchLoginAction = createAsyncThunk(
  'account/login',
  async (userInfo: AccountLogin, { dispatch }) => {
    const data = await login(userInfo)
    localCache.setCache(LOGIN_TOKEN, data.data.token)
    dispatch(fetchGetUserInfoById(data.data.userId))
    dispatch(fetchGetMenuByUserId(data.data.userId))
    return {
      data: data.data,
      remember: userInfo.remember
    }
  }
)
export const fetchGetUserInfoById = createAsyncThunk(
  'userInfo/id',
  async (id: number) => {
    const data = await getUserInfoById(id)
    return data
  }
)
export const fetchGetMenuByUserId = createAsyncThunk(
  'role/menu',
  async (id: number) => {
    const data = await getMenuByUserId(id)
    return data
  }
)
const loginSlice = createSlice({
  name: 'login',
  initialState: <Account>{
    token: localCache.getCache(LOGIN_TOKEN) || '',
    userInfo: localCache.getCache(USER_INFO) || {},
    menu: localCache.getCache(MENU) || [],
    ifLogin: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginAction.fulfilled, (state, { payload }) => {
        state.token = payload.data.token
      })
      .addCase(fetchGetUserInfoById.fulfilled, (state, { payload }) => {
        localCache.setCache(USER_INFO, payload)
        state.userInfo = payload
      })
      .addCase(fetchGetMenuByUserId.fulfilled, (state, { payload }) => {
        localCache.setCache(MENU, payload.data)
        state.menu = payload.data
      })
  }
})
export default loginSlice.reducer
