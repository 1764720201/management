import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Avatar, Image } from 'antd'
import { BASE_URL } from '@/service/config'
import { AvatarWrapper } from './style'
interface Props {
  children?: ReactNode
  avatarUrl: string
}
const Template: FC<Props> = (props) => {
  const { avatarUrl } = props
  return (
    <Avatar
      src={
        <AvatarWrapper>
          <Image src={BASE_URL + avatarUrl}></Image>
        </AvatarWrapper>
      }
    ></Avatar>
  )
}
export default memo(Template)
