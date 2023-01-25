import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Popconfirm } from 'antd'
import { DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'
import { btnPermission } from '@/utils/btnPermission'
interface Props {
  children?: ReactNode
  openModal: () => void
  deleteItem: () => void
}
const Operation: FC<Props> = (props) => {
  const { openModal, deleteItem } = props
  const location = useLocation()
  return (
    <div>
      <Button
        type="link"
        icon={<FormOutlined />}
        onClick={() => openModal()}
        disabled={!btnPermission(location.pathname, 'update')}
      >
        编辑
      </Button>
      <Popconfirm
        title="确认删除"
        onConfirm={() => deleteItem()}
        okText="确认"
        cancelText="取消"
        placement="leftTop"
        disabled={!btnPermission(location.pathname, 'delete')}
      >
        <Button type="link" danger icon={<DeleteOutlined />}>
          删除
        </Button>
      </Popconfirm>
    </div>
  )
}
export default memo(Operation)
