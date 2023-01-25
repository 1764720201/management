import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import Search from '@/components/search'
import { FormObject } from '@/types/search'
import Content from '@/components/content'
import { ColumnType } from 'antd/es/table'
import { CurrentDepartment } from '@/types/department'
import AddModal from '@/components/add-model'
import Operation from '@/components/operation'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store'

import { formatUTC } from '@/utils/format'
import { getCategoryListAction } from '@/store/modules/category'
import { GetByOptions } from '@/types/common'
import { Category, CategoryOptions, EditCategory } from '@/types/category'
import {
  createCategory,
  deleteCategoryById,
  getCategoryById,
  updateCategoryById
} from '@/service/module/category'
interface Props {
  children?: ReactNode
}

const Template: FC<Props> = () => {
  const [options, setOptions] = useState<GetByOptions<CategoryOptions>>({})
  const [columns, setColumns] = useState<ColumnType<Category>[]>([])
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [currentCategory, setCurrentDepartment] =
    useState<Partial<CurrentDepartment>>()
  const [modalForm, setModalForm] = useState<FormObject[]>([])
  const { categoryList, serchForm } = useAppSelector(
    (state) => state.category,
    useAppShallowEqual
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    setColumns([
      {
        title: '序号',
        dataIndex: 'id'
      },
      {
        title: '类别名称',
        dataIndex: 'name'
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
        label: '分类名称',
        name: 'name',
        type: 'input'
      }
    ])
  }, [])
  useEffect(() => {
    dispatch(getCategoryListAction({ data: options }))
  }, [options])
  const openModal = async (id?: number) => {
    if (id) {
      const { name } = await getCategoryById(id)
      setCurrentDepartment({
        id,
        name
      })
    } else {
      setCurrentDepartment({})
    }
    setIsShowModal(true)
  }
  const deleteItem = async (id: number) => {
    await deleteCategoryById(id)
    dispatch(getCategoryListAction({ data: options }))
  }
  const getModalForm = async (editCategory: EditCategory) => {
    if (currentCategory?.id) {
      await updateCategoryById(currentCategory.id, editCategory)
    } else {
      await createCategory(editCategory)
    }
    setIsShowModal(false)
    dispatch(getCategoryListAction({ data: options }))
  }
  return (
    <div>
      <Search
        formObject={serchForm}
        search={(res: GetByOptions<CategoryOptions>) => setOptions(res)}
      ></Search>
      <Content
        header={{
          title: '商品分类管理',
          modelTitle: '新建商品分类'
        }}
        openModal={() => openModal()}
        columns={columns}
        changePage={(page: number) =>
          dispatch(getCategoryListAction({ data: options, page }))
        }
        list={categoryList}
      />
      <AddModal
        initialValues={currentCategory}
        setModalForm={(value: EditCategory) => getModalForm(value)}
        formObjects={modalForm}
        title={
          Object.values(currentCategory || {}).length
            ? '编辑商品分类'
            : '新增商品分类'
        }
        isShowModal={isShowModal}
        setIsShowModal={(value) => setIsShowModal(value)}
      ></AddModal>
    </div>
  )
}
export default memo(Template)
