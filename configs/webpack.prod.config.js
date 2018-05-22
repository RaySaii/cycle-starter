process.env.NODE_ENV = 'production'
const config = require('./webpack.base.config')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require('webpackbar');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path=require('path')
const appPath = (...names) => path.join(process.cwd(), ...names);
module.exports = {
    ...config,
    output: {
        filename: 'app.[hash].js',
        path: appPath('build'),
        // publicPath: '/'
    },
    mode: 'production',
    module: {
        rules: [
            ...config.module.rules,
            {
                test: /\.(le|sc|sa|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                                require('autoprefixer')({ browsers: [ 'last 2 versions' ] }),
                                require('cssnano')()
                            ]
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([ 'build'], { root: path.resolve() }),
        ...config.plugins,
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
        new WebpackBar(),
    ]
}
