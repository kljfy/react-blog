import React, { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import { LeftOutlined } from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import styles from './index.module.scss'
import { getArticleInfo } from '@/api/article'

function MdView() {
  const location = useLocation()
  const history = useHistory()

  const {
    state: { articleId }
  } = location
  const [article, setArticle] = useState({})
  useEffect(async () => {
    try {
      const res = await getArticleInfo(articleId)
      if (res.code === 200) {
        setArticle(() => {
          return res.data.articleInfo
        })
      } else {
        message.error('获取文章详情失败，请稍后重试')
      }
    } catch (e) {
      console.log(e)
      // message.error('获取文章详情失败，请稍后重试');
    }
  }, [])

  return (
    <div className={styles.root}>
      <div className="md-view-body">
        <div className="go-edit-btn">
          <Button
            className="margin-right-8px"
            // type="primary"
            icon={<LeftOutlined />}
            onClick={() => history.go(-1)}
          >
            返回
          </Button>
        </div>
        <div className="title">{article.title}</div>
        {article.description ? (
          <div className="description">{article.description}</div>
        ) : null}
        <MDEditor.Markdown
          source={article.content}
          style={{ whiteSpace: 'pre-wrap' }}
        />
      </div>
    </div>
  )
}

export default MdView
