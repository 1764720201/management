import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { SearchWrapper } from './style'
import { Button, Col, Form, Row, theme } from 'antd'
import { SearchOutlined, SyncOutlined } from '@ant-design/icons'
import type { FormObject } from '@/types/search'
import GetFormItem from '../get-form-item'
interface Props {
  children?: ReactNode
  formObject: FormObject[]
  search: <T extends object>(values: T) => void
}
const Search: FC<Props> = (props) => {
  const { token } = theme.useToken()
  const [form] = Form.useForm()
  const { formObject, search } = props

  const formStyle = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24
  }
  return (
    <SearchWrapper>
      <Form
        requiredMark={false}
        form={form}
        name="advanced_search"
        style={formStyle}
        onFinish={(values) => search(values)}
      >
        <Row gutter={24}>
          {formObject.map((item) => {
            return (
              <Col key={item.name} span={8}>
                <GetFormItem formObject={item}></GetFormItem>
              </Col>
            )
          })}
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button
              style={{ margin: '0 8px' }}
              onClick={() => {
                form.resetFields()
                search({})
              }}
              icon={<SyncOutlined />}
            >
              重置
            </Button>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              查询
            </Button>
          </Col>
        </Row>
      </Form>
    </SearchWrapper>
  )
}
export default memo(Search)
