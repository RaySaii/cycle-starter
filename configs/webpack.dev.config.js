process.env.NODE_ENV = 'development'
const webpack = require('webpack');
const config = require('./webpack.base.config')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require('webpackbar');
const address = require('address')
const path = require('path');
const appPath = (...names) => path.join(process.cwd(), ...names);
const openBrowser = require('././utils/openBrowser')
module.exports = {
    ...config,
    output: {
        filename: 'app.js',
        path: appPath('build'),
        // publicPath: '/'
    },
    mode: 'development',
    devServer: {
        quiet: true,
        hot: true,
    },
    module: {
        rules: [
            ...config.module.rules,
            {
                test: /\.(le|sc|sa|c)ss$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { modules: true, importLoaders: 1, sourceMap: true } },
                    { loader: 'sass-loader', options: { modules: true, importLoaders: 1, sourceMap: true } },
                    { loader: 'less-loader', options: { modules: true, importLoaders: 1, sourceMap: true } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('postcss-import')({ root: loader.resourcePath }),
                                require('postcss-cssnext')(),
                                require('autoprefixer')({ browsers: [ 'last 5 versions' ] }),
                                require('cssnano')(),
                            ]
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        ...config.plugins,
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new WebpackBar({
            done: function (sharedState, ctx) {
                console.log(`\n\n   local:  http://localhost:8080 \n  remote:  http://${address.ip()}:8080\n\n`)
            }
        }),
    ]
}
