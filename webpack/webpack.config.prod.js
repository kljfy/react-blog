// 合并规则
const { merge } = require('webpack-merge')
// 导入基础配置
const { baseConfig } = require('./webpack.config.base.js')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

process.env.baseURL = '172.26.141.195'

module.exports = merge(baseConfig, {
  // 环境配置
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new BundleAnalyzerPlugin()
  ]
})