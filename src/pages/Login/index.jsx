import React, { useState, useRef } from 'react'
// import loginImg from '@/assets/images/loginBgImg.png'
import { Button, Form, Input, message } from 'antd'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import styles from './index.module.scss'
import { login, register } from '@/api/login'
import { getUserInfo } from '@/api/user'
import { saveToken } from '@/store/actions/login'
import { setToken } from '@/utils/storage'
import { saveUser } from '@/store/actions/user'

export default function Login() {
  const dispatch = useDispatch()
  const history = useHistory()

  const loginForm = useRef(null)
  const regForm = useRef(null)
  const [isLogin, setIsLogin] = useState(true)

  const onLogin = async values => {
    const res = await login(values)
    if (res.code === 200) {
      message.success('登录成功')
      dispatch(saveToken(res.data))
      setToken(res.data)
      const user = await getUserInfo()
      // const { nickname, username, isAdmin, avatar } = user.data.user
      dispatch(saveUser(user.data.user))
      if (history.location?.state?.from) {
        history.go(-1)
      } else {
        history.push('/home')
      }
    } else {
      message.error(res.message)
    }
  }

  const handlerClearForm = () => {
    if (isLogin) {
      loginForm.current.setFieldsValue({
        username: '',
        password: ''
      })
    } else {
      regForm.current.setFieldsValue({
        nickname: '',
        username: '',
        password: ''
      })
    }
    setIsLogin(!isLogin)
  }

  const onRegister = async values => {
    const res = await register(values)
    if (res.code === 200) {
      message.success('注册成功')
      handlerClearForm()
    } else {
      message.error(res.message)
    }
  }

  let formBody
  if (isLogin) {
    formBody = (
      <div className="form-body">
        <Form
          ref={loginForm}
          name="basic"
          labelCol={{
            span: 7
          }}
          wrapperCol={{
            span: 16
          }}
          initialValues={{
            username: '',
            password: ''
          }}
          autoComplete="off"
          onFinish={onLogin}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              }
            ]}
          >
            <Input maxLength={16} autoComplete="true" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input.Password maxLength={16} autoComplete="true" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <Button className="btn-right-margin-8" type="primary" htmlType="submit">
              登录
            </Button>
            <Button htmlType="button" onClick={() => handlerClearForm()}>
              前往注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  } else {
    formBody = (
      <div className="form-body">
        <Form
          ref={regForm}
          name="basic"
          labelCol={{
            span: 7
          }}
          wrapperCol={{
            span: 16
          }}
          initialValues={{
            nickname: '',
            username: '',
            password: ''
          }}
          autoComplete="off"
          onFinish={onRegister}
        >
          <Form.Item
            label="昵称"
            name="nickname"
            rules={[
              {
                required: true,
                message: '请输入用户昵称'
              }
            ]}
          >
            <Input maxLength={7} autoComplete="true" />
          </Form.Item>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名'
              }
            ]}
          >
            <Input maxLength={16} autoComplete="true" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入用户密码'
              }
            ]}
          >
            <Input.Password maxLength={16} autoComplete="true" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <Button className="btn-right-margin-8" type="primary" htmlType="submit">
              注册
            </Button>
            <Button htmlType="button" onClick={() => handlerClearForm()}>
              前往登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <img
        className="login-bg-img"
        src="https://kljfy-blog.oss-cn-hangzhou.aliyuncs.com/kljfy-blog-login-backgroundImg/loginBgImg.png"
        alt="bgImg"
      />
      <div className="form-border">
        <p className="form-title">登录</p>
        {/* 登录或注册框 */}
        {formBody}
      </div>
    </div>
  )
}
