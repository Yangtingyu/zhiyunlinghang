import moment from 'moment'
import setting from '@/setting.js'

let dicUtils = {}

dicUtils.isMockQuery = setting.systemInfo.isMockQuery

/**
 * 获取日期数组（常用于X轴数据）
 * @param xAxisData 原始数据
 * @returns {[]|*} 模拟关闭时，直接返回原始数据
 */
dicUtils.getDateArray = function (xAxisData) {
    if(!this.isMockQuery){
        return xAxisData
    }
    let length = xAxisData.length
    let result = []
    for(let i=0;i<length;i++){
        result.push(moment().subtract(xAxisData.length - i, 'days').format('YYYYMMDD'))
    }
    return result
}

/**
 * 改变数据的指定字典值的日期
 * @param dataArray
 * @returns {*}
 */
dicUtils.filterDataArray = function (dataArray) {
    if(!this.isMockQuery){
        return dataArray
    }
    let newList = dataArray.map(item=>{
        item.time=moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
        return item
    })
    return newList
}

/**
 * 替换指定间隔日期
 * @param dataArray
 * @param field 字段名
 * @param format 日期格式定义
 * @param interval 间隔，默认5
 * @returns {*}
 */
dicUtils.groupDateDataArray = function (dataArray, field, format, interval= 5) {
    if(!this.isMockQuery){
        return dataArray
    }
    let newList = dataArray.map((item,index)=>{
        // 随机数1-5的整数
        //let amount = Math.round(Math.random()*4) + 1
        let amount = Math.floor(index/interval) + 1
        item[field] = moment().subtract(amount, 'days').format(format?format:'YYYYMMDD')
        return item
    })
    return newList
}

dicUtils.filterMapLineData = function (lineData) {
    if(!this.isMockQuery){
        return lineData
    }
    return lineData.map(item=>{
        item[1].name = setting.systemInfo.provinceName
        return item
    })
}

/**
 * 配置本地字典数据，这里的数据会和后端字典数据合并
 */
export default dicUtils
