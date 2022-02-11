const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlWebPackPlugin({
    publicPath: './',
    template: path.join(__dirname,'./index.html'),   // 源文件
    filename: 'index.html',   // 生成的内存中首页的名称
    minify: {
        minimize: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
    }
});
module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', './src/index.js'],
    plugins: [
        htmlPlugin,
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            { //匹配后缀名为css的文件,然后分别用css-loader，vue-style-loader去解析
                //解析器的执行顺序是从下往上(先css-loader再vue-style-loader)
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    esModule: false
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                }
            }
        ]
    },
    devtool: 'eval',
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    }
};