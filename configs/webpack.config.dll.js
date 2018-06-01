const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const appPath = (...names) => path.join(process.cwd(), ...names);
module.exports = {
    mode:'production',
    entry: {
        vendor: ['@cycle/dom', '@cycle/history','@cycle/http','@cycle/isolate','@cycle/run','cycle-onionify'] // cycle模块打包到一个动态连接库
    },
    output: {
        path: appPath('dll'),
        filename: '[name].dll.js', // 输出动态连接库的文件名称
        library: '_dll_[name]_[hash]' // 全局变量名称
    },
    devtool: '#source-map',
    plugins: [
        new CleanWebpackPlugin(['dll'], { root: path.resolve() }),
        new webpack.DllPlugin({
            context: appPath(),
            name: '_dll_[name]_[hash]', // 和output.library中一致，也就是输出的manifest.json中的 name值
            path: path.join(appPath(), 'dll', '[name].manifest.json')
        }),
    ]
};