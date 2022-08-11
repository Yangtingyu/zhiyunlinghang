export default {
  path: '/business-system-indicator2',
  title: '示例',
  icon: 'flask',
  children: [
      {
          path: 'intelligence-menus',
          title: 'CRUD 示例',
          //isOnlyText: true,
          icon: 'envelope',
          children: [
              {
                  path: '/guoguan/intelligence-list',
                  title: '威胁情报管理-富文本',
                  isOnlyText: true
              },
              {
                  path: '/guoguan/intelligence-category-list',
                  title: '情报分类管理',
                  isOnlyText: true
              },
              {
                  path: '/guoguan/intelligence-tag-list',
                  title: '情报标签管理',
                  isOnlyText: true
              },
              {
                  path: '/guoguan/intelligence-link-list',
                  title: '推荐情报链接管理',
                  isOnlyText: true
              }
          ]
      },
      {
          path: '/guoguan/statistics-report',
          title: '统计报表',
          icon: 'pie-chart'
      },
      {
          path: '/guoguan/information-publish',
          title: '建设中',
          icon: 'cube'
      },
      {
          path: '/demo/iframe-demo',
          title: '外链',
          icon: 'cube'
      },
      {
          path: '/kit',
          title: '工具模板示例',
          icon: 'lemon-o',
          children: [
              {
                  path: '/kit/basicAppEvents',
                  title: '涉诈APP事件报送管理',
                  isOnlyText: true
              },
              {
                  path: '/kit/basicUrlInfoDown',
                  title: '涉诈网址事件报送管理',
                  isOnlyText: true
              },
              {
                  path: '/kit/basicCompany',
                  title: '经营主体基础信息',
                  isOnlyText: true
              },
              {
                  path: '/kit/basicPlatform',
                  title: '平台基础信息',
                  isOnlyText: true
              },
              {
                  path: '/kit/basicIp',
                  title: '平台IP地址',
                  isOnlyText: true
              }
          ]
      },
  ]
}
