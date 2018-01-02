/**
 * Created by linchong on 16/11/11.
 */

var path = require('path');
var webpack = require('webpack');

module.exports = {
    // 入口
    entry: {
        main: './src/main',
        vendors: ['vue', 'vue-router','zepto','cookie']
    },
    // 输出
    output: {
        path: path.join(__dirname, './dist')
    },
    // 加载器
    module: {
        loaders: [ 
            { test: /\.vue$/, loader: 'vue' },
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style!css'},
            { test: /\.less$/, loader: 'vue-style-loader!css-loader!less-loader'},
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(html|tpl)$/, loader: 'html-loader' },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'images/[name]_[hash:8].[ext]'
                }
            }
        ]
    },
    // 转es5
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['', '.js', '.vue', '.scss', '.less', '.css'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            filter: path.join(__dirname, './src/filters'),
            components: path.join(__dirname, './src/components'),
            vue: 'vue/dist/vue.js',
            zepto: './src/libs/js/plugin/zepto.js',
            cookie: './src/libs/js/plugin/zepto-cookie'
        }
    },
    plugins: []
};