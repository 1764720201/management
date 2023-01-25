import { memo } from 'react'
import type { FC, ReactNode } from 'react'
import {
  RouteObject,
  useLocation,
  useNavigate,
  useRoutes
} from 'react-router-dom'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN, MENU } from '@/constant'
import { addRoutes } from '@/utils/addRoutes'
interface Props {
  children?: ReactNode
  routes: RouteObject[]
}
const AuthGuard: FC<Props> = (props) => {
  const { routes } = props
  const location = useLocation()
  const navigate = useNavigate()
  const newRoutes = routes.slice(0)
  if (!localCache.getCache(LOGIN_TOKEN) && location.pathname !== '/login') {
    navigate('/login', {
      replace: true
    })
  } else {
    const menu = localCache.getCache(MENU)
    if (newRoutes[2].children?.length === 0) {
      newRoutes[2].children = addRoutes(menu)
    }
  }
  return useRoutes(newRoutes)
}
export default memo(AuthGuard)
