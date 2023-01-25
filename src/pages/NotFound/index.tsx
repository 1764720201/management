import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
interface Props {
  children?: ReactNode
}
const Template: FC<Props> = () => {
  return <div>输入地址不正确</div>
}
export default memo(Template)
