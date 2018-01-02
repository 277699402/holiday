/**
 * Created by linchong on 16/11/11.
 */

var webpack = require('webpack');
var config = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin  = require('clean-webpack-plugin');  
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');

config.output.publicPath = '/dist/';                        // 资源路径,根据需要可改为cdn地址
config.output.filename = '[name].[hash:8].js';                 // 带hash值的入口js名称
config.output.chunkFilename = '[name].[hash:8].chunk.js';      // 带hash值的路由js名称

config.vue = {
    loaders: {
        css: ExtractTextPlugin.extract(
            "style-loader",
            "css-loader",
            {
                publicPath: "/dist/"
                // 特别提醒,如果这里的publicPath是以http://xxx.xxx这样以http://开头的,要写成
                // publicPath: "http:\\xxx.xxx",否则会编译为"http:/xxx.xxx"
            }
        ),
        less: ExtractTextPlugin.extract(
            'vue-style-loader',
            'css-loader!less-loader',
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
        ),
        scss: ExtractTextPlugin.extract(
            'vue-style-loader',
            'css-loader!sass-loader',
            {
                publicPath: "/dist/"
            }
        )
    }
};

config.plugins = (config.plugins || []).concat([
    new ExtractTextPlugin("styles/[name].[hash:8].css",{ allChunks : true,resolve : ['modules'] }),       // 提取带hash值的css名称
    new webpack.optimize.CommonsChunkPlugin('vendors', 'scripts/vendors.[hash:8].js'),                     // 提取带hash值的第三方库名称
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({                                                         // 压缩文件
        compress: {
            warnings: false
        }
    }),
    new HtmlWebpackPlugin({                                                                       // 构建html文件
        filename: '../index.html',
        template: './src/template/index.ejs',
        inject: false,
        minify:{
            removeComments: true,  		                                                          //移除HTML中的注释
            collapseWhitespace: false                                                             //删除空白符与换行符
        }
    }),
    new CleanWebpackPlugin(['dist'],{                                                              //[verbose 清理编译后的文件不叠加生成]
        verbose: true
    })
]);

// 生产
fs.open('./src/config/env.js', 'w', function (err, fd) {
    var buf = 'module.exports = "production";';
    fs.write(fd,buf,0,buf.length,0,function(err,written,buffer){});
});

module.exports = config;