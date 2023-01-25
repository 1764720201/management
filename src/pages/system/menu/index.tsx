import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { FormObject } from '@/types/search'
import Content from '@/components/content'
import { ColumnType } from 'antd/es/table'
import {
  CurrentDepartment,
  Department,
  EditDepartment
} from '@/types/department'
import AddModal from '@/components/add-model'
import Operation from '@/components/operation'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store'
import { getUserListAction } from '@/store/modules/user'
import {
  createDepartment,
  deleteDepartmentById,
  getDepartmentById,
  updateDepartmentById
} from '@/service/module/department'
import { formatUTC } from '@/utils/format'
import { getMenuListAction } from '@/store/modules/menu'
interface Props {
  children?: ReactNode
}
const Template: FC<Props> = () => {
  const [columns, setColumns] = useState<ColumnType<Department>[]>([])
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [currentDepartment, setCurrentDepartment] =
    useState<Partial<CurrentDepartment>>()
  const [modalForm, setModalForm] = useState<FormObject[]>([])
  const { menuList } = useAppSelector((state) => state.menu, useAppShallowEqual)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getUserListAction({}))
  }, [])
  useEffect(() => {
    setColumns([
      {
        title: '菜单名称',
        dataIndex: 'name'
      },
      {
        title: '级别',
        dataIndex: 'type'
      },
      {
        title: '菜单目录',
        dataIndex: 'url'
      },
      {
        title: '权限',
        dataIndex: 'permission'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        render: (item) => <div>{formatUTC(item)}</div>
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        render: (item) => <div>{formatUTC(item)}</div>
      },
      {
        title: '操作',
        render: (_, record) => (
          <Operation
            openModal={() => openModal(record.id)}
            deleteItem={() => deleteItem(record.id)}
          ></Operation>
        )
      }
    ])
  }, [])
  useEffect(() => {
    setModalForm([
      {
        label: '菜单名称',
        name: 'name',
        type: 'input'
      },
      {
        label: '级别',
        name: 'type',
        type: 'select',
        options: [1, 2, 3].map((item) => {
          return {
            label: String(item),
            value: item
          }
        })
      },
      {
        label: '菜单目录',
        name: 'url',
        type: 'input'
      }
    ])
  }, [])
  useEffect(() => {
    dispatch(getMenuListAction({}))
  }, [])
  const openModal = async (id?: number) => {
    if (id) {
      const { name, parent, leader } = await getDepartmentById(id)
      setCurrentDepartment({
        id,
        name,
        leaderId: leader?.id,
        parentId: parent?.id
      })
    } else {
      setCurrentDepartment({})
    }
    setIsShowModal(true)
  }
  const deleteItem = async (id: number) => {
    await deleteDepartmentById(id)
    dispatch(getMenuListAction({}))
  }
  const getModalForm = async (editDepartment: EditDepartment) => {
    if (currentDepartment?.id) {
      await updateDepartmentById(currentDepartment.id, editDepartment)
    } else {
      await createDepartment(editDepartment)
    }
    setIsShowModal(false)
    dispatch(getMenuListAction({}))
  }
  return (
    <div>
      <Content
        header={{
          title: '菜单管理',
          modelTitle: '新建菜单'
        }}
        openModal={() => openModal()}
        columns={columns}
        changePage={(page: number) => dispatch(getMenuListAction({ page }))}
        list={menuList}
      />
      <AddModal
        initialValues={currentDepartment}
        setModalForm={(value: EditDepartment) => getModalForm(value)}
        formObjects={modalForm}
        title={
          Object.values(currentDepartment || {}).length
            ? '编辑菜单'
            : '新增菜单'
        }
        isShowModal={isShowModal}
        setIsShowModal={(value) => setIsShowModal(value)}
      ></AddModal>
    </div>
  )
}
export default memo(Template)
