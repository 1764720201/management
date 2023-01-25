import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Form, Input } from 'antd'

interface Props {
  children?: ReactNode
}
const LoginModeAccount: FC<Props> = () => {
  return (
    <div>
      <Form.Item
        label="账号"
        name="username"
        required={false}
        rules={[{ required: true, message: '必须填入账号' }]}
      >
        <Input placeholder="请输入账号" />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        required={false}
        rules={[{ required: true, message: '必须填入密码' }]}
      >
        <Input.Password type="password" placeholder="请输入密码" />
      </Form.Item>
    </div>
  )
}
export default memo(LoginModeAccount)
