const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const path = require('path');
const appPath = (...names) => path.join(process.cwd(), ...names);
const manifest = require('../dll/vendor.manifest.json');

module.exports = {
    entry: {
        main: [ appPath('src', 'index.ts') ]
    },
    devServer: {
        quiet: true,
        hot:true,
        before: function () {
            // console.clear()
            console.log('\n\n  start building\n\n')
        }
    },
    devtool: "source-map",
    resolve: {
        extensions: [ '.js', '.jsx', '.json', '.ts', '.tsx' ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                options: {
                    silent: true,
                    useCache: true,
                    cacheDirectory: 'node_modules/.cache/at-loader'
                }
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                },
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg|webp)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            template: 'public/index.ejs',
            alwaysWriteToDisk: true,
            inject: true,
            favicon: 'public/favicon.png',
            // hash: true
        }),
        new webpack.DllReferencePlugin({
          manifest,
          context: appPath(),
            extensions: [ '.js', '.jsx' ]
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(appPath(), 'dll/*.dll.js')
        }),
        new webpack.ProvidePlugin({
            Snabbdom: 'snabbdom-pragma'
        }),
    ],
}


