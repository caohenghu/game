const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const path = require('path')

module.exports = options => {
    const host = '192.168.1.41'
    const port = 33333
    const buildDir = 'dist'
    const isLocal = options.local
    const minify = {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true, // 删除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, // 删除script上的type
        removeStyleLinkTypeAttributes: true // 删除style上的type
    }

    const rules = [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },
        {
            test: /\.html$/,
            exclude: /node_modules/,
            use: 'html-loader'
        },
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.(png|jpg|gif|svg|ico|xls|xlsx)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        name: 'images/[name]-[hash:8].[ext]',
                        limit: 1000
                    }
                }
            ]
        }
    ]

    const plugins = [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            filename: 'index.html',
            alwaysWriteToDisk: true,
            minify
        })
    ]

    if (options.hot) {
        plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackHarddiskPlugin({
                outputPath: path.resolve(__dirname, buildDir)
            })
        )
    }

    if (!isLocal) {
        plugins.push(
            new OptimizeCssAssetsPlugin(),
            new MiniCssExtractPlugin({
                filename: 'css/[name]-[hash:8].min.css'
            })
        )
    }

    return {
        // stats: 'errors-only',
        mode: isLocal ? 'development' : 'production',
        entry: {
            app: './src'
        },
        output: {
            publicPath: isLocal ? `http://${host}:${port}` : '',
            path: path.resolve(__dirname, buildDir),
            filename: isLocal ? 'js/[name].js' : 'js/[name]-[hash:8].min.js',
            chunkFilename: isLocal
                ? 'js/[name].js'
                : 'js/[name]-[hash:8].min.js'
        },
        module: {
            rules
        },
        plugins,
        resolve: {
            alias: {
                src: path.resolve(__dirname, 'src')
            }
        },
        devtool: options.pro ? false : 'source-map',
        devServer: {
            hot: options.hot,
            contentBase: path.join(__dirname, buildDir),
            publicPath: `http://${host}:${port}`,
            host,
            port,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }
}
