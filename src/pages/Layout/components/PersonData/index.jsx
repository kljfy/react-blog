import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Modal, Dropdown, Menu, Space, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { SettingOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { removeToken } from '@/store/actions/login'
import { removeToken as storageRemoveToken } from '@/utils/storage'
import { removeUser } from '@/store/actions/user'

export default function PersonData() {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const token = useSelector(state => state.login.token)
  const user = useSelector(state => state.user)

  const { confirm } = Modal

  const onClick = ({ key }) => {
    if (key === '0') {
      history.push('/home/articleEdit', { from: location.pathname })
    } else if (key === '1') {
      history.push('/home/personCenter')
    } else if (key === '2') {
      confirm({
        title: '确认退出登录?',
        icon: <ExclamationCircleOutlined />,
        centered: true,
        cancelText: '取消',
        okText: '确定',
        onOk() {
          dispatch(removeToken())
          dispatch(removeUser())
          storageRemoveToken()
          message.success('退出成功')
          history.push('/login')
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    }
  }
  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: '文章编写',
          key: '0'
        },
        {
          label: '个人中心',
          key: '1'
        },
        {
          label: '退出登录',
          key: '2'
        }
      ]}
    />
  )
  const GoToLogin = (
    <div
      className="go-to-login"
      onClick={() =>
        history.push('/login', {
          from: location.pathname
        })
      }
    >
      登录
    </div>
  )
  return (
    <div className={styles.root}>
      {!!token ? (
        <Dropdown className="person-data" overlay={menu}>
          <a onClick={e => e.preventDefault()}>
            <Space>
              {`hi~ ${user.nickname}`}
              <SettingOutlined />
            </Space>
          </a>
        </Dropdown>
      ) : (
        GoToLogin
      )}
    </div>
  )
}
