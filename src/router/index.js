import Vue from 'vue'
import VueRouter from 'vue-router'
import VUE_CONFIG from 'VUE_CONFIG'
import util from '@/libs/util.js'
import setting from '@/setting.js'
import axios from '@/plugin/axios'
import store from '@/store'

// 路由数据
import routes from './routes'

Vue.use(VueRouter)

// 解决重复进入路由时报错的问题（报错看着不舒服 o(*￣︶￣*)o）
// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


// 导出路由 在 main.js 里使用
const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        if (savedPosition) {
            // 在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
            return savedPosition
        } else {
            // 让页面滚动到顶部
            return { x: 0, y: 0 }
        }
    }
})

/**
 * 判断路径是否具有菜单权限
 *
 * @param {string} toPath
 */
async function hasMenuPermission(toPath) {
    /*let res = await axios.get('/service/sso/my', {
        params: {
            all: setting.isIndependentApp,
            appKey: setting.systemInfo.key
        }
    })
    let hasMenuPermission = false
    if (res && res.code == 200) {
        let body = res.body
        // 如果设置了模拟菜单，则不动态生成菜单数据
        if (!setting.menu.useMockMenu) {
            // 动态生成顶部菜单
            if (setting.isIndependentApp) {
                store.dispatch('initMenuForSingleApp', { resData: body })
            } else {
                store.dispatch('initMenuForApps', { resData: body })
            }
        }
        if (toPath === '/index' || (body.app?containsMenuPermission(toPath, body.app.menus):true) ) {
            hasMenuPermission = true
        }
    }
    return hasMenuPermission*/
    return true
}

/**
 * 递归判断当前路由路径是否具有菜单权限
 *
 * @param {string} toPath
 * @param {object} menus
 */
function containsMenuPermission(toPath, menus) {
    if (toPath === '/jump') {
        return true
    }
    for (let i = 0; i < menus.length; i++) {
        let menu = menus[i]
        let url = menu.url
        if (url) {
            let tempIndex = url.indexOf('?')
            if (tempIndex >= 0) {
                url = url.substring(0, tempIndex)
            }
            if (url === toPath) {
                return true
            }
        }
        let children = menu.children
        if (children && containsMenuPermission(toPath, children)) {
            return true
        }
    }
    return false
}

/**
 * 路由拦截
 * 权限验证
 */
/*router.beforeEach(async (to, from, next) => {
    let autoLoginToken = to.query.token
    if (autoLoginToken) {
        sessionStorage.setItem('autoLoginInfo', to.name + '?' + autoLoginToken)
    }

    let path = to.path
    if (path && path.indexOf('http://') >= 0) {
        let aDom = document.createElement('a')
        aDom.href = path.substring(path.indexOf('http://'))
        aDom.target = '_blank'
        document.body.appendChild(aDom)
        aDom.click()
        aDom.remove()
        return
    }

    if (to.name === 'login') {
        // 如果是登录页，则验证权限，如果以鉴权，则跳转到首页
        const token = util.cookies.get('token')
        if (token && token !== 'undefined') {
            next({ name: 'cmiot-home-situation' })
        } else {
            // 没有登录则跳转到登录界面
            next()
        }
    } else if (to.matched.some(r => r.meta.requiresAuth) && !VUE_CONFIG.isMockQuery) {
        // 不是登录页，则验证当前路由所有的匹配中是否有需要进行登录验证的
        // 这里暂时将cookie里是否存有token作为验证是否登录的条件
        // 请根据自身业务需要修改
        const token = util.cookies.get('token')
        if (token && token !== 'undefined') {
            /!**
             * 如果已鉴权，则进行菜单授权逻辑
             * 菜单授权逻辑：后台查询用户的菜单权限，根据菜单权限动态生成顶部菜单，并拦截没有对应菜单权限的路由
             * 这里每次路由都走一次后端，可让前端路由和后端路由一样安全，后端授权失败的都能拦截
             * 这里采用同步方式，等ajax请求返回后再继续执行
             *!/
            let hasMenuPermissionFlag = true
            await hasMenuPermission(path).then(flag => {
                hasMenuPermissionFlag = flag
            })
            if (hasMenuPermissionFlag) {
                // 路由到index页面或者用户拥有当前路由路径的菜单权限则通过
                next()
            } else {
                // 用户没有当前路由路径的菜单权限时，路由到index页面
                next({ name: 'index' })
            }
        } else {
            // 没有登录的时候跳转到登录界面
            next({ name: 'login' })
        }
    } else {
        /!**
         * 不是路由到登录页且不需要鉴权，则直接进行菜单授权逻辑
         * 菜单授权逻辑：后台查询用户的菜单权限，根据菜单权限动态生成顶部菜单，并拦截没有对应菜单权限的路由
         * 这里每次路由都走一次后端，可让前端路由和后端路由一样安全，后端授权失败的都能拦截
         * 这里采用同步方式，等ajax请求返回后再继续执行
         *!/
        let hasMenuPermissionFlag = true
        await hasMenuPermission(path).then(flag => {
            hasMenuPermissionFlag = flag
        })
        if (hasMenuPermissionFlag) {
            // 路由到index页面或者用户拥有当前路由路径的菜单权限则通过
            next()
        } else {
            // 用户没有当前路由路径的菜单权限时，路由到index页面
            next({ name: 'index' })
        }
    }
})*/

