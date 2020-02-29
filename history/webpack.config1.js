let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: { // 开发服务器的配置
    port: 3000, // 端口号修改
    progress: true,
    contentBase: './build',
    compress: true,
    open: true, // 打包后自动打开

  },
  mode: 'development', // 模式  默认两种 production development
  entry: './src/index.js', // 入口
  output: {
    filename: 'index.[hash:8].js', // 打包后的文件名
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true, // 去掉双引号
        collapseWhitespace: true, // 打包成单行
      },
      hash: true,
    }),

  ],
  module: { // 模块
    rules: [ // 规则 css-loader 负责解析@import这种语法的
      // style-loader 它是把css插入到head标签中
      // loader的特点 希望单一
      // loader的用法字符串 只用一个loader
      // 多个loader需要[ ]
      // loader的顺序 默认是从右向左执行  从下到上执行
      // loader 还可以写成 对象形式
      // {
      //   test: /\.css$/,
      //   use: [{
      //       loader: 'style-loader',
      //       options: {
      //         insertAt: 'top'
      //       }
      //     },
      //     'css-loader'
      //   ],
      // },
      {
        // 命令 yarn add less less-loader
        // 可以处理less文件  sass stylus  node-sass sass-loader
        // stylus stylus-loader
        test: /\.less$/,
        use: [{
            loader: 'style-loader',
            options: {
              insertAt: 'top'
            }
          },
          'css-loader', // @import 解析路径
          'less-loader', //less -> css

        ],
      },

    ]

  }
}