import React, { memo, Suspense } from 'react'
import type { FC, ReactNode } from 'react'
import { Content } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'

interface Props {
  children?: ReactNode
  backgroud: string
}
const HomeContent: FC<Props> = (props) => {
  return (
    <Content
      style={{
        padding: 20,
        background: props.backgroud
      }}
    >
      <Suspense fallback="">
        <Outlet></Outlet>
      </Suspense>
    </Content>
  )
}
export default memo(HomeContent)
