const path = require('path')
// DefinePlugin 允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用。
const { DefinePlugin } = require('webpack')
// 根据相对路径获取绝对路径
const resolvePath = relativePath => path.resolve(__dirname, relativePath)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') // 这个插件使用 cssnano 优化和压缩 CSS。
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

// 基础配置
const baseConfig = {
  // 入口文件
  entry: {
    index: resolvePath('../src/index.jsx')
  },
  // 出口文件
  output: {
    path: resolvePath('../dist'),
    filename: 'static/js/[name].[chunkhash:8].js',
    publicPath: '/',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader',
          // {
          //   loader: 'eslint-loader',
          //   enforce: true,
          //   options: {
          //     formatter: require('eslint-friendly-formatter'),
          //   },
          // },
          'eslint-loader'
        ],
        include: [resolvePath('../src')]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/[hash:10][ext][query]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'blog',
      template: resolvePath('../index.html'),
      filename: '[name].html',
      chunks: ['index'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css'
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'https://now8.gtimg.com/now/lib/16.8.6/react.min.js?_bid=4042',
    //       global: 'React',
    //     },
    //     {
    //       module: 'react-dom',
    //       entry:
    //         'https://now8.gtimg.com/now/lib/16.8.6/react-dom.min.js?_bid=4042',
    //       global: 'ReactDOM',
    //     },
    //   ],
    // }),
  ],
  resolve: {
    alias: {
      '@': resolvePath('../src/'),
      '@scss': resolvePath('../src/assets/styles'),
      '@images': resolvePath('../src/assets/images')
    },
    extensions: ['.jsx', '...']
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin(), '...'],
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          // name(module) {
          //   //获取每个npm包的名称
          //   const packageName = module.context.match(
          //     /[\\/]node_modules[\\/](.*?)([\\/]|$)/
          //   );

          //   //对npm的包名子添加前缀，并去掉@
          //   return `npm.${packageName.replace('/node_modules', '')}`;
          // },
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'all'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}

module.exports = {
  baseConfig
}
