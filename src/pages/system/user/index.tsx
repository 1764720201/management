import React, { memo, useCallback, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import Search from '@/components/search'
import type { FormObject } from '@/types/search'
import Content from '@/components/content'
import { getUserListAction } from '@/store/modules/user'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store'
import { AddUser, CurrentUser, GetUserListOptions } from '@/types/user'
import { Popconfirm, Tag } from 'antd'
import AddModal from '@/components/add-model'
import {
  createUser,
  deleteUserById,
  updateUser,
  updateUserStatus
} from '@/service/module/user'
import { UserInfo } from '@/types/login'
import { ColumnType } from 'antd/es/table'
import { formatUTC } from '@/utils/format'
import { getUserInfoById } from '@/service/module/login'
import Operation from '@/components/operation'
interface Props {
  children?: ReactNode
}
const User: FC<Props> = () => {
  const [columns, setColumns] = useState<ColumnType<UserInfo>[]>([])
  const [modelForm, setModelForm] = useState<FormObject[]>([])
  const [options, setOptions] = useState<GetUserListOptions>({})
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<Partial<CurrentUser>>()
  const { userList, searchForm } = useAppSelector(
    (state) => state.user,
    useAppShallowEqual
  )
  const { roleList } = useAppSelector((state) => state.role)
  const { departmentList } = useAppSelector(
    (state) => state.department,
    useAppShallowEqual
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    setColumns([
      { title: '序号', dataIndex: 'id' },
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '真实姓名',
        dataIndex: 'relname'
      },
      {
        title: '手机号码',
        dataIndex: 'cellphone'
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (item: number, record) => (
          <Popconfirm
            title="你确定要修改状态吗"
            onConfirm={() => updateCurrentStatus(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Tag color={item ? 'red' : 'blue'}>{item ? '禁用' : '启用'}</Tag>
          </Popconfirm>
        )
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
            deleteItem={() => deleteUser(record.id)}
          ></Operation>
        )
      }
    ])
  }, [])
  useEffect(() => {
    setModelForm([
      {
        label: '用户名',
        name: 'username',
        type: 'input'
      },
      {
        label: '真实姓名',
        name: 'relname',
        type: 'input'
      },
      {
        label: '密码',
        name: 'password',
        type: 'input',
        hidden: true
      },
      {
        label: '电话号码',
        name: 'cellphone',
        type: 'input'
      },
      {
        label: '选择角色',
        name: 'roles',
        type: 'select',
        mode: 'multiple',
        options: roleList.data.map((item) => {
          return {
            label: item.name,
            value: item.id
          }
        })
      },
      {
        label: '选择部门',
        name: 'departments',
        type: 'select',
        mode: 'multiple',
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
    dispatch(getUserListAction({ data: options }))
  }, [options])
  const openModal = useCallback(async (id?: number) => {
    if (id) {
      const { username, departments, cellphone, relname, roles } =
        await getUserInfoById(id)
      setCurrentUser({
        id,
        username,
        cellphone,
        relname,
        roles: roles.map((item) => item.id),
        departments: departments.map((item) => item.id)
      })
    } else {
      setCurrentUser({})
    }
    setIsShowModal(true)
  }, [])
  const getModalForm = useCallback(
    async (value: AddUser) => {
      if (currentUser?.id) {
        await updateUser(currentUser.id, value)
      } else {
        await createUser(value)
      }
      setIsShowModal(false)
      dispatch(getUserListAction({ data: options }))
    },
    [currentUser?.id]
  )
  const deleteUser = async (id: number) => {
    await deleteUserById(id)
    dispatch(getUserListAction({ data: options }))
  }
  const updateCurrentStatus = async (id: number) => {
    await updateUserStatus(id)
    dispatch(getUserListAction({ data: options }))
  }
  const changePage = useCallback((page: number) => {
    dispatch(getUserListAction({ data: options, page }))
  }, [])

  return (
    <div>
      <Search
        formObject={searchForm}
        search={(res: GetUserListOptions) => setOptions(res)}
      ></Search>
      <Content
        columns={columns}
        changePage={changePage}
        list={userList}
        header={{ title: '用户管理', modelTitle: '新增用户' }}
        openModal={() => openModal()}
      />
      <AddModal
        initialValues={currentUser}
        setModalForm={(value: AddUser) => getModalForm(value)}
        formObjects={modelForm}
        title={
          Object.values(currentUser || {}).length ? '编辑用户' : '新增用户'
        }
        isShowModal={isShowModal}
        setIsShowModal={(value) => setIsShowModal(value)}
      ></AddModal>
    </div>
  )
}
export default memo(User)
