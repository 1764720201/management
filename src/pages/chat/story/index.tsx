import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
interface Props {
  children?: ReactNode
}
const Template: FC<Props> = (props) => {
  return <div></div>
}
export default memo(Template)
