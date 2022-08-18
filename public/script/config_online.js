// 开发环境配置文件
if (ENVIRONMENT_MODE == "dev") {
  // 应用标识，用于切换当前应用的对应配置appConfigInfo
  // iov:车联网、iot-jiangxi:江西物联网、iot-shandong:山东物联网、数据安全data_security_beijing_unicom
  // let appFlag = "iot-jiangxi"
  let appConfigInfo = {
    "cq-cvis": {
      // 默认主页名，用于登录默认页面（江西物联网：iot-jiangxi-overall-situation，车联网：iov-overall-situation)
      defaultHomePage: "/cvis/security-manage",
      // 应用标题（影响登录页、标题栏名称）
      appTitle: "车路协同安全管理平台",
      // 应用描述
      appDesc: "重庆 车路协同",
      // 登录页风格类型（login-page-default：默认风格，login-page-type-1：数据安全新版风格）
      loginPageType: "login-page-blue-sky",
      // 预览缩略图
      previewImg: "/image/app-list/iov.png",
      // 登录使用的应用Key
      key: "caiot-manage-w7",
      // 地图对应的省份名
      provinceName: "",
      // 大屏缩放模式(width:宽度撑满,auto:自适应,stretch:撑满屏幕，会变形)
      bigScrrenScaleMode: "auto",
    },
    "w-beijing": {
      // 默认主页名，用于登录默认页面（江西物联网：iot-jiangxi-overall-situation，车联网：iov-overall-situation)
      defaultHomePage: "/overall-situation-bj-w7",
      // 应用标题（影响登录页、标题栏名称）
      appTitle: "物联网大数据态势感知应用",
      // 应用描述
      appDesc: "W7 北京 物联网",
      // 登录页风格类型（login-page-default：默认风格，login-page-type-1：数据安全新版风格）
      loginPageType: "login-page-blue-sky",
      // 预览缩略图
      previewImg: "/image/app-list/iov.png",
      // 登录使用的应用Key
      key: "caiot-manage-w7",
      // 地图对应的省份名
      provinceName: "北京",
      // 大屏缩放模式(width:宽度撑满,auto:自适应,stretch:撑满屏幕，会变形)
      bigScrrenScaleMode: "auto",
    },
    "jinyu-cic": {
      // 默认主页名，用于登录默认页面（江西物联网：iot-jiangxi-overall-situation，车联网：iov-overall-situation)
      defaultHomePage: "/cic/map-fight",
      // 应用标题（影响登录页、标题栏名称）
      appTitle: "挂图作战",
      // 应用描述
      appDesc: "挂图作战 金御 GIS",
      // 登录页风格类型（login-page-default：默认风格，login-page-type-1：数据安全新版风格）
      loginPageType: "login-page-blue-sky",
      // 预览缩略图
      previewImg: "/image/app-list/iov.png",
      // 登录使用的应用Key
      key: "caiot-manage-w7",
      // 地图对应的省份名
      provinceName: "北京",
      // 大屏缩放模式(width:宽度撑满,auto:自适应,stretch:撑满屏幕，会变形)
      bigScrrenScaleMode: "auto",
    },
  };

  window.VUE_CONFIG = {
    /**
     * mock数据开关
     * true:模拟
     * false:真实数据
     */
    isMockQuery: true,

    // 全局布局开关
    gridLayoutEnable: false,

    // 默认主页名，用于登录默认页面（江西物联网：iot-jiangxi-overall-situation，车联网：iov-overall-situation)
    defaultHomePage: appConfigInfo[appFlag].defaultHomePage,
    // 应用标识
    appFlag: appFlag,
    // 应用标题（影响登录页、标题栏名称）
    appTitle: appConfigInfo[appFlag].appTitle,
    // 应用配置信息列表
    appConfigInfo: appConfigInfo,
    // 启用app切换按钮
    enableAppFlagSwitchButton: true,
    // 设计图按钮开关
    enablePageDesignInfoButton: true,
    // 启用APP标识切换功能，启用后可使用“ALT+S”快捷键切换系统，默认关闭
    enableAppFlagSwitch: true,
    // 启用网格布局切换功能，启用后可使用“Ctrl+ALT+单击布局区域”，默认关闭
    enableGridLayoutSwitch: true,

    queryPageListUrl: "/service/monitoring-query/dataanalysiscommon/list",

    systemInfo: {
      // 项目名，用以区分项目
      projectName: "iiot-guangdian",
      // 系统key值
      // key: 'monitoring-query',
      // key: 'iiot-bigscreen-v6'
      // key: 'iiot-gxbii-v6-core',
      key: appConfigInfo[appFlag].key,
      // key: 'gxbv5_core_temp',
      keyV6: "iiot-gxbii-v6-core",
      // 山东的请求KEY
      keyShanDong: "iiot-gxbii-v6-core", // 'gxbv5_core',
      // 车联网
      keyIov: "caiot-manage-province",
      // 江西物联网新版
      keyJiangXiIoT: "caiot-manage-jiangxi",
      // 山东物联网新版
      keyShanDongIoT: "caiot-manage-shandong",
      // 福建版工业互联网
      keyFuJiaIIOT: "gxbv5_core_fj",
      // W7-物联网项目服务key
      keyW7Iot: "caiot-manage-w7",
      // 金御挂图作战项目服务key
      keyJinyuCic: "./",
      // 应用ID，获取字典数据所需的参数
      appId: 31,

      // 域名前缀
      baseHost:
        "http://192.168.202.222:5116/#/index/main/monitoring.list.4028b2be61f3e28f0161f4db47fd000a",

      // angualr大屏服务地址前缀
      angularServiceUrl: "http://192.168.202.222:8097/#",
    },

    isRemoteTableHead: true,

    enableDebug: true,

    // 是否加载地图瓦片层
    isLoadMapLayers: false,
    // 是否为内网：true为内网（线上）,false为外网（调试）
    isIntranet: false,

    // w7项目模拟数据（调试使用）
    isMockApiDataForW7: false,
    // 地图色彩配置
    echartMapThemeInfo: {
      // 分布图色彩区间
      mapRangeColor: ["#5ab1ef", "#e5cf0d", "#c05050"],
      itemStyle: {
        // 区域的颜色
        areaColor: "rgba(0,107,255,0.15)",
        // 描边颜色
        borderColor: "#006BFF",
        // 描边线宽。为 0 时无描边。
        borderWidth: 1,
      },
      // 高亮状态
      emphasis: {
        label: {
          show: false,
        },
        itemStyle: {
          // 高亮时区域的颜色
          areaColor: "rgba(0,107,255,0.8)",
          opacity: 1,
          borderWidth: 2,
        },
      },
    },

    // 大屏缩放模式(width:宽度撑满,auto:自适应,stretch:撑满屏幕，会变形)
    bigScrrenScaleMode: appConfigInfo[appFlag].bigScrrenScaleMode || "auto",

    // 主页态势页面的日期最大值为
    home_situation_dateRangeMax: 15,
    // 主页态势页面的日期默认值为最大值的几天前
    home_situation_dateRange_before_day: 0,

    // new-top-bar组件顶部菜单配置（区分左右）
    topMenus: {
      left: [
        {
          name: "资产态势",
          value: "/cmiot-home-situation-asset-v3",
        },
        {
          name: "运行监测态势",
          value: "/cmiot-home-situation-tonglian-v3",
        },
      ],
      right: [
        {
          name: "安全态势",
          // value: 'http://dev.web.zzebra.cn:8139/#/home',
          children: [
            {
              name: "网络安全",
              value: "/gxb/enterprise-security",
            },
            {
              name: "数据安全",
              value: "/gxb/data-security",
            },
          ],
        },
      ],
    },
    // top-bar组件的顶部菜单配置
    topBarMenus: [
      {
        name: "资产态势",
        children: [
          {
            name: "总体态势",
            url: "/iov-overall-situation",
          },
          {
            name: "企业态势",
            url: "/iov-company-situation",
          },
          {
            name: "车辆态势",
            url: "/iov-car-situation",
          },
        ],
      },
      {
        name: "安全态势",
        children: [
          {
            name: "网络安全态势",
            url: "/iov-network-security-situation",
          },
          {
            name: "数据安全态势",
            url: "/iov-data-security-situation",
          },
        ],
      },
      {
        name: "其他大屏",
        children: [
          {
            name: "企业画像",
            url: "/iov-company-portrait",
          },
          {
            name: "车辆画像",
            url: "/iov-car-portrait",
          },
          {
            name: "企业资产",
            url: "/iov-company-asset",
          },
          {
            name: "企业安全",
            url: "/iov-company-security",
          },
          {
            name: "数字地图",
            url: "/iov-digital-map",
          },
          {
            name: "数字地图2",
            url: "/iov-digital-AMap3D",
          },
        ],
      },
      {
        name: "示例页面",
        url: "/iov-demo?rand=" + Math.random(),
      },
      {
        id: 1000110,
        type: 1,
        name: "参考页面",
        seq: "1",
        isLog: 1,
        children: [
          {
            name: "研判页",
            url: "/iov-logo",
          },
          {
            name: "江西物联网-综合态势感知",
            url: "/iot-overall-situation/jiangxi?rand=" + Math.random(),
          },
          {
            name: "江西物联网-平台安全态势",
            url: "/iot-platform-security-situation/jiangxi",
          },
          {
            name: "江西物联网-终端安全态势",
            url: "/iot-terminal-security-situation/jiangxi",
          },
          {
            name: "江西物联网-企业安全态势",
            url: "/iot-enterprise-security-situation/jiangxi",
          },
          {
            name: "江西物联网-摄像头安全态势",
            url: "/iot-camera-security-situation/jiangxi",
          },
          {
            name: "山东物联网-综合态势感知",
            url: "/iot-overall-situation/shandong",
          },
          {
            name: "山东-总体态势",
            url: "/shandong-overall-situation",
          },
          {
            name: "山东-资产态势",
            url: "/shandong-asset-situation",
          },

          {
            name: "山东-安全态势-资产漏洞态势",
            url: "/shandong-asset-leak-situation",
          },
          {
            name: "山东-安全态势-安全事件态势",
            url: "/shandong-security-event-situation",
          },
          {
            name: "山东-安全态势-成功事件态势",
            url: "/shandong-success-event-situation",
          },
          {
            name: "山东-安全态势-企业画像",
            url: "/shandong-corporate-portrait",
          },
          {
            name: "山东-安全态势-企业画像-V2",
            url: "/shandong-corporate-portrait-v2",
          },
          {
            name: "山东-安全态势-平台画像",
            url: "/shandong-platform-portrait",
          },
          {
            name: "山东-安全态势-标识解析节点画像",
            url: "/shandong-biaoshi-node-portrait",
          },
          {
            name: "山东-协同联动",
            url: "/shandong-linkage-situation",
          },

          {
            name: "山东-专项分析",
            url: "/shandong-specialized-analysis",
          },
          {
            name: "山东-专项分析-车联网",
            url: "/iov-special",
          },
          {
            name: "山东-专项分析-物联网",
            url: "/iot-over-situtation",
          },
          {
            name: "山东-专项分析-企业态势-工业企业态势",
            url: "/shandong-gongye-company-situation",
          },
          {
            name: "山东-专项分析-企业态势-平台企业态势",
            url: "/shandong-plat-company-situation",
          },
          {
            name: "山东-专项分析-企业态势-标识解析节点企业态势",
            url: "/shandong-biaoshi-company-situation",
          },

          {
            name: "宁夏-工业企业概况",
            url: "/common-company-situation",
          },
          {
            name: "宁夏-资产概况",
            url: "/common-asset-situation",
          },
          {
            name: "宁夏-行业概况",
            url: "/common-industry-overview",
          },
          {
            name: "宁夏-安全态势-网络安全",
            url: "/common-network-security",
          },
          {
            name: "宁夏-安全态势-数据安全",
            url: "/common-data-security",
          },
          {
            name: "宁夏-安全态势-重保用户",
            url: "/common-protection-user",
          },
          {
            name: "宁夏-风险预警",
            url: "/common-risk-warning",
          },

          {
            name: "通用版demo页面-V6",
            url: "/common-demo?rand=8888",
          },
          {
            name: "工业企业信息",
            url: "/guangdian-company-info",
          },
          {
            name: "攻击者视图",
            url: "/guangdian-attack-view",
          },
          {
            name: "被攻击者视图",
            url: "/guangdian-passivity-attack-view",
          },
          {
            name: "安全事件视图",
            url: "/guangdian-security-event",
          },
          {
            name: "漏洞风险视图",
            url: "/guangdian-leak-risk",
          },
          {
            name: "DOS攻击专题",
            url: "/guangdian-dos-gongji",
          },
          {
            name: "僵尸网络专题",
            url: "/guangdian-jiangshi-wangluo",
          },
          {
            name: "非法外联专题",
            url: "/guangdian-feifa-wailian",
          },
          {
            name: "挖矿事件专题",
            url: "/guangdian-wakuang-shijian",
          },
          {
            name: "接入企业安全态势",
            url: "/guangdian-company-security-situation",
          },
          {
            name: "安全SAAS服务",
            url: "http://192.168.90.75:9530/security/teminal/#/login?redirect=%2Fhomepage",
          },
          {
            id: 1000110,
            type: 1,
            name: "中移物联V3",
            seq: "1",
            url: "/home",
            isLog: 1,
            openMode: "_blank",
          },
          {
            id: 1000110,
            type: 1,
            name: "资产态势",
            seq: "1",
            url: "/cmiot-home-situation-asset-v3",
            isLog: 1,
          },
          {
            id: 1000109,
            type: 1,
            name: "运行监测态势",
            seq: "1",
            url: "/cmiot-home-situation-tonglian-v3",
            isLog: 1,
          },
          {
            name: "网络安全",
            url: "/gxb/enterprise-security",
          },
          {
            name: "数据安全",
            url: "/gxb/data-security",
          },
          {
            name: "数字地图",
            url: "/guangdian-digital-map",
          },
        ],
      },
    ],
    // 具体指定某个app应用下的菜单，这里优先级高于topBarMenus，未匹配到指定菜单会使用topBarMenus的菜单
    topBarMenusForAppFlag: {
      "w-beijing": [
        {
          name: "总体态势",
          url: "/overall-situation-bj-w7",
        },
        {
          name: "安全态势",
          url: "/security-situation-bj-w7",
        },
        {
          name: "应用领域",
          url: "/gis-application-area-dist-w7",
        },
        {
          name: "设备画像",
          url: "/device-portrait-w7",
        },
        {
          name: "重点区域",
          url: "/gis-important-area-w7",
        },
        {
          name: "其他大屏",
          children: [
            {
              name: "设备画像",
              url: "/device-portrait-w7?rand=1",
            },
            {
              name: "资产分析",
              url: "/company-asset-situation-bj-w7",
            },
            {
              name: "重点区域监测",
              url: "/important-region-situation-bj-w7",
            },
            {
              name: "态势总览-北京-已废弃",
              url: "/iot-overall-situation-bj/beijing",
            },
            {
              name: "资产态势",
              url: "/cmiot-home-situation-asset-v3",
            },
            {
              name: "运行监测态势",
              url: "/cmiot-home-situation-tonglian-v3",
            },
            {
              name: "示例页面",
              url: "/w-beijing-demo",
            },
            {
              name: "区域分析",
              url: "/gis-area-analyse-w7",
            },
          ],
        },
      ],
      "jinyu-cic": [
        {
          name: "挂图作战",
          url: "/cic/map-fight",
        },
        {
          name: "地图DEMO",
          url: "/gis-demo",
        },
      ],
    },
    // BI的URL映射，页面中根据name取值，key为appFlag值，用于区分不同系统
    BIUrlMapInfo: {
      "iot-beijing": [
        {
          name: "机卡分离",
          path: "http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/7a57da58fb2e40768560c8a89398083b?_app_=wlwdtgz",
        },
        {
          name: "跨区域使用",
          path: " http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/42f8477c5fb64b44a175d0aa4a229da7?_app_=wlwdtgz",
        },
        {
          name: "超阈值使用",
          path: "http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/14ad0b7352374ebab280f40fbc109db2?_app_=wlwdtgz",
        },
        {
          name: "超白名单使用",
          path: "http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/533de617c68843b8b4c3a09d6e58a7e3?_app_=wlwdtgz",
        },
        {
          name: "人卡物用",
          path: "http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/c490e5e05825454eb79cabbd7d27443b?_app_=wlwdtgz",
        },
        {
          name: "物卡人用",
          path: "http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/01a419d9312546f09dedde67a9c56666?_app_=wlwdtgz",
        },
        {
          name: "人联网滥用",
          path: " http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/21786324535c4ecabc1caa890e65a18e?_app_=wlwdtgz",
        },
        {
          name: "流量突增",
          path: "http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/6ffa22087f9d42269efb6c9326e4c748?_app_=wlwdtgz",
        },
        {
          name: "短信突增",
          path: " http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/b8be4f79ef62430d82d210d7be5769af?_app_=wlwdtgz",
        },
        {
          name: "超大流量占比-50G（TOP10）",
          path: "http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/284d33f0fafb4334ada639140b87abfb?_app_=wlwdtgz",
        },
        {
          name: "超大流量-50G",
          path: "http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/694a92d099ee4497b08eb0e54ae17290?_app_=wlwdtgz",
        },
        {
          name: "超大流量占比-100G（TOP10）",
          path: "http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/9ca57ddc8e304f8988e18ed7904b56d7?_app_=wlwdtgz",
        },
        // {
        //     name:'超大流量占比（TOP10）',
        //     path:'http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/284d33f0fafb4334ada639140b87abfb?_app_=wlwdtgz'
        // },
        {
          name: "漫游至诈骗高发区",
          path: "http://10.121.3.17:8090/#/page-root/1/2e712a425a9945d998d71d035cdff290?theme=default&_app_=wlwdtgz",
        },
        {
          name: "一机多卡",
          path: "http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/13e550c2d94c4d6283b6d12f8d2f6936?_app_=wlwdtgz",
        },
        {
          name: "疑似终端受控-木马程序",
          path: "http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/9e2eac4cd4894b4da3ef45c8f26bb1de?_app_=wlwdtgz",
        },
        {
          name: "疑似终端受控-Web攻击",
          path: "http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/4f662e1e74a24d278d19e7798c43870b?_app_=wlwdtgz",
        },
        {
          name: "疑似终端受控-僵尸网络",
          path: "http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/69321d5b704e4305abcdb7cfdd0e6e4a?_app_=wlwdtgz",
        },
        {
          name: "疑似终端受控-病毒程序",
          path: "http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/865d7d4586514a469c212b88fd07b258?_app_=wlwdtgz",
        },
        {
          name: "疑似终端受控-蠕虫攻击",
          path: "http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/4d5b48b1df8c4f64a4f3338c5d140283?_app_=wlwdtgz",
        },
        {
          name: "疑似对外攻击-木马程序",
          path: "http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/97dfe606f18b48dca5c67ca5380cd1dc?_app_=wlwdtgz",
        },
        {
          name: "疑似对外攻击-Web攻击",
          path: "http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/4f662e1e74a24d278d19e7798c43870b?_app_=wlwdtgz",
        },
        {
          name: "疑似对外攻击-僵尸网络",
          path: "http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/ec9feed10ff54d12aa17b80090cc7d11?_app_=wlwdtgz",
        },
        {
          name: "疑似对外攻击-病毒程序",
          path: "http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/5210a08f403c4c52860c7ed8232b1e54?_app_=wlwdtgz",
        },
        {
          name: "疑似对外攻击-蠕虫攻击",
          path: "http://everbi-front.v2x.wh.everark.com.cn/#/page-root/1/3aa361b49ad94f86b0de2474e007a206?_app_=wlwdtgz",
        },
      ],
    },
    // UI设计图 入口配置，对应界面右上角
    pageDesignInfoConfig: {
      // 车联网
      "/iov-overall-situation":
        "http://192.168.200.166/index.php?share/fileProxy&user=1&sid=dfhNAMYT&path=%2F%E6%80%BB%E4%BD%93%E6%A6%82%E5%86%B5.jpg",
      "/iov-company-asset":
        "http://192.168.200.166/index.php?share/fileProxy&user=1&sid=dfhNAMYT&path=%2F20210511-%E4%BC%81%E4%B8%9A%E8%B5%84%E4%BA%A7.jpg",
      "/iov-car-situation":
        "http://192.168.200.166/index.php?share/fileProxy&user=1&sid=dfhNAMYT&path=%2F20210514-%E8%BD%A6%E8%BE%86%E6%80%81%E5%8A%BF.jpg",
      "/iov-company-portrait":
        "http://192.168.200.166/index.php?share/fileProxy&user=1&sid=dfhNAMYT&path=%2F%E4%BC%81%E4%B8%9A%E7%94%BB%E5%83%8F.jpg",
      "/iov-network-security-situation":
        "http://192.168.200.166/index.php?share/fileProxy&user=1&sid=dfhNAMYT&path=%2F%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8%E6%80%81%E5%8A%BF.jpg",
      "/iov-data-security-situation":
        "http://192.168.200.166/index.php?share/fileProxy&user=1&sid=dfhNAMYT&path=%2F%E6%95%B0%E6%8D%AE%E5%AE%89%E5%85%A8%E6%80%81%E5%8A%BF.jpg",
      "/iov-company-security":
        "http://192.168.200.166/index.php?share/fileProxy&user=1&sid=dfhNAMYT&path=%2F20210517-%E4%BC%81%E4%B8%9A%E5%AE%89%E5%85%A8%E6%80%81%E5%8A%BF.jpg",
      "/iov-company-situation":
        "http://192.168.200.166/index.php?share/fileProxy&user=1&sid=dfhNAMYT&path=%2F%E8%BD%A6%E8%81%94%E7%BD%91%E4%BF%A1%E6%81%AF%E5%AE%89%E5%85%A8%E7%9B%91%E7%AE%A1%E5%A4%A7%E5%B1%8F.jpg",
      "/iov-car-portrait":
        "http://192.168.200.166/index.php?share/fileProxy&user=1&sid=dfhNAMYT&path=%2F%E8%BD%A6%E8%BE%86%E7%94%BB%E5%83%8F.jpg",
      // 江西物联网
      "/iot-overall-situation/jiangxi":
        "http://192.168.200.166/index.php?share/fileProxy&user=1&sid=iIMhe9rH&path=%2F%E6%B1%9F%E8%A5%BF%E7%89%A9%E8%81%94%E7%BD%91%E7%BB%BC%E5%90%88%E6%80%81%E5%8A%BF%E6%84%9F%E7%9F%A5%E5%B9%B3%E5%8F%B0.jpg",
      "/iot-enterprise-security-situation/jiangxi":
        "http://192.168.200.166/index.php?share/fileProxy&user=1&sid=iIMhe9rH&path=%2F%E6%B1%9F%E8%A5%BF%E7%89%A9%E8%81%94%E7%BD%91%E7%BB%BC%E5%90%88%E6%80%81%E5%8A%BF%E6%84%9F%E7%9F%A5%E5%B9%B3%E5%8F%B0-%E4%BC%81%E4%B8%9A%E5%AE%89%E5%85%A8%E6%80%81%E5%8A%BF1.jpg",
      "/iot-platform-security-situation/jiangxi":
        "http://192.168.200.166/index.php?share/fileProxy&user=1&sid=iIMhe9rH&path=%2F%E6%B1%9F%E8%A5%BF%E7%89%A9%E8%81%94%E7%BD%91%E7%BB%BC%E5%90%88%E6%80%81%E5%8A%BF%E6%84%9F%E7%9F%A5%E5%B9%B3%E5%8F%B0-%E5%B9%B3%E5%8F%B0%E5%AE%89%E5%85%A8%E6%80%81%E5%8A%BF.jpg",
      "/iot-terminal-security-situation/jiangxi":
        "http://192.168.200.166/index.php?share/fileProxy&user=1&sid=iIMhe9rH&path=%2F%E7%BB%88%E7%AB%AF%E5%AE%89%E5%85%A8%E6%80%81%E5%8A%BF.jpg",
      "/iot-company-portrait/jiangxi":
        "http://192.168.200.166/index.php?share/fileProxy&user=1&sid=iIMhe9rH&path=%2F%E4%BC%81%E4%B8%9A%E7%94%BB%E5%83%8F%2F%E7%BB%BC%E5%90%88%E6%80%81%E5%8A%BF%2F20210706-%E4%BC%81%E4%B8%9A%E7%94%BB%E5%83%8F%E7%BB%BC%E5%90%88%E6%80%81%E5%8A%BF%E8%B5%84%E4%BA%A7%E7%BB%9F%E8%AE%A1.jpg",
      // 数据安全-北京联通
      "/DataSecurityBjUnicomOverallSituation":
        "http://192.168.200.166/index.php?share/fileProxy&user=1&sid=gxNXGcs7&path=%2F20210721-%E5%8C%97%E4%BA%AC%E8%81%94%E9%80%9A%E6%95%B0%E6%8D%AE%E5%AE%89%E5%85%A8.jpg",
      "/DataSecurityBjUnicomAssetSituation":
        "http://192.168.200.166/index.php?share/fileProxy&user=1&sid=gxNXGcs7&path=%2F20210722-%E6%95%B0%E6%8D%AE%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E5%A4%A7%E5%B1%8F.jpg",
      "/DataSecurityBjUnicomInterfaceSituation":
        "http://192.168.200.166/index.php?share/fileProxy&user=1&sid=gxNXGcs7&path=%2F20210723-%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3%E7%8A%B6%E6%80%81%E7%9B%91%E6%B5%8B%E5%A4%A7%E5%B1%8F.jpg",
      "/DataSecurityBjUnicomWarningMessage":
        "http://192.168.200.166/index.php?share/fileProxy&user=1&sid=gxNXGcs7&path=%2F20210723-%E5%91%8A%E8%AD%A6%E7%AE%A1%E7%90%86%E5%A4%A7%E5%B1%8F.jpg",
    },
    // leafletGIS图层配置
    leafletGisTiles: [
      {
        mapType: "baidu",
        label: "百度地图",
        // urlTemplate: 'https://api.map.baidu.com/api?v=1.0&type=webgl&ak=Q8wCjgfzGbNIbx4vQtC0AXI4qmWtvCxz',
        urlTemplate:
          "//online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1",
        // urlTemplate: 'Baidu.Satellite.Map',
        options: {
          attribution: "百度地图",
          // 自定义属性，用于区分地图坐标系
          crs: "wgs84",
        },
      },
      {
        mapType: "baidu",
        label: "百度地图",
        urlTemplate: "Baidu.Satellite.Annotion",
        options: {
          attribution: "百度地图",
          // 自定义属性，用于区分地图坐标系
          crs: "wgs84",
        },
      },
      {
        mapType: "baidu",
        label: "百度地图-基础",
        urlTemplate: "Baidu.Normal.Map",
        options: {
          attribution: "百度地图-基础",
          // 自定义属性，用于区分地图坐标系
          crs: "wgs84",
        },
      },
      {
        label: "天地图-影像",
        urlTemplate:
          "http://t2.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=b3ee3e34bd5943db310c585d9a260572",
        options: {
          attribution: "天地图",
          // 自定义属性，用于区分地图坐标系
          crs: "wgs84",
        },
      },
      {
        label: "蓝黑版",
        urlTemplate:
          "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
        options: {
          attribution: "",
          // 自定义属性，用于区分地图坐标系
          crs: "gcj02",
        },
      },
      {
        label: "彩色版",
        urlTemplate:
          "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
        options: {
          attribution: "",
          // 自定义属性，用于区分地图坐标系
          crs: "gcj02",
        },
      },
      {
        label: "暖色版",
        urlTemplate:
          "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}",
        options: {
          attribution: "",
          // 自定义属性，用于区分地图坐标系
          crs: "gcj02",
        },
      },
      {
        label: "灰色版",
        urlTemplate:
          "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
        options: {
          attribution: "",
          // 自定义属性，用于区分地图坐标系
          crs: "gcj02",
        },
      },
      {
        label: "OpenStreetMap",
        urlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        options: {
          attribution: "OpenStreetMap",
          // 自定义属性，用于区分地图坐标系
          crs: "wgs84",
        },
      },
      {
        label: "天地图",
        urlTemplate:
          "http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=b3ee3e34bd5943db310c585d9a260572",
        options: {
          attribution: "天地图",
          // 自定义属性，用于区分地图坐标系
          crs: "wgs84",
        },
      },
      {
        // 地图标注，与影响图层使用相同的label，地图可以叠加显示
        label: "天地图-影像",
        urlTemplate:
          "http://t2.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=b3ee3e34bd5943db310c585d9a260572",
        options: {
          attribution: "天地图",
          // 自定义属性，用于区分地图坐标系
          crs: "wgs84",
        },
      },
      {
        // 未添加lable属性，表示当前底图，初始化时叠加
        urlTemplate:
          "http://t2.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=b3ee3e34bd5943db310c585d9a260572",
        options: {
          attribution: "天地图",
          // 自定义属性，用于区分地图坐标系
          crs: "wgs84",
        },
      },
    ],
    // W7-应用领域中的非聚合模式下的最大点数
    gisMarkerClusterMaxLength: 1000,
    // W7-设备画像实时定位模拟开关
    devOnlineLocationMockEnable: true,
    // W7-设备画像实时定位模拟数据，随机获取一条
    devOnlineLocationMockInfo: {
      "": [
        { lng: 118.3725000009, lat: 28.8047 },
        { lng: 121.1727000009, lat: 30.7009 },
      ],
      140345040493387: [
        { lng: 116.374763, lat: 39.90706 },
        { lng: 116.385964, lat: 39.907093 },
        { lng: 116.415104, lat: 39.907981 },
        { lng: 116.435188, lat: 39.908722 },
        { lng: 116.435617, lat: 39.911175 },
        { lng: 116.43463, lat: 39.923814 },
      ],
    },
    // 国内10大平台
    chinaTopPlat: [
      "华为FusionPlant工业互联网平台",
      "中材科技股份有限公司",
      "南京中电熊猫平板显示科技有限公司1",
      "中材科技股份有限公司2",
      "南京中电熊猫平板显示科技有限公司3",
      "中材科技股份有限公司4",
      "南京中电熊猫平板显示科技有限公司5",
      "中材科技股份有限公司6",
      "南京中电熊猫平板显示科技有限公司7",
      "中材科技股份有限公司8",
    ],
    // 重点平台标记数据（中国地图）
    zhongDianPlatMarkerData: [
      {
        name: "华为FusionPlant工业互联网平台",
        value: [87.9236, 43.5883],
      },
    ],
    // 标识解析TOP
    biaoShiJieXiTop: [
      "诺得物流股份有限公司",
      "招商局重工(江苏)有限公司",
      "无锡物联网创新中心有限公司",
      "苏州协同创新智能制造装备有限公司",
      "南京钢铁股份有限公司",
      "常州产业投资集团有限公司",
      "昆山同日工业自动化有限公司",
      "远东控股集团有限公司",
      "江苏洋井石化集团有限公司",
      "江苏中天互联科技有限公司",
      "江苏徐工信息技术股份有限公司",
      "江苏亨通线缆科技有限公司",
      "江苏亚威机床股份有限公司",
    ],
    // 朗坤智慧科技股份有限公司，窗口URL，平台名称
    langkongUrl: "https://www.baidu.com",
    langkunpingtai: "朗坤苏畅工业互联网平台",

    /**
     * 物联网界面的mock数据开关
     * true:模拟
     * false:真实数据
     */
    caiotBigScreenIsMock: false,
    // sqlkey数据字段映射
    sqlkeyRelation: {},
    // sqlkey排序信息，不指定时，按照原value对应的字段倒序排序
    sqlkeySortInfo: {
      // begin-物联网卡行为分析大屏
      iot_tonly_record_trend: [
        {
          value1: "asc",
        },
      ],
      iot_app_proportion: [
        {
          value2: "desc",
        },
      ],
      // end-物联网卡行为分析大屏

      /*caiot_overall_treand_abuse: [
                {
                    'value4': 'asc'
                }
            ]*/
      caiot_overall_treand_day: [
        {
          value1: "asc",
        },
      ],
      attack_event_DayCount: [
        {
          value1: "asc",
        },
      ],
      vehicle_platform_active_top5: [
        {
          value3: "desc",
        },
      ],
      vehicle_platform_dist_in_industry_top5: [
        {
          value3: "desc",
        },
      ],
      vehicle_platform_dist_in_hunan_top5: [
        {
          value3: "desc",
        },
      ],
      vehicle_platform_dist_in_china_top5: [
        {
          value3: "desc",
        },
      ],
      vehicle_terminal_trend_by_week: [
        {
          value1: "asc",
        },
      ],
      vehicle_terminal_trend_by_month: [
        {
          value1: "asc",
        },
      ],
      vehicle_protocol_dist_top5: [
        {
          value3: "desc",
        },
      ],
      vehicle_platform_total_active_counter: [
        {
          value1: "asc",
        },
      ],
      vehicle_enterprise_trend_by_week: [
        {
          value1: "asc",
        },
      ],
      vehicle_enterprise_trend_by_month: [
        {
          value1: "asc",
        },
      ],
      // 物联网平台安全态势
      caiot_platform_security_threats: [
        {
          value1: "asc",
        },
      ],
      devcard_seprate_trend_date: [
        {
          value1: "asc",
        },
      ],
      devcard_seprate_trend_frequency: [
        {
          value1: "asc",
        },
      ],

      // BEGIN-T808协议
      caiot_v_808_vehicle_counter: [
        {
          value1: "asc",
        },
      ],
      caiot_v_808_dist_in_province: [
        {
          value2: "desc",
        },
      ],
      caiot_v_808_terminal_category_top5: [
        {
          value2: "desc",
        },
      ],
      caiot_v_808_producer_top5: [
        {
          value2: "desc",
        },
      ],
      // END-T808协议
      // START-T32960协议
      caiot_v_32960_brand_category_counter: [
        {
          value2: "desc",
        },
      ],
      caiot_v_32960_terminal_category_top5: [
        {
          value2: "desc",
        },
      ],
      caiot_v_32960_engine_marker_top5: [
        {
          value2: "desc",
        },
      ],
      // END-T32960协议
    },
  };

  // GXB系统全局配置（后续尽量统一到上方配置中）
  window.globalConfig = {
    /**
     * 基础配置
     */
    defaultProxyPath: "/service", // 默认代理路径，开发环境下需要与 vue.config.js 中的代理配置对应，生成环境下需要与 nginx 中的代理配置对应
    requestTimeout: undefined, // 请求超时时间（undefined 表示不做控制），单位毫秒，直接填入数字即可，示例：1000 * 30

    /**
     * 菜单与权限
     */
    appKey: "gxbbgv5", // 系统关键字，登录时的参数
    serviceKey: "iiot-gxbii-v6-core",
    // serviceKey: "gxbv5_core_js",
    jiangSuKey: "gxbv5_core",
    showLoginCode: true, // 显示登录验证码

    theme: "default", //主题样式
    themes: [
      //主题选项
      {
        name: "default",
        label: "默认主题",
      },
      {
        name: "green",
        label: "绿色主题",
      },
    ],

    /**
     * logo、标题和文字
     * 登录页主标题和副标题都为空时，显示默认图片标题
     */
    provinceNameCN: "山东",
    provinceName: "shandong", //地图省份
    viewPosition: [117.771958, 35.802739],
    loginTitle: "国家工业互联网安全技术保障平台江苏分平台", // 登录页主标题
    loginSubTitle: "", // 登录页副标题
    headerLogo: "", // 顶部栏 logo（相对于 index.html 的路径，示例：logo.png，没有 logo 时留空，注意不要用中文）
    headerTitle: "国家工业互联网安全技术保障平台江苏分平台", // 顶部栏标题（同时会替换网页 title）
    footerInfo: "版权和技术支持", // 底部栏文字
    jumpSystem: "", //跳转到系统管理连接
    isIntranet: false, //是否为内网
    iframeUrls: {
      //点击数字跳转BI列表连接
      overallSituation: {
        gsgyqy:
          "http://localhost:8124/#/page-root/1/8d0cbe4ea01743e38e2a543806c6a4c2", //规上工业企业
        sygyqy:
          "http://localhost:8124/#/page-root/1/8d0cbe4ea01743e38e2a543806c6a4c2", //规上工业企业
        yjcqy:
          "http://localhost:8124/#/page-root/1/8d0cbe4ea01743e38e2a543806c6a4c2", //已监测企业
        gyhlwptqy:
          "http://localhost:8124/#/page-root/1/8d0cbe4ea01743e38e2a543806c6a4c2", //工业互联网平台企业
      },
    },
  };
}
