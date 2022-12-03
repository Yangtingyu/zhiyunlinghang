import setting from '@/setting.js'
// 系统管理
import system from './modules/system'
// 示例参考页面
import demo from './modules/demo'

// 顶栏菜单
export const menuHeader = [
    {
        path: '/cvis/security-manage',
        title: '主页',
        // 可使用font-awesome提供的图标
        icon: 'home',
        // isOnlyText 表示是否只显示文字模式，不显示图标
        isOnlyText: false
    },
    /*{
        /!*
        打开方式：
        blank 打开新网页
        dialog 弹出框打开
        tab tab页方式打开
        self 自身页面跳转
        _self 直接刷新当前窗口
        *!/
        path: '/cmiot-home-situation',
        // path: `${setting.systemInfo.baseHost}/index/main/monitoring.list.4028b2be61f3e28f0161f4db47fd000a`,
        openMode: '_self',
        title: '态势展示',
        icon: 'cube'
    },*/
    //demoComponents,
    // {
    //     title: '系统管理 & DEMO',
    //     icon: 'cog',
    //     children: [
    //         system,
    //         demo
    //     ]
    // },
    //demo
]

// 侧边栏菜单
export const menuAside = [
    // system,
    // demo,
    {
        path: '/page1',
        title: "资产安全态势",
        icon: "cube"
    },
    {
        path: '/page2',
        title: "漏洞态势TOP10",
        icon: "cube"
    },
    {
        path: '/page3',
        title: "网络安全事件类型",
        icon: "cube"
    },
    {
        path: '/page4',
        title: "数据安全事件类型",
        icon: "cube"
    },
    {
        path: '/page5',
        title: "安全事件",
        icon: "cube"
    },
    // {
    //     path: '/page6',
    //     title: "攻击地图",
    //     icon: "cube"
    // },
]

/**
 * 应用商店角色菜单列表（预留变量）
 */
export const menuAppStore = [

]
/**
 * 分中心角色菜单列表（预留变量）
 */
export const menuCenterAppStore = [

]

/**
 * 用于应用商店角色登录后页面顶部的菜单（预留变量）
 */
export const headerMenuAppStore = []
/**
 * 用于分中心角色登录后页面顶部的菜单（预留变量）
 */
export const headerMenuCenterAppStore = []
