import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Col, Form, Modal, Row } from 'antd'
import { FormObject } from '@/types/search'
import GetFormItem from '../get-form-item'

interface Props {
  children?: ReactNode
  title: string
  isShowModal: boolean
  formObjects: FormObject[]
  setModalForm: <T extends object>(value: T) => void
  setIsShowModal: (value: boolean) => void
  initialValues?: any
}

const AddModel: FC<Props> = (props) => {
  const {
    isShowModal,
    title,
    formObjects,
    setModalForm,
    setIsShowModal,
    initialValues
  } = props
  const newCurrent = { ...initialValues }
  delete newCurrent.id
  return (
    <Modal
      destroyOnClose={true}
      title={title}
      open={isShowModal}
      footer={null}
      maskClosable={false}
      onCancel={() => setIsShowModal(false)}
    >
      <Form
        initialValues={newCurrent}
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        onFinish={(value) => setModalForm(value)}
      >
        {formObjects
          .filter((item) =>
            Object.values(newCurrent).length ? !item.hidden : item
          )
          .map((formObject) => {
            return (
              <GetFormItem
                imageUrl={initialValues?.picture as string}
                key={formObject.label}
                formObject={formObject}
              ></GetFormItem>
            )
          })}
        <Row justify="space-around">
          <Col>
            <Button type="default" onClick={() => setIsShowModal(false)}>
              取消
            </Button>
          </Col>
          <Col>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
export default memo(AddModel)
