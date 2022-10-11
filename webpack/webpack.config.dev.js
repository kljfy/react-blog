
// 合并规则
const { merge } = require('webpack-merge');
// 导入基础配置
const { baseConfig } = require('./webpack.config.base.js');


module.exports = merge(baseConfig, {
  // 环境配置
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    historyApiFallback: true,
    port: 9527,
    hot: true,
    open: true,
    host: '192.168.3.12',
    proxy: {
      '/api': {
        target: 'http://192.168.3.12:8001',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  }
});

