const env = process.env.NODE_ENV

const config = {
  development: {
    baseURL: 'http://localhost:8001/user/updateAvatar'
  },
  production: {
    baseURL: 'http://47.96.11.61:80/api/user/updateAvatar'
  }
}

export default config[env].baseURL
