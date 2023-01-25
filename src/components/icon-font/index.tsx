import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { createFromIconfontCN } from '@ant-design/icons'
import { IconFontProps } from '@ant-design/icons/lib/components/IconFont'
import { scriptUrl } from '@/config'

interface Props extends IconFontProps {
  children?: ReactNode
}
const IconFont: FC<Props> = (props) => {
  const IconFont = createFromIconfontCN({
    scriptUrl
  })

  return <IconFont {...props} />
}
export default memo(IconFont)
