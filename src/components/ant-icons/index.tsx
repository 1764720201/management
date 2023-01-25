import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import * as Icon from '@ant-design/icons'
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'
interface Props extends AntdIconProps {
  children?: ReactNode
  name: string
}
const AntIcon: FC<Props> = (props) => {
  return React.createElement((Icon && (Icon as any))[props.name], { ...props })
}
export default memo(AntIcon)
