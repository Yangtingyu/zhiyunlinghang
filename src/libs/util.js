import Cookies from 'js-cookie'
import UaParser from 'ua-parser-js'
import { version } from '../../package.json'
import uniqueid from 'lodash.uniqueid'
// 导入配置信息
import appSetting from '@/setting.js'

let util = {
  cookies: {}
}

/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting
 */
util.cookies.set = function (name = 'default', value = '', setting = {}) {
  let cookieSetting = {
    expires: 1
  }
  Object.assign(cookieSetting, setting)
  Cookies.set(`zebra-${appSetting.systemInfo.projectName}-${appSetting.systemInfo.key}-${name}`, value, cookieSetting)
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
util.cookies.get = function (name = 'default') {
  return Cookies.get(`zebra-${appSetting.systemInfo.projectName}-${appSetting.systemInfo.key}-${name}`)
}

/**
 * @description 拿到 cookie 全部的值
 */
util.cookies.getAll = function () {
  return Cookies.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
util.cookies.remove = function (name = 'default') {
  return Cookies.remove(`zebra-${appSetting.systemInfo.projectName}-${appSetting.systemInfo.key}-${name}`)
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  window.document.title = `${titleText ? ` ${titleText} | ` : ''}${VUE_CONFIG.appTitle}`
}

/**
 * @description 获取所有的 UA 信息
 */
util.ua = function () {
  return new UaParser().getResult()
}

/**
 * @description 判断是否在其内
 * @param {*} ele element
 * @param {Array} targetArr array
 */
util.isOneOf = function (ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true
  } else {
    return false
  }
}

/**
 * @description 打印一个 “胶囊” 样式的信息
 * @param {String} title title text
 * @param {String} info info text
 */
util.logCapsule = function (title, info) {
  console.log(
    `%c ${title} %c ${info} %c`,
    'background:#29384b; padding: 1px; border-radius: 3px 0 0 3px; color: #fff',
    'background:#3488ff; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
    'background:transparent'
  )
}

/**
 * @description 显示版本信息
 */
util.showInfo = function showInfo () {
  util.logCapsule('感谢使用本系统', `v${version}`)
  console.log('Doc http://zzebra.cn')
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url,target) {
    var a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('target', target?target:'_blank')
    a.setAttribute('id', 'zebra-menu-link')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(document.getElementById('zebra-menu-link'))
}

/**
 * 过滤菜单的重复路径
 * @type {Set<any>}
 */
let menuSet = new Set()
util.filterMenu = function (menus) {
    for (let i in menus) {
        if (menus[i].path) {
            if (menuSet.has(menus[i].path)) {
                if (menus[i].path && menus[i].path.indexOf('?') != -1) {
                    menus[i].path += '&_rand=' + uniqueid()
                } else {
                    menus[i].path += '?_rand=' + uniqueid()
                }
            }
            menuSet.add(menus[i].path)
        }
        // 自动适配图标
        if (menus[i].icon) {
            if (!menus[i].icon.startsWith('fa fa-') && !menus[i].icon.startsWith('icmn-')) {
                // menus[i].icon = 'fa fa-' + menus[i].icon + (menus[i].children?' fa-folder-o':' fa-file-o')
                menus[i].icon = 'fa fa-' + menus[i].icon
            } else if (menus[i].icon.startsWith('icmn-')) {
                menus[i].icon = 'fa ' + menus[i].icon //添加fa确保样式一致
            } else if (menus[i].icon.startsWith('fa fa-')) {
                // menus[i].icon += (menus[i].children?' fa-folder-o':' fa-file-o')
            }
        }
        if (menus[i].children) {
            // 递归调用
            util.filterMenu(menus[i].children)
        }
    }

    return menus
}

util.filterMenuForUnique = function (menus) {
    menuSet = new Set()
    return util.filterMenu(menus)
}

export default util
