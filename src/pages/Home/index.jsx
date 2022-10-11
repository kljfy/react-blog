import React, { useEffect, useState } from 'react'
import { List, Button, message } from 'antd'
import styles from './index.module.scss'
import ArticleList from '@/components/ArticleList'
import PersonInfo from './components/PersonInfo'
import { getHomeArticleList as getHomeArticleListApi } from '@/api/article'

export default function Home() {
  const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [articleList, setArticleList] = useState([])
  const [pageCurrent, setPageCurrent] = useState(1)
  const [isLoad, setIsLoad] = useState(true)
  const pageSize = 10 // 首页每次加载条数

  useEffect(async () => {
    try {
      const res = await getHomeArticleListApi({
        page: pageCurrent,
        size: pageSize
      })
      if (res.code === 200) {
        const { page } = res.data
        setPageCurrent(page.page + 1)
        setArticleList(res.data.list)
      } else {
        message.error('初始化首页列表失败，请稍后重试')
      }
      setInitLoading(false)
    } catch (e) {
      setInitLoading(false)
    }
  }, [])

  const onLoadMore = async () => {
    setLoading(true)
    try {
      const res = await getHomeArticleListApi({
        page: pageCurrent,
        size: pageSize
      })
      if (res.code === 200) {
        const { page } = res.data
        setPageCurrent(page.page + 1)
        setArticleList([...articleList, ...res.data.list])
        if (res.data.list.length < pageSize) {
          setIsLoad(false)
        }
      }
      setLoading(false)
    } catch (e) {
      message.error('加载失败，请稍后重试')
      setLoading(false)
    }
  }

  const loadMore =
    !initLoading && !loading && isLoad ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px'
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : isLoad ? null : (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px'
        }}
      >
        <Button type="text">It is all, nothing more 🤐</Button>
      </div>
    )

  return (
    <div className={styles.root}>
      <div className="home-body clearfix">
        <div className="left">
          <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={articleList}
            renderItem={item => (
              <List.Item>
                <ArticleList info={item} key={item.id}></ArticleList>
              </List.Item>
            )}
          />
        </div>
        <div className="right">
          <PersonInfo />
        </div>
      </div>
      <div className="home-footer"></div>
    </div>
  )
}
