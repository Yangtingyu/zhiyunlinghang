import setting from '@/setting.js'

// 导入工具模板动态路由配置文件

/**
 * 元数据
 * @type {{requiresAuth: boolean}} requiresAuth为true表示需要授权登录后访问
 */
const meta = { requiresAuth: true }

/**
 * 自动布局
 */
import layout from '@zebra-projects/zebra-ui/src/layout/header-aside/auto-layout'

/**
 * 在主框架内显示
 */
const frameIn = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login/page.vue'),
        meta: { meta, title: '登录' }
    },
    {
        path: '/',
        //redirect: {name: 'index'},
        redirect: { name: 'security-manage' },
        // redirect: {name: 'iov-overall-situation'},
        // redirect: {name: VUE_CONFIG.defaultHomePage},
        // redirect: VUE_CONFIG.defaultHomePage,
        // redirect: "/smart-index",
        meta,
        component: layout,
        children: [
            {
                path: '/page1',
                name: 'page1',
                component: () => import('@/pages/cvis/pages/page1'),
                meta: { meta, title: '资产安全态势' }
            },
            // {
            //     path: '/page2',
            //     name: 'page2',
            //     component: () => import('@/pages/cvis/pages/page1'),
            //     meta: { meta, title: '漏洞态势TOP10' }
            // },
            // {
            //     path: '/page3',
            //     name: 'page3',
            //     component: () => import('@/pages/cvis/pages/network'),
            //     meta: { meta, title: '网络安全事件类型' }
            // },
            // {
            //     path: '/page4',
            //     name: 'page4',
            //     component: () => import('@/pages/cvis/pages/data'),
            //     meta: { meta, title: '数据安全事件类型' }
            // },
            // {
            //     path: '/page5',
            //     name: 'page5',
            //     component: () => import('@/pages/cvis/pages/event'),
            //     meta: { meta, title: '安全事件' }
            // },
            // {
            //     path: '/page6',
            //     name: 'page6',
            //     component: () => import('@/pages/cvis/pages/page1'),
            //     meta: { meta, title: '攻击地图' }
            // },
        ]
    },

    {
        path: '/gis-demo',
        name: 'gis-demo',
        component: () => import('@/pages/demo/gis-demo/index'),
        meta: { meta, title: 'GIS测试' }
    },

    {
        path: '/demo',
        redirect: { name: 'demo' },
        component: layout,
        children: [
            {
                path: 'demo1',
                name: 'demo1',
                component: () => import('@/pages/demo/demo1'),
                meta: { meta, title: 'DEMO1' }
            },
            {
                path: 'demo2',
                name: 'demo2',
                component: () => import('@/pages/demo/demo2'),
                meta: { meta, title: 'DEMO2' }
            },
            {
                path: 'iframe-demo',
                name: 'iframe-demo',
                component: () => import('@/pages/demo/iframe-demo'),
                meta: { meta, title: 'iframe-demo' }
            }
        ]
    },
    {

        path: '/cvis/security-manage',
        name: 'security-manage',
        meta: { requiresAuth: false, title: '业务安全态势' },
        component: () => import('@/pages/cvis/security-manage')
    },

]

/**
 * 在主框架之外显示
 */
const frameOut = [
    // 登录
    /*{
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login/page')
    },*/
    {
        path: '/login',
        name: 'login',
        redirect: { name: 'map-fight' },
        component: () => import('@/pages/login/smart-switch')
    }
]

/**
 * 错误页面
 */
const errorPage = [
    // 404
    {
        path: '*',
        name: '404',
        component: () => import('@/pages/error-page-404')
    }
]



// 导出需要显示菜单的
export const frameInRoutes = [
    ...frameIn,
]

// 重新组织后导出
export default [
    ...frameInRoutes,
    ...frameOut,
    ...errorPage
]
