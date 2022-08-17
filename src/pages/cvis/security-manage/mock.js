/**
 * @name:
 * @Author: xiao jun
 * @Date: 2022/8/11
 * @Description:
 */
import { formatTime } from "@/utils/time";

export default {
  //滚动播报
  gdbb: [
    {
      ip: "22.68.45.2",
      lx: "蠕虫攻击",
      time: formatTime(new Date().getTime() - 2345 * 0, "yyyy.MM.dd hh:mm:ss"),
    },
    {
      ip: "20.6.59.102",
      lx: "蠕虫攻击",
      time: formatTime(new Date().getTime() - 3345 * 0, "yyyy.MM.dd hh:mm:ss"),
    },
    {
      ip: "92.68.145.20",
      lx: "病毒程序",
      time: formatTime(new Date().getTime() - 4345 * 0, "yyyy.MM.dd hh:mm:ss"),
    },
    {
      ip: "13.28.69.41",
      lx: "蠕虫攻击",
      time: formatTime(new Date().getTime() - 4745 * 0, "yyyy.MM.dd hh:mm:ss"),
    },
    {
      ip: "10.56.92.56",
      lx: "病毒程序",
      time: formatTime(new Date().getTime() - 5345 * 0, "yyyy.MM.dd hh:mm:ss"),
    },
  ],
  //攻击地图
  gjmap: [
    {
      sip: "22.68.45.2",
      dip: "92.168.45.32",
      gjlx: "蠕虫攻击",
      slon: 116.385068,
      slat: 40.035872,
      dlon: 116.251859,
      dlat: 36.67046,
    },
    {
      sip: "20.6.59.102",
      dip: "19.8.45.28",
      gjlx: "蠕虫攻击",
      slon: 116.385068,
      slat: 40.035872,
      dlon: 116.251859,
      dlat: 36.67046,
    },
    {
      sip: "90.18.45.62",
      dip: "56.84.69.34",
      gjlx: "病毒程序",
      slon: 116.385068,
      slat: 40.035872,
      dlon: 116.251859,
      dlat: 36.67046,
    },
    {
      sip: "15.45.248.42",
      dip: "92.68.145.20",
      gjlx: "蠕虫攻击",
      slon: 116.385068,
      slat: 40.035872,
      dlon: 116.251859,
      dlat: 36.67046,
    },
    {
      sip: "51.82.49.12",
      dip: "105.13.26.45",
      gjlx: "僵尸网络",
      slon: 116.385068,
      slat: 40.035872,
      dlon: 116.251859,
      dlat: 36.67046,
    },
    {
      sip: "22.68.45.12",
      dip: "92.168.45.132",
      gjlx: "蠕虫攻击",
      slon: 116.385068,
      slat: 40.035872,
      dlon: 116.251859,
      dlat: 36.67046,
    },
    {
      sip: "120.6.159.192",
      dip: "19.18.145.28",
      gjlx: "蠕虫攻击",
      slon: 116.385068,
      slat: 40.035872,
      dlon: 116.251859,
      dlat: 36.67046,
    },
    {
      sip: "90.118.45.62",
      dip: "92.168.145.20",
      gjlx: "病毒程序",
      slon: 116.385068,
      slat: 40.035872,
      dlon: 116.251859,
      dlat: 36.67046,
    },
    {
      sip: "115.415.148.42",
      dip: "51.123.49.12",
      gjlx: "蠕虫攻击",
      slon: 116.385068,
      slat: 40.035872,
      dlon: 116.251859,
      dlat: 36.67046,
    },
    {
      sip: "13.128.69.41",
      dip: "62.135.26.42",
      gjlx: "僵尸网络",
      slon: 116.385068,
      slat: 40.035872,
      dlon: 116.251859,
      dlat: 36.67046,
    },
  ],
  //资产信息
  zcxx: [
    { name: "资产总数", val: 24562 },
    { name: "主机", val: 4768 },
    { name: "网络设备", val: 7481 },
    { name: "安全设备", val: 782 },
    { name: "应用系统", val: 9824 },
    { name: "数据库", val: 561 },
    { name: "中间件", val: 1146 },
  ],
  //漏洞态势
  ldts: [
    { name: "SQL注入漏洞", val: 742 },
    { name: "远程命令执行漏洞", val: 548 },
    { name: "远程认证绕过漏洞", val: 348 },
    { name: "系统弱口令漏洞", val: 197 },
    { name: "后台文件目录泄露漏洞", val: 85 },
  ],
  //安全趋势
  aqqs: [
    {
      name: formatTime(new Date().getTime() - 86400000 * 9, "MM-dd"),
      val: 5153,
      key: "数据安全",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 8, "MM-dd"),
      val: 5452,
      key: "数据安全",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 7, "MM-dd"),
      val: 3953,
      key: "数据安全",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 6, "MM-dd"),
      val: 6584,
      key: "数据安全",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 5, "MM-dd"),
      val: 4684,
      key: "数据安全",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 4, "MM-dd"),
      val: 5264,
      key: "数据安全",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 3, "MM-dd"),
      val: 4684,
      key: "数据安全",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 2, "MM-dd"),
      val: 5258,
      key: "数据安全",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 1, "MM-dd"),
      val: 4578,
      key: "数据安全",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 0, "MM-dd"),
      val: 2128,
      key: "数据安全",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 9, "MM-dd"),
      val: 4153,
      key: "网络安全",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 8, "MM-dd"),
      val: 3452,
      key: "网络安全",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 7, "MM-dd"),
      val: 2953,
      key: "网络安全",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 6, "MM-dd"),
      val: 4584,
      key: "网络安全",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 5, "MM-dd"),
      val: 2684,
      key: "网络安全",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 4, "MM-dd"),
      val: 3264,
      key: "网络安全",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 3, "MM-dd"),
      val: 3684,
      key: "网络安全",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 2, "MM-dd"),
      val: 4258,
      key: "网络安全",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 1, "MM-dd"),
      val: 3578,
      key: "网络安全",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 0, "MM-dd"),
      val: 1128,
      key: "网络安全",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 9, "MM-dd"),
      val: 253,
      key: "漏洞",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 8, "MM-dd"),
      val: 452,
      key: "漏洞",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 7, "MM-dd"),
      val: 153,
      key: "漏洞",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 6, "MM-dd"),
      val: 584,
      key: "漏洞",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 5, "MM-dd"),
      val: 684,
      key: "漏洞",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 4, "MM-dd"),
      val: 264,
      key: "漏洞",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 3, "MM-dd"),
      val: 684,
      key: "漏洞",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 2, "MM-dd"),
      val: 258,
      key: "漏洞",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 1, "MM-dd"),
      val: 578,
      key: "漏洞",
    },
    {
      name: formatTime(new Date().getTime() - 86400000 * 0, "MM-dd"),
      val: 128,
      key: "漏洞",
    },
  ],

  //安全事件类型统计
  aqsjlxtj: [
    { name: "蠕虫攻击", val: 686, per: 19.87, key: "网络安全" },
    { name: "病毒程序", val: 593, per: 17.18, key: "网络安全" },
    { name: "Web攻击", val: 469, per: 13.59, key: "网络安全" },
    { name: "僵尸网络", val: 428, per: 12.4, key: "网络安全" },
    { name: "敏感数据泄露", val: 1489, per: 27.31, key: "数据安全" },
    { name: "数据过度留存", val: 1185, per: 21.74, key: "数据安全" },
    { name: "数据违规收集", val: 1069, per: 19.61, key: "数据安全" },
    { name: "数据恶意滥用", val: 826, per: 15.15, key: "数据安全" },
    { name: "数据违规出境", val: 795, per: 14.58, key: "数据安全" },
  ],
  //安全事件详情
  aqsjxq: [
    //资产名称、资产IP、攻击IP、安全事件类型，告警级别
    {
      zcmc: "渝北飞力达UPF1",
      assetip: "22.68.45.2",
      gjip: "92.168.45.2",
      lx: "嗅探攻击",
      level: "低",
    },
    {
      zcmc: "渝北飞力达UPF2",
      assetip: "20.6.59.102",
      gjip: "19.8.45.2",
      lx: "WEB攻击",
      level: "中",
    },
    {
      zcmc: "TOR交换机-1",
      assetip: "90.18.45.62",
      gjip: "56.84.69.34",
      lx: "木马程序",
      level: "高",
    },
    {
      zcmc: "TOR交换机-2",
      assetip: "15.45.248.42",
      gjip: "92.68.145.20",
      lx: "蠕虫病毒",
      level: "中",
    },
    {
      zcmc: "EOR交换机-1",
      assetip: "52.95.43.12",
      gjip: "51.82.49.12",
      lx: "僵尸网络",
      level: "高",
    },
    {
      zcmc: "EOR交换机-2",
      assetip: "13.28.69.41",
      gjip: "105.13.26.45",
      lx: "敏感数据明文传输",
      level: "低",
    },
    {
      zcmc: "FW1",
      assetip: "10.56.92.56",
      gjip: "62.35.26.42",
      lx: "数据访问异常",
      level: "中",
    },
    {
      zcmc: "FW2",
      assetip: "10.56.92.56",
      gjip: "62.35.26.42",
      lx: "数据跨境传输",
      level: "中",
    },
  ],
};
