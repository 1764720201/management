import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { Layout, theme } from 'antd'
import HomeMenu from './home-menu/intex'
import { HomeWrapper } from './style'
import HomeHeader from './home-header'
import HomeContent from './home-content'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store'
import { getUserListAction } from '@/store/modules/user'
import { getAllDepartmentAction } from '@/store/modules/department'
import { getRoleListAction } from '@/store/modules/role'
import { getMenuListAction } from '@/store/modules/menu'
import { getCategoryListAction } from '@/store/modules/category'

const { Sider } = Layout
interface Props {
  children?: ReactNode
}
const Home: FC<Props> = () => {
  const {
    token: { colorBorderSecondary, colorBgContainer }
  } = theme.useToken()
  const { collapsed } = useAppSelector(
    (state) => state.home,
    useAppShallowEqual
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getMenuListAction({}))
    dispatch(getUserListAction({}))
    dispatch(getRoleListAction({}))
    dispatch(getAllDepartmentAction({}))
    dispatch(getCategoryListAction({}))
  }, [])
  return (
    <HomeWrapper>
      <Layout>
        <Sider collapsible collapsed={collapsed} trigger={null} width={180}>
          <HomeMenu></HomeMenu>
        </Sider>
        <Layout className="site-layout">
          <HomeHeader backgroud={colorBgContainer}></HomeHeader>
          <HomeContent backgroud={colorBorderSecondary}></HomeContent>
        </Layout>
      </Layout>
    </HomeWrapper>
  )
}

export default memo(Home)
