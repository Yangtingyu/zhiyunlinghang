const path = require('path')

// 拼接路径
function resolve(dir) {
    return path.join(__dirname, dir)
}

// 基础路径 注意发布之前要先修改这里
const baseUrl = '/'

module.exports = {
    publicPath: baseUrl, // 根据你的实际情况更改这里

    lintOnSave: true,

    configureWebpack: {
        // for ckeditor4
        externals: {
            "CKEDITOR": "window.CKEDITOR",
            "VUE_CONFIG": "window.VUE_CONFIG"
        }
    },
    devServer: {
        port: 8801, // 自定义修改8080端口
        publicPath: baseUrl, // 和 baseUrl 保持一致
        // 代理设置
        proxy: {
            // 网关入口
            // 示例：访问key为info-manage的服务接口，请访问“/service/info-manage”
            '/service': {
                // target: 'http://10.156.20.130:8001', // 山东线上
                // target: 'http://192.168.200.136:20000', // 宁夏版、广电版、山东
                target: 'http://192.168.200.136:1234', // 挂图作战
                // target: 'http://cic-manage.ever-nssa.wh.everark.com.cn', // 挂图作战
                // target: 'http://192.168.101.23:20001',
                // target: 'http://192.168.200.60:20000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/service': ''
                }
            },
            // JSON服务，提供基于json文件的配置读写接口
            '/jsonServer': {
                target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/jsonServer': ''
                }
            },
            // 图片服务
            '/imgService': {
                target: 'http://192.168.200.136:80',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/imgService': ''
                }
            },
            '/mytest': {
                // target: 'http://192.168.202.121:20000', // 国关网关
                // target: 'http://192.168.202.11:20000', // 互联网反诈平台网关
                // target: 'http://cmiot.zzebra.cn:20000', // 中移物联
                target: 'http://192.168.202.227:20000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/mytest': ''
                }
            }
        }
    },

    // webpack 设置
    // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
    chainWebpack: config => {
        // svg
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule.include
            .add(resolve('src/assets/svg-icons/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'd2-[name]'
            })
            .end()

        // image exclude
        const imagesRule = config.module.rule('images')
        imagesRule
            .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
            .exclude
            .add(resolve('src/assets/svg-icons/icons'))
            .end()

        // 重新设置 alias
        config.resolve.alias.set('@', resolve('src'))
            // babel-polyfill 加入 entry
        const entry = config.entry('app')
        entry.add('babel-polyfill').end()
    }
}
