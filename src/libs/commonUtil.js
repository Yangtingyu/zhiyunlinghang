
// 格式化数字，保留2位小数，整数部分每3位加逗号
export const formatNumber = function(number) {
    number = Math.floor(number * 100) / 100
    number = (number || 0).toString()
    let decimal = null
    if (number.indexOf('.') != -1) {
        let array = number.split('.')
        number = array[0]
        decimal = array[1]
    }
    let result = ''
    let counter = 0
    for (let i = number.length - 1; i >= 0; i--) {
        counter++;
        result = number.charAt(i) + result
        if (!(counter % 3) && i != 0) {
            result = ',' + result
        }
    }
    if (decimal) {
        result += '.' + decimal
    }
    return result
}
