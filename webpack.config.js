let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  devServer: { // 开发服务器的配置
    port: 8080, // 端口号修改
    progress: true,
    contentBase: './build',
    compress: true,
    open: true, // 打包后自动打开
  },
  optimization: {
    minimizer: [
      // new UglifyJsPlugin({
      //   cache: true,
      //   parallel: true,
      //   sourceMap: true
      // }),
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ],
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
      // minify: {
      //   removeAttributeQuotes: true, // 去掉双引号
      //   collapseWhitespace: true, // 打包成单行
      // },
      // hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ],
  module: { // 模块
    rules: [ 
      {
        test: /\.js$/,
        use:{
          loader: 'babel-loader',
          options:{
            presets:[
              '@babel/preset-env'
            ],
            plugins:[
              // '@babel/plugin-proposal-class-properties'
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }]
            ]
          }
        }
      },
      // 规则 css-loader 负责解析@import这种语法的
      // style-loader 它是把css插入到head标签中
      // loader的特点 希望单一
      // loader的用法字符串 只用一个loader
      // 多个loader需要[ ]
      // loader的顺序 默认是从右向左执行  从下到上执行
      // loader 还可以写成 对象形式
      {
        test: /\.css$/,
        use: [{
            loader: 'style-loader',
            options: {
              // insertAt: 'top'
              insert: 'head'
            }
          },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        // 命令 yarn add less less-loader
        // 可以处理less文件  sass stylus  node-sass sass-loader
        // stylus stylus-loader
        test: /\.less$/,
        use: [{
            loader: 'style-loader',
            // loader:  MiniCssExtractPlugin.lader,
            options: {
              // esModule: true,
              // insertAt: 'top'
              insert: 'head'
            }
          }, {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          }, {
            loader: 'css-loader', // @import 解析路径
          },
          'postcss-loader',
          {
            loader: 'less-loader', //less -> css
          },

        ],
      },
      // 命令：yarn add mini-css-extract-pulugin -D

    ]

  }
}