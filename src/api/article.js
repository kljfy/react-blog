import request from '@/utils/request'

// 添加文章
export const addArticle = data => {
  return request({
    method: 'post',
    url: '/article/add',
    data
  })
}

// 查询首页文章列表
export const getHomeArticleList = params => {
  return request({
    method: 'get',
    url: '/article/getHomeList',
    params
  })
}

// 查询文章列表
export const getArticleList = data => {
  return request({
    method: 'post',
    url: '/article/getArticleList',
    params: {
      keyword: data.keyword
    },
    data: {
      ...data.pageParams
    }
  })
}

// 查询文章信息
export const getArticleInfo = articleId => {
  return request({
    method: 'get',
    url: `/article/getArticleInfo/${articleId}`
  })
}

// 修改文章信息
export const updateArticleInfo = data => {
  return request({
    method: 'post',
    url: '/article/updateById',
    data
  })
}

// 根据 id 删除文章
export const deleteArticleById = id => {
  return request({
    method: 'get',
    url: `/article/deleteById/${id}`
  })
}

// 上传文章图片
export const uploadArticlePicture = data => {
  return request({
    method: 'post',
    url: '/oss/uploadArticlePicture',
    data
  })
}

// 根据url删除文章图片
export const deleteArticlePicture = params => {
  return request({
    method: 'get',
    url: '/article/deleteMdPicture',
    params
  })
}

// 根据文章id查看当前已绑定该文章的图片
export const getPicturesByArticleId = params => {
  return request({
    method: 'get',
    url: '/article/getPicturesByArticleId',
    params
  })
}

// 清理未绑定的图片
export const deleteNoBindPicture = () => {
  return request({
    method: 'get',
    url: '/article/deleteNoBindPicture',
  })
}
