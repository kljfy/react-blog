import request from '@/utils/request'

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/user/getUserInfo'
  })
}

// 修改用户信息
export const updateUserInfo = data => {
  return request({
    method: 'post',
    url: '/user/updateUserInfo',
    data
  })
}
