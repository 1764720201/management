import {
  useSelector,
  TypedUseSelectorHook,
  useDispatch,
  shallowEqual
} from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './modules/login'
import homeReducer from './modules/home'
import userReducer from './modules/user'
import departmentReducer from './modules/department'
import menuReducer from './modules/menu'
import roleReducer from './modules/role'
import categoryReducer from './modules/category'
import goodsReducer from './modules/goods'
const store = configureStore({
  reducer: {
    login: loginReducer,
    home: homeReducer,
    user: userReducer,
    department: departmentReducer,
    menu: menuReducer,
    role: roleReducer,
    category: categoryReducer,
    goods: goodsReducer
  }
})

type GetStateFnType = typeof store.getState
type GetDispatchFnType = typeof store.dispatch
export type RootState = ReturnType<GetStateFnType>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => GetDispatchFnType = useDispatch
export const useAppShallowEqual = shallowEqual
export default store
