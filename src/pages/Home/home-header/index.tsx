import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Breadcrumb, Col, Dropdown, Layout, MenuProps, Row } from 'antd'
import { useDispatch } from 'react-redux'
import { useAppSelector, useAppShallowEqual } from '@/store'
import {
  changeCollapsed,
  changeBreadcrumbAction,
  ifShowMenu
} from '@/store/modules/home'
import AntIcons from '@/components/ant-icons'
import IconFont from '@/components/icon-font'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/constant'
import { useNavigate } from 'react-router-dom'
import { HomeHeaderWrapper } from './style'
import Avatar from '@/components/avatar'
const { Header } = Layout
interface Props {
  children?: ReactNode
  backgroud: string
}
const HomeHeader: FC<Props> = (props) => {
  const { backgroud } = props
  const { userInfo } = useAppSelector(
    (state) => state.login,
    useAppShallowEqual
  )
  const { collapsed, currentBreadcrumb } = useAppSelector(
    (state) => state.home,
    useAppShallowEqual
  )
  const dispatch = useDispatch()
  const setCollapsed = () => {
    dispatch(changeCollapsed())
    dispatch(ifShowMenu())
  }
  const navigate = useNavigate()
  const items: MenuProps['items'] = [
    {
      label: '退出系统',
      key: '1',
      icon: <IconFont type="icon-tuichu" />
    },
    { type: 'divider' },
    {
      label: '个人信息',
      key: '2',
      icon: <IconFont type="icon-xinxi" />
    },
    {
      label: '修改密码',
      key: '3',
      icon: <IconFont type="icon-xiugaimima" />
    }
  ]
  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case '1':
        localCache.removeCache(LOGIN_TOKEN)
        navigate('/login')
        break
    }
  }
  const changeBreadcrumbChild = (path: string) => {
    dispatch(changeBreadcrumbAction(path))
    navigate(path)
  }
  const changeBreadcrumbMain = () => {
    const path = currentBreadcrumb.mainMenu.path
    dispatch(changeBreadcrumbAction(path))
    navigate(path)
  }
  return (
    <Header style={{ padding: 0, background: backgroud }}>
      <Row align="middle">
        <Col span={1}>
          <AntIcons
            className="trigger"
            name={collapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'}
            onClick={() => setCollapsed()}
          ></AntIcons>
        </Col>
        <Col span={18}>
          <HomeHeaderWrapper>
            <Breadcrumb separator=">">
              <Breadcrumb.Item
                className="main-menu"
                href=""
                onClick={(e) => {
                  changeBreadcrumbMain(), e.preventDefault()
                }}
              >
                {currentBreadcrumb.mainMenu.name}
              </Breadcrumb.Item>
              {currentBreadcrumb.childMenu.map((item) => {
                return (
                  <Breadcrumb.Item
                    href=""
                    key={item.id}
                    onClick={(e) => {
                      changeBreadcrumbChild(item.path)
                      e.preventDefault()
                    }}
                  >
                    {item.name}
                  </Breadcrumb.Item>
                )
              })}
            </Breadcrumb>
          </HomeHeaderWrapper>
        </Col>
        <Col span={4}>
          <Row justify="space-around" align="middle">
            <Col>
              <IconFont type="icon-youxiang"></IconFont>
            </Col>
            <Col>
              <IconFont type="icon-xiaoxi"></IconFont>
            </Col>
            <Col>
              <IconFont type="icon-fangdajing"></IconFont>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Avatar avatarUrl={userInfo.avatarUrl}></Avatar>
                </Col>
                <Col>
                  <Dropdown menu={{ items, onClick }} placement="bottom" arrow>
                    <a onClick={(e) => e.preventDefault()}>
                      <div>{userInfo.username}</div>
                    </a>
                  </Dropdown>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  )
}
export default memo(HomeHeader)
