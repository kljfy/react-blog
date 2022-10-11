import axios from 'axios'
import { getToken } from './storage'
import baseURL from '@/config/api'

const http = axios.create({
  baseURL,
  timeout: 50000
})

http.interceptors.request.use(config => {
  const { token } = getToken()
  config.headers.Authorization = token
  return config
})

http.interceptors.response.use(
  response => {
    return response.data
  },
  err => {
    if (!err.response) {
      console.log('网络繁忙，请稍后重试')
      // return Promise.reject(err);
    }
    return Promise.reject(err)
  }
)

export default http
