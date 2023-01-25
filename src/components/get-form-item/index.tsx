import React, { memo, useCallback } from 'react'
import type { FC, ReactNode } from 'react'
import { FormObject } from '@/types/search'
import { DatePicker, Form, Input, Select, TreeSelect, Upload } from 'antd'
import { BASE_URL } from '@/service/config'
import { PlusOutlined } from '@ant-design/icons'
interface Props {
  children?: ReactNode
  formObject: FormObject
  imageUrl?: string
}
const Template: FC<Props> = (props) => {
  const { formObject, imageUrl } = props
  const getFormItem = (item: FormObject) => {
    switch (item.type) {
      case 'select':
        return (
          <Select
            placeholder={'请选择' + item.label}
            options={item.options}
            mode={item.mode || undefined}
          />
        )
      case 'input':
        return <Input placeholder={'请输入' + item.label} />
      case 'timePicker':
        return <DatePicker.RangePicker placeholder={['开始时间', '结束时间']} />
      case 'treeSelect':
        return (
          <TreeSelect
            showCheckedStrategy="SHOW_ALL"
            treeData={item.treeDate}
            treeCheckable={true}
            key={item.name}
          />
        )
      case 'upload':
        return (
          <Upload
            maxCount={1}
            beforeUpload={() => false}
            listType="picture-card"
            defaultFileList={[
              {
                uid: '',
                url: BASE_URL + imageUrl,
                name: ''
              }
            ]}
            onPreview={(e) => console.log(e)}
          >
            <PlusOutlined />
          </Upload>
        )
      default:
        return <Input />
    }
  }
  const normFile = useCallback((e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e
  }, [])
  // const onPreview = async (file: UploadFile) => {
  //   let src = file.url as string
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader()
  //       reader.readAsDataURL(file.originFileObj as RcFile)
  //       reader.onload = () => resolve(reader.result as string)
  //     })
  //   }
  //   const image = new Image()
  //   image.src = src
  //   const imgWindow = window.open(src)
  //   imgWindow?.document.write(image.outerHTML)
  // }
  return (
    <Form.Item
      label={formObject.label}
      name={formObject.name}
      valuePropName={formObject.type === 'upload' ? 'fileList' : 'value'}
      getValueProps={formObject.type === 'upload' ? normFile : undefined}
    >
      {getFormItem(formObject)}
    </Form.Item>
  )
}
export default memo(Template)
