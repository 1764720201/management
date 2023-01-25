import React, { memo, useCallback, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import Search from '@/components/search'
import type { FormObject } from '@/types/search'
import Content from '@/components/content'
import { ColumnType } from 'antd/es/table'
import AddModal from '@/components/add-model'
import Operation from '@/components/operation'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store'
import { formatUTC } from '@/utils/format'
import { GetByOptions } from '@/types/common'
import { createGoods, getGoodsById } from '@/service/module/goods'
import { CurrentGoods, EditGoods, Goods, GoodsOption } from '@/types/goods'
import { upload } from '@/service/module/upload'
import { Image } from 'antd'
import { BASE_URL } from '@/service/config'
import { getGoodsListAction } from '@/store/modules/goods'
interface Props {
  children?: ReactNode
}

const Template: FC<Props> = () => {
  const [options, setOptions] = useState<GetByOptions<GoodsOption>>({})
  const [columns, setColumns] = useState<ColumnType<Goods>[]>([])
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [currentGoods, setCurrentGoods] = useState<Partial<CurrentGoods>>()
  const [modalForm, setModalForm] = useState<FormObject[]>([])
  const { goodsList, serchForm } = useAppSelector(
    (state) => state.goods,
    useAppShallowEqual
  )
  const { categoryList } = useAppSelector(
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
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '价格',
        dataIndex: 'price'
      },
      {
        title: '商品描述',
        dataIndex: 'intro'
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (value) => {
          return value ? '已下架' : '在售'
        }
      },
      {
        title: '图片',
        dataIndex: 'picture',
        render: (value) => {
          return <Image width={80} height={80} src={BASE_URL + value}></Image>
        }
      },
      {
        title: '库存',
        dataIndex: 'repertory'
      },
      {
        title: '销量',
        dataIndex: 'sales'
      },
      {
        title: '收藏',
        dataIndex: 'collects'
      },
      {
        title: '地址',
        dataIndex: 'address'
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
        label: '商品名称',
        name: 'name',
        type: 'input'
      },
      {
        label: '价格',
        name: 'price',
        type: 'input'
      },
      {
        label: '图片',
        name: 'picture',
        type: 'upload'
      },
      {
        label: '商品介绍',
        name: 'intro',
        type: 'input'
      },
      {
        label: '库存',
        name: 'repertory',
        type: 'input'
      },
      {
        label: '商品类别',
        type: 'select',
        name: 'typeId',
        options: categoryList.data.map((item) => {
          return {
            label: item.name,
            value: item.id
          }
        })
      },
      {
        label: '地址',
        name: 'address',
        type: 'input'
      }
    ])
  }, [])
  useEffect(() => {
    dispatch(getGoodsListAction({ data: options }))
  }, [options])
  const openModal = useCallback(async (id?: number) => {
    if (id) {
      const { type, ...other } = await getGoodsById(id)
      setCurrentGoods({
        typeId: type.id,
        ...other
      })
    } else {
      setCurrentGoods({})
    }
    setIsShowModal(true)
  }, [])
  const deleteItem = async (id: number) => {
    // await deleteCategoryById(id)
    dispatch(getGoodsListAction({ data: options }))
  }
  const getModalForm = useCallback(async (editGoods: EditGoods) => {
    const { picture, ...other } = editGoods
    const formData = new FormData()
    if (picture?.file) {
      formData.append('file', picture.file)
    }
    const file = await upload(formData)
    await createGoods({ picture: file.filename, ...other })
  }, [])
  return (
    <div>
      <Search
        formObject={serchForm}
        search={(res: GetByOptions<GoodsOption>) => setOptions(res)}
      ></Search>
      <Content
        header={{
          title: '商品管理',
          modelTitle: '新建商品'
        }}
        openModal={() => openModal()}
        columns={columns}
        changePage={(page: number) =>
          dispatch(getGoodsListAction({ data: options, page }))
        }
        list={goodsList}
      />
      <AddModal
        initialValues={currentGoods}
        setModalForm={(value: EditGoods) => getModalForm(value)}
        formObjects={modalForm}
        title={
          Object.values(currentGoods || {}).length ? '编辑商品' : '新增商品'
        }
        isShowModal={isShowModal}
        setIsShowModal={(value) => setIsShowModal(value)}
      ></AddModal>
    </div>
  )
}
export default memo(Template)
