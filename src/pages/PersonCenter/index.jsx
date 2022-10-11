import React, { useState } from 'react'
import { Button, Form, Input, message, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import styles from './index.module.scss'
import avatarApi from '@/config/avatarApi'
import { getToken } from '@/utils/storage'
import { updateUserInfo, getUserInfo } from '@/api/user'
import { updateUser } from '@/store/actions/user'

const { TextArea } = Input

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }

  const isLt2M = file.size / 1024 / 1024 < 0.1

  if (!isLt2M) {
    message.error('Image must smaller than 100K!')
  }

  return isJpgOrPng && isLt2M
}

function PersonCenter() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [btnLoading, setBtnLoading] = useState(false)

  // 表单保存
  const onFinish = async values => {
    try {
      setBtnLoading(true)
      const res = await updateUserInfo(values)
      if (res.code === 200) {
        message.success('保存成功')
        dispatch(updateUser(res.data.newUserInfo))
      }
    } catch (e) {
      console.log(e)
      message.error('保存失败，请稍后重试')
    } finally {
      setBtnLoading(false)
    }
  }

  // 表单保存失败
  const onFinishFailed = errorInfo => {
    message.error(errorInfo)
  }

  /**
   * 头像上传
   */
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()

  const handleChange = async info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }

    if (info.file.status === 'done') {
      const res = await getUserInfo()
      if (res.code === 200) {
        dispatch(updateUser(res.data.user))
      }
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, url => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </div>
  )

  return (
    <div className={styles.root}>
      <div className="person-center">
        <Form
          name="basic"
          labelCol={{
            span: 3
          }}
          wrapperCol={{
            span: 20
          }}
          initialValues={{
            nickname: user.nickname,
            username: user.username,
            personSignature: user.personSignature ? user.personSignature : ''
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="昵称"
            name="nickname"
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              }
            ]}
          >
            <Input maxLength={7} />
          </Form.Item>

          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item label="签名" name="personSignature">
            <TextArea showCount maxLength={50} />
          </Form.Item>
          <Form.Item label="头像">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              headers={{
                Authorization: getToken().token
              }}
              action={avatarApi}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: '100%'
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
            <Button loading={btnLoading} type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default PersonCenter
