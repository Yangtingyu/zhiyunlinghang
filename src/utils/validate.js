/**
 * 邮箱
 * @param {*} s
 */
export function email(s) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    s
  );
}

/**
 * 手机号码
 * @param {*} s
 */
export function mobile(s) {
  return /^1[0-9]{10}$/.test(s);
}

/**
 * 电话号码
 * @param {*} s
 */
export function phone(s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
}

/**
 * URL地址
 * @param {*} s
 */
export function url(s) {
  return /^http[s]?:\/\/.*/.test(s);
}

/**
 * IP地址
 * @param {*} s
 */
export function ip(s) {
  return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(
    s
  );
}

/**
 * 数字
 * @param {*} s
 */
export function number(s) {
  return /^-?\d*\.?\d+$/.test(s);
}

/**
 * 整数
 * @param {*} s
 */
export function integer(s) {
  return /^-?\d+$/.test(s);
}
