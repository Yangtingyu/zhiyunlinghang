import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
// flex.css
import 'flex.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入element-ui各种布局的主题样式
import '@zebra-projects/zebra-ui/src/assets/style/theme/element-theme.js'

import screenfull from 'screenfull'
//import '@/assets/svg-icons'

// zebra-ui通用组件
import '@zebra-projects/zebra-ui/src/components/zebra-ui-index.js'
// 本地通用组件
import '@/components'

import '@/plugin/axios'
import util from '@/libs/util.js'
import store from '@/store/index'
import pluginOpen from '@/plugin/open'
import '@/directives'
// 项目配置文件
import setting from '@/setting.js'

// 菜单和路由设置
import router from './router'
import { menuHeader, menuAside, menuAppStore, menuCenterAppStore } from '@/menu'
import { frameInRoutes } from '@/router/routes'

//引入v-charts
import VCharts from 'v-charts'
Vue.use(VCharts)

// 引入zebra-vue-ui组件
import zebraUI from '@zebra-projects/zebra-ui'
import '@zebra-projects/zebra-ui/lib/zebra-ui.css'

// 引入前端导出Word工具
import ZebraSmartTools from '@zebra-projects/zebra-smart-tools'
Vue.use(ZebraSmartTools)
import '@zebra-projects/zebra-smart-tools/lib/index/style.css'

import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import "leaflet/dist/leaflet.css"

// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

// gxb项目使用
import { initGlobalCache } from "@/utils/base";
// 全局缓存，刷新或退出登录时清空
initGlobalCache();

import moment from 'moment'
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)
Vue.use(zebraUI)

Vue.use(ElementUI)
Vue.use(pluginOpen)

Vue.config.productionTip = false

Vue.prototype.$env = process.env.NODE_ENV
Vue.prototype.$baseUrl = process.env.BASE_URL

//引入超图
import VueiClient from '@supermap/vue-iclient-mapboxgl';
Vue.use(VueiClient);

Vue.filter('operationAlertLevel', function (value) {
  if (!value)
    return ''

  value = value.toString()
  switch (value) {
    case 'HIGH':
    case '高':
    case '3':
    case '4':
      return '高'
    case 'LOW':
    case '低':
    case '1':
      return '低'
  }
  return '中'
})

Vue.filter('operationEventType', function (value) {
  if (!value)
    return ''

  let eventType = {
    '8': '邮件日志',
    '9': 'HTTP/HTTPS日志',
    '10': 'FTP日志',
    '11': 'Web邮件日志',
    '12': '文件共享日志',
    '13':'即时通讯日志'
  }
  return '8,9,10,11,12,13'.indexOf(value) > -1 ? eventType[value] : value
})

Vue.filter('timeFormat', function (value) {
  return value ? moment(value).format('YYYY-MM-DD hh:mm:ss') : ''
})

new Vue({
    router,
    store,
    render: h => h(App),
    created () {
        //修改ele 的select下拉组件增加filterable会出现点击收回图标下拉选项收不回的bug
        Object.getPrototypeOf(this.$options.components).ElSelect.options.methods.handleFocus = (event) => {
          // console.log('修改ele 的select下拉组件增加filterable会出现点击收回图标下拉选项收不回的bug');

        }
        // 处理路由，得到每一级的路由设置
        this.getAllPageFromRoutes()
        // 设置顶栏菜单
        this.$store.commit('d2adminMenuHeaderSet', menuHeader)
        // 设置侧边栏菜单
        this.$store.commit('d2adminMenuAsideSet', menuAside)
        // 重新获取当前菜单数据
        this.$store.dispatch('initMyMenuInfo',{ vm:this })
        // 重新获取后台的字典数据
        this.$store.dispatch('initMyDictInfo',{ vm:this })

        // 初始化应用商店角色相关菜单
        this.initAppStoreMenu()

        // 初始化url参数，用于指定初始化布局等设置
        this.$store.commit('urlParamInfoSet', this.getUrlKeyObject())
    },

    mounted () {
        // 获取并记录用户 UA
        this.$store.commit('d2adminUaGet')

        // 展示系统信息
        util.showInfo()

        // 用户登录后从数据库加载一系列的设置
        this.$store.commit('d2adminLoginSuccessLoad')

        // 初始化全屏监听
        this.fullscreenListenerInit()

        // 预渲染组件所需 You'll need this for renderAfterDocumentEvent.
        document.dispatchEvent(new Event('render-event'))
    },

    watch: {
        // 监听路由 控制侧边栏显示
        // 显示规则为
        '$route.matched' (val) {
            if (setting.menu.autoMenuAside) {
                console.log('当前路由记录第一个值:', val[0].path)
                const _side = menuAside.filter(menu => menu.path === val[0].path)
                console.log('匹配到的侧边栏菜单:', (_side.length > 0 && _side[0].children) ? _side[0].children : [])
                this.$store.commit('d2adminMenuAsideSet', (_side.length > 0 && _side[0].children) ? _side[0].children : [])
            }
        }
    },

    methods: {
        /**
         * 初始化全屏监听
         */
        fullscreenListenerInit () {
            if (screenfull.enabled) {
                screenfull.on('change', () => {
                    if (!screenfull.isFullscreen) {
                        this.$store.commit('d2adminFullScreenSet', false)
                    }
                })
            }
        },

        /**
         * 处理路由 得到所有的页面
         */
        getAllPageFromRoutes () {
            const pool = []
            const push = function (routes) {
                routes.forEach(route => {
                    if (route.children) {
                        push(route.children)
                    } else {
                        const { meta, name, path } = route
                        pool.push({ meta, name, path })
                    }
                })
            }
            push(frameInRoutes)
            this.$store.commit('d2adminPagePoolSet', pool)
        },

        /**
         * 初始化应用商店角色相关菜单
         */
        initAppStoreMenu() {
            this.$store.commit('d2adminUserInfoLoad')
            if (this.$store.state.d2admin.userInfo.appstoreIsLogin) {
                // role字段为新增，用于区分“应用商店-appstore”和“分中心-center”
                let role = this.$store.state.d2admin.userInfo.role
                let appendMenu = [] //动态新增菜单
                if(role === 'appstore'){
                    appendMenu = menuAppStore
                }else if(role === 'center'){
                    appendMenu = menuCenterAppStore
                }
                // 设置顶栏菜单
                this.$store.commit('d2adminMenuHeaderSet', [...menuHeader,...appendMenu])
                // 设置侧边栏菜单
                this.$store.commit('d2adminMenuAsideSet', [...menuAside,...appendMenu])
            }
        },

        /**
         * 获取url的请求参数对象
         * @returns {Object}
         */
        getUrlKeyObject() {
            let url = location.search; //获取url中"?"符后的字串
            let theRequest = new Object();
            if (url.indexOf("?") != -1) {
                let str = url.substr(1);
                let strs = str.split("&");
                for(let i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }
    }
}).$mount('#app')
