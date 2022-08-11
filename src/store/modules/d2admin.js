import screenfull from 'screenfull'
import util from '@/libs/util.js'
import db from '@/libs/db.js'
import themeListAll from '@zebra-projects/zebra-ui/src/assets/style/theme/list.js'
import setting from '@/setting.js'
import dicUtils from '@/libs/dicUtils.js'
import Cookies from 'js-cookie'
import axios from '@/plugin/axios'
import router from '@/router'
import { menuHeader as initMenuHeader } from '@/menu'
import AES from 'crypto-js/aes'

const pageOpenedDefult = {
    name: 'index',
    meta: {
        title: '首页',
        requiresAuth: false
    }
}

let themeList = []
if (themeListAll) {
    themeListAll.forEach(theme => {
        if (theme.title.indexOf('Tomorrow') < 0) {
            themeList.push(theme)
        }
    })
}

export default {
    state: {
        // 用户信息
        userInfo: {
        name: '',
        // 应用商店登录标识
        appstoreIsLogin: false
        },
        // 顶栏菜单
        menuHeader: [],
        // 侧栏菜单
        menuAside: [],
        // 全屏
        isFullScreen: false,
        // 灰度
        isGrayMode: false,
        // 侧边栏收缩
        isMenuAsideCollapse: false,
        // 主题
        themeList,
        // 现在激活的主题
        themeActiveName: themeList[0].name, // 这应该是一个名字 不是对象
        // 可以在多页 tab 模式下显示的页面
        pagePool: [],
        // 当前显示的多页面列表
        pageOpenedList: [
        pageOpenedDefult
        ],
        // 当前页面
        pageCurrent: '',
        // 用户 UA
        ua: {},
        //设备标识-by Wucp
        device: 'desktop',
        //窗口可用高度（单位：像素）
        windowHeight: '',
        // 当前登录的APP信息
        currentAppInfo: {
        url: '',
        key: ''
        },
        // 字典数据 参考格式：
        /*
        { "attribute":[
            {"key":"1","value":"黑名单"},
            {"key":"2","value":"灰名单"},
            {"key":"3","value":"白名单"}
        ] }
        */
        dictInfo: {},
        // 页面初始化时（main.js），url的请求参数，如布局设置
        urlParamInfo: {
            // layout表示布局
        },
        // 应用标识，用于切换当前应用的对应配置appConfigInfo
        appFlag: '',
    },

    getters: {
        /**
         * @description 返回当前的主题信息 不是一个名字 而是当前激活主题的所有数据
         * @param {vuex state} state vuex state
         */
        d2adminThemeActiveSetting(state) {
            return state.themeList.find(theme => theme.name === state.themeActiveName)
        },

        /**
         * @description 从当前所有打开的多标签页里返回需要缓存的页面 name
         * @param {*} state vuex state
         */
        d2adminKeepAliveInclude(state) {
            if (setting.layout.isKeepAlive) {
                return state.pageOpenedList.filter(item => {
                    if (item.meta) {
                        if (item.meta.notCache) {
                            return false
                        }
                    }
                    return true
                }).map(e => e.name)
            } else {
                return []
            }

        }
    },

    actions: {
        /**
         * 登录
         * @param {Object} param0 context
         * @param {Object} param1 { vue, username, password }
         */
        d2adminLogin ({ state, commit, rootState }, { vm, username, password, mdpassword, code }) {
            // 禁用登录按钮
            vm.disabledSubmit = true
            // 开始请求登录接口
            vm.$axios({
                method: 'post',
                // url: '/login',
                url: '/service/sso/login',
                data: {
                    userName: username,
                    password: password,
                    appKey: setting.systemInfo.key,
                    code: code
                }
            }).then(res => {
                // 设置 cookie 一定要存 uuid 和 token 两个 cookie
                // 整个系统依赖这两个数据进行校验和存储
                // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
                // token 代表用户当前登录状态 建议在网络请求中携带 token，如有必要 token 需要定时更新，默认保存一天
                /*util.cookies.set('uuid', res.data.uuid)
                util.cookies.set('token', res.data.token)
                // 设置 vuex 用户信息
                commit('d2adminUserInfoSet', {
                    name: res.data.name
                })*/
                if (res.code == 200) {
                    res.encryptedPassword = mdpassword
                    this.dispatch('d2adminLoginSuccessHandler', {vm,res})
                    // 重新获取当前菜单数据
                    this.dispatch('initMyMenuInfo',{ vm: vm })
                    // 重新获取后台的字典数据
                    this.dispatch('initMyDictInfo',{ vm: vm })
                    // 记录密码
                    this.dispatch('storeRememberPassword',{ vm: vm })
                } else {
                    // 启用登录按钮
                    vm.disabledSubmit = false
                    vm.$alert(res.message, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            // logout()
                        }
                    })
                }
            }).catch(err => {
                console.group('登录结果')
                console.log('err: ', err)
                console.groupEnd()
            })
        },

        /**
         * 登录成功后执行
         * @param state
         * @param commit
         * @param rootState
         * @param vm
         */
        d2adminLoginSuccessHandler({ state, commit, rootState }, { vm ,res }) {
            let body = res.body
            let user = body.user
            util.cookies.set('uuid', user.id)
            util.cookies.set('token', user.userName)
            if (res.encryptedPassword) {
                util.cookies.set('oauth', res.encryptedPassword)
            }
            // 存放按钮权限数据functions，用于auth-directive.js指令的按钮权限判断
            sessionStorage.setItem('functions', body.app?JSON.stringify(body.app.functions):[])
            // 设置 vuex 用户信息
            commit('d2adminUserInfoSet', {
                name: user.userName,
                user: user,
                functions: body.app?body.app.functions:[]
            })

            //运算生成菜单数据
            //this.dispatch('initMenuByResData',{resData:res.body})
            // 重新获取当前菜单数据
            //this.dispatch('initMyMenuInfo',{ vm: vm })

            // 用户登录后从数据库加载一系列的设置
            commit('d2adminLoginSuccessLoad')
            // 跳转路由
            router.push({
                //name: 'cmiot-home-situation'
                // path: '/cmiot-home-situation-asset-v3'
                path: '/'
            })
        },

        /**
         * 注销用户并返回登录页面
         *
         * @param {Object} param0 context
         * @param {Object} confirm need confirm ?
         */
        d2adminLogout ({ state, commit, rootState }, { vm, confirm }) {
            function ssoLogout() {
            vm.$axios.get('/service/sso/logout', {}).then(res => {
                    if (res.code == 200) {
                        logout()
                    } else {
                        vm.$alert('退出失败！' + res.message, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                //logout()
                            }
                        })
                    }
                }).catch(function (error) {
                    console.log(error);
                    vm.$alert('退出异常：' + error, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            //logout()
                        }
                    })
                }).then(() => {
                });
            }

            /**
             * @description 注销
             */
            function logout () {
                // 删除cookie
                util.cookies.remove('token')
                util.cookies.remove('uuid')
                util.cookies.remove('oauth')
                Cookies.remove('SPRING_SECURITY_CONTEXT')
                // 清空sessionStorage
                sessionStorage.clear()
                // 跳转路由
                router.push({
                    name: 'login',
                    params: {
                        // 主动退出标记，主动退出时不提示自动登陆；
                        isLogout: true
                    }
                })
            }

            // 判断是否需要确认
            if (confirm) {
                commit('d2adminGrayModeSet', true)
                vm.$confirm('注销当前账户吗?  打开的标签页和用户设置将会被保存。', '确认操作', {
                    confirmButtonText: '确定注销',
                    cancelButtonText: '放弃',
                    type: 'warning'
                }).then(() => {
                    commit('d2adminGrayModeSet', false)
                    ssoLogout()
                }).catch(() => {
                    commit('d2adminGrayModeSet', false)
                    vm.$message('放弃注销用户')
                })
            } else {
                logout()
            }
        },

        /**
         * 切换设备标识 By Wucp
         * @param commit
         * @param device
         */
        toggleDevice({ commit }, device) {
            commit('TOGGLE_DEVICE', device)
        },

        /**
         * 设置屏幕可用高度
         * @param commit
         * @param windowHeight
         */
        windowHeightSet({ commit }, windowHeight) {
            commit('windowHeightSet', windowHeight)
        },

        /**
         * 刷新页面时，重新获取后台菜单数据并初始化
         * @param commit
         * @param vm
         */
      initMyMenuInfo({commit}, {vm}) {
            // 模拟菜单时，不处理请求
            /*if(setting.menu.useMockMenu){
                return
            }*/
          vm.$axios.get('/service/sso/my', {
                params: {
                    all: setting.isIndependentApp,
                    appKey: setting.systemInfo.key
                }
            }).then(res => {
                if (res.code == 200) {
                  // 模拟菜单时，不生成当前app信息，防止顶部菜单无法标识菜单选中
                  if(!setting.menu.useMockMenu){
                      //设置当前APP信息
                      let currentAppInfo = {}
                      if(res.body.app){
                          currentAppInfo = {
                              url: res.body.app.url,
                              key: res.body.app.key,
                              name: res.body.app.name
                          }
                      }
                      commit('currentAppInfoSet', currentAppInfo)
                  }

                    // 这里暂时将cookie里是否存有token作为验证是否登录的条件
                    const token = util.cookies.get('token')
                    if (!token) {
                        // vue中未登录时，获取登录后数据并执行登录成功逻辑
                      this.dispatch('d2adminLoginSuccessHandler', {vm,res})
                    }

                    // 模拟菜单时，不生成菜单数据
                    if (!setting.menu.useMockMenu) {
                        // 运算生成菜单数据
                        if (setting.isIndependentApp) {
                            this.dispatch('initMenuForSingleApp', { resData: res.body })
                        } else {
                            this.dispatch('initMenuForApps', { resData: res.body })
                        }
                    }

                    // 登录成功后，开始加载字典数据
                  this.dispatch('initMyDictInfo',{ vm })
                } else {
                  /*// 用户未登录时，执行退出动作
                  // 删除cookie
                  util.cookies.remove('token')
                  util.cookies.remove('uuid')
                  // 跳转路由
                  vm.$router.push({
                      name: 'login'
                  })*/
                }
            }).catch(function (error) {
                console.log(error)
            }).then(() => {
                this.loading = false
            });
        },
        /**
         * 存放记住密码信息
         * @param commit
         * @param vm
         */
        storeRememberPassword({commit}, {vm}){
          if(vm.formLogin.isShowRemember){
              let RememberPasswordInfoObj = {
                  username: vm.formLogin.username,
                  password: vm.formLogin.password,
              }
              let RememberPasswordInfo = JSON.stringify(RememberPasswordInfoObj)
              RememberPasswordInfo = AES.encrypt(RememberPasswordInfo, 'zebra-project').toString()
              localStorage.setItem("RememberPasswordInfo", RememberPasswordInfo)
              console.log('您勾选记住密码，已存储')
          }else{
              localStorage.removeItem("RememberPasswordInfo")
              console.log('您未勾选记住密码，清空存储')
          }
        },
        // 初始化字典数据
      initMyDictInfo({commit}, {vm}) {
            // 模拟菜单时，不处理请求
            /*if(setting.menu.useMockMenu){
                return
            }*/
          vm.$axios.get('/service/system/sys/cfg/dic', {
                params: {
                    appId: setting.systemInfo.appId, // 值32时为反诈app编号
                    maxResult: 1000
                }
            }).then(res => {
                if (res.code == 200) {
                    let data = res.body.resultData
                    /*
                    "key": "110000",
                        "value": "北京",
                        "type": "province",
                        "remark": "省份类型",
                    */
                    let dictInfo = dicUtils.config
                    for (let i in data) {
                        if (!dictInfo.hasOwnProperty(data[i]['type'])) {
                            dictInfo[data[i]['type']] = []
                        }
                        dictInfo[data[i]['type']].push(
                            {
                                key: isNaN(data[i].key) ? data[i].key : (Number)(data[i].key),
                                value: data[i].value
                            }
                        )
                    }
                    commit('dictInfoSet', dictInfo)
                } else {
                    console.log('获取字典数据失败！')
                }
            }).catch(function (error) {
                console.log(error);
            }).then(() => {
                //this.loading = false
            });
        },

        /**
         * 初始化菜单数据（多应用模式）
         */
        initMenuForApps({state, commit, rootState}, {resData}) {
            function getMenuList(menus) {
                let menuList = []
                for (let i in menus) {
                    let tmpMenu = {
                        path: menus[i].url,
                        openMode:　menus[i].openMode,
                        title: menus[i].name,
                        icon: menus[i].icon,
                        isOnlyText: !(!!menus[i].icon),
                        // 大屏菜单格式需要name、url字段
                        name: menus[i].name,
                        url: menus[i].url,
                    }
                    if(menus[i].children){
                        tmpMenu.children = getMenuList(menus[i].children)
                    }
                    menuList.push(tmpMenu)
                }
                return menuList
            }

            let apps = resData.apps
            let headerMenu = []
            for (let i in apps) {
                let tmpMenu = {}
                tmpMenu.path = apps[i].url
                /*
                打开方式：
                blank 打开新网页
                dialog 弹出框打开
                tab tab页方式打开
                self 自身页面跳转
                _self 直接刷新当前窗口
                */
                tmpMenu.openMode = '_self'
                tmpMenu.title = apps[i].name
                tmpMenu.icon = apps[i].icon
                //tmpMenu.isOnlyText = !(!!tmpMenu.icon)
                headerMenu.push(tmpMenu)
            }
            let headerMenuLength = 6
            if(headerMenu.length > headerMenuLength){
                headerMenu = [...headerMenu.slice(0,headerMenuLength),...[{
                    path: '/otherApps',
                    title: '其它应用',
                    icon: 'angle-double-down',
                    children: headerMenu.slice(headerMenuLength)
                }]]
            }
            let asideMenu = getMenuList(resData.app?resData.app.menus:[])
            commit('d2adminMenuHeaderSet', headerMenu)
            commit('d2adminMenuAsideSet', asideMenu)
        },

        /**
         * 独立应用模式时，整站只有一个地址端口
         * @param state
         * @param commit
         * @param rootState
         * @param resData
         */
        initMenuForSingleApp({ state, commit, rootState }, { resData }) {
            function getMenuList(menus) {
                let menuList = []
                for (let i in menus) {
                    let tmpMenu = {
                        path: menus[i].url,
                        openMode:　menus[i].openMode,
                        title: menus[i].name,
                        icon: menus[i].icon,
                        //isOnlyText: !(!!menus[i].icon)
                    }
                    if(menus[i].children){
                        tmpMenu.children = getMenuList(menus[i].children)
                    }
                    menuList.push(tmpMenu)
                }
                return menuList
            }
            let apps = resData.apps
            let asideMenu = []
            for (let i in apps) {
                asideMenu = [ ...asideMenu, ...getMenuList(apps[i].menus) ]
            }
            commit('d2adminMenuHeaderSet', [])
            commit('d2adminMenuAsideSet', asideMenu)
        }
    },

    mutations: {
        /**
         * @class 通用工具
         * @description 将 state 中某一项存储到数据库 如果已经有的话就更新数据 需要 uuid
         * @param {vuex state} state vuex state
         * @param {String} key key name
         */
        d2adminUtilVuex2DbByUuid (state, key) {
            const row = db.get(key).find({uuid: util.cookies.get('uuid')})
            if (row.value()) {
                row.assign({value: state[key]}).write()
            } else {
                db.get(key).push({
                uuid: util.cookies.get('uuid'),
                value: state[key]
                }).write()
            }
        },
        /**
         * @class 通用工具
         * @description 从数据库取值到 vuex 需要 uuid
         * @param {vuex state} state vuex state
         * @param {Object} param1 key and default value
         */
        d2adminUtilDb2VuexByUuid (state, { key, defaultValue }) {
            const row = db.get(key).find({uuid: util.cookies.get('uuid')}).value()
            state[key] = row ? row.value : defaultValue
        },
        /**
         * @class 通用工具
         * @description 将 state 中某一项存储到数据库 如果已经有的话就更新数据 不需要 uuid 所有用户共享
         * @param {vuex state} state vuex state
         * @param {String} key key name
         */
        d2adminUtilVuex2Db (state, key) {
            const row = db.get(key).find({pub: 'pub'})
            if (row.value()) {
                row.assign({value: state[key]}).write()
            } else {
                db.get(key).push({
                pub: 'pub',
                value: state[key]
                }).write()
            }
        },
        /**
         * @class 通用工具
         * @description 从数据库取值到 vuex 不需要 uuid 所有用户共享
         * @param {vuex state} state vuex state
         * @param {Object} param1 key and default value
         */
        d2adminUtilDb2Vuex (state, { key, defaultValue }) {
            const row = db.get(key).find({pub: 'pub'}).value()
            state[key] = row ? row.value : defaultValue
        },
        /**
         * @class 通用工具
         * @description 访问本地数据库 用户单独空间 没有初始化会自动初始化
         * @param {vuex state} state vuex state
         * @param {Function} fn function
         */
        d2adminUtilDatabaseUser (state, fn) {
        const uuid = util.cookies.get('uuid')
        const database = db.get('database').find({ uuid })
        if (database.value() === undefined) {
            db.get('database').push({
            uuid,
            value: {}
            }).write()
            if (fn) {
            fn(db.get('database').find({ uuid }).get('value'))
            }
        } else {
            if (fn) {
            fn(database.get('value'))
            }
        }
        },
        /**
         * @class 通用工具
         * @description 访问本地数据库 清空用户单独空间 只负责删除 d2adminUtilDatabaseUser 会初始化
         * @param {vuex state} state vuex state
         */
        d2adminUtilDatabaseUserClear (state) {
        db.get('database')
            .remove({ uuid: util.cookies.get('uuid') })
            .write()
        },
        /**
         * @class 通用工具
         * @description 访问本地数据库 这份数据是每个用户都可以访问的
         * @param {vuex state} state vuex state
         * @param {Function} fn function
         */
        d2adminUtilDatabase (state, fn) {
        if (fn) {
            fn(db.get('databasePublic'))
        }
        },
        /**
         * @class 通用工具
         * @description 访问本地数据库 清空公用空间
         * @param {vuex state} state vuex state
         */
        d2adminUtilDatabaseClear (state) {
        db.set('databasePublic', {})
            .write()
        },
        /**
         * @class UA
         * @description 记录 UA
         * @param {vuex state} state vuex state
         */
        d2adminUaGet (state) {
            state.ua = util.ua()
        },

        /**
         * @class menuHeader
         * @description 设置顶栏菜单
         * @param {vuex state} state vuex state
         * @param {Array} menu menu setting
         */
        d2adminMenuHeaderSet (state, menu) {
            state.menuHeader = util.filterMenuForUnique(menu)
        },

        /**
         * @class menuAside
         * @description 设置侧边栏菜单
         * @param {vuex state} state vuex state
         * @param {Array} menu menu setting
         */
        d2adminMenuAsideSet(state, menu) {
            state.menuAside = util.filterMenuForUnique(menu)
        },

        /**
         * @class ...
         * @description 用户登录后从数据库加载一系列的设置
         * @param {vuex state} state vuex state
         */
        d2adminLoginSuccessLoad (state) {
            // DB -> store 加载用户名
            this.commit('d2adminUserInfoLoad')
            // DB -> store 加载主题
            this.commit('d2adminThemeLoad')
            // DB -> store 数据库加载上次退出时的多页列表
            //this.commit('d2adminPageOpenedListLoad')
            // 清空上次退出时的多页列表，只保留默认主页
            state.pageOpenedList.splice(1)
            this.commit('d2adminUtilVuex2DbByUuid', 'pageOpenedList')
            // DB -> store 数据库加载这个用户之前设置的侧边栏折叠状态
            this.commit('d2adminMenuAsideCollapseLoad')
            // DB -> store 加载appFlag应用标识
            this.commit('appFlagLoad')
        },
        /**
         * @description 设置用户名
         * @class userInfo
         * @param {vuex state} state vuex state
         * @param {String} userInfo userInfo
         */
        d2adminUserInfoSet (state, userInfo) {
            state.userInfo = userInfo
            this.commit('d2adminUtilVuex2DbByUuid', 'userInfo')
        },
        /**
         * @description 从数据库取用户名
         * @class userInfo
         * @param {vuex state} state vuex state
         */
        d2adminUserInfoLoad (state) {
            this.commit('d2adminUtilDb2VuexByUuid', {
                key: 'userInfo',
                defaultValue: {
                name: '请重新登录'
                }
            })
        },
        /**
         * @class pagePool
         * @description 保存 pagePool (候选池)
         * @param {vuex state} state vuex state
         * @param {Array} pagePool tags
         */
        d2adminPagePoolSet (state, pagePool) {
            state.pagePool = pagePool
        },
        /**
         * @class pageCurrent
         * @description 打开一个新的页面
         * @param {vuex state} state vuex state
         * @param {Object} param1 { name, params, query } 路由信息
         */
        d2adminPageOpenNew (state, { name, params, query }) {
        // 已经打开的页面
        let pageOpenedList = state.pageOpenedList
        // 判断此页面是否已经打开 并且记录位置
        let pageOpendIndex = 0
        const pageOpend = pageOpenedList.find((page, index) => {
            const same = page.name === name
            pageOpendIndex = same ? index : pageOpendIndex
            return same
        })
        if (pageOpend) {
            // 页面以前打开过 但是新的页面可能 name 一样，参数不一样
            this.commit('d2adminPageOpenedListUpdateItem', { index: pageOpendIndex, params, query })
        } else {
            // 页面以前没有打开过
            let tag = state.pagePool.find(t => t.name === name)
            if (tag) {
            this.commit('d2adminTagIncreate', { tag, params, query })
            }
        }
        this.commit('d2adminPageCurrentSet', name)
        },
        /**
         * @class pageCurrent
         * @description 设置当前激活的页面 name
         * @param {vuex state} state vuex state
         * @param {String} name new name
         */
        d2adminPageCurrentSet (state, name) {
        state.pageCurrent = name
        },
        /**
         * @class pageOpenedList
         * @description 更新页面列表上的某一项
         * @param {vuex state} state vuex state
         * @param {Object} param1 { index, params, query } 路由信息
         */
        d2adminPageOpenedListUpdateItem (state, { index, params, query }) {
        // 更新页面列表某一项
        let page = state.pageOpenedList[index]
        page.params = params || page.params
        page.query = query || page.query
        state.pageOpenedList.splice(index, 1, page)
        // 更新设置到数据库
        this.commit('d2adminUtilVuex2DbByUuid', 'pageOpenedList')
        },
        /**
         * @class pageOpenedList
         * @description 从数据库载入分页列表
         * @param {vuex state} state vuex state
         */
        d2adminPageOpenedListLoad (state) {
            this.commit('d2adminUtilDb2VuexByUuid', {
                key: 'pageOpenedList',
                defaultValue: [
                pageOpenedDefult
                ]
            })
        },
        /**
         * @class pageOpenedList
         * @description 新增一个 tag (打开一个页面)
         * @param {vuex state} state vuex state
         * @param {Object} param1 new tag info
         */
        d2adminTagIncreate (state, { tag, params, query }) {
            // 设置新的 tag 在新打开一个以前没打开过的页面时使用
            let newPage = tag
            newPage.params = params || newPage.params
            newPage.query = query || newPage.query
            // 添加进当前显示的页面数组
            state.pageOpenedList.push(newPage)
            // 更新设置到数据库
            this.commit('d2adminUtilVuex2DbByUuid', 'pageOpenedList')
        },
        /**
         * @class pageOpenedList
         * @description 关闭一个 tag (关闭一个页面)
         * @param {vuex state} state vuex state
         * @param {Object} param1 { tagName: 要关闭的标签名字, vm: vue }
         */
        d2adminTagClose (state, { tagName, vm }) {
        // 下个新的页面
        let newPage = state.pageOpenedList[0]
        const isCurrent = state.pageCurrent === tagName
        // 如果关闭的页面就是当前显示的页面
        if (isCurrent) {
            // 去找一个新的页面
            let len = state.pageOpenedList.length
            for (let i = 1; i < len; i++) {
                if (state.pageOpenedList[i].name === tagName) {
                    if (i < len - 1) {
                        newPage = state.pageOpenedList[i + 1]
                    } else {
                        newPage = state.pageOpenedList[i - 1]
                    }
                    break
                }
            }
        }
        // 找到这个页面在已经打开的数据里是第几个
        const index = state.pageOpenedList.findIndex(page => page.name === tagName)
        if (index >= 0) {
            state.pageOpenedList.splice(index, 1)
        }
        // 更新设置到数据库
        this.commit('d2adminUtilVuex2DbByUuid', 'pageOpenedList')
        // 最后需要判断是否需要跳到首页
        if (isCurrent) {
            const { name = '', params = {}, query = {} } = newPage
            let routerObj = {
            name,
            params,
            query
            }
        vm.$router.push(routerObj)
        }
        },
        /**
         * @class pageOpenedList
         * @description 关闭当前标签左边的标签
         * @param {vuex state} state vuex state
         * @param {Object} param1 { pageSelect: 当前选中的tagName, vm: vue }
         */
        d2adminTagCloseLeft (state, { pageSelect, vm } = {}) {
        const pageAim = pageSelect || state.pageCurrent
        let currentIndex = 0
        state.pageOpenedList.forEach((page, index) => {
            if (page.name === pageAim) {
                currentIndex = index
            }
        })
        if (currentIndex > 0) {
            state.pageOpenedList.splice(1, currentIndex - 1)
        }
        state.pageCurrent = pageAim
        if (vm && vm.$route.name !== pageAim) {
        vm.$router.push({
            name: pageAim
            })
        }
        // 更新设置到数据库
        this.commit('d2adminUtilVuex2DbByUuid', 'pageOpenedList')
        },
        /**
         * @class pageOpenedList
         * @description 关闭当前标签右边的标签
         * @param {vuex state} state vuex state
         * @param {Object} param1 { pageSelect: 当前选中的tagName, vm: vue }
         */
        d2adminTagCloseRight (state, { pageSelect, vm } = {}) {
        const pageAim = pageSelect || state.pageCurrent
        let currentIndex = 0
        state.pageOpenedList.forEach((page, index) => {
            if (page.name === pageAim) {
            currentIndex = index
            }
        })
        state.pageOpenedList.splice(currentIndex + 1)
        state.pageCurrent = pageAim
        if (vm && vm.$route.name !== pageAim) {
        vm.$router.push({
            name: pageAim
            })
        }
        // 更新设置到数据库
        this.commit('d2adminUtilVuex2DbByUuid', 'pageOpenedList')
        },
        /**
         * @class pageOpenedList
         * @description 关闭当前激活之外的 tag
         * @param {vuex state} state vuex state
         * @param {Object} param1 { pageSelect: 当前选中的tagName, vm: vue }
         */
        d2adminTagCloseOther (state, { pageSelect, vm } = {}) {
        const pageAim = pageSelect || state.pageCurrent
        let currentIndex = 0
        state.pageOpenedList.forEach((page, index) => {
            if (page.name === pageAim) {
            currentIndex = index
            }
        })
        if (currentIndex === 0) {
            state.pageOpenedList.splice(1)
        } else {
            state.pageOpenedList.splice(currentIndex + 1)
            state.pageOpenedList.splice(1, currentIndex - 1)
        }
        state.pageCurrent = pageAim
        if (vm && vm.$route.name !== pageAim) {
        vm.$router.push({
                name: pageAim
            })
        }
        // 更新设置到数据库
        this.commit('d2adminUtilVuex2DbByUuid', 'pageOpenedList')
        },
        /**
         * @class pageOpenedList
         * @description 关闭所有 tag
         * @param {vuex state} state vuex state
         * @param {Object} vm vue
         */
        d2adminTagCloseAll (state, vm) {
        state.pageOpenedList.splice(1)
        // 更新设置到数据库
        this.commit('d2adminUtilVuex2DbByUuid', 'pageOpenedList')
        // 关闭所有的标签页后需要判断一次现在是不是在首页
        if (vm.$route.name !== 'index') {
        vm.$router.push({
            name: 'index'
            })
        }
        },
        /**
         * 设置侧边栏展开或者收缩
         * @class isMenuAsideCollapse
         * @param {vuex state} state vuex state
         * @param {Boolean} collapse is collapse
         */
        d2adminMenuAsideCollapseSet (state, collapse) {
        state.isMenuAsideCollapse = collapse
        this.commit('d2adminUtilVuex2DbByUuid', 'isMenuAsideCollapse')
        },
        /**
         * 切换侧边栏展开和收缩
         * @class isMenuAsideCollapse
         * @param {vuex state} state vuex state
         */
        d2adminMenuAsideCollapseToggle (state) {
        state.isMenuAsideCollapse = !state.isMenuAsideCollapse
        this.commit('d2adminUtilVuex2DbByUuid', 'isMenuAsideCollapse')
        },
        /**
         * 从数据库读取侧边栏展开或者收缩
         * @class isMenuAsideCollapse
         * @param {vuex state} state vuex state
         */
        d2adminMenuAsideCollapseLoad (state) {
        this.commit('d2adminUtilDb2VuexByUuid', {
            key: 'isMenuAsideCollapse',
            defaultValue: false //默认收缩
        })
        },
        /**
         * @class isFullScreen
         * @description 切换全屏
         * @param {vuex state} state vuex state
         */
        d2adminFullScreenToggle () {
        if (screenfull.isFullscreen) {
            screenfull.exit()
            this.commit('d2adminFullScreenSet', false)
        } else {
            screenfull.request()
            this.commit('d2adminFullScreenSet', true)
        }
        },
        /**
         * @class isFullScreen
         * @description 设置 store 里的全屏状态
         * @param {vuex state} state vuex state
         */
        d2adminFullScreenSet (state, isFullScreen) {
        state.isFullScreen = isFullScreen
        },
        /**
         * @class isGrayMode
         * @description 切换灰度状态
         * @param {vuex state} state vuex state
         */
        d2adminGrayModeToggle (state) {
        state.isGrayMode = !state.isGrayMode
        },
        /**
         * @class isGrayMode
         * @description 设置灰度模式
         * @param {vuex state} state vuex state
         * @param {Boolean} value new value
         */
        d2adminGrayModeSet (state, value) {
        state.isGrayMode = value
        },
        /**
         * @class themeActiveName
         * @description 激活一个主题（应用到dom上）
         * @param {vuex state} state vuex state
         * @param {String} themeValue 需要激活的主题名称
         */
        d2adminThemeSet (state, themeName) {
        // 检查这个主题在主题列表里是否存在
        const theme = state.themeList.find(e => e.name === themeName)
        if (theme) {
            // 设置 state
            state.themeActiveName = themeName
        } else {
            // 设置为列表第一个主题
            state.themeActiveName = state.themeList[0].name
        }
        // 将 vuex 中的主题应用到 dom
        this.commit('d2adminTheme2dom')
        // 保存到数据库
        this.commit('d2adminUtilVuex2DbByUuid', 'themeActiveName')
        },
        /**
         * @class themeActiveName
         * @description 从数据库加载主题设置
         * @param {vuex state} state vuex state
         */
        d2adminThemeLoad (state) {
            // 刷新页面指定theme查询参数时，设置为对应主题
            if (state.urlParamInfo.theme) {
                this.commit('d2adminThemeSet',state.urlParamInfo.theme)
            } else {
                this.commit('d2adminUtilDb2VuexByUuid', {
                    key: 'themeActiveName',
                    defaultValue: (setting.layout.defaultTheme?setting.layout.defaultTheme:state.themeList[0].name)
                })
            }
        this.commit('d2adminTheme2dom')
        },
        /**
         * 设置设备标识 -By Wucp
         * @param state
         * @param device
         * @constructor
         */
        TOGGLE_DEVICE (state, device) {
            state.device = device
            this.commit('d2adminTheme2dom')
        },
        /**
         * @class themeActiveName
         * @description 将 vuex 中的主题应用到 dom
         * @param {vuex state} state vuex state
         */
        d2adminTheme2dom (state) {
        document.body.className = `theme-${state.themeActiveName} theme-${state.themeActiveName}-${state.device}`
        },
        /**
         * 设置当前登录APP信息
         * @param state
         * @param currentAppInfo
         */
        currentAppInfoSet (state, currentAppInfo) {
            state.currentAppInfo = currentAppInfo
        },
        windowHeightSet (state, windowHeight) {
            state.windowHeight = windowHeight
        },
        dictInfoSet (state, dictInfo) {
            state.dictInfo = dictInfo
        },
        urlParamInfoSet (state, urlParamInfo) {
            state.urlParamInfo = urlParamInfo
        },
        /**
         * 设置当前应用标识 并 持久化到db
         * @param state
         * @param appFlag
         */
        appFlagSet (state, appFlag) {
            state.appFlag = appFlag
            this.commit('d2adminUtilVuex2Db', 'appFlag')
        },
        /**
         * 从数据库db加载appFlag应用标识
         */
        appFlagLoad (state) {
            this.commit('d2adminUtilDb2Vuex', {
                key: 'appFlag',
                defaultValue: VUE_CONFIG.appFlag //默认使用配置文件的值
            })
        },
    }
}
