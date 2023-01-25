import React, { useState } from 'react'
import { Button, Checkbox, Form } from 'antd'
import type { LoginMode, AccountLogin } from '@/types/login'
import { LoginWrapper } from './style'
import { Link, useNavigate } from 'react-router-dom'
import LoginModeAccount from './login-mode-account'
import LoginModePhone from './login-mode-phone'
import IconFont from '@/components/icon-font'
import { useAppDispatch } from '@/store'
import { fetchLoginAction } from '@/store/modules/login'
import { localCache } from '@/utils/cache'
import { IF_REMEMBER, PASSWORD, USERNAME } from '@/constant'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const onFinish = async (userinfo: AccountLogin) => {
    const result = await dispatch(fetchLoginAction(userinfo))
    if (userinfo.remember) {
      localCache.setCache(USERNAME, userinfo.username)
      localCache.setCache(PASSWORD, userinfo.password)
    } else {
      localCache.removeCache(USERNAME)
      localCache.removeCache(PASSWORD)
    }

    if (result.payload) {
      navigate('/home')
    }
  }
  const [loginMode, setLoginMode] = useState<LoginMode>('账号登陆')
  const changeRemember = (e: CheckboxChangeEvent) => {
    localCache.setCache<boolean>(IF_REMEMBER, e.target.checked)
  }
  return (
    <LoginWrapper loginMode={loginMode}>
      <div className="login">
        <h1>后台管理系统</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: localCache.getCache<boolean>(IF_REMEMBER) ? true : false,
            username: localCache.getCache<string>(USERNAME) || '',
            password: localCache.getCache<string>(PASSWORD) || ''
          }}
          onFinish={onFinish}
        >
          <div className="login-panel">
            <div className="login-mode">
              <div className="account" onClick={() => setLoginMode('账号登陆')}>
                <IconFont type="icon-yonghu"></IconFont>
                账号登陆
              </div>
              <div className="phone" onClick={() => setLoginMode('手机登录')}>
                <IconFont type="icon-shouji"></IconFont>手机登录
              </div>
            </div>
            <div className="login-info">
              {loginMode == '账号登陆' ? (
                <LoginModeAccount></LoginModeAccount>
              ) : (
                <LoginModePhone></LoginModePhone>
              )}
            </div>
          </div>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox onChange={(e) => changeRemember(e)}>记住密码</Checkbox>
            </Form.Item>
            <Link className="login-form-forgot" to="">
              忘记密码
            </Link>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              立即登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LoginWrapper>
  )
}

export default App
