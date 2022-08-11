/**
 * IP工具 - by wucp 2020年11月30日16:33:20
 * @type {{}}
 */
let ipUtils = {}

/**
 * 整数转IP地址
 * @param number
 * @returns {string}
 */
ipUtils.numberToIp = function (number) {
    var ip = "";
    if(number <= 0) {
        return ip;
    }
    var ip3 = (number << 0 ) >>> 24;
    var ip2 = (number << 8 ) >>> 24;
    var ip1 = (number << 16) >>> 24;
    var ip0 = (number << 24) >>> 24

    ip += ip3 + "." + ip2 + "." + ip1 + "." + ip0;

    return ip;
}

/**
 * IP转整数
 * @param ip
 * @returns {number}
 */
ipUtils.ipToNumber = function(ip) {
    var num = 0;
    if(ip == "") {
        return num;
    }
    var aNum = ip.split(".");
    if(aNum.length != 4) {
        return num;
    }
    num += parseInt(aNum[0]) << 24;
    num += parseInt(aNum[1]) << 16;
    num += parseInt(aNum[2]) << 8;
    num += parseInt(aNum[3]) << 0;
    num = num >>> 0;//这个很关键，不然可能会出现负数的情况
    return num;
}

/**
 * 区间随机数
 * @param n 最小值
 * @param m 最大值
 * @returns {number}
 */
ipUtils.rnd = function(n, m){
    var random = Math.floor(Math.random()*(m-n+1)+n);
    return random;
}

/**
 * 获取区间随机Ip
 * @param beginIp 点分格式IP
 * @param endIp 点分格式IP
 * @returns {String}
 */
ipUtils.getRandomIp = function(beginIp, endIp){
    return this.numberToIp(this.rnd(this.ipToNumber(beginIp),this.ipToNumber(endIp)))
}

export default ipUtils