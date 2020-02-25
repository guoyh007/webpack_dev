let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: { // 开发服务器的配置
        port: 3000, // 端口号修改
        progress: true,
        contentBase:'./build', 
        compress: true,
        open: true, // 打包后自动打开

    },
    mode: 'development', // 模式  默认两种 production development
    entry: './src/index.js', // 入口
    output: {
        filename: 'index.[hash:8].js', // 打包后的文件名
        path: path.resolve( __dirname, 'build'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true, // 去掉双引号
                collapseWhitespace:true,// 打包成单行
            },
            hash: true,
        }),

    ]
}