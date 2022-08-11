import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import util from '@/libs/util.js'
import { Message } from 'element-ui'
import setting from '@/setting'

var instance1 = axios.create({
    // headers: {'Content-type': 'application/x-www-form-urlencoded'},
    transformRequest: [function (data, headers) {
        // Do whatever you want to transform the data
        return qs.stringify(data)
    }]
})

instance1.interceptors.response.use(res => {
    if (res.data.code === 500 && res.data.message === '服务内部异常') {
        /*if (confirm("检测到您可能未登录，是否跳转到登录页面？") == true) {
            // 跳转到登录页面
            router.push({
                path: "/login"
            })
        } else {

        }*/
        Message({
            message: res.data.message,
            type: 'error'
        })
    } else if (res.data.code === -999 /*&& res.data.message === '用户未登录'*/) {
        // // 删除cookie
        // util.cookies.remove('token')
        // util.cookies.remove('uuid')
        // // 跳转到登录页面
        // router.push({ path: "/login" })
            console.log('当前地址',window.location.pathname)
            let pathname = window.location.pathname
            if(pathname.startsWith('/login')){
                console.log('登录页的异步请求，不执行跳转到/login')
            }else{
                if(setting.systemInfo.isAjaxAuthorityCheck){
                    // 用户未登录时，执行退出动作
                    // 删除cookie
                    util.cookies.remove('token')
                    util.cookies.remove('uuid')
                    util.cookies.remove('oauth')
                    // 跳转路由
                    router.push({
                        name: 'login'
                    })
            }
        }
    }
    return res.data
}, err => {
    return Promise.reject(err)
})

Vue.prototype.$axios = instance1

const instance2 = axios.create()

instance2.interceptors.response.use(res => {
    if (res.data.code === 500 && res.data.message === '服务内部异常') {
        /*if (confirm("检测到您可能未登录，是否跳转到登录页面？") == true) {
            // 跳转到登录页面
            router.push({
                path: "/login"
            })
        } else {

        }*/
        Message({
            message: res.data.message,
            type: 'error'
        })
    } else if (res.data.code === -999 /*&& res.data.message === '用户未登录'*/) {
            console.log('当前地址',window.location.pathname)
            let pathname = window.location.pathname
            if(pathname.startsWith('/login')){
                console.log('登录页的异步请求，不执行跳转到/login')
            }else{
                if(setting.systemInfo.isAjaxAuthorityCheck){
                    // 用户未登录时，执行退出动作
                    // 删除cookie
                    util.cookies.remove('token')
                    util.cookies.remove('uuid')
                    util.cookies.remove('oauth')
                    // 跳转路由
                    router.push({
                        name: 'login'
                    })
            }
        }
    }
    return res.data
}, err => {
    return Promise.reject(err)
})

Vue.prototype.$faxios = instance2

export { instance2 as faxios }

export default instance1
