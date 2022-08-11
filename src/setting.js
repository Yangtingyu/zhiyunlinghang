// 导入静态配置，即可部署后更改，对应文件public/script/config.js
import VUE_CONFIG from 'VUE_CONFIG'

/**
 * 配置文件
 */
export default {
    // 是否为单体应用，单体应用模式下仅提供左侧菜单（暂不完善）
    isIndependentApp: false,
    systemInfo: {
        // 项目名，用以区分项目
        projectName: VUE_CONFIG.systemInfo.projectName,
        // 系统key值
        key: VUE_CONFIG.systemInfo.key,
        //新版大屏key
        keyV6:VUE_CONFIG.systemInfo.keyV6,
        // 福建版工业互联网
        keyFuJiaIIOT: VUE_CONFIG.systemInfo.keyFuJiaIIOT,
        // 应用ID，获取字典数据所需的参数
        appId: VUE_CONFIG.systemInfo.appId,
        // 域名前缀
        baseHost: VUE_CONFIG.systemInfo.baseHost,
        // angualr大屏服务地址前缀
        angularServiceUrl: VUE_CONFIG.systemInfo.angularServiceUrl,
        // 开启路由权限检查，未登录时，跳转到登录页（建议开启）
        isRouterAuthorityCheck: true,
        // 开启ajax权限检查，未登录时，跳转到登录页（建议开启）
        isAjaxAuthorityCheck: true,
    },
    layout: {
        // 布局模式，默认值1
        // 0-经典布局
        // 1-适合内网管理系统的布局
        // 2-适合门户网站的布局
        // 3-与公司原Angular版本相似的布局
        // 4-国光项目定制布局
        // 5-物联网项目定制布局
        // 6-中移物联网项目定制布局
        layoutType: 6,
        // 默认主题：black、dark-blue、blue、green、d2等等
        // 更多主题值，详见"src/assets/style/theme/list.js"文件中的name值
        defaultTheme: 'dream-blue',
        // 是否开启VIP主题（默认关闭）
        isThemeVIP: true,
        // 面包屑
        isShowBreadcrumb: false,
        // 是否显示顶部菜单（仅在部分布局下生效）
        isShowMenuHeader: true,
        // 是否缓存页面数据，即不刷新浏览器的情况下，点击过的页面状态是否保留
        isKeepAlive: false,
        // 是否显示大屏页入口按钮
        isShowBigScreen: true,
        // 大屏页面路径
        bigScreenRouterPath: '/',
        // 是否开启顶栏的修改密码入口，默认开启
        isHeaderUpdatePwd: false
    },
    menu: {
        // 侧边栏默认折叠状态
        asideCollapse: false,
        // 是否使用模拟菜单，即不加载后台服务提供的动态菜单
        useMockMenu: false,
        // 是否开启自动侧边栏，根据当前页面的“路由记录”，自动匹配显示“侧边菜单”的子菜单
        autoMenuAside: false,
    },
    caiotBigScreenIsMock: VUE_CONFIG.caiotBigScreenIsMock, //物联网大屏数据是否开启模拟
    sqlkeyRelation: VUE_CONFIG.sqlkeyRelation, //sqlkey数据字段映射
    sqlkeySortInfo: VUE_CONFIG.sqlkeySortInfo, // sqlkey排序信息，不指定时，按照原value对应的字段倒序排序s
}
