import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'post',
    url: '/login/user',
    data
  })
}

export const register = data => {
  return request({
    method: 'post',
    url: '/login/register/user',
    data
  })
}
