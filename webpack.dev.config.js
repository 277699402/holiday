/**
 * Created by chone on 18/01/1.
 */

var webpack = require('webpack');
var config = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');

config.devtool = '#source-map';                             // source-map
config.output.publicPath = '/dist/';                        // 资源路径
config.output.filename = '[name].js';                       // 入口js命名
config.output.chunkFilename = '[name].chunk.js';            // 路由js命名

config.vue = {
    loaders: {
        css: ExtractTextPlugin.extract(
            "style-loader",
            "css-loader?sourceMap",
            {
                publicPath: "/dist/"
            }
        ),
        less: ExtractTextPlugin.extract(
            'vue-style-loader',
            'css-loader!less-loader',
            {
                publicPath: "/dist/"
            }
        ),
        scss: ExtractTextPlugin.extract(
            'vue-style-loader',
            'css-loader!sass-loader',
            {
                publicPath: "/dist/"
            }
        ),
        sass: ExtractTextPlugin.extract(
            'vue-style-loader',
            'css-loader!sass-loader',
            {
                publicPath: "/dist/"
            }
        )
    }
};

config.plugins = (config.plugins || []).concat([
    new ExtractTextPlugin("styles/[name].css",{ allChunks : true,resolve : ['modules'] }),             // 提取CSS
    new webpack.optimize.CommonsChunkPlugin('vendors', 'scripts/vendors.js'),                           // 提取第三方库
    new HtmlWebpackPlugin({                                                                     // 构建html文件
        filename: '../index_dev.html',
        template: './src/template/index.ejs',
        inject: false
    })
]);

// 开发
fs.open('./src/config/env.js', 'w', function (err, fd) {
    var buf = 'module.exports = "development";';
    fs.write(fd,buf,0,buf.length,0,function(err,written,buffer){});
});

/*config.devServer = {
    proxy: {
        'http://127.0.0.1:8080': {
            target: ''
        }
    }
};*/
module.exports = config;