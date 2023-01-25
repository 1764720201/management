import React, { memo, useCallback, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { Menu } from 'antd'
import { HomeMenuWrapper } from './style'
import { useAppSelector, useAppShallowEqual } from '@/store'
import IconFont from '@/components/icon-font'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCurrentMainMenu, getCurrentMenu } from '@/store/modules/home'
interface Props {
  children?: ReactNode
}
const HomeMenu: FC<Props> = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const localtion = useLocation()
  const { menu } = useAppSelector((state) => state.login, useAppShallowEqual)
  const { collapsed, currentMenu, currentMainMenu } = useAppSelector(
    (state) => state.home,
    useAppShallowEqual
  )

  useEffect(() => {
    dispatch(getCurrentMenu({ path: localtion.pathname, menus: menu }))
  }, [])
  // 改变2级目录
  const changeMenu = useCallback((id: string, parentId: number) => {
    const currentChildrenMenu = menu
      .filter((item) => item.id === parentId)[0]
      .children.filter((item) => String(item.id) === id)[0]
    dispatch(getCurrentMenu({ path: currentChildrenMenu.url, menus: menu }))
    navigate(currentChildrenMenu.url)
  }, [])
  // 改变1级目录
  const changeMainMenu = useCallback((id: string) => {
    const currentMainMenu = menu.filter((item) => String(item.id) === id)[0]
    dispatch(getCurrentMainMenu({ path: currentMainMenu.url, menus: menu }))
  }, [])
  return (
    <HomeMenuWrapper>
      <div className="menu-header">
        <img src={require('@/assets/logo.png')} />
        {!collapsed && (
          <div className="title" style={{ color: 'white' }}>
            后台管理系统
          </div>
        )}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        triggerSubMenuAction="click"
        selectedKeys={[currentMenu.id]}
        openKeys={currentMainMenu.map((item) => item.id)}
        items={menu.map((item) => {
          return {
            onClick: (e: { key: string }) => changeMenu(e.key, item.id),
            onTitleClick: (e: { key: string }) => changeMainMenu(e.key),
            key: item.id,
            icon: <IconFont type={item.icon} />,
            label: <span>{item.name}</span>,
            children: item.children.map((item) => {
              return {
                key: item.id,
                label: <span>{item.name}</span>
              }
            })
          }
        })}
      />
    </HomeMenuWrapper>
  )
}
export default memo(HomeMenu)
