export default {
  /*path: '/business-system-indicator',
  title: '业务系统指标',
  icon: 'area-chart',
  children: (pre => [
    { path: `${pre}index`, title: '业务系统指标首页', icon: 'home' },
      { path: `${pre}ips-ids/protective-event`, title: 'OneNET', icon: 'code' },
      { path: `${pre}ips-ids/protective-event`, title: 'OneLink', icon: 'code' },
      { path: `${pre}ips-ids/protective-event`, title: '和目', icon: 'code' },
      { path: `${pre}ips-ids/protective-event`, title: '车联网', icon: 'code' },
      { path: `${pre}ips-ids/protective-event`, title: '业务网关', icon: 'code' },
  ])('/business-system-indicator/')*/
    path: '/system',
    title: '系统管理',
    icon: 'cogs',
    children: [
        { path: '/system/user', title: '用户管理',icon: 'user'},
        { path: '/system/role', title: '角色管理', icon: 'cogs' },
        { path: '/system/menu', title: '菜单管理', icon: 'cube'},
        { path: '/system/app', title: '系统应用',  icon: 'thumb-tack'},
        { path: '/system/login-log', title: '登录日志', icon: 'star'},
        { path: '/system/operation-log', title: '操作日志', icon: 'cube' },
        { path: '/system/dic', title: '字典管理', icon: 'cogs' },
        { path: '/system/pwd', title: '修改密码', icon: 'thumb-tack' },
        { path: '/system/org', title: '组织机构管理', icon: 'sitemap' }
        /*{ path: '/system/dic', title: '字典管理-Test', isOnlyText: true },*/
    ]
}
