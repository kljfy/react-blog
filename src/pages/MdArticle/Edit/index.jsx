import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Upload, Modal, Spin, Empty } from 'antd'
import { UploadOutlined, LeftOutlined } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import styles from './index.module.scss'
import {
  addArticle,
  updateArticleInfo,
  getArticleInfo,
  uploadArticlePicture,
  getPicturesByArticleId,
  deleteNoBindPicture
} from '@/api/article'
import ImgFlowItem from './components/ImgFlowItem'

export default function MdEdit() {
  const history = useHistory()
  const location = useLocation()

  const [form] = Form.useForm()
  const [mdValue, setMdValue] = useState('')

  const isEdit = location.state?.isEdit === true

  useEffect(async () => {
    // 进入时 清空之前未绑定的图片
    deleteNoBindPicture()
    if (isEdit) {
      try {
        const {
          state: { articleId }
        } = location
        const res = await getArticleInfo(articleId)
        if (res.code === 200) {
          const { articleInfo } = res.data
          setMdValue(articleInfo.content)
          form.setFieldsValue({
            title: articleInfo.title,
            description: articleInfo.description,
            content: articleInfo.content
          })
        } else {
          message.error('获取文章详情失败，请稍后重试')
        }
      } catch (e) {
        console.log(e)
      }
    }
  }, [])

  const onMdChange = val => {
    setMdValue(val)
    form.setFieldValue('content', val)
  }
  // 保存文章
  const onFinish = async values => {
    try {
      const fn = isEdit ? updateArticleInfo : addArticle
      let data
      if (isEdit) {
        data = {
          id: location.state.articleId,
          ...values
        }
      } else {
        data = values
      }
      const res = await fn(data)
      if (res.code === 200) {
        message.success('保存成功')
        history.go(-1)
      } else {
        message.error('保存失败，请稍后重试')
      }
    } catch (e) {
      message.error('保存失败，请稍后重试')
    }
  }

  /**
   * 上传图片
   */
  const { TextArea } = Input
  const [fileList, setFileList] = useState([])
  const [uploading, setUploading] = useState(false)
  const [isShowUrl, setIsShowUrl] = useState(false)
  const [urlValue, setUrlValue] = useState('')

  const handleUpload = async () => {
    const formData = new FormData()
    fileList.forEach(file => {
      formData.append('file', file)
    })
    setUploading(true) // You can use any AJAX library you like

    const res = await uploadArticlePicture(formData)
    if (res.code === 200) {
      message.success('上传成功')
      setUrlValue(res.data.url)
      setIsShowUrl(true)
      setFileList([])
    }
    setUploading(false)
  }

  const props = {
    onRemove: file => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: file => {
      setFileList([file])
      return false
    },
    fileList
  }

  /**
   * 查看图片
   */
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showPictureLoading, setShowPictureLoading] = useState(false)
  const [pictureList, setPictureList] = useState([])

  const handleShowPicture = async () => {
    try {
      setIsModalOpen(true)
      setShowPictureLoading(true)
      const res = await getPicturesByArticleId({ articleId: location.state.articleId })
      if (res.code === 200) {
        setPictureList(res.data.list)
      } else {
        message.error('获取图片失败，请稍后重试')
      }
    } catch (e) {
      message.error('获取图片失败，请稍后重试')
    } finally {
      setShowPictureLoading(false)
    }
  }

  return (
    <div className={styles.root}>
      <div className="md-view-body">
        <div className="upload-div">
          <div className="upload-btn">
            <Upload {...props}>
              <Button loading={uploading} icon={<UploadOutlined />}>
                上传图片
              </Button>
            </Upload>
            <Button
              type="primary"
              onClick={handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
              style={{
                marginTop: 16
              }}
            >
              {uploading ? '上传中...' : '开始上传'}
            </Button>
          </div>
          {isShowUrl ? <TextArea rows={6} placeholder="上传的图片url" value={urlValue} /> : null}
        </div>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 22 }}
          initialValues={{ title: '', description: '', content: '' }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            wrapperCol={{
              offset: 2,
              span: 16
            }}
          >
            <Button
              className="margin-right-8px"
              icon={<LeftOutlined />}
              htmlType="button"
              onClick={() => history.go(-1)}
            >
              返回
            </Button>
            {isEdit ? (
              <Button className="margin-right-8px" htmlType="button" onClick={handleShowPicture}>
                查看图片
              </Button>
            ) : null}
            <Button className="margin-right-8px" type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
          <Form.Item
            label="文章标题"
            name="title"
            rules={[{ required: true, message: '请填写文章标题!' }]}
          >
            <Input allowClear />
          </Form.Item>

          <Form.Item label="文章描述" name="description">
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="文章内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容!' }]}
          >
            <div className="md-edit">
              <MDEditor value={mdValue} onChange={onMdChange} />
            </div>
          </Form.Item>
          {/* <Form.Item
            wrapperCol={{
              offset: 2,
              span: 16
            }}
          >
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item> */}
        </Form>
      </div>
      <Modal
        width={1200}
        title="查看图片"
        maskClosable={false}
        destroyOnClose
        footer={null}
        wrapClassName="md-picture-flow"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        <Spin spinning={showPictureLoading}>
          <div style={{ overflowY: 'auto', height: '500px' }}>
            {pictureList.length > 0 ? (
              <div className="flow-content">
                {pictureList.map(item => (
                  <ImgFlowItem key={item.id} imgInfo={item} onDelete={handleShowPicture} />
                ))}
              </div>
            ) : (
              <Empty />
            )}
          </div>
        </Spin>
      </Modal>
    </div>
  )
}
