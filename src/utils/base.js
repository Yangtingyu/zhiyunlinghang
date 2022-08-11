import router from "@/router";
import store from "@/store";

/**
 * 获取uuid
 */
export function getUUID() {
  // return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, c => {
    return (c === "x" ? (Math.random() * 16) | 0 : "r&0x3" | "0x8").toString(
      16
    );
  });
}

// 是否 IE 浏览器
export function isIE() {
  if (!!window.ActiveXObject || "ActiveXObject" in window) return true;
  else return false;
}

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
  // localStorage.removeItem("id");
  // localStorage.removeItem("userName");
  // sessionStorage.clear();
  store.commit("resetStore");
  // router.options.hasDynamicRoutes = false;
  initGlobalCache();
}

// 初始化内存全局缓存
export function initGlobalCache() {
  // dic 数据字典 cfgDic 属性（旧字典）
  // window.globalCache = { dic: {}, cfgDic: {} };
  window.globalCache = {};
}

// 对 url 中的变量进行解析
export function getParsedUrl(url) {
  let tmp = url;
  tmp = tmp.replace("${ip}", window.location.hostname);
  tmp = tmp.replace("${port}", window.location.port);
  return tmp;
}

/**
 * 对原始 url 进行修正
 * @param {*} url 原始url
 * @param {*} absolute 是否转换成绝对路径
 */
export function getfixedUrl(url, absolute = false) {
  if (/^http[s]?:\/\/.*/.test(url)) {
    // 绝对路径不转换
    return url;
  } else {
    let tmp = url;
    if (tmp.charAt(0) != "/") {
      tmp = "/" + tmp;
    }
    // 相对路径转成前端路由可识别的地址, 直接访问某些文件时除外
    if (!/\.(html|jpg|png)$/.test(url)) {
      tmp = "/#" + tmp;
    }
    if (absolute) {
      tmp = window.location.protocol + "//" + window.location.host + tmp;
    }
    return tmp;
  }
}

// 树形数据排序 seq 序号 children 子节点
export function sortTreeData(treeData) {
  treeData = treeData.sort((a, b) => {
    // 某个元素的 seq 不存在时，与前后元素比较时返回 NaN，排序会受影响
    return a.seq - b.seq;
  });

  treeData.map(item => {
    if (item.children) {
      sortTreeData(item.children);
    }
  });

  return treeData;
}

// 截取字符串并显示省略号
export function omitStr(str, len = 10, ellipsis = "...") {
  if (str && str.length && str.length > len) {
    return str.substring(0, len) + ellipsis;
  }
  return str;
}

// 元素相对于 body 的 offsetTop
export function getOffsetTopByBody(el) {
  let offsetTop = 0;
  while (el && el.tagName !== "body") {
    offsetTop += el.offsetTop;
    el = el.offsetParent;
  }
  return offsetTop;
}

// 获取字符串显示时的宽高
export function textSize(text, fontSize = "12px", fontWeight="bold", fontFamily = "Avenir, Helvetica, Arial, sans-serif"){
  var span = document.createElement("span");
  var result = {};
  result.width = span.offsetWidth;
  result.height = span.offsetHeight;
  span.style.visibility = "hidden";
  span.style.fontSize = fontSize;
  span.style.fontWeight = fontWeight;
  span.style.fontFamily = fontFamily;
  span.style.display = "inline-block";
  document.body.appendChild(span);
  if(typeof span.textContent != "undefined"){
    span.textContent = text;
  }else{
    span.innerText = text;
  }
  result.width = parseFloat(window.getComputedStyle(span).width) - result.width;
  result.height = parseFloat(window.getComputedStyle(span).height) - result.height;
  return result;
}

/**
 * 每三位数字加一个逗号,此方法性能最佳
 * @param {Number||String} num 入参
 * @return {String} result
 * */
export function toThousands(num) {
  num = (num || 0).toString();
  let result = '';
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) { result = num + result; }
  return result;
}
