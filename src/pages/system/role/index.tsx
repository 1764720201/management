import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import Search from '@/components/search'
import { FormObject } from '@/types/search'
import Content from '@/components/content'
import { ColumnType } from 'antd/es/table'
import { CurrentDepartment, Department } from '@/types/department'
import AddModal from '@/components/add-model'
import Operation from '@/components/operation'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store'
import { getUserListAction } from '@/store/modules/user'
import {
  deleteDepartmentById,
  getDepartmentById
} from '@/service/module/department'
import { formatUTC } from '@/utils/format'
import { getRoleListAction } from '@/store/modules/role'
import type { EditRole, GetRoleOptions, OriginData } from '@/types/role'
import type { DataNode } from 'antd/es/tree'
import { createRole } from '@/service/module/role'
interface Props {
  children?: ReactNode
}

const Template: FC<Props> = () => {
  const [options, setOptions] = useState<GetRoleOptions>({})
  const [columns, setColumns] = useState<ColumnType<Department>[]>([])
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [currentDepartment, setCurrentDepartment] =
    useState<Partial<CurrentDepartment>>()
  const [modalForm, setModalForm] = useState<FormObject[]>([])
  const { roleList, serchForm } = useAppSelector(
    (state) => state.role,
    useAppShallowEqual
  )
  const { menuList } = useAppSelector((state) => state.menu, useAppShallowEqual)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getUserListAction({}))
  }, [])

  const transitionTreeData = (originData: OriginData[]): DataNode[] => {
    return originData.map((item) => {
      return {
        key: item.id,
        title: item.name,
        value: item.id,
        children: item.children && transitionTreeData(item.children)
      }
    })
  }
  useEffect(() => {
    setColumns([
      {
        title: '序号',
        dataIndex: 'id'
      },
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '权限介绍',
        dataIndex: 'intro',
        render: (_, record) => record.leader?.relname
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
        label: '角色名称',
        name: 'name',
        type: 'input'
      },
      {
        label: '权限介绍',
        name: 'intro',
        type: 'input'
      },
      {
        name: 'permissions',
        label: '分配权限',
        type: 'treeSelect',
        treeDate: transitionTreeData(menuList.data)
      }
    ])
  }, [])
  useEffect(() => {
    dispatch(getRoleListAction({ data: options }))
  }, [options])
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
    dispatch(getRoleListAction({ data: options }))
  }
  const getModalForm = async (editRole: EditRole) => {
    console.log(editRole)
    // if (currentDepartment?.id) {
    //   await updateDepartmentById(currentDepartment.id, editDepartment)
    // } else {
    //   await createDepartment(editDepartment)
    // }
    await createRole(editRole)
    // setIsShowModal(false)
    // dispatch(getRoleListAction({ data: options }))
  }
  return (
    <div>
      <Search
        formObject={serchForm}
        search={(res: GetRoleOptions) => setOptions(res)}
      ></Search>
      <Content
        header={{
          title: '角色管理',
          modelTitle: '新建角色'
        }}
        openModal={() => openModal()}
        columns={columns}
        changePage={(page: number) =>
          dispatch(getRoleListAction({ data: options, page }))
        }
        list={roleList}
      />
      <AddModal
        initialValues={currentDepartment}
        setModalForm={(value: EditRole) => getModalForm(value)}
        formObjects={modalForm}
        title={
          Object.values(currentDepartment || {}).length
            ? '编辑角色'
            : '新增角色'
        }
        isShowModal={isShowModal}
        setIsShowModal={(value) => setIsShowModal(value)}
      ></AddModal>
    </div>
  )
}
export default memo(Template)
