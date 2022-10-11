const env = process.env.NODE_ENV

const config = {
  development: {
    baseURL: '/api'
  },
  production: {
    baseURL: '/api'
  }
}

export default config[env].baseURL
