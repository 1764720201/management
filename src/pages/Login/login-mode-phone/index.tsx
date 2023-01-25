import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Col, Form, Input, Row } from 'antd'
interface Props {
  children?: ReactNode
}
const LoginModePhone: FC<Props> = (props) => {
  return (
    <div>
      <Form.Item
        label="手机号"
        name="phone"
        required={false}
        rules={[{ required: true, message: '必须填入手机号' }]}
      >
        <Input placeholder="请输入手机号" />
      </Form.Item>
      <Form.Item
        label="验证码"
        name="code"
        required={false}
        rules={[{ required: true, message: '必须填入验证码' }]}
      >
        <Row justify="space-between">
          <Col span={11}>
            <Input />
          </Col>
          <Col span={11}>
            <Button type="primary">获取验证码</Button>
          </Col>
        </Row>
      </Form.Item>
    </div>
  )
}
export default memo(LoginModePhone)
