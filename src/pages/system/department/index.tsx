import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import Search from '@/components/search'
import { FormObject } from '@/types/search'
import Content from '@/components/content'
import { ColumnType } from 'antd/es/table'
import {
  CurrentDepartment,
  Department,
  DepartmentOptions,
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
import { getAllDepartmentAction } from '@/store/modules/department'
import { formatUTC } from '@/utils/format'
import { GetByOptions } from '@/types/common'
interface Props {
  children?: ReactNode
}
const Template: FC<Props> = () => {
  const [options, setOptions] = useState<GetByOptions<DepartmentOptions>>({})
  const [columns, setColumns] = useState<ColumnType<Department>[]>([])
  const { userList } = useAppSelector((state) => state.user, useAppShallowEqual)
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [currentDepartment, setCurrentDepartment] =
    useState<Partial<CurrentDepartment>>()
  const [modalForm, setModalForm] = useState<FormObject[]>([])
  const { departmentList, serchForm } = useAppSelector(
    (state) => state.department,
    useAppShallowEqual
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getUserListAction({}))
  }, [])

  useEffect(() => {
    setColumns([
      {
        title: '序号',
        dataIndex: 'id'
      },
      {
        title: '部门名称',
        dataIndex: 'name'
      },
      {
        title: '部门领导',
        dataIndex: 'leader',
        render: (_, record) => record.leader?.relname
      },
      {
        title: '上级部门',
        dataIndex: 'parent',
        render: (_, record) => record.parent?.name
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
        label: '部门名称',
        name: 'name',
        type: 'input'
      },
      {
        label: '部门领导',
        name: 'leaderId',
        type: 'select',
        options: userList.data?.map((item) => {
          return {
            label: item.relname,
            value: item.id
          }
        })
      },
      {
        label: '上级部门',
        name: 'parentId',
        type: 'select',
        options: departmentList.data.map((item) => {
          return {
            label: item.name,
            value: item.id
          }
        })
      }
    ])
  }, [])
  useEffect(() => {
    dispatch(getAllDepartmentAction({ data: options }))
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
    dispatch(getAllDepartmentAction({ data: options }))
  }
  const getModalForm = async (editDepartment: EditDepartment) => {
    if (currentDepartment?.id) {
      await updateDepartmentById(currentDepartment.id, editDepartment)
    } else {
      await createDepartment(editDepartment)
    }
    setIsShowModal(false)
    dispatch(getAllDepartmentAction({ data: options }))
  }
  return (
    <div>
      <Search
        formObject={serchForm}
        search={(res: GetByOptions<DepartmentOptions>) => setOptions(res)}
      ></Search>
      <Content
        header={{
          title: '部门管理',
          modelTitle: '新建部门'
        }}
        openModal={() => openModal()}
        columns={columns}
        changePage={(page: number) =>
          dispatch(getAllDepartmentAction({ data: options, page }))
        }
        list={departmentList}
      />
      <AddModal
        initialValues={currentDepartment}
        setModalForm={(value: EditDepartment) => getModalForm(value)}
        formObjects={modalForm}
        title={
          Object.values(currentDepartment || {}).length
            ? '编辑部门'
            : '新增部门'
        }
        isShowModal={isShowModal}
        setIsShowModal={(value) => setIsShowModal(value)}
      ></AddModal>
    </div>
  )
}
export default memo(Template)
