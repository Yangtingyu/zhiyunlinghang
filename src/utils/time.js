/**
 * 时间格式化
 * @param {*} date Date对象 或 时间戳
 * @param {*} fmt "yyyy-MM-dd hh:mm:ss"
 */
export function formatTime(date, fmt = "yyyy-MM-dd hh:mm:ss") {
  if (!date) return date;
  if (!(date instanceof Date)) {
    date = new Date(parseInt(date));
  }
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
  };
  // 格式化年
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  // 格式化毫秒
  if (/(S+)/.test(fmt)) {
    const tmp = date.getMilliseconds();
    fmt = fmt.replace(RegExp.$1, ("000" + tmp).substr(("" + tmp).length));
  }
  // 格式化其它
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}

/**
 * 通过最近时间和单位（最近一周，最近一月等），获取时间段（时间戳数组）
 * @param {*} timeValue 最近时间
 * @param {*} timeUnit  时间单位
 */
export function getTimeRangeByUnit(timeValue, timeUnit) {
  let rangeArr = [];

  if (!timeValue || !timeUnit || timeValue <= 0) return rangeArr;

  const start = new Date().getTime();
  const end = new Date().getTime();

  switch (timeUnit) {
    case "hour":
      rangeArr = [start - 3600 * 1000 * timeValue, end];
      break;
    case "day":
      rangeArr = [start - 3600 * 1000 * 24 * timeValue, end];
      break;
    case "week":
      rangeArr = [start - 3600 * 1000 * 24 * 7 * timeValue, end];
      break;
    case "month":
      rangeArr = [start - 3600 * 1000 * 24 * 30 * timeValue, end];
      break;
    case "year":
      rangeArr = [start - 3600 * 1000 * 24 * 365 * timeValue, end];
      break;
  }
  return rangeArr;
}

/**
 * 通过最近时间和单位（最近一周，最近一月等），获取时间段（时间戳数组）,最近一天不包含当日
 * @param {*} timeValue 最近时间
 * @param {*} timeUnit  时间单位
 */
export function getTimeRangeByUnitNotDay(timeValue, timeUnit) {
  let rangeArr = [];

  if (!timeValue || !timeUnit || timeValue <= 0) return rangeArr;

  const start = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()).getTime();
  const end = start-1;

  switch (timeUnit) {
    case "hour":
      rangeArr = [start - 3600 * 1000 * timeValue, end];
      break;
    case "day":
      rangeArr = [start - 3600 * 1000 * 24 * timeValue, end];
      break;
    case "week":
      rangeArr = [start - 3600 * 1000 * 24 * 7 * timeValue, end];
      break;
    case "month":
      rangeArr = [start - 3600 * 1000 * 24 * 30 * timeValue, end];
      break;
    case "year":
      rangeArr = [start - 3600 * 1000 * 24 * 365 * timeValue, end];
      break;
  }
  return rangeArr;
}

/**
 * 换算得到毫秒值
 * @param {*} timeValue
 * @param {*} timeUnit
 */
export function getMilliSecond(timeValue, timeUnit) {
  switch (timeUnit) {
    case "second":
      return timeValue * 1000;
    case "minute":
      return timeValue * 1000 * 60;
    case "hour":
      return timeValue * 1000 * 3600;
    case "day":
      return timeValue * 1000 * 3600 * 24;
    case "week":
      return timeValue * 1000 * 3600 * 24 * 7;
    case "month":
      return timeValue * 1000 * 3600 * 24 * 30;
    case "year":
      return timeValue * 1000 * 3600 * 24 * 365;
  }
}

/** 秒转成时分秒 */
export function formatSeconds(value) {
  if (value == null) return "";
  var theTime = parseInt(value); // 秒
  var theTime1 = 0; // 分
  var theTime2 = 0; // 小时
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
    }
  }

  var result = "" + parseInt(theTime); //秒

  result = (theTime < 10 ? "0" : "") + parseInt(theTime) + " 秒"; //秒

  if (theTime1 > 0) {
    result = (theTime1 < 10 ? "0" : "") + parseInt(theTime1) + " 分 " + result; //分，不足两位数，首位补充0，
  }

  if (theTime2 > 0) {
    result = parseInt(theTime2) + " 小时 " + result; //时
  }
  return result;
}
/**
 * 时间格式化
 * @param {*} date Date对象 或 时间戳
 * @param {*} fmt "yyyy-MM-dd hh:mm:ss"
 */
 export function formatYMdTime(date, fmt = "yyyyMMdd") {
  if (!date) return date;
  if (!(date instanceof Date)) {
    date = new Date(parseInt(date));
  }
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    // "h+": date.getHours(), //小时
    // "m+": date.getMinutes(), //分
    // "s+": date.getSeconds(), //秒
    // "q+": Math.floor((date.getMonth() + 3) / 3), //季度
  };
  // 格式化年
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  // 格式化毫秒
  if (/(S+)/.test(fmt)) {
    const tmp = date.getMilliseconds();
    fmt = fmt.replace(RegExp.$1, ("000" + tmp).substr(("" + tmp).length));
  }
  // 格式化其它
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}