/**
 * 暂不需要菜单权限实际控制，方便调试！
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
    let autoLoginToken = to.query.token
    if (autoLoginToken) {
        sessionStorage.setItem('autoLoginInfo', to.name + '?' + autoLoginToken)
    }

    let path = to.path
    if (path && path.indexOf('http://') >= 0) {
        let aDom = document.createElement('a')
        aDom.href = path.substring(path.indexOf('http://'))
        aDom.target = '_blank'
        document.body.appendChild(aDom)
        aDom.click()
        aDom.remove()
        return
    }

    /*if (to.name === 'login') {
        // 如果是登录页，则验证权限，如果以鉴权，则跳转到首页
        const token = util.cookies.get('token')
        if (token && token !== 'undefined') {
            // next({ name: 'cmiot-home-situation' })
            next({path: '/'})
        } else {
            // 没有登录则跳转到登录界面
            next()
        }
    } else */if (to.matched.some(r => r.meta.requiresAuth) && !VUE_CONFIG.isMockQuery) {
        // 不是登录页，则验证当前路由所有的匹配中是否有需要进行登录验证的
        // 这里暂时将cookie里是否存有token作为验证是否登录的条件
        // 请根据自身业务需要修改
        const token = util.cookies.get('token')
        if (token && token !== 'undefined') {
            /**
             * 如果已鉴权，则进行菜单授权逻辑
             * 菜单授权逻辑：后台查询用户的菜单权限，根据菜单权限动态生成顶部菜单，并拦截没有对应菜单权限的路由
             * 这里每次路由都走一次后端，可让前端路由和后端路由一样安全，后端授权失败的都能拦截
             * 这里采用同步方式，等ajax请求返回后再继续执行
             */
            let hasMenuPermissionFlag = true
            await hasMenuPermission(path).then(flag => {
                hasMenuPermissionFlag = flag
            })
            if (hasMenuPermissionFlag) {
                // 路由到index页面或者用户拥有当前路由路径的菜单权限则通过
                next()
            } else {
                // 用户没有当前路由路径的菜单权限时，路由到index页面
                // next({ name: 'index' })
                next()
            }
        } else {
            // 开启路由权限检查时
            // if(setting.systemInfo.isRouterAuthorityCheck){
            //     // 没有登录的时候跳转到登录界面
            //     next({ name: 'login' })
            // }else{
            //     next()
            // }
            next()
        }
    } else {
        /**
         * 不是路由到登录页且不需要鉴权，则直接进行菜单授权逻辑
         * 菜单授权逻辑：后台查询用户的菜单权限，根据菜单权限动态生成顶部菜单，并拦截没有对应菜单权限的路由
         * 这里每次路由都走一次后端，可让前端路由和后端路由一样安全，后端授权失败的都能拦截
         * 这里采用同步方式，等ajax请求返回后再继续执行
         */
        let hasMenuPermissionFlag = true
        await hasMenuPermission(path).then(flag => {
            hasMenuPermissionFlag = flag
        })
        if (hasMenuPermissionFlag) {
            // 路由到index页面或者用户拥有当前路由路径的菜单权限则通过
            next()
        } else {
            // 用户没有当前路由路径的菜单权限时，路由到index页面
            // next({ name: 'index' })
            next()
        }
    }
})

router.afterEach(to => {
    // 需要的信息
    const app = router.app
    const { name, params, query } = to
    // 多页控制 打开新的页面
    app.$store.commit('d2adminPageOpenNew', { name, params, query })
    // 更改标题
    util.title(to.meta.title)
})

export default router
