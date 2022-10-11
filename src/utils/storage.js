// 用户 token 到缓存名
const TOKEN_KEY = 'blog-token'

/**
 * 将 token 信息写入缓存
 */
export const setToken = token => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
}

/**
 * 从本地缓存中获取 token 信息
 */
export const getToken = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY)) || {}
}

/**
 * 删除本地缓存中的 token 信息
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 判断缓存中是否有 token 信息
 */
export const hasToken = () => {
  return !!localStorage.getItem(TOKEN_KEY)
}
