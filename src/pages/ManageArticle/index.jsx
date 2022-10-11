import React, { useState, useEffect } from 'react'
import { Input, Space, Table, Pagination, message, Popconfirm } from 'antd'
import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'
import {
  getArticleList as getArticleListApi,
  deleteArticleById
} from '@/api/article'

export default function ManageArticle() {
  const history = useHistory()
  const { Search } = Input
  const [keyword, setKeyword] = useState('')
  const [data, setData] = useState([])
  const [tableLoading, setTableLoading] = useState(false)

  const [pageParams, setPageParams] = useState({
    current: 1,
    size: 10,
    total: 30
  })

  const getArticleList = async (keyword, pageParams) => {
    setTableLoading(true)
    try {
      const res = await getArticleListApi({
        keyword,
        pageParams
      })
      if (res.code === 200) {
        const { page } = res.data
        setPageParams({
          current: page.page,
          size: page.size,
          total: page.total
        })
        setData(res.data.list)
      } else {
        message.error('获取数据失败，请稍后重试')
      }
      setTableLoading(false)
    } catch (e) {
      setTableLoading(false)
      message.error('获取数据失败，请稍后重试')
    }
  }
  const onSearch = value => {
    setKeyword(value)
    getArticleList(value, {
      page: pageParams.current,
      size: pageParams.size
    })
  }

  const handlePaginationChange = (page, size) => {
    getArticleList(keyword, {
      page,
      size
    })
  }

  const goToView = id => {
    history.push('/home/articleView', { articleId: id })
  }
  const goToEdit = id => {
    history.push('/home/articleEdit', { articleId: id, isEdit: true })
  }
  const handleConfirmDelete = async id => {
    try {
      const res = await deleteArticleById(id)
      if (res.code === 200) {
        message.success('删除成功')
        getArticleList(keyword, {
          page: pageParams.current,
          size: pageParams.size
        })
      } else {
        message.error('删除失败，请稍后重试')
      }
    } catch (e) {
      message.error('删除失败，请稍后重试')
    }
  }

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (title, record) => (
        <a onClick={() => goToView(record.id)}>{title}</a>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'gmtCreate',
      key: 'createTime',
      width: 300,
      render: createTime => <span>{createTime}</span>
    },
    {
      title: '操作',
      key: 'action',
      width: 250,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => goToEdit(record.id)}>编辑</a>
          <Popconfirm
            title="确认删除"
            okText="确认"
            cancelText="取消"
            onConfirm={() => handleConfirmDelete(record.id)}
          >
            <a href="#">删除</a>
          </Popconfirm>
        </Space>
      )
    }
  ]
  useEffect(() => {
    getArticleList(keyword, { page: pageParams.current, size: pageParams.size })
  }, [])
  return (
    <div className={styles.root}>
      <div className="manage-body">
        <div className="input-search">
          <Search
            style={{ width: '400px' }}
            placeholder="请输入要查询的文章"
            allowClear
            onSearch={onSearch}
            enterButton
          />
        </div>
        <div className="article-manage-table">
          <Table
            loading={tableLoading}
            columns={columns}
            dataSource={data}
            rowKey="id"
            pagination={false}
          />
        </div>
        <div className="pagination-my">
          <Pagination
            showQuickJumper
            showSizeChanger
            pageSizeOptions={[10, 20]}
            current={pageParams.current}
            pageSize={pageParams.size}
            total={pageParams.total}
            showTotal={total => `总 ${total} 条`}
            onChange={handlePaginationChange}
          />
        </div>
      </div>
    </div>
  )
}
