import React from 'react'
import { Image, Button, Popconfirm, message } from 'antd'
import PropTypes from 'prop-types'
import styles from './index.module.scss'
import { deleteArticlePicture } from '@/api/article'

function ImgFlowItem({ imgInfo, onDelete }) {
  const handleDeletePicture = async () => {
    try {
      const res = await deleteArticlePicture({ imgPath: imgInfo.imgPath, imgId: imgInfo.id })
      if (res.code === 200) {
        message.success('删除成功');
        onDelete()
      } else {
        message.error('删除失败，请稍后重试')
      }
    } catch (e) {
      message.error('删除失败，请稍后重试')
    }
  }
  return (
    <div className={styles.root}>
      <div className="img-flow-item">
        <Image style={{ display: 'block' }} width={240} src={imgInfo.imgUrl} />
        <p className="picture-title">{imgInfo.imgPath.slice(61)}</p>
        <div className="operate-btn">
          <Popconfirm
            title="是否确认删除"
            okText="确认"
            cancelText="取消"
            onConfirm={handleDeletePicture}
          >
            <Button size="small">删除</Button>
          </Popconfirm>
        </div>
      </div>
    </div>
  )
}

ImgFlowItem.propTypes = {
  imgInfo: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default ImgFlowItem
