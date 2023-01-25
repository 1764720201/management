import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { Button, Table } from 'antd'
import { ColumnType } from 'antd/es/table'
import { setTableAlign } from '@/utils/setTableAlign'
import { GetListSuccess } from '@/types/common'
import { HeaderWrapper } from '@/components/content/style'
import { useLocation } from 'react-router-dom'
import { btnPermission } from '@/utils/btnPermission'

interface Props<T> {
  children?: ReactNode
  columns: ColumnType<any>[]
  changePage: (page: number) => void
  list: GetListSuccess<T>
  header: {
    title: string
    modelTitle: string
  }
  openModal: () => void
}
const Content = <T extends object>(props: Props<T>) => {
  const { columns, changePage, list, header, openModal } = props
  const location = useLocation()
  return (
    <HeaderWrapper>
      <div className="header">
        <div className="title">{header.title}</div>
        <Button
          type="primary"
          onClick={() => openModal()}
          disabled={!btnPermission(location.pathname, 'create')}
        >
          {header.modelTitle}
        </Button>
      </div>
      <Table
        style={{ marginTop: '20px' }}
        rowKey="id"
        bordered
        columns={setTableAlign(columns, 'center')}
        dataSource={btnPermission(location.pathname, 'query') ? list.data : []}
        pagination={{
          total: list.total,
          onChange: (e: number) => changePage(e)
        }}
      />
    </HeaderWrapper>
  )
}
export default memo(Content)
