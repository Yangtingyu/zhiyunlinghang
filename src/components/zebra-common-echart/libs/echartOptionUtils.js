/**
 * 作者：Wucp
 * 描述：本项目常用图表抽取，用于通用组件 - 2020年11月18日15:25:41
 *
 */
import geoCoordMap from "./cityZuoBiao.js";
import echarts from "echarts/lib/echarts";
import _ from 'lodash';

/**
 * 主题色配置映射（key：主题名，value：主题色值列表）
 * 参考：https://echarts.apache.org/zh/theme-builder.html
 * @type {{dark: string[]}}
 */
const themeListMap = {
    dark: ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42'],
    // 明亮（三原色...）
    shine: ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#339ca8', '#cda819', '#32a487'],
    // 绿色风格
    green: ['#33fefa', '#ffc033', '#32ff94', '#4f73ff', '#32c0fe', '#6f7991', '#7f384a']

}

/**
 * 根据主题名获取背景色
 * @param themeName
 * @returns {string[]|*}
 */
const getThemeColorList = themeName => {
    let tmp = themeListMap[themeName]
    if(tmp){
        return tmp
    }
    return ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42']
}

const compare = type => {
    return (a, b) => {
        a = typeof a === 'object' ? a[type] : a;
        b = typeof b === 'object' ? b[type] : b;
        return a - b;
    };
};

const compareDesc = type => {
    return (a, b) => {
        a = typeof a === 'object' ? a[type] : a;
        b = typeof b === 'object' ? b[type] : b;
        return b - a;
    };
};

const getMaxValue = (apiDataArray) => {
    let max = 0
    for (let i in apiDataArray) {
        if (Number(apiDataArray[i]['value']) > max) {
            max = Number(apiDataArray[i]['value'])
        }
    }
    return max
};

/**
 * 数值转换
 * 大于
 * @param value
 * @returns {string}
 */
const numberConversion = function(value) {
    value = Number(value)
    let newValue = value

    if(value >=  10000*10000*10000){
        newValue = parseFloat(value / (10000*10000*10000)).toFixed(2).toLocaleString() + '万亿'
    }else if(value >=  1000*10000*10000){
        newValue = parseFloat(value / (1000*10000*10000)).toFixed(2).toLocaleString() + '千亿'
    }else if(value >=  10000*10000){
        newValue = parseFloat(value / (10000*10000)).toFixed(2).toLocaleString() + '亿'
    }else if(value >= 1000*10000){
        newValue = parseFloat(value / (1000*10000)).toFixed(2).toLocaleString() + '千万'
    }/*else if(value >= 100*10000){
        newValue = parseFloat(value / (100*10000)).toFixed(2) + '百万'
    }*/
    else{
        newValue = newValue.toLocaleString()
    }
    return newValue
}

let echartMap = {}

/**
 * 柱状图3D效果
 * @param data
 * @param chartInfo
 * @returns {{yAxis: {axisLabel: {color: string, show: boolean, fontSize: number}, axisLine: {show: boolean}, splitLine: {lineStyle: {color: string}, show: boolean}, axisTick: {show: boolean}, type: string}, xAxis: [{axisLabel: {formatter: function(*): (string), rotate: *|number, color: string, show: boolean, fontSize: number, lineHeight: number, interval: number}, data: [], splitArea: {areaStyle: {color: [string, string]}, show: boolean}, axisLine: {lineStyle: {color: string}, show: boolean}, splitLine: {show: boolean}, axisTick: {show: boolean}, type: string}, {axisLabel: {formatter: string, show: boolean}, data: [], splitArea: {show: boolean}, axisLine: {show: boolean}, splitLine: {show: boolean}, axisTick: {show: boolean}, type: string}], grid: {top: string, left: string, bottom: string, right: string, containLabel: boolean}, series: [{barWidth: number, symbolRepeat: boolean, symbolMargin: string, data: [], symbolSize: string[], symbolOffset: number[], zlevel: number, type: string}, {barWidth: number, symbolRepeat: boolean, symbolMargin: string, data: [], symbolSize: string[], symbolOffset: number[], xAxisIndex: number, tooltip: {show: boolean}, zlevel: number, type: string}], tooltip: {trigger: string}}}
 */
echartMap.bar3D = function (data = [], chartInfo) {
    var bar1 = 'image:///image/cmiot-home-v3/img/basic_assets/bar1.png';
    var bar1_bg = 'image:///image/cmiot-home-v3/img/basic_assets/bar1_bg.png';
    var bar2 = 'image:///image/cmiot-home-v3/img/basic_assets/bar2.png';
    var bar2_bg = 'image:///image/cmiot-home-v3/img/basic_assets/bar2_bg.png';
    /*var data = [
        {
            name: '远程登录服务',
            value: 15000
        },
        {
            name: '其他',
            value: 13000
        },
        {
            name: 'web服务',
            value: 4000
        },
        {
            name: '内存型数据库',
            value: 3500
        },
        {
            name: '磁盘性数据库',
            value: 3000
        }
    ];*/
    var series = [];
    //var max = 20000;
    var max = getMaxValue(data)
    var bar_data = [];
    var bar_bg = [];
    var xAxisName = [];
    for (var i = 0; i < data.length; i++) {
        xAxisName.push(data[i].name);
        if (i == 0) {
            bar_data.push({
                name: data[i].name,
                value: data[i].value,
                symbol: bar1,
            });
            bar_bg.push({
                name: data[i].name,
                value: max,
                symbol: bar1_bg,
            });
        } else {
            bar_data.push({
                name: data[i].name,
                value: data[i].value,
                symbol: bar2,
            });
            bar_bg.push({
                name: data[i].name,
                value: max,
                symbol: bar2_bg,
            });
        }
    }
    bar_data.sort((a, b) => {
        return a.value - b.value
    })
    var option01 = {
        grid: {
            top: '10%',
            bottom: '5%',
            left: '3%',
            right: '5%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: [{
                type: 'category',
                splitLine: {
                    show: false
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(230, 230, 230, 0.102)', 'transparent']
                    }
                },
                axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                    show: true,
                    lineStyle: {
                        color: 'rgba(230, 230, 230, 0.302)'
                    }
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    fontSize: 18,
                    lineHeight: 20,
                    color: '#feffff',
                    interval: 0,
                    rotate: chartInfo.rotate ? chartInfo.rotate : 0, //x轴名字倾斜
                    formatter: function (value) {
                        var str = "";
                        var num = 1; //每行显示字数
                        if (chartInfo.labelWordNumPerLine) {
                            num = chartInfo.labelWordNumPerLine
                        }
                        var valLength = value.length; //该项x轴字数
                        var rowNum = Math.ceil(valLength / num); // 行数

                        if (rowNum > 1) {
                            for (var i = 0; i < rowNum; i++) {
                                var temp = "";
                                var start = i * num;
                                var end = start + num;

                                temp = value.substring(start, end) + "\n";
                                str += temp;
                            }
                            return str;
                        } else {
                            return value;
                        }
                    }
                },
                data: xAxisName,
            },
            {
                type: 'category',
                splitLine: {
                    show: false
                },
                splitArea: {
                    show: false,
                },
                axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                    formatter: '',
                },
                data: xAxisName,
            }
        ],
        yAxis: {
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(230, 230, 230, 0.102)'
                }
            },
            axisLine: { //坐标轴轴线相关设置。就是数学上的x轴
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: true,
                fontSize: 14,
                color: '#feffff',
            },
        },
        series: [{
                type: 'pictorialBar',
                barWidth: 25,
                symbolRepeat: true,
                symbolSize: ['100%', '100%'],
                symbolOffset: [0, 0],
                symbolMargin: '-29%',
                zlevel: 2,
                data: bar_data
            },
            {
                type: 'pictorialBar',
                barWidth: 25,
                tooltip: {
                    show: false,
                },
                xAxisIndex: 1,
                symbolRepeat: false,
                symbolSize: ['100%', '100%'],
                symbolOffset: [0, 0],
                symbolMargin: '-29%',
                zlevel: 1,
                data: bar_bg
            }
        ]
    };
    return option01;
}

/**
 * 柱状图3D效果2
 * @param data
 */
echartMap.bar3D2 = function (data = [], chartInfo={}) {
    let tooltipField = chartInfo.tooltipField || null
    // 是否柱子上方显示数字
    let showNumber = chartInfo.showNumber || false
    // 是否启用数据缩放功能，默认显示前5条
    let enableDataZoom = chartInfo.enableDataZoom || false
    let dataZoomMaxValue = chartInfo.dataZoomMaxValue || 4
    // 当数据大于5条时才会出现
    enableDataZoom = enableDataZoom && (data.length > 5)
    // 是否显示
    let isShowBarBg = chartInfo.hasOwnProperty('isShowBarBg')?chartInfo.isShowBarBg:true
    let getTooltipInfo = (tooltipField, dataItem)=>{
        console.log('getTooltipInfo',tooltipField,dataItem)
        let result = ''
        for(let key in tooltipField){
            result += tooltipField[key]  + "：" + (dataItem[key]!=null?dataItem[key]:'-') + "</br>"
        }
        return result
    }

    var bar1 = 'image:///image/charts/bar1.png';
    var bar1_bg = 'image:///image/charts/bar1_bg.png';
    var bar2 = 'image:///image/charts/bar2.png';
    var bar2_bg = 'image:///image/charts/bar2_bg.png';
    /*var data = [
        {
            name: '2017',
            value: 150
        },
        {
            name: '2018',
            value: 130
        },
        {
            name: '2019',
            value: 40
        },
        {
            name: '2020',
            value: 35
        },
        {
            name: '2021',
            value: 30
        }
    ];*/
    var series = [];
    var max = 10;
    var bar_data = [];
    var bar_bg = [];
    var xAxisName = [];
    let valueName = chartInfo.valueName || ''
    for (var i = 0; i < data.length; i++) {
        if (Number(data[i].value) > max) {
            max = Number(data[i].value)
        }
        xAxisName.push(data[i].name);
        if (i == 0) {
            bar_data.push({
                ...data[i],
                name: data[i].name,
                value: data[i].value,
                symbol: bar1,
            });
            bar_bg.push({
                ...data[i],
                name: data[i].name,
                value: max,
                symbol: bar1_bg,
            });
        } else {
            bar_data.push({
                ...data[i],
                name: data[i].name,
                value: data[i].value,
                symbol: bar2,
            });
            bar_bg.push({
                ...data[i],
                name: data[i].name,
                value: max,
                symbol: bar2_bg,
            });
        }
    };
    var option06 = {
        grid: {
            top: '10%',
            bottom: '5px',
            left: '3%',
            right: '5%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            confine: true, // 是否将 tooltip 框限制在图表的区域内。
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (objs, index) {
                let obj = objs[0];
                if(tooltipField && obj.data){
                    return getTooltipInfo(tooltipField, obj.data)
                }
                return `${obj.name}<br/>${obj.marker}${valueName}${valueName?'：':''}${obj.value} `;
            },
        },
        // 缩放条
        ...enableDataZoom?{
            "dataZoom": [
                {
                    "show": true,
                    "height": 8,
                    "xAxisIndex": [
                        0, 1
                    ],
                    bottom:'0',
                    "startValue": 0,
                    "endValue": dataZoomMaxValue,
                    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                    handleSize: '100%',
                    handleStyle:{
                        color:"rgba(211,222,229,0.38)",

                    },
                    textStyle:{
                        color:"#fff"
                    },
                    borderColor:"rgba(144,151,156,0.42)",
                    fillerColor: 'rgba(204,204,204,0.11)',
                    filterMode: 'empty'
                }, {
                    "type": "inside",
                    zoomOnMouseWheel: false,
                    moveOnMouseWheel: true,
                    /*"show": true,
                    "height": 15,
                    "start": 1,
                    "end": 35*/
                }
            ]
        }:{},
        xAxis: [{
                type: 'category',
                splitLine: {
                    show: false
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(230, 230, 230, 0.102)', 'transparent']
                    }
                },
                axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                    show: true,
                    lineStyle: {
                        color: 'rgba(230, 230, 230, 0.302)'
                    }
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    fontSize: 14,
                    color: '#feffff',
                    interval: 0,
                    rotate: 30,
                    formatter: function (params) {
                        var val = "";
                        if (params.length > 5) {
                            val = params.substr(0, 5) + '...';
                            return val;
                        } else {
                            return params;
                        }
                    },
                },
                data: xAxisName,
            },
            {
                type: 'category',
                splitLine: {
                    show: false
                },
                splitArea: {
                    show: false,
                },
                axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                    formatter: '',
                },
                data: xAxisName,
            }
        ],
        yAxis: {
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(230, 230, 230, 0.102)'
                }
            },
            axisLine: { //坐标轴轴线相关设置。就是数学上的x轴
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: true,
                fontSize: 14,
                color: '#feffff',
            },
            minInterval: 1,//最小间隔为1
        },
        series: [{
                type: 'pictorialBar',
                barWidth: 16,
                symbolRepeat: true,
                symbolSize: ['100%', '100%'],
                symbolOffset: [0, 0],
                symbolMargin: '-29%',
                zlevel: 2,
                data: bar_data,
                ...showNumber ? {
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#e8e8e8',
                        },
                    },
                } : {},
            },
          ...isShowBarBg?[
            {
                type: 'pictorialBar',
                barWidth: 16,
                tooltip: {
                    show: false,
                },
                xAxisIndex: 1,
                symbolRepeat: false,
                symbolSize: ['100%', '100%'],
                symbolOffset: [0, 0],
                symbolMargin: '-29%',
                zlevel: 1,
                data: bar_bg
            }
          ]:[]
        ]
    };
    return option06;
}

echartMap.pieLabelDetail = function (data = []) {
    var pir_color1 = ['#ff4848', '#2b8bc3', '#62849c', '#5f729b', '#3f5a9c', '#213f9a']; // 浅色
    var pie_color2 = ['#53273f', '#102e55', '#1b2d4e', '#1c2c51', '#14264f', '#0d204d']; // 深色
    let pie_data1 = [];
    let pie_data2 = [];
    var pie_sum = 0;
    for (var i = 0; i < data.length; i++) {
        pie_sum += data[i].value;
        pie_data1.push({
            name: data[i].name,
            value: data[i].value,
            itemStyle: {
                normal: {
                    color: pir_color1[i],
                }
            }
        });
        pie_data2.push({
            name: data[i].name,
            value: data[i].value,
            itemStyle: {
                normal: {
                    color: pie_color2[i],
                }
            }
        });
    };
    var option03 = {
        tooltip: {
            trigger: 'item',
        },
        graphic: {
            elements: [{
                type: 'image',
                style: {
                    image: '/image/cmiot-home-v3/img/terminal_security/pie_bg.png',
                    width: 78,
                    height: 78,
                },
                top: 'center',
                left: 'center',
            }]
        },
        series: [{
                type: 'pie',
                radius: ['35%', '55%'],
                center: ['50%', '50%'],
                labelLine: {
                    normal: {
                        show: false,
                        length: 0,
                        length2: 0,
                    }
                },
                label: {
                    normal: {
                        show: true,
                        formatter: function (item) {
                            var name = item.name;
                            var pct = item.percent;
                            return name + '{p|' + pct + '%}'
                        },
                        fontSize: 14,
                        fontFamily: 'Aldrich',
                        color: '#fff',
                        backgroundColor: 'rgb(35, 67, 168, 0.302)',
                        padding: [5, 10],
                        rich: {
                            p: {
                                fontSize: 14,
                                fontFamily: 'Aldrich',
                                color: '#fff',
                                padding: [0, 0, 0, 15],
                            },
                        },
                    }
                },
                zlevel: 2,
                data: pie_data1
            },
            {
                type: 'pie',
                radius: ['30%', '55%'],
                center: ['50%', '50%'],
                silent: true,
                label: {
                    normal: {
                        show: false,
                    }
                },
                zlevel: 1,
                data: pie_data2
            },
            {
                type: 'pie',
                radius: ['60%', '63%'],
                center: ['50%', '50%'],
                silent: true,
                label: {
                    normal: {
                        show: false,
                    }
                },
                zlevel: 1,
                data: pie_data2
            },
        ]
    };
    return option03;
}

echartMap.pieRadius = function (data = []) {
    var pieColor = ['#28489e', '#3c5c9e', '#3d759f', '#408b84', '#5c7875', '#6f7991', '#7f384a'];
    var borderColor = ['#3a69cd', '#5b88cb', '#60b1cf', '#5dbfa8', '#9fc4a3', '#b2b6bf', '#b9515f'];
    /*var data = [
        {
            name: '数据安全事件',
            value: 200,
        },
        {
            name: '入侵事件',
            value: 300,
        },
        {
            name: '篡改事件',
            value: 400,
        },
        {
            name: '网络探测事件',
            value: 500,
        },
        {
            name: '僵木蠕',
            value: 600,
        },
        {
            name: 'Web攻击',
            value: 700,
        },
        {
            name: 'DDOS攻击',
            value: 800,
        }
    ];*/
    let pieData1 = [];
    let pieData2 = [];
    for (var i = 0; i < data.length; i++) {
        pieData1.push({
            name: data[i].name,
            value: data[i].value,
            itemStyle: {
                normal: {
                    color: pieColor[i],
                    borderWidth: 1,
                    borderColor: borderColor[i]
                }
            }
        });
        pieData2.push({
            name: data[i].name,
            value: data[i].value,
            itemStyle: {
                normal: {
                    color: '#828c9f',
                }
            }
        });
    };
    var option01 = {
        tooltip: {
            trigger: 'item',
        },
        series: [{
                type: 'pie',
                radius: ['20%', '60%'],
                center: ['50%', '50%'],
                roseType: 'radius', //南丁格尔玫瑰图
                label: {
                    normal: {
                        show: false,
                    }
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                },
                zlevel: 1,
                data: pieData1
            },
            {
                type: 'pie',
                radius: ['69%', '70%'],
                center: ['50%', '50%'],
                // roseType: 'radius', //南丁格尔玫瑰图
                silent: true,
                labelLine: {
                    normal: {
                        length: 0,
                        length2: 100,
                        lineStyle: {
                            color: '#4e5b78'
                        }
                    }
                },
                avoidLabelOverlap: true,
                label: {
                    normal: {
                        show: true,
                        formatter: function (item) {
                            var name = item.name;
                            var value = item.value;
                            var pct = item.percent;
                            return '{n|' + name + '}\n' + '{v|' + value + '}' + '  {p|/ ' + pct + '%}'
                        },
                        textStyle: {
                            padding: [0, -80, 0, -80]
                        },
                        rich: {
                            n: {
                                width: 95,
                                height: 25,
                                align: 'center',
                                fontSize: 14,
                                color: '#fff',
                                backgroundColor: 'rgba(108, 149, 255, 0.102)',
                                padding: [-1, 5, 2, 5],
                            },
                            v: {
                                align: 'center',
                                fontSize: 16,
                                fontFamily: 'Aldrich',
                                color: '#14eae0',
                                padding: [5, 0],
                            },
                            p: {
                                align: 'center',
                                fontSize: 12,
                                fontFamily: 'Aldrich',
                                color: '#fff',
                                padding: [5, 0],
                            },
                        },
                    }
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                },
                zlevel: 1,
                data: pieData2
            },
        ]
    };
    return option01;
}

/**
 * 饼图-居中位置放置光盘背景图
 * @param data
 * @returns {{series: [{silent: boolean, data: [], center: string[], zlevel: number, label: {normal: {show: boolean}}, type: string, radius: [string, string]}, {data: [], center: string[], zlevel: number, label: {normal: {formatter: function(*): string, padding: number[], backgroundColor: string, color: string, show: boolean, rich: {value: {padding: number[], fontFamily: string, color: string, fontSize: number, align: string}}, fontSize: number, align: string}}, labelLine: {lineStyle: {color: string}, length2: number, length: number}, type: string, radius: [string, string]}, {silent: boolean, data: [], center: string[], zlevel: number, label: {normal: {show: boolean}}, type: string, radius: [string, string]}], tooltip: {formatter: string, trigger: string}}}
 */
echartMap.pieCD = function (data = []) {
    var chart01_colorlist1 = ['#52253d', '#092547', '#172945', '#182749', '#13254b', '#0d1f4d'];
    var chart01_colorlist2 = ['#ff4949', '#298ac1', '#608098', '#60729b', '#415d9d', '#203f9a'];
    var chart01_base_data = data;
    /*var chart01_base_data = [
        {
            name: '中国广电',
            value: 29439
        },
        {
            name: '北京歌华',
            value: 29439
        },
        {
            name: '上海平台',
            value: 29439
        },
        {
            name: '重庆平台',
            value: 29439
        },
        {
            name: '湖北平台',
            value: 29439
        },
        {
            name: '深圳平台',
            value: 29439
        }
    ];*/
    var chart01_data1 = [];
    var chart01_data2 = [];
    for (let i in chart01_base_data) {
        chart01_data1.push({
            name: chart01_base_data[i].name,
            value: chart01_base_data[i].value,
            itemStyle: {
                color: chart01_colorlist1[i]
            }

        })
        chart01_data2.push({
            name: chart01_base_data[i].name,
            value: chart01_base_data[i].value,
            itemStyle: {
                color: chart01_colorlist2[i]
            }

        })
    };
    var option01 = {
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)',
        },
        series: [
            // 三个同心圆 顺序为由内到外
            {
                type: 'pie',
                radius: ['42%', '50%'],
                center: ['50%', '50%'],
                silent: true,
                label: {
                    normal: {
                        show: false,
                    },
                },
                zlevel: 1,
                data: chart01_data1
            },
            {
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['50%', '50%'],
                label: {
                    normal: {
                        show: true,
                        fontSize: 14,
                        color: '#fff',
                        align: 'left',
                        padding: [5, 5, 3, 5],
                        backgroundColor: 'rgb(35, 67, 168, 0.302)',
                        rich: {
                            value: {
                                fontSize: 14,
                                fontFamily: 'Aldrich-R',
                                color: '#fff',
                                align: 'center',
                                padding: [0, 2, 0, 20]
                            }
                        },
                        formatter: v => {
                            var name = v.name;
                            var value = v.value;
                            return name + '{value|' + value + '}'
                        },
                    },
                },
                labelLine: {
                    length: 0,
                    length2: 7,
                    lineStyle: {
                        color: 'transparent'
                    }
                },
                zlevel: 2,
                data: chart01_data2
            },
            {
                type: 'pie',
                radius: ['75%', '80%'],
                center: ['50%', '50%'],
                silent: true,
                label: {
                    normal: {
                        show: false,
                    },
                },
                zlevel: 1,
                data: chart01_data1
            },
        ]
    };
    return option01;
}

/**
 * 饼图-左侧位置放置光盘背景图，右侧列举图例
 * @param data
 * @returns {{color: [string, string, string], legend: {formatter: (function(*): string), itemGap: number, top: string, orient: string, data: [], itemHeight: number, show: boolean, icon: string, itemWidth: number, right: number, textStyle: {rich: {v: {fontFamily: string, color: string, width: number, fontSize: number, align: string}, n: {padding: number[], color: string, width: number, fontSize: number}}}}, series: [{data: [], roseType: string, center: [string, string], itemStyle: {normal: {opacity: number}}, label: {normal: {show: boolean}}, labelLine: {normal: {show: boolean}}, type: string, radius: [string, string]}, {data: [], roseType: string, center: [string, string], label: {normal: {show: boolean}}, labelLine: {normal: {show: boolean}}, type: string, radius: [string, string]}], tooltip: {formatter: string, trigger: string}}}
 */
echartMap.pieCDLeft = function (data = [], chartInfo = {}) {
    // 支持主题色
    let colorList = getThemeColorList(chartInfo.theme) || ['#fff033', '#84e24c', '#32ff94','#33fefa', '#32c0fe', '#6d8eff','#4f73ff']
    var chart04_colorlist = colorList;
    var chart04_base_data = data;
    /*var chart04_base_data = [
        {
            name: '中央企业',
            value: 235234
        },
        {
            name: '市属国有企业',
            value: 235234
        },
        {
            name: '区属国有企业',
            value: 235234
        },
        {
            name: '民营企业',
            value: 235234
        },
        {
            name: '其他',
            value: 235234
        },
    ];*/
    var chart04_data = [];
    var chart04_legend = [];
    for (let i in chart04_base_data) {
        chart04_data.push({
            name: chart04_base_data[i].name,
            value: chart04_base_data[i].value,
            itemStyle: {
                color: chart04_colorlist[i],
            }
        });
        chart04_legend.push({
            name: chart04_base_data[i].name
        })
    };
    var option04 = {
        color: colorList,
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)',
        },
        legend: {
            show: true,
            top: 'center',
            right: 10,
            icon: 'rect',
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 20,
            orient: 'vertical',
            textStyle: {
                rich: {
                    n: {
                        width: 100,
                        fontSize: 14,
                        color: '#feffff',
                        padding: [0, 7]
                    },
                    v: {
                        width: 70,
                        align: 'right',
                        fontSize: 14,
                        fontFamily: 'Aldrich-R',
                        color: '#33fff9',// '#3bade3',
                    },
                }
            },
            formatter: function (name) {
                var data = option04.series[0].data;
                var total = 0;
                var targetValue;
                for (var i = 0, l = data.length; i < l; i++) {
                    total += data[i].value;
                    if (data[i].name == name) {
                        targetValue = data[i].value;
                    }
                }
                var v = targetValue;
                return '{n|' + name + '}' + '{v|' + v + '}';
            },
            data: chart04_legend
        },
        series: [
            // 两个同心圆 顺序从内到外
            {
                type: 'pie',
                radius: ['45%', '51%'],
                //roseType: 'radius', //南丁格尔玫瑰图
                center: ['28%', '50%'],
                label: {
                    normal: {
                        show: false,
                    },
                },
                itemStyle: {
                    normal: {
                        opacity: 0.6
                    }
                },
                labelLine: {
                    normal: {
                        show: false,
                    }
                },
                data: chart04_data
            },
            {
                type: 'pie',
                radius: ['51%', '61%'],
                //roseType: 'radius', //南丁格尔玫瑰图
                center: ['28%', '50%'],
                label: {
                    normal: {
                        show: false,
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                    }
                },
                data: chart04_data
            },
        ]
    };
    return option04;
}

/**
 * 饼图-玫瑰花型
 * @param data
 * @returns {{color: [string, string, string], legend: {formatter: (function(*): string), itemGap: number, top: string, orient: string, data: [], itemHeight: number, show: boolean, icon: string, itemWidth: number, right: number, textStyle: {rich: {p: {padding: number[], fontFamily: string, color: string, width: number, fontSize: number, align: string}, v: {padding: number[], fontFamily: string, color: string, width: number, fontSize: number, align: string}, n: {padding: number[], color: string, fontSize: number}}}}, series: [{data: [], clockwise: boolean, roseType: string, center: [string, string], itemStyle: {normal: {opacity: number}}, label: {normal: {show: boolean}}, labelLine: {normal: {show: boolean}}, type: string, radius: [string, string]}, {legendHoverLink: boolean, silent: boolean, data: [{name: string, value: number}, {name: string, value: number}, {name: string, value: number}], clockwise: boolean, center: [string, string], itemStyle: {normal: {color: string, opacity: number}}, label: {normal: {show: boolean}}, labelLine: {normal: {show: boolean}}, type: string, radius: [string, string]}], tooltip: {formatter: string, trigger: string}}}
 */
echartMap.pieRose = function (data = []) {
    var chart03_colorlist = ['#ff7171', '#99d8ff', '#43c5ff'];
    var chart03_base_data = data;
    /*var chart03_base_data = [
        {
            name: '制造业行业',
            value: 235234
        },
        {
            name: '电力、热力、燃气行业',
            value: 195234
        },
        {
            name: '采矿业',
            value: 135234
        },
    ];*/

    var chart03_data = [];
    var chart03_legend = [];
    for (let i in chart03_base_data) {
        chart03_data.push({
            name: chart03_base_data[i].name,
            value: chart03_base_data[i].value,
            itemStyle: {
                color: chart03_colorlist[i],
            }
        });
        chart03_legend.push({
            name: chart03_base_data[i].name
        })
    };
    var option03 = {
        color: ['#ff7171', '#99d8ff', '#43c5ff'],
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)',
        },
        legend: {
            show: true,
            top: 'center',
            right: 0,
            icon: 'rect',
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 10,
            orient: 'vertical',
            textStyle: {
                rich: {
                    n: {
                        fontSize: 14,
                        color: '#feffff',
                        padding: [0, 7, 25, 7]
                    },
                    v: {
                        width: 80,
                        align: 'left',
                        fontSize: 14,
                        fontFamily: 'Aldrich-R',
                        color: '#3bade3',
                        padding: [0, 7, 10, 7]
                    },
                    p: {
                        width: 80,
                        align: 'right',
                        fontSize: 14,
                        fontFamily: 'Aldrich-R',
                        color: '#3bade3',
                        padding: [0, 7, 10, 7]
                    },
                }
            },
            formatter: function (name) {
                var data = option03.series[0].data;
                var total = 0;
                var targetValue;
                for (var i = 0, l = data.length; i < l; i++) {
                    total += data[i].value;
                    if (data[i].name == name) {
                        targetValue = data[i].value;
                    }
                }
                var v = targetValue;
                var p = (targetValue / total * 100).toFixed(0);
                return '{n|' + name + '}' + '\n{v|' + v + '}' + '{p|' + p + '%}';
            },
            data: chart03_legend
        },
        series: [{
                type: 'pie',
                radius: ['30%', '75%'],
                clockwise: false,
                roseType: 'radius', //南丁格尔玫瑰图
                center: ['28%', '50%'],
                label: {
                    normal: {
                        show: false,
                    },
                },
                itemStyle: {
                    normal: {
                        opacity: 0.6
                    }
                },
                labelLine: {
                    normal: {
                        show: false,
                    }
                },
                data: chart03_data
            },
            {
                type: 'pie',
                radius: ['82%', '83%'],
                clockwise: false,
                center: ['28%', '50%'],
                silent: true,
                legendHoverLink: false,
                label: {
                    normal: {
                        show: false,
                    },
                },
                itemStyle: {
                    normal: {
                        color: '#9197a4',
                        opacity: 0.6,
                    }
                },
                labelLine: {
                    normal: {
                        show: false,
                    }
                },
                data: chart03_base_data
            }
        ]
    };
    return option03;
}

/**
 * 饼图-标准型（简约、适应能力不错）
 * @param data
 * @returns {{legend: {orient: string, data: [], left: string, textStyle: {color: string}}, series: [{data: [], center: string[], name: string, emphasis: {itemStyle: {shadowOffsetX: number, shadowBlur: number, shadowColor: string}}, label: {color: string}, type: string, radius: string}], tooltip: {formatter: string, trigger: string}}}
 */
echartMap.pieNormal = function (data = [], chartInfo={}){
    // 支持主题色
    let colorList = ['#33fefa', '#ffc033', '#32ff94', '#4f73ff', '#32c0fe', '#6f7991', '#7f384a']
    if(chartInfo.theme){
        colorList = getThemeColorList(chartInfo.theme)
    }
    // 图例开关，默认开启
    let showLegend = chartInfo.showLegend!=null?chartInfo.showLegend:true;
    // 图例的类型。可选值：plain、scroll,当数据大于 legendScrollMinDataLength 条时，为防止遮盖，将强行开启滚动模式
    let legendType = chartInfo.legendType || 'scroll'
    // 强制开启滚动的最小数值，数据大于该值，强制开启滚动模式
    let legendScrollMinDataLength = chartInfo.legendScrollMinDataLength || 14
    console.log('legendScrollMinDataLength',legendScrollMinDataLength)
    if( data && (data.length > legendScrollMinDataLength) ){
        legendType = "scroll"
    }
    // 标签是否显示
    let showLabel = chartInfo.showLabel!=null?chartInfo.showLabel:true;
    // 环形图定义（['40%', '70%']、radius: '70%',）
    let radius = chartInfo.radius || ['40%', '70%'];
    // 环形图中心点，格式如：['50%', '50%']，未定义时，按照原有逻辑执行
    let pieCenter = chartInfo.pieCenter

    // var pieColor = ['#28489e', '#3c5c9e', '#3d759f', '#408b84', '#5c7875', '#6f7991', '#7f384a'];
    // var borderColor = ['#3a69cd', '#5b88cb', '#60b1cf', '#5dbfa8', '#9fc4a3', '#b2b6bf', '#b9515f'];
    var pieColor = colorList;
    var borderColor = colorList;
    let pieData1 = [];
    let pieData2 = [];
    let nameArray = []
    let total = 0
    for (var i = 0; i < data.length; i++) {
        nameArray.push(data[i].name)
        total += Number(data[i].value)
        pieData1.push({
            name: data[i].name,
            value: data[i].value,
            itemStyle: {
                normal: {
                    color: pieColor[i],
                    borderWidth: 1,
                    borderColor: borderColor[i]
                }
            }
        });
    };
    var option01 = {
        tooltip: {
            trigger: 'item',
            // formatter: '{a} <br/>s{b} : {c} ({d}%)',
            formatter: function(parms) {
                var str = parms.marker + "" + parms.data.name + "</br>" +
                  "数量：" + parms.data.value + "</br>" +
                  "占比：" + parms.percent + "%";
                return str;
            },
            confine: true, // 是否将 tooltip 框限制在图表的区域内。
        },
        legend: {
            show: showLegend,
            type: legendType,
            orient: 'vertical',
            left: 'left',
            y:'center',
            pageIconColor: "rgba(0, 148, 249, .6)",
            pageTextStyle: {
                color: "#aaaaaa",
                textBorderColor: "rgba(255, 0, 0, 1)"
            },
            // pageIconInactiveColor: "rgba(242, 15, 15, .5)",
            // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            data: nameArray,
            textStyle: {
                color: '#d5d5d5'
            },
            formatter: function (params) {
                var val = "";
                if (params.length > 5) {
                    val = params.substr(0, 5) + '...';
                    return val;
                } else {
                    return params;
                }
            },
            tooltip: {
                show: true,
                trigger: 'item',
                formatter: function(params){
                    let name = params.name
                    let target;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].name == name) {
                            target = data[i];
                            break;
                        }
                    }
                    let value = Number(target.value)
                    return `${name}<br/>${value}（${(value/total*100).toFixed(2)}%）`;
                }
            }
        },
        series: [
            {
                name: '数量',
                type: 'pie',
                // radius: '75%',
                // radius: ['40%', '70%'],
                radius: radius,
                // 包含图例时，右下角偏移，否则居中
                center: pieCenter || (showLegend?['60%', '50%']:['50%', '50%']),
                /*data: [
                    {value: 114775, name: '直接访问',},
                    {value: 192886, name: '邮件营销'},
                    {value: 234, name: '联盟广告'},
                    {value: 135, name: '视频广告'},
                    {value: 1548, name: '搜索引擎'}
                ],*/
                data: pieData1,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    show: showLabel,
                    color: 'white',
                    position: 'outer',
                    alignTo: 'edge',
                    margin: 20
                }
            }
        ]
    };
    return option01;
}

/**
 * 环形图（简约、适应能力不错）
 * @param data
 * @param chartInfo
 * @returns {{backgroundColor: {x: number, y: number, y2: number, globalCoord: boolean, x2: number, colorStops: [{offset: number, color: string}, {offset: number, color: string}], type: string}, legend: {orient: string, top: string, data: *[], left: string, textStyle: {color: string}, type: string, align: string}, series: [{data: [{name: string, value: string}, {name: string, value: string}, {name: string, value: string}, {name: string, value: string}, {name: string, value: string}, null, null], clockwise: boolean, center: string[], avoidLabelOverlap: boolean, itemStyle: {normal: {color: (function(*): string)}}, z: number, hoverOffset: number, label: {formatter: string, show: boolean, rich: {a: {padding: number[]}, hr: {padding: number[], backgroundColor: string, borderRadius: number, width: number, height: number}}, position: string}, labelLine: {normal: {lineStyle: {width: number}, length2: number, length: number}}, type: string, radius: string[]}], tooltip: {formatter: (function(*): string), padding: number, borderColor: string, backgroundColor: string, borderWidth: number, trigger: string}, title: {x: string, y: string, text: string, textStyle: {color: string}}}}
 */
echartMap.pieDoughnut = function(data=[], chartInfo = {}){
    let showLegend = chartInfo.showLegend!=null?chartInfo.showLegend:true

    /*var data = [{
        name: "二元",
        value: "990000"
    }, {
        name: "大白",
        value: "40000"
    }, {
        name: "长大",
        value: "53000"
    }, {
        name: "杜洛克",
        value: "40000"
    }, {
        name: "三元",
        value: "60000"
    }, {
        name: "大长",
        value: "10000"
    }, {
        name: "PIC",
        value: "20000"
    }];*/
    var legendData = []
    for(let i in data){
        legendData.push(data[i].name)
    }
    // var legendData = ["二元", "大白", "长大", "杜洛克", "三元", "大长", "PIC"]
    var colorList = ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF'];
    let option = {
        /*backgroundColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [{
                offset: 0,
                color: '#0f2c70' // 0% 处的颜色
            }, {
                offset: 1,
                color: '#091732' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
        },*/
        title: {
            text: '',
            x: 'center',
            y: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item',
            borderColor: 'rgba(255,255,255,.3)',
            backgroundColor: 'rgba(13,5,30,.6)',
            borderWidth: 1,
            padding: 5,
            formatter: function(parms) {
                var str = parms.marker + "" + parms.data.name + "</br>" +
                    "数量：" + parms.data.value + "</br>" +
                    "占比：" + parms.percent + "%";
                return str;
            }
        },
        legend: {
            show: showLegend,
            type: "scroll",
            orient: 'vertical',
            left: 'left',
            align: 'auto',
            top: 'middle',
            textStyle: {
                color: '#fff'
            },
            data: legendData
        },
        series: [{
            type: 'pie',
            z: 3,
            center: ['50%', '50%'],
            radius: ['25%', '45%'],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 15,
            itemStyle: {
                normal: {
                    color: function(params) {
                        return colorList[params.dataIndex]
                    }
                }
            },
            label: {
                show: true,
                position: 'outside',
                formatter: '{a|{b}：{d}%}\n{hr|}',
                rich: {
                    hr: {
                        backgroundColor: 't',
                        borderRadius: 3,
                        width: 3,
                        height: 3,
                        padding: [3, 3, 0, -12]
                    },
                    a: {
                        padding: [-30, 15, -20, 15]
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 20,
                    length2: 30,
                    lineStyle: {
                        width: 1
                    }
                }
            },
            data: data
        }]
    };
    return option;
}



/**
 * 漏斗图
 * @param data
 * @returns {{color: string[], legend: {formatter: (function(*): string), itemGap: number, top: string, orient: string, data: string[], itemHeight: number, show: boolean, icon: string, itemWidth: number, right: number, textStyle: {rich: {v: {fontFamily: string, color: string, width: number, fontSize: number, align: string}, n: {padding: number[], color: string, fontSize: number}}}}, series: [{orient: string, data: [], max: number, itemStyle: {borderWidth: number, opacity: number}, maxSize: string, sort: string, label: {show: boolean}, type: string, min: number, top: string, left: number, gap: number, width: string, emphasis: {label: {show: boolean}}, minSize: string, height: string}]}}
 */
echartMap.funnel = function (data = []) {
    /*var myChart02_legend = ['中国广电','北京歌华','上海平台','重庆平台','湖北平台','深圳平台'];
    var real_num = [2030,1769,1453,930,769,453];
    var show_num = [60,50,40,30,20,10];
    */
    var myChart02_legend = [];
    var real_num = [];
    var show_num = [];
    var max = 0;
    for (let i in data) {
        if (Number(data[i].value) > max) {
            max = Number(data[i].value)
        }
        myChart02_legend.push(data[i].name)
        real_num.push(data[i].value)
        show_num.push(data[i].value)
    }
    var chart02_realdata = [];
    var chart02_showdata = [];
    for (let i in myChart02_legend) {
        chart02_realdata.push({
            name: myChart02_legend[i],
            value: real_num[i],
        });
        chart02_showdata.push({
            name: myChart02_legend[i],
            value: show_num[i],
        });
    }
    var option02 = {
        color: ['#e7686a', '#5b8eb2', '#206a9a', '#2e6c8d', '#3d548d', '#1f3a8e'],
        legend: {
            show: true,
            top: 'center',
            right: 20,
            icon: 'rect',
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 20,
            orient: 'vertical',
            textStyle: {
                rich: {
                    n: {
                        fontSize: 14,
                        color: '#feffff',
                        padding: [0, 7]
                    },
                    v: {
                        width: 70,
                        align: 'right',
                        fontSize: 14,
                        fontFamily: 'Aldrich-R',
                        color: '#3bade3',
                    },
                }
            },
            formatter: v => {
                var name, value;
                chart02_realdata.map(item => {
                    if (v == item.name) {
                        name = item.name;
                        value = item.value;
                    }
                });
                return '{n|' + name + '}' + '{v|' + value + '}';
            },
            data: myChart02_legend
        },
        series: [{
            type: 'funnel',
            top: 'middle',
            left: 20,
            width: '50%',
            height: '68%',
            min: 0,
            //max: 60,
            max: max,
            minSize: '0%',
            maxSize: '100%',
            orient: 'vertical',
            sort: 'descending',
            gap: 4,
            label: {
                show: false,
            },
            itemStyle: {
                opacity: 0.8,
                borderWidth: 0,
            },
            emphasis: {
                label: {
                    show: false,
                }
            },
            data: chart02_showdata
        }, ]
    };
    return option02;
}

/**
 * 散点图
 * @param data
 */
echartMap.scatter = function (data = []) {
    var chart05_base_data = data;
    /*var chart05_base_data = [
        {
            name: '攻击者1',
            color: '#48a0ff',
            data: [
                [40,5000,60],
            ]
        },
        {
            name: '攻击者2',
            color: '#43c5ff',
            data: [
                [60,4000,35],
            ]
        },
        {
            name: '攻击者3',
            color: '#69eaff',
            data: [
                [70,7000,45],
            ]
        },
        {
            name: '攻击者4',
            color: '#99d8ff',
            data: [
                [90,5000,55],
            ]
        },
        {
            name: '攻击者5',
            color: '#ff7171',
            data: [
                [10,3000,30],
            ]
        }
    ];*/
    var chart05_legend = [];
    var series = [];
    for (let i in chart05_base_data) {
        chart05_legend.push({
            name: chart05_base_data[i].name
        });
        series.push({
            name: chart05_base_data[i].name,
            type: 'scatter',
            coordinateSystem: 'cartesian2d',
            symbol: 'circle',
            symbolSize: v => {
                return v[2]
            },
            itemStyle: {
                normal: {
                    color: chart05_base_data[i].color,
                    opacity: 0.6
                }
            },
            data: chart05_base_data[i].data
        })
    };
    var option05 = {
        tooltip: {
            trigger: 'item',
            formatter: v => {
                return v.seriesName + '：' + v.data[2]
            },
        },
        grid: {
            top: '25%',
            bottom: '5%',
            left: '5%',
            right: '5%',
            containLabel: true
        },
        legend: {
            show: true,
            top: 8,
            left: 'center',
            icon: 'circle',
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 20,
            orient: 'horizontal',
            textStyle: {
                fontSize: 14,
                color: '#feffff',
            },
            data: chart05_legend
        },
        xAxis: {
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(230, 230, 230, 0.302)'
                }
            },
            axisLine: { //坐标轴轴线相关设置。就是数学上的x轴
                show: true,
                lineStyle: {
                    color: 'rgba(230, 230, 230, 0.302)'
                }
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    fontFamily: 'Aldrich-R',
                    color: 'rgba(254, 255, 255, 0.502)',
                },
            },
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false
            },
            axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                show: true,
                lineStyle: {
                    color: 'rgba(230, 230, 230, 0.302)'
                }
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    fontFamily: 'Aldrich-R',
                    color: 'rgba(254, 255, 255, 0.502)',
                },
            },
        },
        series: series
    };
    return option05;
}

/**
 * 横条图-类型1
 * @param data
 */
echartMap.barY1 = function (dataInfo = []) {
    let dataFieldInfo = dataInfo.fieldInfo
    let data = dataInfo.data
    let xAxisName = []
    for (let i in data) {
        xAxisName.push(data[i].name)
    }
    // dataFieldInfo中补充字段value，表示当前字段对应的数组数据
    for (let j in dataFieldInfo) {
        dataFieldInfo[j].value = []
        for (let i in data) {
            dataFieldInfo[j].value.push(data[i][dataFieldInfo[j].field])
        }
    }
    let series = []
    let seriesColor = ['#6c95ff', '#d6e2e8', '#ff7171']
    for (let i in dataFieldInfo) {
        series.push({
            name: dataFieldInfo[i].desc,
            type: 'bar',
            data: dataFieldInfo[i].value,
            barWidth: 5, //柱子宽度
            itemStyle: {
                normal: {
                    color: seriesColor[i % 3] // 按照顺序取色
                }
            }
        })
    }

    var option07 = {
        grid: {
            top: 0,
            bottom: '5%',
            left: '5%',
            right: '5%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'value',
            splitLine: {
                show: false,
            },
            axisLine: { //坐标轴轴线相关设置。就是数学上的x轴
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
                formatter: '',
            },
        },
        yAxis: {
            type: 'category',
            splitLine: {
                show: false
            },
            axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: true,
                fontSize: 14,
                color: '#f0fbff',
                backgroundColor: {
                    image: './img/nr1.png'
                },
                padding: [10, 15, 8, 15]
            },
            // data: ['微信', '微博', '论坛', '新闻'],
            data: xAxisName
        },
        series: series
        /*series: [
            {
                name: '正面',
                type: 'bar',
                data: [60,60,80,100],
                barWidth: 5, //柱子宽度
                itemStyle: {
                    normal: {
                        color: '#6c95ff'
                    }
                }
            },
            {
                name: '中性',
                type: 'bar',
                data: [60,60,90,90],
                barWidth: 5, //柱子宽度
                itemStyle: {
                    normal: {
                        color: '#d6e2e8'
                    }
                }
            },
            {
                name: '负面',
                type: 'bar',
                data: [50,50,60,80],
                barWidth: 5, //柱子宽度
                itemStyle: {
                    normal: {
                        color: '#ff7171'
                    }
                }
            }
        ]*/
    };
    return option07;
}

/**
 * 横条图-类型2-简约多色彩-TOPN常用
 */
echartMap.barY2 = function (data = [],chartInfo={}) {
    // 是否启用数据缩放功能，默认显示前5条
    let enableDataZoom = chartInfo.enableDataZoom || false
    let dataZoomMaxValue = chartInfo.dataZoomMaxValue || 4
    // 当数据大于5条时才会出现
    enableDataZoom = enableDataZoom && (data.length > 5)

    let nameArray = []
    let dataArray = []
    let valueName = chartInfo.valueName ||''
    let colors = ['#ff7173', '#2b8bc1', '#607980', '#5e7098', '#22419C']
    for (let i in data) {
        nameArray.push(data[i].name)
        dataArray.push({
            value: data[i].value,
            itemStyle: {
                normal: {
                    color: colors[i],
                }
            }
        })
    }

    var dfColor = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [{
            offset: 1,
            color: '#0489f0' // 0% 处的颜色
        }, {
            offset: 0,
            color: '#28d9e8' // 100% 处的颜色
        }],
        global: false // 缺省为 false
    };

    var option03 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (objs, index) {
                let obj = objs[0];
                return `${obj.name}<br/>${obj.marker}${valueName}${valueName?'：':''}${obj.value} 个`;
            },
            confine: true, // 是否将 tooltip 框限制在图表的区域内。
        },
        grid: {
            top: '2%',
            left: '3%',
            right: '15%',
            bottom: '2%',
            containLabel: true,
        },
        ...enableDataZoom?{
            "dataZoom": [
                {
                    "show": true,
                    "width": 8,
                    "yAxisIndex": [
                        0
                    ],
                    bottom:'0',
                    "startValue": 0,
                    "endValue": dataZoomMaxValue,
                    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                    handleSize: '100%',
                    handleStyle:{
                        color:"rgba(211,222,229,0.38)",

                    },
                    textStyle:{
                        color:"#fff"
                    },
                    borderColor:"rgba(144,151,156,0.42)",
                    fillerColor: 'rgba(204,204,204,0.11)',
                    filterMode: 'empty'
                }, {
                    "type": "inside",
                    "yAxisIndex": [
                        0
                    ],
                    /*"show": true,
                    "height": 15,
                    "start": 1,
                    "end": 35*/
                    zoomOnMouseWheel: false,
                    moveOnMouseWheel: true,
                    // filterMode: 'none'
                }
            ]
        }:{},
        xAxis: {
            type: 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                show: false,

            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            boundaryGap: true,
            inverse: true, //反向
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 18,
                formatter: function (params) {
                    var val = "";
                    if (params.length > 10) {
                        val = params.substr(0, 10) + '...';
                        return val;
                    } else {
                        return params;
                    }
                },
                color: '#fff',
                /*formatter: function (value, index) {
                    var ind = index + 1;
                    if (ind == 1) {
                        return '{a|' + value + '}'
                    } else if (ind == 2) {
                        return '{b|' + value + '}'
                    } else if (ind == 3) {
                        return '{c|' + value + '}'
                    } else {
                        return '{d|' + value + '}'
                    }
                },*/
                /*rich: {
                    a: {
                        fontSize: 14,
                        color: "#90bff4",
                    },
                    b: {
                        fontSize: 14,
                        color: "#90bff4",

                    },
                    c: {
                        fontSize: 14,
                        color: "#90bff4",
                    },
                    d: {
                        fontSize: 14,
                        color: "#90bff4",
                    }
                }*/
            },
            data: nameArray
        },
        series: [{
                name: '数量',
                barMaxWidth: '25px',
                type: 'bar',

                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{c}',
                        textStyle: {
                            color: '#fff',
                            fontSize: 14,
                            fontFamily: 'Aldrich',
                        }
                    }
                        },
                data: dataArray
                //  [{
                //     value: 47318,
                //     itemStyle: {
                //         normal:{
                //             color: '#FF5B40',
                //         }
                //     }
                // },
                //     {
                //         value: 37340,
                //         itemStyle: {
                //             normal:{
                //                 color: '#FA9A2A',
                //             }
                //         }
                //     },
                //     {
                //         value: 34085,
                //         itemStyle: {
                //             normal:{
                //                 color: '#38C8F8',
                //             }
                //         }
                //     },
                //     {
                //         value: 33442,
                //         itemStyle: {
                //             normal:{
                //                 color: '#38C8F8',
                //             }
                //         }
                //     },
                //     {
                //         value: 22527,
                //         itemStyle: {
                //             normal:{
                //                 color: '#38C8F8',
                //             }
                //         }
                //     }
                // ]
            },

        ]
    }
    return option03;
}

/**
 * 横条图-类型4-简约蓝色渐变-TOPN常用
 */
echartMap.barY4 = function (data = [],chartInfo={}) {
    // 是否启用数据缩放功能，默认显示前5条
    let enableDataZoom = chartInfo.enableDataZoom || false
    let dataZoomMaxValue = chartInfo.dataZoomMaxValue || 4
    // 当数据大于5条时才会出现
    enableDataZoom = enableDataZoom && (data.length > 5)

    let nameArray = []
    let dataArray = []
    let valueName = chartInfo.valueName ||''
    let colors = ['#ff7173', '#2b8bc1', '#607980', '#5e7098', '#22419C']
    for (let i in data) {
        nameArray.push(data[i].name)
        dataArray.push({
            value: data[i].value,
            /*itemStyle: {
                normal: {
                    color: colors[i],
                }
            }*/
        })
    }

    var dfColor = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [{
            offset: 1,
            color: '#0489f0' // 0% 处的颜色
        }, {
            offset: 0,
            color: '#28d9e8' // 100% 处的颜色
        }],
        global: false // 缺省为 false
    };

    var option03 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (objs, index) {
                let obj = objs[0];
                return `${obj.name}<br/>${obj.marker}${valueName}${valueName?'：':''}${obj.value} 个`;
            },
            confine: true, // 是否将 tooltip 框限制在图表的区域内。
        },
        grid: {
            top: '2%',
            left: '3%',
            right: '80px',
            bottom: '2%',
            containLabel: true,
        },
        ...enableDataZoom?{
            "dataZoom": [
                {
                    "show": true,
                    "width": 8,
                    "yAxisIndex": [
                        0
                    ],
                    bottom:'0',
                    "startValue": 0,
                    "endValue": dataZoomMaxValue,
                    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                    handleSize: '100%',
                    handleStyle:{
                        color:"rgba(211,222,229,0.38)",

                    },
                    textStyle:{
                        color:"#fff"
                    },
                    borderColor:"rgba(144,151,156,0.42)",
                    fillerColor: 'rgba(204,204,204,0.11)',
                    filterMode: 'empty'
                }, {
                    "type": "inside",
                    "yAxisIndex": [
                        0
                    ],
                    zoomOnMouseWheel: false,
                    moveOnMouseWheel: true,
                }
            ]
        }:{},
        xAxis: {
            type: 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                show: false,

            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            boundaryGap: true,
            inverse: true, //反向
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                margin: 18,
                formatter: function (params) {
                    var val = "";
                    if (params.length > 8) {
                        val = params.substr(0, 8) + '...';
                        return val;
                    } else {
                        return params;
                    }
                },
                color: '#fff',
            },
            data: nameArray
        },
        series: [{
            name: '数量',
            barMaxWidth: '25px',
            type: 'bar',

            /*label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{c}',
                    textStyle: {
                        color: '#fff',
                        fontSize: 14,
                        fontFamily: 'Aldrich',
                    }
                }
            },*/
            data: dataArray,
            itemStyle: {
                normal: {
                    label: {
                        show: true, //开启显示
                        position: 'right', //在上方显示
                        textStyle: { //数值样式
                            color: "rgba(250,250,250,0.6)",
                            fontSize: 16,
                            fontWeight: 600
                        },
                        formatter: (params)=>{
                            return numberConversion(params.value)
                        }
                    },
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 0,
                        color: 'rgba(61,126,235,1)'
                    }, {
                        offset: 1,
                        color: 'rgba(61,126,235,0)'
                    }]),
                    borderColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 0,
                        color: 'rgba(160,196,225,1)'
                    }, {
                        offset: 1,
                        color: 'rgba(61,126,235,1)'
                    }]),
                    borderWidth: 2
                }
            },
        },

        ]
    }
    return option03;
}


/**
 * 横条图-小清新款
 * @param data
 * @returns {{yAxis: {axisLabel: {formatter: (function(*, *): string), color: string, rich: {even: {color: string, fontSize: number}, odd: {color: string, fontSize: number}}, fontSize: number, inside: boolean}, data: [], splitArea: {areaStyle: {color: [string, string]}, show: boolean}, axisLine: {lineStyle: {color: string}, show: boolean}, show: boolean, splitLine: {lineStyle: {color: string}, show: boolean}, axisTick: {show: boolean}, type: string}, xAxis: {axisLabel: {formatter: string, show: boolean}, axisLine: {lineStyle: {color: string}, show: boolean}, show: boolean, splitLine: {lineStyle: {color: string}, show: boolean}, axisTick: {show: boolean}, type: string}, grid: {top: string, left: string, bottom: string, right: string, containLabel: boolean}, series: [{symbolRepeat: boolean, symbolMargin: number, data: [], symbolSize: number[], name: string, tooltip: {show: boolean}, zlevel: number, type: string, symbolClip: boolean}, {barWidth: number, data: [], name: string, zlevel: number, label: {normal: {formatter: function(*): (string|string), show: boolean, rich: {even: {fontFamily: string, color: string, fontSize: number}, odd: {fontFamily: string, color: string, fontSize: number}}, position: string}}, type: string}], tooltip: {trigger: string}}}
 */
echartMap.barY3 = function (data = [], chartInfo) {
    var yAxisData = [];
    var bar_data = [];
    let maxValue = 0;
    var pic_bar = 'image:///image/cmiot-home-v3/img/business_security/pic_bar.png';
    var item_bar = {
        normal: {
            color: 'rgba(108, 149, 255, 0.102)',
            borderColor: 'rgb(108, 149, 255)',
        }
    };
    for (var i = 0; i < data.length; i++) {
        yAxisData.push(data[i].name)
        bar_data.push({
            name: data[i].name,
            symbol: pic_bar,
            itemStyle: item_bar,
            value: data[i].value,
        });
        if (data[i].value > maxValue) {
            maxValue = data[i].value
        }
    };
    var option03 = {
        grid: {
            top: '7%',
            bottom: '5%',
            left: '5%',
            right: '5%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            show: true,
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(231, 238, 255, 0.2)'
                }
            },
            axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                show: true,
                lineStyle: {
                    color: 'rgb(231, 238, 255, 0.2)'
                }
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
                formatter: '',
            },
        },
        yAxis: {
            show: true,
            type: 'category',
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(231, 238, 255, 0.2)'
                }
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(0, 27, 36, 0.051)', 'transparent']
                }
            },
            axisLine: { //坐标轴轴线相关设置。就是数学上的x轴
                show: true,
                lineStyle: {
                    color: 'rgb(231, 238, 255, 0.2)'
                }
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                fontSize: 14,
                color: '#fff',
                inside: true,
                formatter: function (item, i) {
                    if (i % 2 == 0) {
                        return '{even|' + item + '}'
                    } else {
                        return '{odd|' + item + '}'
                    }
                },
                rich: {
                    even: {
                        fontSize: 14,
                        color: '#a7f6ff'
                    },
                    odd: {
                        fontSize: 14,
                        color: '#fff'
                    }
                }
            },
            data: yAxisData,
        },
        series: [{
                type: 'pictorialBar',
                name: '用户行为分析',
                tooltip: {
                    show: false,
                },
                symbolSize: [25, 23],
                symbolRepeat: true,
                symbolMargin: 0,
                symbolClip: true,
                zlevel: 1,
                data: bar_data,
            },
            {
                type: 'bar',
                name: '用户行为分析',
                barWidth: 25,
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight',
                        formatter: function (item) {
                            // 百分比小于35时，隐藏数字显示，防止与name重叠问题
                            if ((Math.round(item.value / maxValue * 10000) / 100.00) < (chartInfo.minShowNum ? chartInfo.minShowNum : 35)) {
                                return ''
                            }
                            if (item.dataIndex % 2 == 0) {
                                return '{even|' + item.value + '}'
                            } else {
                                return '{odd|' + item.value + '}'
                            }
                        },
                        rich: {
                            even: {
                                fontSize: 14,
                                fontFamily: 'Aldrich',
                                color: '#a7f6ff'
                            },
                            odd: {
                                fontSize: 14,
                                fontFamily: 'Aldrich',
                                color: '#fff'
                            }
                        }
                    }
                },
                zlevel: 2,
                data: bar_data,
            },
        ]
    };
    return option03;
}

/**
 * 折线趋势图-多元数据类型-彩色线条
 * @param data
 */
echartMap.lineTrendMult = function (dataInfo = [], chartInfo = {}) {
    // 是否显示平均线
    let averageLine = chartInfo.averageLine || false
    let legendPosition = chartInfo.legendPosition || {left:0}
    let legendFontSize = chartInfo.legendFontSize || 12
    // 深度克隆
    dataInfo = JSON.parse(JSON.stringify(dataInfo))
    let dataFieldInfo = dataInfo.fieldInfo
    let data = dataInfo.data
    let xAxisName = []
    for (let i in data) {
        xAxisName.push(data[i].name)
    }
    // dataFieldInfo中补充字段value，表示当前字段对应的数组数据
    for (let j in dataFieldInfo) {
        dataFieldInfo[j].value = []
        for (let i in data) {
            dataFieldInfo[j].value.push(data[i][dataFieldInfo[j].field])
        }
    }
    let series = []
    // let colorArray1 = ['rgb(33, 132, 255)','rgb(209, 72, 80)','rgb(88, 165, 78)','rgb(255, 143, 113)','rgb(112, 220, 255)']
    // let colorArray2 = ['rgba(33, 132, 255, 0.4)','rgba(209, 72, 80, 0.4)','rgba(88, 165, 78, 0.4)','rgba(255, 143, 113, 0.4)','rgba(112, 220, 255, 0.4)']
    let colorArray1 = ['rgb(161,79,207)', 'rgb(77,181,197)', 'rgb(169, 171, 180)', 'rgb(255, 143, 113)', 'rgb(112, 220, 255)','rgb(193,225,112)']
    let colorArray2 = ['rgba(161,79,207, 0.4)', 'rgba(77,181,197, 0.4)', 'rgba(169, 171, 180, 0.4)', 'rgba(255, 143, 113, 0.4)', 'rgba(112, 220, 255, 0.4)','rgb(193,225,112,0.4)']

    let colorTotal = colorArray1.length
    for (let i in dataFieldInfo) {
        let color = [];
        if (dataInfo.fieldInfo[i].color) {
            color = dataInfo.fieldInfo[i].color
        } else {
            color = false
        }
        series.push({
            name: dataFieldInfo[i].desc,
            type: 'line',
            smooth: false,
            symbolSize: 0,
            emphasis: {
                label: {
                    show: false,
                }
            },
            itemStyle: {
                normal: {
                    color: color[0] || colorArray1[i % colorTotal]
                }
            },
            lineStyle: {
                normal: {
                    color: color[0] || colorArray1[i % colorTotal]
                }
            },
            areaStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: color[1] || colorArray2[i % colorTotal],
                        }, {
                            offset: 1,
                            color: 'rgba(33, 132, 255, 0)',
                        }],
                        globalCoord: false
                    },
                }
            },
            data: dataFieldInfo[i].value,
            markLine: {
                data: [
                  ...averageLine?[{type: 'average', name: '平均值'}]:[]
                ]
            }
        })
    }

    var option07 = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            show: dataInfo.legend || false,
            icon: 'rect',
            itemWidth: 8,
            itemHeight: 3,
            // itemGap: 10,
            // left:0,
            ...legendPosition,
            // top: 0,
            // right: 0,
            textStyle: {
                // fontSize: 12,
                fontSize: legendFontSize,
                color: '#fff',
            },
        },
        grid: {
            top: dataInfo.legend?'17%':'10%',
            bottom: dataInfo.legend?'0':'0',
            left: '3%',
            right: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {
                show: false,
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(108, 149, 255, 0.059)', 'transparent']
                }
            },
            axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                show: true,
                onZero: true,
                lineStyle: {
                    color: 'rgba(230, 230, 230, .302)'
                }
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    fontFamily: 'Aldrich',
                    color: '#feffff',
                },
                rotate: 30
            },
            data: xAxisName,
        },
        yAxis: {
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(230, 230, 230, .102)'
                }
            },
            minInterval:1,
            axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    fontFamily: 'Aldrich',
                    color: '#feffff',
                },
            }
        },
        series: series
    };
    return option07;
}


/**
 * 饼图-魔方样式
 * @param data
 */
echartMap.pieCube = function (data = []) {
    let color2 = ['#253b6f', '#48586f', '#52384c']; // 外环
    let color1 = ['#6c95ff', '#d6e2e8', '#ff7171']; // 内环
    /*var data = [
        {
            value: 2030,
            name: '低危'
        },
        {
            value: 769,
            name: '中危'
        },
        {
            value: 453,
            name: '高危'
        }
    ];*/
    let baseData1 = [];
    let baseData2 = [];
    let legend = [];
    for (var i = 0; i < data.length; i++) {
        legend.push(data[i].name)
        baseData1.push({
            name: data[i].name,
            value: data[i].value,
            itemStyle: {
                normal: {
                    color: color1[i]
                }
            }
        }, {
            name: '',
            value: 1,
            itemStyle: {
                normal: {
                    color: 'transparent'
                }
            }
        });
        baseData2.push({
            name: data[i].name,
            value: data[i].value,
            itemStyle: {
                normal: {
                    color: color2[i]
                }
            }
        }, {
            name: '',
            value: 1,
            itemStyle: {
                normal: {
                    color: 'transparent'
                }
            }
        });
    };
    var option02 = {
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)',
        },
        legend: {
            show: true,
            top: 'center',
            right: 10,
            orient: 'vertical',
            icon: 'rect', //图例排列的方式
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 30,
            textStyle: {
                rich: {
                    n: {
                        width: 70,
                        fontSize: 16,
                        color: '#f0fbff',
                        padding: [0, 7]
                    },
                    v: {
                        fontSize: 16,
                        fontFamily: 'Aldrich',
                        color: '#f0fbff',
                        padding: [0, 7]
                    },
                }
            },
            formatter: function (name) {
                var data = option02.series[1].data;
                var targetValue;
                for (var i = 0, l = data.length; i < l; i++) {
                    if (data[i].name == name) {
                        targetValue = data[i].value;
                    }
                }
                var v = targetValue;
                return '{n|' + name + '}' + '{v|' + v + '}';
            },
            data: legend,
        },
        graphic: {
            elements: [{
                type: 'image',
                style: {
                    image: '/image/cmiot-home-v3/img/business_security/pie02_bg.png',
                    width: 210,
                    height: 203,
                },
                top: 'center',
                left: 28,
            }]
        },
        series: [{
            type: 'pie',
            radius: ['60%', '70%'],
            // roseType: 'angle', //南丁格尔玫瑰图
            center: ['30%', '50%'],
            zlevel: 2,
            label: {
                normal: {
                    show: false,
                }
            },
            data: baseData1
        }, {
            type: 'pie',
            radius: ['55%', '70%'],
            // roseType: 'angle', //南丁格尔玫瑰图
            center: ['30%', '50%'],
            silent: true,
            zlevel: 1,
            label: {
                normal: {
                    show: false,
                }
            },
            data: baseData2
        }]
    };
    return option02;
}

/**
 * 热词云
 * @param data
 */
echartMap.hotWord = function (data = []) {
    var style = [{
            symbol: 'image:///image/cmiot-home-v3/img/content_security/graph_bg1.png',
            color: '#ff5f5f',
        },
        {
            symbol: 'image:///image/cmiot-home-v3/img/content_security/graph_bg2.png',
            color: '#00d2e4',
        },
        {
            symbol: 'image:///image/cmiot-home-v3/img/content_security/graph_bg3.png',
            color: '#2184ff',
        },
    ];
    let dataArray = []
    for (let i in data) {
        dataArray.push({
            name: data[i],
            symbol: style[i % 3].symbol,
            label: {
                normal: {
                    color: style[i % 3].color
                }
            }
        })
    }
    var option09 = {
        series: [{
            type: 'graph',
            layout: 'force',
            force: {
                repulsion: 50,
            },
            roam: false,
            label: {
                normal: {
                    show: true,
                    fontSize: 16,
                }
            },
            symbolSize: [92, 30],
            draggable: true,
            data: dataArray
            /*data: [
                {
                    name: "发布会",
                    symbol: style[0].symbol,
                    label: {
                        normal: {
                            color: style[0].color
                        }
                    }
                },
                {
                    name: "网络安全",
                    symbol: style[0].symbol,
                    label: {
                        normal: {
                            color: style[0].color
                        }
                    }
                },
                {
                    name: "运营商",
                    symbol: style[0].symbol,
                    label: {
                        normal: {
                            color: style[0].color
                        }
                    }
                },
                {
                    name: "公安部",
                    symbol: style[1].symbol,
                    label: {
                        normal: {
                            color: style[1].color
                        }
                    }
                },
                {
                    name: "人工智能",
                    symbol: style[1].symbol,
                    label: {
                        normal: {
                            color: style[1].color
                        }
                    }
                },
                {
                    name: "重保信息",
                    symbol: style[1].symbol,
                    label: {
                        normal: {
                            color: style[1].color
                        }
                    }
                },
                {
                    name: "智能大会",
                    symbol: style[1].symbol,
                    label: {
                        normal: {
                            color: style[1].color
                        }
                    }
                },
                {
                    name: "交易日",
                    symbol: style[1].symbol,
                    label: {
                        normal: {
                            color: style[1].color
                        }
                    }
                },
                {
                    name: "股市",
                    symbol: style[1].symbol,
                    label: {
                        normal: {
                            color: style[1].color
                        }
                    }
                },
                {
                    name: "摄像头",
                    symbol: style[2].symbol,
                    label: {
                        normal: {
                            color: style[2].color
                        }
                    }
                },
                {
                    name: "专业版",
                    symbol: style[2].symbol,
                    label: {
                        normal: {
                            color: style[2].color
                        }
                    }
                },
                {
                    name: "农作物",
                    symbol: style[2].symbol,
                    label: {
                        normal: {
                            color: style[2].color
                        }
                    }
                },
                {
                    name: "重防疫",
                    symbol: style[2].symbol,
                    label: {
                        normal: {
                            color: style[2].color
                        }
                    }
                },
                {
                    name: "管理局",
                    symbol: style[2].symbol,
                    label: {
                        normal: {
                            color: style[2].color
                        }
                    }
                }
            ]*/
        }]
    };
    return option09;
}

const barColorList = ['#ff7173', '#2b8bc1', '#618198', '#5e7098', '#22419C'];

const findLabel = (list = []) => {
    const legend = [];
    list.forEach(item => {
        legend.push(item.name);
    });
    return legend;
};

// 柱状图
export const barFn = (data = [], cusIndent = '数量') => {
    // console.log(data)
    if (!data.length) return {};
    const xAxis = [];
    data = data.sort(compare("value"));
    data.forEach(item => {
        if (!item.name) return;
        xAxis.push(item.name);
    });
    return {
        // color: ['#ffc637', '#229ae9'],
        grid: {
            top: "10px",
            left: "3%",
            right: "4%",
            bottom: "10px",
            containLabel: true
        },
        tooltip: {
            show: true,
            textStyle: {
                fontSize: 20,
            },
            /*formatter(params) {
                return `${params.name}<br>${cusIndent}：${params.value}`;
            },*/
            trigger: 'axis',
            axisPointer: {
                type: "shadow"
            }
        },
        yAxis: [{
            type: "category",
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#03a9f4",
                    opacity: 0.5
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#45aee6",
                    opacity: 0.2
                }
            },
            axisLabel: {
                color: "#48b5ee",
                fontSize: 16,
                tooltip: {
                    show: true
                },
                formatter: function (value) {
                    return value.length > 6 ? value.slice(0, 6) + "..." : value;
                }
            },
            data: xAxis
        }],
        xAxis: [{
            type: "value",
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#03a9f4",
                    opacity: 0.5
                }
            },
            splitLine: {
                lineStyle: {
                    color: "#45aee6",
                    opacity: 0.2
                }
            },
            axisLabel: {
                color: "#48b5ee",
                fontSize: 16,
                interval: 0,
                rotate: 30,
            }
        }],
        series: [{
            name: cusIndent,
            type: "bar",
            smooth: true,
            barWidth: "30%",
            showSymbol: false,
            barMinHeight: 5,
            data: data.map((item, key) => {
                return {
                    ...item,
                    itemStyle: {
                        normal: {
                            color: barColorList[key]
                        }
                    }
                };
            })
        }]
    };
};

echartMap.barFn = function (data = [], cusIndent = '数量') {
    return barFn(data, cusIndent)
}

// 竖型柱状图
export const barVerticalFn = (data = [], chartInfo) => {
    // console.log(data)
    if (!data.length) return {};
    const xAxis = [];
    if (chartInfo.isSort) {
        data = data.sort(compareDesc("value"));
    }
    data.forEach(item => {
        if (!item.name) return;
        xAxis.push(item.name);
    });
    return {
        // color: ['#ffc637', '#229ae9'],
        grid: {
            top: "10px",
            left: "3%",
            right: "4%",
            bottom: "10px",
            containLabel: true
        },
        tooltip: {
            show: true,
            textStyle: {
                fontSize: 20,
            },
            /*formatter(params) {
                return `${params.name}<br>${cusIndent}：${params.value}`;
            },*/
            trigger: 'axis',
            axisPointer: {
                type: "shadow"
            }
        },
        yAxis: [{
            type: "value",
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#03a9f4",
                    opacity: 0.5
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#45aee6",
                    opacity: 0.2
                }
            },
            axisLabel: {
                color: "#48b5ee",
                fontSize: 16,
                tooltip: {
                    show: true
                },
                formatter: function (value) {
                    return value.length > 6 ? value.slice(0, 6) + "..." : value;
                }
            },
        }],
        xAxis: [{
            type: "category",
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#03a9f4",
                    opacity: 0.5
                }
            },
            splitLine: {
                lineStyle: {
                    color: "#45aee6",
                    opacity: 0.2
                }
            },
            axisLabel: {
                color: "#ccc",
                fontSize: 18,
                tooltip: {
                    show: true
                },
                rotate: 45,
                interval: 0,
                formatter: function (value) {
                    return (value.length > 6 ? (value.slice(0, 6) + "...") : value)
                },
            },
            data: xAxis
        }],
        series: [{
            name: chartInfo.cusIndent ? chartInfo.cusIndent : '数量',
            type: "bar",
            smooth: true,
            barWidth: "30%",
            showSymbol: false,
            barMinHeight: 5,
            data: data.map((item, key) => {
                return {
                    ...item,
                    itemStyle: {
                        normal: {
                            color: barColorList[key]
                        }
                    }
                };
            })
        }]
    };
};

echartMap.barVerticalFn = function (data = [], chartInfo) {
    return barVerticalFn(data, chartInfo)
}

// 垂直多条柱状图
export const barsVerticalFn = (data = []) => {
    let attackBusinessT5ListNew = [];
    let eventName = [];
    data.forEach(item => {
        if (eventName.indexOf(item.flag) === -1) {
            eventName.push(item.flag);
            attackBusinessT5ListNew[eventName.length-1] = [];
        }
        let index = eventName.indexOf(item.flag);
        attackBusinessT5ListNew[index].push({
            name: item.name,
            value: item.value,
            flag: item.flag
        })
    });
    data = JSON.parse(JSON.stringify(attackBusinessT5ListNew))
    let xAxisArr = [],
      legendArr = [],
      colorArr = ["#C6285E","#B6690F","#364DCA"],
      dataArr = [];
    if (data[0].length > 0) {
        data[0].forEach(item => {
            xAxisArr.push(item.name);
        });
        dataArr = data;
        data.forEach(item => {
            legendArr.push(item[0].event)
        })

    }
    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        textStyle: {
            color: "rgb(60, 211, 255)",
            fontSize: 12,
        },
        legend: {
            show: false,
            x: "center",
            y: "top",
            orient: "horizontal",
            icon: "rect",
            itemWidth: 16, // 设置宽度
            itemHeight: 16, // 设置高度
            itemGap: 36,
            textStyle: {
                fontSize: 16,
                color: "rgba(255,255,255,.7)",
            },
            padding: [10,30,10,30],
            backgroundColor: "rgba(106,149,255,.05)",
            data: legendArr
        },
        grid: {
            top: "10px",
            left: "3%",
            right: "4%",
            bottom: "10px",
            containLabel: true
        },
        calculable: true,
        xAxis: [
            {
                type: "category",
                data: xAxisArr,
                axisLine: {
                    //坐标轴轴线相关设置。就是数学上的y轴
                    show: true,
                    lineStyle: {
                        color: "rgba(255,255,255,.7)",
                    },
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    interval: 0,
                    rotate:30,
                    textStyle: {
                        color: "rgba(255,255,255,.7)",
                        fontSize: 16,
                    },
                },
                splitArea: {
                    show: true,
                    interval: 0,
                    areaStyle: {
                        color: ['rgba(170,195,255,0.05)', 'transparent'],
                    },
                },
            },
        ],
        yAxis: [
            {
                type: "value",
                axisLine: {
                    //坐标轴轴线相关设置。就是数学上的y轴
                    show: false,
                    lineStyle: {
                        color: "#0878bf",
                    },
                },
                axisTick: {
                    show: false,
                },
                splitNumber: 3,
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.7)",
                        fontSize: 12,
                    },
                },
                splitLine: {
                    //网格线
                    lineStyle: {
                        type: "solid", //设置网格线类型 dotted：虚线   solid:实线
                        width: 1,
                        color: "rgba(230,230,230,0.1)",
                    },
                    show: true, //隐藏或显示
                },
            },
        ],
        series: dataArr.map((item,index) => {
            return {
                type: "bar",
                name: legendArr[index],
                data: item,
                barWidth: 8,
                itemStyle: {
                    normal: {
                        color: colorArr[index]
                    },
                },
            }
        })
    };
    return option;
};

echartMap.barsVerticalFn = function (data = [], chartInfo) {
    return barsVerticalFn(data, chartInfo)
}

// 环行图
export const ringFn = (data = [], cusIndent = '数量') => {
    if (!data.length) return {};
    const xAxis = [];
    data = data.sort(compare("value"));
    data.forEach(item => {
        if (!item.name) return;
        xAxis.push(item.name.substr(0, 5));
    });
    return {
        backgroundColor: 'transparent',
        color: ['#239ce9',
            '#da3a49',
            '#e4c80e',
            '#23bde9',
            '#f39316',
            '#2fd6e9',
        ],
        tooltip: {
            axisPointer: {
                type: 'shadow'
            },
            textStyle: {
                fontSize: 20,
            },
        },
        series: [{
            type: 'pie',
            labelLine: {
                normal: {
                    length: 5,
                    length2: 5
                }
            },
            selectedMode: 'single',
            center: ['50%', '50%'],
            radius: ['50%', '80%'],
            label: {
                normal: {
                    show: false,
                    formatter: '{d}%',
                }
            },
            data: data.map((item, key) => {
                return {
                    ...item,
                    /* itemStyle: {
                         normal: {
                             color: barColorList[key]
                         }
                     }*/
                };
            })
        }]
    };
};

echartMap.ringFn = function (data = [], cusIndent = '数量') {
    return ringFn(data, cusIndent)
}

// 环行图 (增加图例-wucp)
export const ringFn2 = (data = [], cusIndent = '数量') => {
    if (!data.length) return {};
    const xAxis = [];
    data = data.sort(compare("value"));
    data.forEach(item => {
        if (!item.name) return;
        xAxis.push(item.name.substr(0, 5));
    });
    return {
        backgroundColor: 'transparent',
        color: ['#239ce9',
            '#da3a49',
            '#e4c80e',
            '#23bde9',
            '#f39316',
            '#2fd6e9',
        ],
        legend: {
            orient: 'vertical',
            left: 10,
            data: xAxis,
            textStyle: {
                color: "#48b5ee",
                fontSize: 20
            }
        },
        tooltip: {
            axisPointer: {
                type: 'shadow'
            },
            textStyle: {
                fontSize: 16,
            },
        },
        series: [{
            type: 'pie',
            labelLine: {
                normal: {
                    length: 5,
                    length2: 5
                }
            },
            selectedMode: 'single',
            center: ['50%', '50%'],
            radius: ['50%', '80%'],
            label: {
                normal: {
                    show: true,
                    formatter: '{d}%',
                },
                fontSize: 16,
            },
            data: data.map((item, key) => {
                return {
                    ...item,
                    /* itemStyle: {
                         normal: {
                             color: barColorList[key]
                         }
                     }*/
                };
            })
        }]
    };
};

// 环形饼图
export const ringPieFn = (data = []) => {
    if (!data.length) return {};
    const series = [];
    const yAxis = [];
    // let values = 0;
    data = data.map(item => {
        // values += +item.radio;
        // var radio = item.radio > 100 ? 100 : item.radio;
        return {
            name: item.name,
            value: item.radio,
            radio: item.radio,
            num: item.value
        };
    });
    data.forEach((item, i) => {
        series.push({
            name: "",
            type: "pie",
            minAngle: 10,
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            radius: [73 - i * 15 + "%", 80 - i * 15 + "%"],
            center: ["30%", "55%"],
            label: {
                normal: {
                    show: false
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 10
                }
            },
            data: [{
                    value: item.value,
                    name: item.name,
                    num: item.num,
                    radio: item.radio
                },
                {
                    // value: values - item.value,
                    value: 100 - item.value,
                    name: "",
                    itemStyle: {
                        normal: {
                            color: "rgba(0,0,0,0)",
                            borderWidth: 0
                        }
                    },
                    tooltip: {
                        show: false
                    },
                    hoverAnimation: false
                }
            ]
        }, {
            name: "",
            type: "pie",
            silent: true,
            z: 1,
            minAngle: 10,
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            radius: [73 - i * 15 + "%", 80 - i * 15 + "%"],
            center: ["30%", "55%"],
            label: {
                normal: {
                    show: false
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 5
                }
            },
            data: [{
                    value: 7.5,
                    itemStyle: {
                        normal: {
                            color: "rgb(13,41,86)",
                            borderWidth: 0
                        }
                    },
                    tooltip: {
                        show: false
                    },
                    hoverAnimation: false
                },
                {
                    value: 2.5,
                    name: "",
                    itemStyle: {
                        normal: {
                            color: "rgba(0,0,0,0)",
                            borderWidth: 0
                        }
                    },
                    tooltip: {
                        show: false
                    },
                    hoverAnimation: false
                }
            ]
        });
        let value = item.value;
        // if (item.value < 100) {
        // 	value = value.toFixed(2);
        // }
        // yAxis.push(((item.value / values) * 100).toFixed(2) + '%');
        yAxis.push(`${value}%`);
    });
    return {
        legend: {
            show: true,
            icon: "circle",
            top: "center",
            left: "65%",
            data: findLabel(data),
            width: 20,
            padding: [0, 5],
            itemGap: 5,
            tooltip: {
                show: true
            },
            textStyle: {
                fontSize: 20,
                lineHeight: 25,
                color: "rgb(160,232,250)"
            }
        },
        tooltip: {
            show: true,
            trigger: "item",
            formatter(params) {
                const data = params.data;
                const list = [];
                list.push(
                    `${params.marker}${data.name}`,
                    `数量：${data.num}`,
                    `占比：${data.radio}%`
                );
                return list.join("<br />");
            },
            textStyle: {
                fontSize: 20,
            }
        },
        color: ["#1890FF", "#FFC53C", "#FA541C"],
        grid: {
            top: "9%",
            bottom: "58%",
            left: "30%",
            containLabel: false
        },
        yAxis: [{
            type: "category",
            inverse: true,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                interval: 0,
                inside: true,
                textStyle: {
                    color: "rgb(160,232,250)",
                    fontSize: 18
                },
                show: true
            },
            data: yAxis
        }],
        xAxis: [{
            show: false
        }],
        series: series
    };
};

// 饼图
export const pieFn = (data = [], cusIndent = '数量') => {
    if (!data.length) return {};
    const xAxis = [];
    data = data.sort(compare("value"));
    data.forEach(item => {
        if (!item.name) return;
        xAxis.push(item.name);
    });
    // console.log(xAxis)
    return {
        backgroundColor: "transparent",
        legend: {
            orient: "vertical",
            top: "10%",
            left: "50%",
            textStyle: {
                fontSize: 20,
                color: "#89e2ff"
            },
            padding: 0,
            itemGap: 10,
            itemWidth: 7,
            itemHeight: 7,
            icon: "circle",
            data: xAxis
            // data: ["计算机", "网络设备", "存储设备", "安全设备", "数据库", "其他"]
        },
        tooltip: {
            axisPointer: {
                type: 'shadow'
            },
            textStyle: {
                fontSize: 20,
            }
        },
        series: [{
            type: "pie",
            labelLine: {
                normal: {
                    length: 5,
                    length2: 5
                }
            },
            selectedMode: "single",
            center: ["24%", "50%"],
            radius: ["0%", "60%"],
            color: ["#2fd6e9",
                "#e43747",
                "#ffa32b",
                "#2aacff",
                "#cc0aa8",
                "#25e447"
            ],

            label: {
                normal: {
                    fontSize: 20,
                    formatter: function (a) {
                        return a.percent.toFixed(0) + "%";
                    }
                },
            },
            data: data.map((item, key) => {
                return {
                    ...item,
                    /* itemStyle: {
                         normal: {
                             color: barColorList[key]
                         }
                     }*/
                };
            })
        }]
    };
};

// 饼图w7
export const pieFnW7 = (data = [], cusIndent = '数量') => {
    if (!data.length) return {};
    const xAxis = [];
    data = data.sort(compare("value"));
    data.forEach(item => {
        if (!item.name) return;
        xAxis.push(item.name);
    });
    // console.log(xAxis)
    return {
        backgroundColor: "transparent",
        legend: {
            orient: "horizontal",
            bottom: "10%",
            left: "10%",
            textStyle: {
                fontSize: 14,
                color: "#89e2ff"
            },
            padding: 0,
            itemGap: 10,
            itemWidth: 7,
            itemHeight: 7,
            icon: "circle",
            data: xAxis
            // data: ["计算机", "网络设备", "存储设备", "安全设备", "数据库", "其他"]
        },
        tooltip: {
            axisPointer: {
                type: 'shadow'
            },
            textStyle: {
                fontSize: 14,
            }
        },
        series: [{
            type: "pie",
            labelLine: {
                normal: {
                    length: 5,
                    length2: 5
                }
            },
            selectedMode: "single",
            center: ["50%", "40%"],
            radius: ["0%", "60%"],
            color: ["#2fd6e9",
                "#e43747",
                "#ffa32b",
                "#2aacff",
                "#cc0aa8",
                "#25e447"
            ],

            label: {
                normal: {
                    fontSize: 14,
                    formatter: function (a) {
                        return a.name+a.percent.toFixed(0) + "%";
                    }
                },
            },
            data: data.map((item, key) => {
                return {
                    ...item,
                    /* itemStyle: {
                         normal: {
                             color: barColorList[key]
                         }
                     }*/
                };
            })
        }]
    };
};

echartMap.pieFnW7 = function (data = [], chartInfo) {
    return pieFnW7(data, chartInfo)
}


// 饼图1-定制版
export const pieFn1 = (data = [], cusIndent = '数量') => {
    if (!data.length) return {};
    const xAxis = [];
    data = data.sort(compare("value"));
    data.forEach(item => {
        if (!item.name) return;
        xAxis.push(item.name);
    });
    // console.log(xAxis)
    return {
        backgroundColor: "transparent",
        /*legend: {
            orient: "vertical",
            "top": "10%",
            "right": "20%",
            textStyle: {
                fontSize: 20,
                color: "#89e2ff"
            },
            padding: 0,
            itemGap: 10,
            itemWidth: 7,
            itemHeight: 7,
            icon: "circle",
            data: xAxis
            // data: ["计算机", "网络设备", "存储设备", "安全设备", "数据库", "其他"]
        },*/
        tooltip: {
            axisPointer: {
                type: 'shadow'
            },
            textStyle: {
                fontSize: 20,
            }
        },
        series: [{
            type: "pie",
            labelLine: {
                normal: {
                    length: 5,
                    length2: 5
                }
            },
            selectedMode: "single",
            "center": ["50%", "50%"],
            radius: ["0%", "60%"],
            color: ["#2fd6e9",
                "#e43747",
                "#ffa32b",
                "#2aacff",
                "#cc0aa8",
                "#25e447"
            ],

            label: {
                normal: {
                    fontSize: 20,
                    /*formatter: function (a) {
                        return a.percent.toFixed(0) + "%";
                    }*/
                },
            },
            data: data.map((item, key) => {
                return {
                    ...item,
                    /* itemStyle: {
                         normal: {
                             color: barColorList[key]
                         }
                     }*/
                };
            })
        }]
    };
};

echartMap.pieFn1 = function (data = [], cusIndent = '数量') {
    return pieFn1(data, cusIndent)
}

echartMap.pieFn1_Ring = function (data = [], cusIndent = '数量') {
    if (!data.length) return {};
    const xAxis = [];
    data = data.sort(compareDesc("value"));
    data.forEach(item => {
        if (!item.name) return;
        xAxis.push(item.name);
    });
    // console.log(xAxis)
    return {
        backgroundColor: "transparent",
        /*legend: {
            orient: "vertical",
            "top": "10%",
            "right": "20%",
            textStyle: {
                fontSize: 20,
                color: "#89e2ff"
            },
            padding: 0,
            itemGap: 10,
            itemWidth: 7,
            itemHeight: 7,
            icon: "circle",
            data: xAxis
            // data: ["计算机", "网络设备", "存储设备", "安全设备", "数据库", "其他"]
        },*/
        legend: {
            textStyle: {
                color: '#0ee6f7',
                fontSize: 12
            },
            top: 20
        },
        tooltip: {
            axisPointer: {
                type: 'shadow'
            },
            textStyle: {
                fontSize: 20,
            }
        },
        series: [{
            type: "pie",
            labelLine: {
                normal: {
                    length: 5,
                    length2: 5
                }
            },
            selectedMode: "single",
            "center": ["50%", "50%"],
            radius: ["30%", "60%"],
            /*color: ["#2fd6e9",
                "#e43747",
                "#ffa32b",
                "#2aacff",
                "#cc0aa8",
                "#25e447"
            ],*/
            color: ['#f2666a', '#ffbe2e', '#c89aef', '#7f70ea', '#45f6ff', '#99f7ff', '#29a4ff'],

            label: {
                normal: {
                    fontSize: 20,
                    /*formatter: function (a) {
                        return a.percent.toFixed(0) + "%";
                    }*/
                },
            },
            data: data.map((item, key) => {
                return {
                    ...item,
                };
            })
        }]
    };
}

// 饼图1-定制版
export const pieFn2 = (data = [], cusIndent = '数量') => {
    if (!data.length) return {};
    const xAxis = [];
    data = data.sort(compare("value"));
    data.forEach(item => {
        if (!item.name) return;
        xAxis.push(item.name);
    });
    // console.log(xAxis)
    return {
        backgroundColor: "transparent",
        /*legend: {
            orient: "vertical",
            "top": "10%",
            "right": "20%",
            textStyle: {
                fontSize: 20,
                color: "#89e2ff"
            },
            padding: 0,
            itemGap: 10,
            itemWidth: 7,
            itemHeight: 7,
            icon: "circle",
            data: xAxis
            // data: ["计算机", "网络设备", "存储设备", "安全设备", "数据库", "其他"]
        },*/
        tooltip: {
            axisPointer: {
                type: 'shadow'
            },
            textStyle: {
                fontSize: 20,
            }
        },
        series: [{
            type: "pie",
            labelLine: {
                normal: {
                    length: 5,
                    length2: 5
                }
            },
            selectedMode: "single",
            "center": ["50%", "50%"],
            radius: ["0%", "60%"],
            color: ["#2fd6e9",
                "#e43747",
                "#ffa32b",
                "#2aacff",
                "#0097cc",
                "#25e447"
            ],

            label: {
                normal: {
                    fontSize: 14,
                    /*formatter: function (a) {
                        return a.percent.toFixed(0) + "%";
                    }*/
                },
            },
            data: data.map((item, key) => {
                return {
                    ...item,
                    /* itemStyle: {
                         normal: {
                             color: barColorList[key]
                         }
                     }*/
                };
            })
        }]
    };
};

echartMap.pieFn3 = (data = [], cusIndent = '数量') => {
    var colorObj01 = {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "rgba(255,66,15, 1)"
                },
                {
                    offset: 1,
                    color: "rgba(255,66,15, 1)"
                }
            ])
        }
    };
    var colorObj02 = {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "rgba(253,137,35, 1)"
                },
                {
                    offset: 1,
                    color: "rgba(253,137,35, 1)"
                }
            ])
        }
    };
    var colorObj03 = {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "rgba(3,169,244, 1)"
                },
                {
                    offset: 1,
                    color: "rgba(3,169,244, 1)"
                }
            ])
        }
    };
    var colorObj04 = {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "rgba(3,124,197,1)"
                },
                {
                    offset: 1,
                    color: "rgba(3,124,197,1)"
                }
            ])
        }
    };
    if (!data.length) return {};
    const xAxis = [];
    data = data.sort(compare("value"));
    data.forEach(item => {
        if (!item.name) return;
        xAxis.push(item.name);
    });
    return {
        backgroundColor: "transparent",
        color: [
            "#239ce9",
            "#da3a49",
            "#e4c80e",
            "#23bde9",
            "#f39316",
            "#2fd6e9"
        ],
        tooltip: {
            axisPointer: {
                type: "shadow"
            }
        },
        series: [{
            type: "pie",
            labelLine: {
                normal: {
                    length: 5,
                    length2: 5
                }
            },
            selectedMode: "single",
            center: ["50%", "50%"],
            radius: ["50%", "80%"],
            label: {
                normal: {
                    show: false,
                    formatter: "{d}%"
                }
            },
            data: xAxis
        }]
    };
}

// 折线图
export const lineFn = (data = [], cusIndent = '数量') => {
    if (!data.length) return {};
    const xAxis = [];
    data = data.sort(compare("value"));
    data.forEach(item => {
        if (!item.name) return;
        xAxis.push(item.name.substr(0, 5));
    });
    return {
        // color: ['#ffc637', '#229ae9'],
        grid: {
            top: "10px",
            left: "3%",
            right: "4%",
            bottom: "10px",
            containLabel: true
        },
        tooltip: {
            show: true,
            textStyle: {
                fontSize: 20,
            },
            formatter(params) {
                return `${params.name}<br>${cusIndent}：${params.value}`;
            }
        },
        yAxis: [{
            type: "category",
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#03a9f4",
                    opacity: 0.5
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#45aee6",
                    opacity: 0.2
                }
            },
            axisLabel: {
                color: "#48b5ee",
                fontSize: 16,
                tooltip: {
                    show: true
                }
            },
            data: xAxis
        }],
        xAxis: [{
            type: "value",
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#03a9f4",
                    opacity: 0.5
                }
            },
            splitLine: {
                lineStyle: {
                    color: "#45aee6",
                    opacity: 0.2
                }
            },
            axisLabel: {
                color: "#48b5ee",
                fontSize: 16
            }
        }],
        series: [{
            name: "",
            type: "bar",
            smooth: true,
            barWidth: "30%",
            showSymbol: false,
            barMinHeight: 5,
            data: data.map((item, key) => {
                return {
                    ...item,
                    itemStyle: {
                        normal: {
                            color: barColorList[key]
                        }
                    }
                };
            })
        }]
    };
};

echartMap.lineFn = function (data = []) {
    return lineFn(data)
}

// 安全事件总数趋势-7天折线图
export const eventMoveFn = (data = []) => {
    if (!data.length) return {};
    const xAxis = [];
    const sourceData = [];
    data.forEach(item => {
        xAxis.push(item.name);
        sourceData.push(item.value);
    });

    return {
        color: ["#ffc637", "#229ae9"],
        grid: {
            top: "18%",
            left: "3%",
            right: "4%",
            bottom: "10px",
            containLabel: true
        },
        tooltip: {
            trigger: "axis",
            textStyle: {
                fontSize: 20,
            },
            axisPointer: {
                type: "cross",
                crossStyle: {
                    color: "#999"
                }
            }
        },
        // legend: {
        //   show: false,
        //   data: ["事件趋势", "安全指数"],
        //   textStyle: {
        //     color: "#03a9f4",
        //     fontSize: 11
        //   }
        // },
        xAxis: [{
            type: "category",
            boundaryGap: false,

            axisPointer: {
                type: "shadow"
            },
            axisLabel: {
                interval: 0,
                rotate: 30,
                color: "#48b5ee",
                fontSize: 9
            },
            data: xAxis
        }],
        yAxis: [{
            name: "",
            type: "value",
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#03a9f4",
                    opacity: 0.5
                }
            },
            splitLine: {
                lineStyle: {
                    color: "#45aee6",
                    opacity: 0.2
                }
            },
            axisLabel: {
                color: "#48b5ee",
                fontSize: 9
            }
        }],
        series: [{
            name: "安全事件总数",
            type: "line",
            smooth: true,
            data: data
        }]
    };
};

// 趋势折线图
export const tendencyChartFn = (data = [], formateName = '') => {
    if (!data.length) return {};
    const xAxis = [];
    const sourceData = [];
    data.forEach(item => {
        xAxis.push(item.name);
        sourceData.push(item.value);
    });

    return {
        color: ["#ffc637", "#229ae9"],
        grid: {
            top: "10px",
            left: "3%",
            right: "4%",
            bottom: "10px",
            containLabel: true
        },
        tooltip: {
            trigger: "axis",
            textStyle: {
                fontSize: 20,
            },
            axisPointer: {
                type: "cross",
                crossStyle: {
                    color: "#999"
                }
            }
        },
        // legend: {
        //   show: false,
        //   data: ["事件趋势", "安全指数"],
        //   textStyle: {
        //     color: "#03a9f4",
        //     fontSize: 11
        //   }
        // },
        xAxis: [{
            type: "category",
            boundaryGap: false,

            axisPointer: {
                type: "shadow"
            },
            axisLabel: {
                interval: 0,
                rotate: 60,
                color: "#48b5ee",
                fontSize: 12,
                formatter : function(params){
                    if (formateName === 'deviceTendency') {
                        if (xAxis.indexOf(params)%2===1) {
                            return params.slice(4)
                        }
                    } else {
                        return params
                    }
                }
            },
            data: xAxis
        }],
        yAxis: [{
            name: "",
            type: "value",
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#03a9f4",
                    opacity: 0.5
                }
            },
            splitLine: {
                lineStyle: {
                    color: "#45aee6",
                    opacity: 0.2
                }
            },
            axisLabel: {
                color: "#48b5ee",
                fontSize: 12
            }
        }],
        series: [{
            name: "活跃设备数量",
            type: "line",
            smooth: true,
            data: data
        }]
    };
};

echartMap.tendencyChartFn = function (data = [], chartInfo) {
    return tendencyChartFn(data, chartInfo.formateName)
}

// 折线图非曲线
export const lineChartFn = (data = [], formateName = '') => {
    if (!data.length) return {};
    const xAxis = [];
    const sourceData = [];
    data.forEach(item => {
        xAxis.push(item.name);
        sourceData.push(item.value);
    });

    return {
        color: ["#ffc637", "#229ae9"],
        grid: {
            top: "10px",
            left: "3%",
            right: "4%",
            bottom: "10px",
            containLabel: true
        },
        tooltip: {
            trigger: "axis",
            textStyle: {
                fontSize: 20,
            },
            axisPointer: {
                type: "cross",
                crossStyle: {
                    color: "#999"
                }
            }
        },
        dataZoom: [{ // 控制图表左右滑动
            width: '15',
            type: 'slider',
            show: false, //flase直接隐藏图形
            xAxisIndex: [0],
            left: 33, //滚动条靠左侧的百分比
            bottom: 40,
            height: 20,//组件高度
            start: 50,//滚动条的起始位置
            showDataShadow: false,//是否显示数据阴影
            showDetail: false,//是否显示想洗数值信息
            end: 100 //滚动条的截止位置（按比例分割你的柱状图x轴长度）
        }, {
            type: 'inside',
            show: true,
            xAxisIndex: [0],
            start: 0,//滚动条的起始位置
            end: 0.25 //滚动条的截止位置（按比例分割你的柱状图x轴长度）
        }],
        // legend: {
        //   show: false,
        //   data: ["事件趋势", "安全指数"],
        //   textStyle: {
        //     color: "#03a9f4",
        //     fontSize: 11
        //   }
        // },
        xAxis: [{
            type: "category",
            boundaryGap: false,

            axisPointer: {
                type: "shadow"
            },
            axisLabel: {
                interval: 0,
                rotate: 60,
                color: "#48b5ee",
                fontSize: 12,
                formatter : function(params){
                    if (formateName === 'deviceTendency') {
                        if (xAxis.indexOf(params)%2===1) {
                            return params.slice(4)
                        }
                    } else {
                        return params
                    }
                }
            },
            data: xAxis
        }],
        yAxis: [{
            name: "",
            type: "value",
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#03a9f4",
                    opacity: 0.5
                }
            },
            splitLine: {
                lineStyle: {
                    color: "#45aee6",
                    opacity: 0.2
                }
            },
            axisLabel: {
                color: "#48b5ee",
                fontSize: 12
            }
        }],
        series: [{
            name: "活跃设备数量",
            type: "line",
            smooth: false,
            data: data
        }]
    };
};

echartMap.lineChartFn = function (data = [], chartInfo) {
    return lineChartFn(data, chartInfo.formateName)
}

// 曲线图 - by wucp -2020年1月12日16:42:03
export const line1 = (data = []) => {
    if (!data.length) return {};
    const xAxis = [];
    const sourceData = [];
    data.forEach(item => {
        xAxis.push(item.name);
        sourceData.push(item.value);
    });

    return {
        color: ["#ffc637", "#229ae9"],
        grid: {
            top: '10%',
            bottom: '5%',
            left: '3%',
            right: '3%',
            containLabel: true
        },
        tooltip: {
            trigger: "axis",
            textStyle: {
                fontSize: 20,
            },
            axisPointer: {
                type: "cross",
                crossStyle: {
                    color: "#999"
                }
            }
        },
        // legend: {
        //   show: false,
        //   data: ["事件趋势", "安全指数"],
        //   textStyle: {
        //     color: "#03a9f4",
        //     fontSize: 11
        //   }
        // },
        xAxis: [{
            type: "category",
            boundaryGap: false,

            axisPointer: {
                type: "shadow"
            },
            axisLabel: {
                interval: 0,
                rotate: 30,
                color: "#48b5ee",
                fontSize: 9,
                textStyle: {
                    color: '#82c2ff',
                    fontSize: 14,
                },
            },
            data: xAxis
        }],
        yAxis: [{
            name: "",
            type: "value",
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#03a9f4",
                    opacity: 0.5
                }
            },
            splitLine: {
                lineStyle: {
                    color: "#45aee6",
                    opacity: 0.2
                }
            },
            axisLabel: {
                color: "#48b5ee",
                fontSize: 9,
                textStyle: {
                    color: '#82c2ff',
                    fontSize: 14,
                },
            }
        }],
        series: [{
            name: "总数",
            type: "line",
            smooth: true,
            data: data
        }]
    };
};

/**
 * 曲线图 - by wucp -2020年1月12日16:42:03
 * @param data
 * @returns {{}|{yAxis: [{axisLabel: {color: string, fontSize: number, textStyle: {color: string, fontSize: number}}, axisLine: {lineStyle: {color: string, opacity: number}}, name: string, axisTick: {show: boolean}, splitLine: {lineStyle: {color: string, opacity: number}}, type: string}], xAxis: [{axisLabel: {rotate: number, color: string, interval: number, fontSize: number, textStyle: {color: string, fontSize: number}}, data: [], axisPointer: {type: string}, type: string, boundaryGap: boolean}], color: [string, string], grid: {top: string, left: string, bottom: string, right: string, containLabel: boolean}, series: [{data: *[], name: string, type: string, smooth: boolean}], tooltip: {axisPointer: {crossStyle: {color: string}, type: string}, trigger: string, textStyle: {fontSize: number}}}}
 */
echartMap.line1 = function (data = []) {
    return line1(data)
}

/**
 * 地图
 * @param data
 * @returns {{}|{yAxis: [{axisLabel: {color: string, fontSize: number, textStyle: {color: string, fontSize: number}}, axisLine: {lineStyle: {color: string, opacity: number}}, name: string, axisTick: {show: boolean}, splitLine: {lineStyle: {color: string, opacity: number}}, type: string}], xAxis: [{axisLabel: {rotate: number, color: string, interval: number, fontSize: number, textStyle: {color: string, fontSize: number}}, data: [], axisPointer: {type: string}, type: string, boundaryGap: boolean}], color: [string, string], grid: {top: string, left: string, bottom: string, right: string, containLabel: boolean}, series: [{data: *[], name: string, type: string, smooth: boolean}], tooltip: {axisPointer: {crossStyle: {color: string}, type: string}, trigger: string, textStyle: {fontSize: number}}}}
 */
export const mapChart = (data = [], geo = false) => {
    if (!data.length) return {};
    // geoCoordMap


    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        console.log("res", res);
        return res;
    };
    let max = 0;
    for (let i in data) {
        if (Number(data[i].value) > max) {
            max = Number(data[i].value);
        }
    }


    let mapObject = {
        tooltip: {
            trigger: 'item',
            formatter(params) {
                return params.name + '：' + (params.data ? params.data['value'] : '')
            }
        },
        visualMap: {
            show: true,
            type: 'continuous',
            splitNumber: 3,
            min: 0,
            max: max,
            itemWidth: '15px',
            itemHeight: '70px',
            left: '75px',
            bottom: '290px',
            inverse: false,
            orient: 'vertical',
            calculable: true,
            inRange: {
                //color: ['rgba(14,38,88,0.50196)', 'rgba(7,70,154,0.75)', 'rgb(91,193,213)']
                color: ['#7de8ff', '#1c94ff', '#feb438', '#fa571d']
            },
            textStyle: {
                color: '#2091fa'
            },
            padding: [15, 15],
            backgroundColor: 'rgba(4, 28, 63, .1)',
            borderColor: 'rgb(49, 157, 255)',
            borderWidth: 1
        },
        series: [{
            type: 'map',
            mapType: 'china',
            roam: false,
            label: {
                show: false
            },
            itemStyle: {
                normal: {
                    borderColor: '#043262',
                    borderWidth: 1,
                    shadowColor: 'rgb(119, 232, 243)',
                    shadowBlur: 3
                }
            },
            emphasis: {
                itemStyle: {
                    areaColor: 'rgba(29, 255, 194, 0.3)'
                }
            },
            data: data
        }],
        geo: {
            map: 'china',
            roam: false,
            zlevel: 0,
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    areaColor: 'rgba(7, 67, 147, 0)',
                    borderColor: 'rgba(7, 67, 147, 0)',
                    shadowColor: 'rgba(84, 177, 199, 1)',
                    shadowBlur: 5
                },
                emphasis: {
                    areaColor: 'rgba(7, 67, 147, 0)'
                }
            }
        }
    };

    // if (geo == true) {
    //     mapObject.series.push({
    //         name: "点",
    //         type: "scatter",
    //         coordinateSystem: "geo",
    //         symbol: "pin", //气泡
    //         symbolSize: 50,
    //         label: {
    //             normal: {
    //                 show: true,
    //                 formatter: function (params) {
    //                     return params.data.value[2];
    //                     //return ' '
    //                 },
    //                 textStyle: {
    //                     color: "#fff",
    //                     fontSize: 12
    //                 }
    //             }
    //         },
    //         itemStyle: {
    //             normal: {
    //                 color: function (params) {
    //                     var tmp = params.data.value[2];
    //                     //   console.log(tmp);
    //                     if (tmp < 40) {
    //                         return "#fd8923";
    //                     } else {
    //                         return "#ff420f";
    //                     }
    //                 } //标志颜色
    //             }
    //         },
    //         zlevel: 3,
    //         data: convertData(data)
    //     })
    // }
    return mapObject;
};
echartMap.mapChart = function (data = [], geo = false) {
    return mapChart(data, geo)
}

/**
 * 省份地图，默认江苏
 * @param data
 * @param provinceName
 * @returns {string|{series: [{data: *[], mapType: string, itemStyle: {normal: {borderColor: string, label: {show: boolean, textStyle: {color: string, fontSize: number}}}, emphasis: {areaColor: string}}, zoom: number, type: string, roam: boolean}], tooltip: {formatter(*): string, trigger: string}, visualMap: {inverse: boolean, padding: number[], backgroundColor: string, borderColor: string, orient: string, max: number, calculable: boolean, bottom: string, itemHeight: string, show: boolean, splitNumber: number, type: string, inRange: {color: [string, string, string]}, min: number, left: string, borderWidth: number, itemWidth: string, textStyle: {color: string}}}}
 */
echartMap.provinceMap = (data = [], chartInfo) => {
    // 使用配置文件指定的省份
    // provinceName = setting.caiot.provinceName
    let provinceName = chartInfo.provinceName || '江苏'

    let max = 0
    for (let i in data) {
        if (Number(data[i]['value']) > max) {
            max = Number(data[i]['value'])
        }
    }

    let option = {
        tooltip: {
            trigger: 'item',
            formatter(params) {
                if(!isNaN(params.value)){
                    // console.log('tooltip:', params)
                    return params.name + ': ' + params.value
                }
            },
        },
        visualMap: {
            show: true,
            type: 'continuous',
            splitNumber: 3,
            min: 0,
            max: max,
            itemWidth: '15px',
            itemHeight: '70px',
            left: '30px',
            bottom: '80px',
            inverse: false,
            orient: 'vertical',
            calculable: true,
            inRange: {
                //color: ['rgba(14,38,88,0.50196)', 'rgba(7,70,154,0.75)', 'rgb(91,193,213)']
                // color: ['#1972c5', '#3da0fd', '#ffc342', '#fe7e3f']
                color: ["#083e4c", "#3783b8"]
            },
            textStyle: {
                color: '#2091fa'
            },
            padding: [15, 15],
            backgroundColor: 'rgba(4, 28, 63, .1)',
            borderColor: 'rgb(49, 157, 255)',
            borderWidth: 1
        },
        /*geo: {//这层地图是阴影效果
            map: this.provinceName,
            roam: false,
            zoom: 1.2,
            zlevel: 0,
            top: '70px',
            //center: [112.5, 27.3],
            label:{
                emphasis: {
                    show: false,
                },
            },
            itemStyle: {
                normal: {
                    areaColor: '#0b4c96',
                },
                emphasis: {
                    areaColor: '#0b4c96',
                }
            }
        },*/
        series: [{
            type: 'map',
            mapType: provinceName,
            roam: false,
            zoom: 1.2,
            //center: [112.5, 27.3],
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        textStyle: {
                            fontSize: 16,
                            color: 'rgba(255,255,255,.8)',
                        },
                    },
                    borderColor: '#5eccff',
                },
                emphasis: {
                    areaColor: '#00ffde'
                }
            },
            data: data
        }]
    }
    return option
}

/**
 * 柱状图地图（通用型，无需底图背景）
 * @param data
 * @param chartInfo
 * @returns {string|{geo: [{aspectScale: number, layoutSize: string, emphasis: {itemStyle: {areaColor: string}, label: {color: string, show: number}}, itemStyle: {normal: {borderColor: string, areaColor: {x: number, y: number, y2: number, x2: number, global: boolean, colorStops: [{offset: number, color: string}, {offset: number, color: string}], type: string}, borderWidth: number}, emphasis: {areaColor: {x: number, y: number, y2: number, x2: number, global: boolean, colorStops: [{offset: number, color: string}, {offset: number, color: string}], type: string}}}, zoom: number, zlevel: number, roam: boolean, map: (string|*), layoutCenter: string[]}, {silent: boolean, aspectScale: number, layoutSize: string, itemStyle: {normal: {borderColor: string, shadowOffsetY: number, shadowBlur: number, areaColor: string, borderWidth: number, shadowColor: string}}, zoom: number, zlevel: number, roam: boolean, map: (string|*), layoutCenter: string[]}, {silent: boolean, aspectScale: number, layoutSize: string, itemStyle: {borderColor: string, areaColor: string, borderWidth: number}, zoom: number, zlevel: number, roam: boolean, map: (string|*), layoutCenter: string[]}], series: [{geoIndex: number, data: *[], itemStyle: {normal: {borderColor: string, areaColor: string, borderWidth: number}, emphasis: {color: string, areaColor: string, borderWidth: number}}, label: {normal: {show: boolean, textStyle: {color: string}}, emphasis: {show: boolean, textStyle: {color: string}}}, type: string, roam: boolean, showLegendSymbol: boolean, map: (string|*)}, {silent: boolean, lineStyle: {curveness: number, color: {x: number, y: number, y2: number, x2: number, global: boolean, colorStops: [{offset: number, color: string}, {offset: number, color: string}, {offset: number, color: string}, {offset: number, color: string}, {offset: number, color: string}], type: string}, width: number, opacity: number}, data: {coords}[], effect: {symbolSize: number, show: boolean}, zlevel: number, label: {formatter: string, show: number, position: string}, type: string}, {geoIndex: number, symbol: string, silent: boolean, data: (*|number)[][], symbolSize: number[], itemStyle: {color: string, opacity: number}, zlevel: number, coordinateSystem: string, label: {formatter: (function(*): *), padding: number[], backgroundColor: string, borderColor: string, borderRadius: number, color: string, borderWidth: number, show: boolean, position: string}, type: string}, {geoIndex: number, symbol: string, silent: boolean, data: {name: *, value: *}[], symbolSize: number[], itemStyle: {color: {x: number, y: number, y2: number, x2: number, global: boolean, colorStops: [{offset: number, color: string}, {offset: number, color: string}, {offset: number, color: string}, {offset: number, color: string}, {offset: number, color: string}], type: string}, opacity: number}, zlevel: number, coordinateSystem: string, label: {formatter: string, color: string, distance: number, show: boolean, fontSize: number, position: string}, type: string}], tooltip: {formatter(*): (string|undefined), backgroundColor: string, enterable: boolean, show: boolean, trigger: string, textStyle: {color: string, fontSize: number}}}}
 */
echartMap.barMap = (data=[], chartInfo)=>{
    // 使用配置文件指定的省份
    // provinceName = setting.caiot.provinceName
    let provinceName = chartInfo.provinceName || '江苏'

    /*var geoCoordMap = {
        // 广州市: [113.507649675, 23.3200491021],
        // 东莞市: [113.863433991, 22.9430238154],
        // 中山市: [113.422060021, 22.5451775145],
        // 云浮市: [111.750945959, 22.9379756855],
        // 佛山市: [113.034025635, 23.0350948405],
        // 惠州市: [114.41065808, 23.1135398524],
        // 揭阳市: [116.079500855, 23.3479994669],
        // 梅州市: [116.126403098, 24.304570606],
        // 汕头市: [116.588650288, 23.2839084533],
        // 汕尾市: [115.572924289, 22.9787305002],
        // 江门市: [112.678125341, 22.2751167835],
        // 河源市: [114.913721476, 23.9572508505],
        // 深圳市: [114.025973657, 22.5960535462],
        // 清远市: [113.040773349, 23.9984685504],
        // 湛江市: [110.165067263, 21.2574631038],
        // 潮州市: [116.830075991, 23.7618116765],
        // 珠海市: [113.262447026, 22.1369146461],
        // 肇庆市: [112.37965337, 23.5786632829],
        // 茂名市: [110.931245331, 21.9682257188],
        // 阳江市: [111.777009756, 21.9715173045],
        // 韶关市: [113.594461107, 24.8029603119],
        // 江西: ["115.89", "28.68"],
        南昌市: ["115.89", "28.68"],
        景德镇市: ["117.21", "29.29"],
        萍乡市: ["113.85", "27.62"],
        九江市: ["115.99", "29.71"],
        新余市: ["114.93", "27.81"],
        鹰潭市: ["117.03", "28.24"],
        赣州市: ["114.94", "25.85"],
        吉安市: ["114.99", "27.11"],
        宜春市: ["114.39", "27.80"],
        抚州市: ["116.36", "27.98"],
        上饶市: ["117.97", "28.44"],
    }*/
    var customerBatteryCityData = data
        /*var customerBatteryCityData = [
            {name: "南昌市", value: 10},
            {name: "景德镇市", value: 20},
            {name: "萍乡市", value: 70},
            {name: "九江市", value: 10},
            {name: "新余市", value: 120},
            {name: "鹰潭市", value: 70},
            {name: "赣州市", value: 70},
            {name: "吉安市", value: 0},
            {name: "宜春市", value: 70},
            {name: "抚州市", value: 10},
            {name: "上饶市", value: 70},
            // {name: "惠州市", value: 150},
            // {name: "汕头市", value: 60},
            // {name: "揭阳市", value: 80},
            // {name: "中山市", value: 70},
            // {name: "肇庆市", value: 70},
            // {name: "珠海市", value: 0},
            // {name: "汕尾市", value: 0},
            // {name: "江门市", value: 70},
            // {name: "梅州市", value: 70},
            // {name: "佛山市", value: 10}
        ]*/
    // 动态计算柱形图的高度（定一个max）
    function lineMaxHeight () {
        const maxValue = Math.max(...customerBatteryCityData.map(item => item.value))
        return 0.3/maxValue
    }
    // 柱状体的主干
    function lineData () {
        return customerBatteryCityData.map((item) => {
            // console.log(['lineData:',geoCoordMap[item.name], [geoCoordMap[item.name][0], Number(geoCoordMap[item.name][1]) + item.value * lineMaxHeight()]])
            if(!geoCoordMap[item.name]){
                console.log('地图缺失经纬度信息：', item.name)
            }
            return {
                coords: [geoCoordMap[item.name], [geoCoordMap[item.name][0], Number(geoCoordMap[item.name][1]) + item.value * lineMaxHeight()]]
            }
        })
    }
    // 柱状体的顶部
    function scatterData () {
        return customerBatteryCityData.map((item) => {
            return [geoCoordMap[item.name][0], Number(geoCoordMap[item.name][1]) + item.value * lineMaxHeight()]
        })
    }
    // 柱状体的底部
    function scatterData2 () {
        return customerBatteryCityData.map((item) => {
            return {
                name: item.name,
                value: geoCoordMap[item.name]
            }
        })
    }
    let zoom = chartInfo.zoom?chartInfo.zoom:0.85
    let option = {
        // backgroundColor: '#131C38',
        tooltip: {
            // borderWidth: 0,
            trigger: 'item',
            show: true,
            enterable: true,
            textStyle:{
                fontSize:20,
                color: '#fff'
            },
            backgroundColor: 'rgba(19,71,80,0.7)',
            // formatter: '{b}<br />{c}'
            formatter(params) {
                if(!isNaN(params.value)){
                    // console.log('tooltip:', params)
                    return params.name + '<br />' + params.value
                }
            },
        },
        geo: [
            {
                map: provinceName,
                aspectScale: 0.9,
                roam: false, // 是否允许缩放
                zoom: zoom, // 默认显示级别
                layoutSize: '95%',
                layoutCenter: ['55%', '50%'],
                itemStyle: {
                    normal: {
                        areaColor: {
                            type: 'linear-gradient',
                            x: 0,
                            y: 400,
                            x2: 0,
                            y2: 0,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(37,108,190,0.3)' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(15,169,195,0.3)' // 50% 处的颜色
                            }],
                            global: true // 缺省为 false
                        },
                        borderColor: '#4ecee6',
                        borderWidth: 1
                    },
                    emphasis: {
                        areaColor: {
                            type: 'linear-gradient',
                            x: 0,
                            y: 300,
                            x2: 0,
                            y2: 0,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(37,108,190,1)' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(15,169,195,1)' // 50% 处的颜色
                            }],
                            global: true // 缺省为 false
                        }
                    }
                },
                emphasis: {
                    itemStyle: {
                        areaColor: '#0160AD'
                    },
                    label: {
                        show: 0,
                        color: '#fff'
                    }
                },
                zlevel: 3
            },
            {
                map: provinceName,
                aspectScale: 0.9,
                roam: false, // 是否允许缩放
                zoom: zoom, // 默认显示级别
                layoutSize: '95%',
                layoutCenter: ['55%', '50%'],
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(192,245,249,.6)',
                        borderWidth: 2,
                        shadowColor: 'green',
                        shadowOffsetY: 0,
                        shadowBlur: 120,
                        areaColor: 'rgba(29,85,139,.2)'
                    }
                },
                zlevel: 2,
                silent: true
            },
            {
                map: provinceName,
                aspectScale: 0.9,
                roam: false, // 是否允许缩放
                zoom: zoom, // 默认显示级别
                layoutSize: '95%',
                layoutCenter: ['55%', '51.5%'],
                itemStyle: {
                    // areaColor: '#005DDC',
                    areaColor: 'rgba(0,27,95,0.4)',
                    borderColor: '#004db5',
                    borderWidth: 1
                },
                zlevel: 1,
                silent: true
            }
        ],
        series: [
            {
                geoIndex: 0,
                // coordinateSystem: 'geo',
                showLegendSymbol: true,
                type: 'map',
                roam: true,
                label: {
                    normal: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },

                itemStyle: {
                    normal: {
                        borderColor: '#2ab8ff',
                        borderWidth: 1.5,
                        areaColor: '#12235c'
                    },
                    emphasis: {
                        areaColor: '#2AB8FF',
                        borderWidth: 0,
                        color: 'red'
                    }
                },
                map: provinceName, // 使用
                data: customerBatteryCityData
                // data: this.difficultData //热力图数据   不同区域 不同的底色
            },
            {
                type: 'lines',
                zlevel: 5,
                effect: {
                    show: false,
                    // period: 4, //箭头指向速度，值越小速度越快
                    // trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                    // symbol: 'arrow', //箭头图标
                    // symbol: imgDatUrl,
                    symbolSize: 5 // 图标大小
                },
                lineStyle: {
                    width: 17, // 尾迹线条宽度
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgb(199,145,41)' // 0% 处的颜色
                            },
                            {
                                offset: 0.5,
                                color: 'rgb(199,145,41)' // 0% 处的颜色
                            },
                            {
                                offset: 0.5,
                                color: 'rgb(223,176,32)' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgb(223,176,32)' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgb(199,145,41)' // 100% 处的颜色
                            }
                        ],
                        global: false // 缺省为 false
                    },
                    opacity: 1, // 尾迹线条透明度
                    curveness: 0 // 尾迹线条曲直度
                },
                label: {
                    show: 0,
                    position: 'end',
                    formatter: '245'
                },
                silent: true,
                data: lineData()
            },
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                geoIndex: 0,
                zlevel: 5,
                label: {
                    show: false,
                    position: 'bottom',
                    formatter: (params) => this.data[params.dataIndex].value,
                    padding: [4, 8],
                    backgroundColor: '#003F5E',
                    borderRadius: 5,
                    borderColor: '#67F0EF',
                    borderWidth: 1,
                    color: '#67F0EF'
                },
                symbol: 'diamond',
                symbolSize: [17, 8],
                itemStyle: {
                    color: '#ffd133',
                    opacity: 1
                },
                silent: true,
                data: scatterData()
            },
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                geoIndex: 0,
                zlevel: 4,
                label: {
                    formatter: '{b}',
                    position: 'bottom',
                    color: '#fff',
                    fontSize: 12,
                    distance: 10,
                    show: true
                },
                symbol: 'diamond',
                symbolSize: [17, 8],
                itemStyle: {
                    // color: '#F7AF21',
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgb(199,145,41)' // 0% 处的颜色
                            },
                            {
                                offset: 0.5,
                                color: 'rgb(199,145,41)' // 0% 处的颜色
                            },
                            {
                                offset: 0.5,
                                color: 'rgb(223,176,32)' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgb(223,176,32)' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgb(199,145,41)' // 100% 处的颜色
                            }
                        ],
                        global: false // 缺省为 false
                    },
                    opacity: 1
                    // shadowColor: '#fff',
                    // shadowBlur: 5,
                    // shadowOffsetY: 2
                },
                silent: true,
                data: scatterData2()
            }
            // {
            //   type: 'effectScatter',
            //   coordinateSystem: 'geo',
            //   geoIndex: 0,
            //   symbol: 'circle',
            //   symbolSize: 4,
            //   showEffectOn: 'render',
            //   rippleEffect: {
            //     brushType: 'fill',
            //     scale: 10
            //   },
            //   hoverAnimation: true,
            //   label: {
            //     // formatter: (p) => {
            //     //   console.log(p, 99999)
            //     //   return p.data[2]
            //     // },
            //     formatter: '{b}',
            //     position: 'bottom',
            //     color: '#fff',
            //     fontSize: 14,
            //     distance: 10,
            //     show: true
            //   },
            //   itemStyle: {
            //     color: '#bacac6'
            //   },
            //   zlevel: 5,
            //   data: this.scatterData2
            // }
        ]
    }
    return option;
}

/**
 * 转换地图数据地名后缀，类似重庆地名木有规律这种 ~~~
 * @param data 数据
 * @param provinceName 省名
 * @returns {*}
 */
let convertMapDataSuffix = function(data, provinceName){
    // 浅克隆
    data = data.slice(0)
    if(provinceName == '重庆'){
        for(let i in data){
            // 移除后缀‘市’
            data[i].name = _.trimEnd(data[i].name, '市')
        }
    }else if(provinceName == '上海'){
        for(let i in data){
            // 移除后缀‘市’
            data[i].name = _.trimEnd(data[i].name, '市')
            if( !_.endsWith(data[i].name, '区') ){
                data[i].name += "区"
            }
        }
    }
    return data
}

/**
 * 江西专用-柱状图地图（含底图背景）
 * @param data
 * @param chartInfo
 * @returns {string|{geo: [{aspectScale: number, layoutSize: string, emphasis: {itemStyle: {areaColor: string}, label: {color: string, show: number}}, itemStyle: {normal: {borderColor: string, areaColor: {x: number, y: number, y2: number, x2: number, global: boolean, colorStops: [{offset: number, color: string}, {offset: number, color: string}], type: string}, borderWidth: number}, emphasis: {areaColor: {x: number, y: number, y2: number, x2: number, global: boolean, colorStops: [{offset: number, color: string}, {offset: number, color: string}], type: string}}}, zoom: number, zlevel: number, roam: boolean, map: (string|*), layoutCenter: string[]}, {silent: boolean, aspectScale: number, layoutSize: string, itemStyle: {normal: {borderColor: string, shadowOffsetY: number, shadowBlur: number, areaColor: string, borderWidth: number, shadowColor: string}}, zoom: number, zlevel: number, roam: boolean, map: (string|*), layoutCenter: string[]}, {silent: boolean, aspectScale: number, layoutSize: string, itemStyle: {borderColor: string, areaColor: string, borderWidth: number}, zoom: number, zlevel: number, roam: boolean, map: (string|*), layoutCenter: string[]}], series: [{geoIndex: number, data: *[], itemStyle: {normal: {borderColor: string, areaColor: string, borderWidth: number}, emphasis: {color: string, areaColor: string, borderWidth: number}}, label: {normal: {show: boolean, textStyle: {color: string}}, emphasis: {show: boolean, textStyle: {color: string}}}, type: string, roam: boolean, showLegendSymbol: boolean, map: (string|*)}, {silent: boolean, lineStyle: {curveness: number, color: {x: number, y: number, y2: number, x2: number, global: boolean, colorStops: [{offset: number, color: string}, {offset: number, color: string}, {offset: number, color: string}, {offset: number, color: string}, {offset: number, color: string}], type: string}, width: number, opacity: number}, data: {coords}[], effect: {symbolSize: number, show: boolean}, zlevel: number, label: {formatter: string, show: number, position: string}, type: string}, {geoIndex: number, symbol: string, silent: boolean, data: (*|number)[][], symbolSize: number[], itemStyle: {color: string, opacity: number}, zlevel: number, coordinateSystem: string, label: {formatter: (function(*): *), padding: number[], backgroundColor: string, borderColor: string, borderRadius: number, color: string, borderWidth: number, show: boolean, position: string}, type: string}, {geoIndex: number, symbol: string, silent: boolean, data: {name: *, value: *}[], symbolSize: number[], itemStyle: {color: {x: number, y: number, y2: number, x2: number, global: boolean, colorStops: [{offset: number, color: string}, {offset: number, color: string}, {offset: number, color: string}, {offset: number, color: string}, {offset: number, color: string}], type: string}, opacity: number}, zlevel: number, coordinateSystem: string, label: {formatter: string, color: string, distance: number, show: boolean, fontSize: number, position: string}, type: string}], tooltip: {formatter(*): (string|undefined), backgroundColor: string, enterable: boolean, show: boolean, trigger: string, textStyle: {color: string, fontSize: number}}}}
 */
echartMap.jiangXiBarMap = (data=[], chartInfo)=>{
    // 使用配置文件指定的省份
    // provinceName = setting.caiot.provinceName
    let provinceName = chartInfo.provinceName || '江苏'
    // 启用背景纹理
    let enableBackgroundWenLi = chartInfo.enableBackgroundWenLi || false
    // 柱子最大值基数（0-1）
    let maxValueBase = chartInfo.maxValueBase || 0.9

    // 地图缩放功能开关
    let roam = chartInfo.roam || false

    /*var geoCoordMap = {
        // 广州市: [113.507649675, 23.3200491021],
        // 东莞市: [113.863433991, 22.9430238154],
        // 中山市: [113.422060021, 22.5451775145],
        // 云浮市: [111.750945959, 22.9379756855],
        // 佛山市: [113.034025635, 23.0350948405],
        // 惠州市: [114.41065808, 23.1135398524],
        // 揭阳市: [116.079500855, 23.3479994669],
        // 梅州市: [116.126403098, 24.304570606],
        // 汕头市: [116.588650288, 23.2839084533],
        // 汕尾市: [115.572924289, 22.9787305002],
        // 江门市: [112.678125341, 22.2751167835],
        // 河源市: [114.913721476, 23.9572508505],
        // 深圳市: [114.025973657, 22.5960535462],
        // 清远市: [113.040773349, 23.9984685504],
        // 湛江市: [110.165067263, 21.2574631038],
        // 潮州市: [116.830075991, 23.7618116765],
        // 珠海市: [113.262447026, 22.1369146461],
        // 肇庆市: [112.37965337, 23.5786632829],
        // 茂名市: [110.931245331, 21.9682257188],
        // 阳江市: [111.777009756, 21.9715173045],
        // 韶关市: [113.594461107, 24.8029603119],
        // 江西: ["115.89", "28.68"],
        南昌市: ["115.89", "28.68"],
        景德镇市: ["117.21", "29.29"],
        萍乡市: ["113.85", "27.62"],
        九江市: ["115.99", "29.71"],
        新余市: ["114.93", "27.81"],
        鹰潭市: ["117.03", "28.24"],
        赣州市: ["114.94", "25.85"],
        吉安市: ["114.99", "27.11"],
        宜春市: ["114.39", "27.80"],
        抚州市: ["116.36", "27.98"],
        上饶市: ["117.97", "28.44"],
    }*/

    // 转换地图数据地名后缀
    data = convertMapDataSuffix(data, provinceName)

    var customerBatteryCityData = data
    /*var customerBatteryCityData = [
        {name: "南昌市", value: 10},
        {name: "景德镇市", value: 20},
        {name: "萍乡市", value: 70},
        {name: "九江市", value: 10},
        {name: "新余市", value: 120},
        {name: "鹰潭市", value: 70},
        {name: "赣州市", value: 70},
        {name: "吉安市", value: 0},
        {name: "宜春市", value: 70},
        {name: "抚州市", value: 10},
        {name: "上饶市", value: 70},
        // {name: "惠州市", value: 150},
        // {name: "汕头市", value: 60},
        // {name: "揭阳市", value: 80},
        // {name: "中山市", value: 70},
        // {name: "肇庆市", value: 70},
        // {name: "珠海市", value: 0},
        // {name: "汕尾市", value: 0},
        // {name: "江门市", value: 70},
        // {name: "梅州市", value: 70},
        // {name: "佛山市", value: 10}
    ]*/
    // 动态计算柱形图的高度（定一个max）
    function lineMaxHeight () {
        const maxValue = Math.max(...customerBatteryCityData.map(item => item.value))
        return maxValueBase/maxValue
    }
    // 柱状体的主干
    function lineData () {
        let result = []
        let item
        for(let i in customerBatteryCityData){
            item = customerBatteryCityData[i]
            if(!geoCoordMap[item.name]){
                console.log('geoCoordMap[item.name]为空：', item.name)
                continue
            }
            result.push({
                coords: [geoCoordMap[item.name], [geoCoordMap[item.name][0], Number(geoCoordMap[item.name][1]) + item.value * lineMaxHeight()]]
            })
        }
        return result

        /*return customerBatteryCityData.map((item) => {
            // console.log(['lineData:',geoCoordMap[item.name], [geoCoordMap[item.name][0], Number(geoCoordMap[item.name][1]) + item.value * lineMaxHeight()]])
            if(!geoCoordMap[item.name]){
                console.log('geoCoordMap[item.name]为空：', item.name)
            }
            return {
                coords: [geoCoordMap[item.name], [geoCoordMap[item.name][0], Number(geoCoordMap[item.name][1]) + item.value * lineMaxHeight()]]
            }
        })*/
    }
    // 柱状体的顶部
    function scatterData () {
        let result = []
        let item
        for(let i in customerBatteryCityData){
            item = customerBatteryCityData[i]
            if(!geoCoordMap[item.name]){
                console.log('geoCoordMap[item.name]为空：', item.name)
                continue
            }
            result.push([geoCoordMap[item.name][0], Number(geoCoordMap[item.name][1]) + item.value * lineMaxHeight()])
        }
        return result
        /*return customerBatteryCityData.map((item) => {
            return [geoCoordMap[item.name][0], Number(geoCoordMap[item.name][1]) + item.value * lineMaxHeight()]
        })*/
    }
    // 柱状体的底部
    function scatterData2 () {
        return customerBatteryCityData.map((item) => {
            return {
                name: item.name,
                value: geoCoordMap[item.name]
            }
        })
    }
    let zoom = 0.85

    let mapPositionInfo = {
        zoom: 0.9,
        aspectScale: 1.5,
        layoutCenter: ['50%','50%'],
        layoutSize: 800,
    }
    // 自定义地图缩放参数
    if(chartInfo.mapPositionInfo){
        mapPositionInfo = chartInfo.mapPositionInfo
    }

    // 地图轮廓背景图等配置
    let itemStyle = {
        normal: {
            areaColor: {
                type: 'linear-gradient',
                x: 0,
                y: 400,
                x2: 0,
                y2: 0,
                colorStops: [{
                    offset: 0,
                    color: 'rgba(37,108,190,0.1)' // 0% 处的颜色
                }, {
                    offset: 1,
                    color: 'rgba(15,169,195,0.1)' // 50% 处的颜色
                }],
                global: true // 缺省为 false
            },
            borderColor: '#9bf8f9',
            borderWidth: 2
        },
        emphasis: {
            areaColor: {
                type: 'linear-gradient',
                x: 0,
                y: 300,
                x2: 0,
                y2: 0,
                colorStops: [{
                    offset: 0,
                    color: 'rgba(37,108,190,0.5)' // 0% 处的颜色
                }, {
                    offset: 1,
                    color: 'rgba(15,169,195,0.5)' // 50% 处的颜色
                }],
                global: true // 缺省为 false
            }
        }
    }
    if(enableBackgroundWenLi){
        var domImg = document.createElement('img');
        domImg.style.height = domImg.height = domImg.width = domImg.style.width = '8px';
        domImg.src =
          '/image/shandong/img/charts/dash.jpg';

        var domImgHover = document.createElement('img');
        domImgHover.style.height = domImgHover.height = domImgHover.width = domImgHover.style.width = '8px';
        domImgHover.src =
          '/image/shandong/img/charts/dash_hover.jpg';

        itemStyle = {
            normal: {
                areaColor: {
                    image: domImg,
                    repeat: 'repeat',
                },
                borderColor: '#9bf8f9',
                borderWidth: 2
            },
            emphasis: {
                areaColor: {
                    image: domImgHover,
                    repeat: 'repeat',
                },
            }
        }
    }


    let option = {
        // backgroundColor: '#131C38',
        tooltip: {
            // borderWidth: 0,
            trigger: 'item',
            show: true,
            enterable: true,
            textStyle:{
                fontSize:20,
                color: '#fff'
            },
            backgroundColor: 'rgba(19,71,80,0.7)',
            // formatter: '{b}<br />{c}'
            formatter(params) {
                if(!isNaN(params.value)){
                    // console.log('tooltip:', params)
                    return params.name + '<br />' + params.value
                }
                return params.name
            },
        },
        geo: [
            {
                map: provinceName,
                //aspectScale: 0.9,
                roam: roam, // 是否允许缩放
                //zoom: zoom, // 默认显示级别
                //layoutSize: '95%',
                //layoutCenter: ['55%', '50%'],

                ...mapPositionInfo,

                itemStyle: itemStyle,
                emphasis: {
                    itemStyle: {
                        areaColor: '#0160AD'
                    },
                    label: {
                        show: 0,
                        color: '#fff'
                    }
                },
                zlevel: 3
            },
            /*{
                map: provinceName,
                //aspectScale: 0.9,
                roam: false, // 是否允许缩放
                //zoom: zoom, // 默认显示级别
                //layoutSize: '95%',
                //layoutCenter: ['55%', '50%'],

                ...mapPositionInfo,

                itemStyle: {
                    normal: {
                        borderColor: 'rgba(192,245,249,1)',
                        borderWidth: 2,
                        shadowColor: 'green',
                        shadowOffsetY: 0,
                        shadowBlur: 120,
                        areaColor: 'rgba(29,85,139,0)'
                    }
                },
                zlevel: 2,
                silent: true
            },*/
            // 背景伪阴影
            /*{
                map: provinceName,
                aspectScale: 0.9,
                roam: false, // 是否允许缩放
                zoom: zoom, // 默认显示级别
                layoutSize: '95%',
                layoutCenter: ['55%', '51.5%'],
                itemStyle: {
                    // areaColor: '#005DDC',
                    areaColor: 'rgba(0,27,95,0.4)',
                    borderColor: '#004db5',
                    borderWidth: 1
                },
                zlevel: 1,
                silent: true
            }*/
        ],
        series: [
            {
                geoIndex: 0,
                // coordinateSystem: 'geo',
                showLegendSymbol: true,
                type: 'map',
                roam: true,
                label: {
                    normal: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },

                itemStyle: {
                    normal: {
                        borderColor: '#2ab8ff',
                        borderWidth: 1.5,
                        areaColor: '#12235c'
                    },
                    emphasis: {
                        areaColor: '#2AB8FF',
                        borderWidth: 0,
                        color: 'red'
                    }
                },
                map: provinceName, // 使用
                data: customerBatteryCityData
                // data: this.difficultData //热力图数据   不同区域 不同的底色
            },
            {
                type: 'lines',
                zlevel: 5,
                effect: {
                    show: false,
                    // period: 4, //箭头指向速度，值越小速度越快
                    // trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                    // symbol: 'arrow', //箭头图标
                    // symbol: imgDatUrl,
                    symbolSize: 5 // 图标大小
                },
                lineStyle: {
                    width: 17, // 尾迹线条宽度
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgb(199,145,41)' // 0% 处的颜色
                            },
                            {
                                offset: 0.5,
                                color: 'rgb(199,145,41)' // 0% 处的颜色
                            },
                            {
                                offset: 0.5,
                                color: 'rgb(223,176,32)' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgb(223,176,32)' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgb(199,145,41)' // 100% 处的颜色
                            }
                        ],
                        global: false // 缺省为 false
                    },
                    opacity: 1, // 尾迹线条透明度
                    curveness: 0 // 尾迹线条曲直度
                },
                label: {
                    show: 0,
                    position: 'end',
                    formatter: '245'
                },
                silent: true,
                data: lineData()
            },
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                geoIndex: 0,
                zlevel: 5,
                label: {
                    show: false,
                    position: 'bottom',
                    formatter: (params) => this.data[params.dataIndex].value,
                    padding: [4, 8],
                    backgroundColor: '#003F5E',
                    borderRadius: 5,
                    borderColor: '#67F0EF',
                    borderWidth: 1,
                    color: '#67F0EF'
                },
                symbol: 'diamond',
                symbolSize: [17, 8],
                itemStyle: {
                    color: '#ffd133',
                    opacity: 1
                },
                silent: true,
                data: scatterData()
            },
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                geoIndex: 0,
                zlevel: 4,
                label: {
                    formatter: '{b}',
                    position: 'bottom',
                    padding: [5,10,2,10],
                    color: '#fff',
                    borderWidth: 1,
                    borderColor: '#fff',
                    backgroundColor: '#0e384a',
                    fontSize: 12,
                    distance: 10,
                    show: true
                },
                /*label:{
                    normal: {
                        show: true,
                        padding: [5,10,2,10],
                        color: '#fff',
                        borderWidth: 1,
                        borderColor: '#fff',
                        backgroundColor: '#0e384a'
                    },
                    emphasis: {
                        color: '#fff',
                    }
                },*/
                symbol: 'diamond',
                symbolSize: [17, 8],
                itemStyle: {
                    // color: '#F7AF21',
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgb(199,145,41)' // 0% 处的颜色
                            },
                            {
                                offset: 0.5,
                                color: 'rgb(199,145,41)' // 0% 处的颜色
                            },
                            {
                                offset: 0.5,
                                color: 'rgb(223,176,32)' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgb(223,176,32)' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgb(199,145,41)' // 100% 处的颜色
                            }
                        ],
                        global: false // 缺省为 false
                    },
                    opacity: 1
                    // shadowColor: '#fff',
                    // shadowBlur: 5,
                    // shadowOffsetY: 2
                },
                silent: true,
                data: scatterData2()
            }
            // {
            //   type: 'effectScatter',
            //   coordinateSystem: 'geo',
            //   geoIndex: 0,
            //   symbol: 'circle',
            //   symbolSize: 4,
            //   showEffectOn: 'render',
            //   rippleEffect: {
            //     brushType: 'fill',
            //     scale: 10
            //   },
            //   hoverAnimation: true,
            //   label: {
            //     // formatter: (p) => {
            //     //   console.log(p, 99999)
            //     //   return p.data[2]
            //     // },
            //     formatter: '{b}',
            //     position: 'bottom',
            //     color: '#fff',
            //     fontSize: 14,
            //     distance: 10,
            //     show: true
            //   },
            //   itemStyle: {
            //     color: '#bacac6'
            //   },
            //   zlevel: 5,
            //   data: this.scatterData2
            // }
        ]
    }
    return option;
}

echartMap.flyLinesMap = (data=[], chartInfo)=>{
    let provinceName = chartInfo.provinceName || 'china'

    var geoCoordMap = {
        // 北京
        '海淀区': [116.329519, 39.972134],
        '东城区': [116.416357, 39.928353],
        '丰台区': [116.287149, 39.858427],
        '大兴区': [116.341014, 39.784747],
        '密云区': [116.843177, 40.376834],
        '平谷区': [117.121383, 40.140701],
        '延庆区': [115.974848, 40.456951],
        '怀柔区': [116.642349, 40.315704],
        '房山区': [116.143267, 39.749144],
        '昌平区': [116.231204, 40.220660],
        '朝阳区': [116.601144, 39.948574],
        '石景山区': [116.222982, 39.906611],
        '西城区': [116.365868, 39.912289],
        '通州区': [116.656435, 39.909946],
        '门头沟区': [116.102009, 39.940646],
        '顺义区': [116.654561, 40.130347],
    };
    var BJData = [
        [{name:'大兴区'}, {name:'昌平区',value:95}],
        [{name:'房山区'}, {name:'昌平区',value:120}],
        [{name:'朝阳区'}, {name:'昌平区',value:95}],
        [{name:'平谷区'}, {name:'昌平区',value:95}]
    ];

    var SHData = [
        [{name:'西城区'}, {name:'昌平区',value:95}],
          [{name:'密云区'}, {name:'昌平区',value:95}]
    ];

    var GZData = [
        // [{name:'朝阳区'}, {name:'昌平区',value:95}],
        // [{name:'平谷区'}, {name:'昌平区',value:95}]
    ];

    // var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

    var convertData = function (data) {
        console.log(data);
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord],
                    value: dataItem[1].value
                });
            }
        }
        return res;
    };

    var color = ['#ff6246', '#fdf71a', '#f858aa'];
    var series = [];
    [['数据', BJData], ['数据源', SHData], ['节点', GZData]].forEach(function (item, i) {
        //console.log(item,i);
        series.push(
          {
              name: item[0],
              type: 'lines',
              zlevel: 1,
              effect: {
                  show: true,
                  period: 6,
                  trailLength: 0.7,
                  color: '#fff',
                  symbolSize: 3
              },
              lineStyle: {
                  normal: {
                      color: color[i],
                      width: 2,
                      curveness: 0.2
                  }
              },
              data: convertData(item[1])
          },
          {
              name: item[0],
              type: 'lines',
              zlevel: 2,
              symbol: ['none', 'arrow'],
              symbolSize: 10,
              effect: {
                  show: true,
                  period: 6,
                  trailLength: 0,
                  // symbol: planePath,
                  symbol: 'arrow',
                  symbolSize: 10
              },
              lineStyle: {
                  normal: {
                      color: color[i],
                      width: 1,
                      opacity: 0.6,
                      curveness: 0.2
                  }
              },
              data: convertData(item[1])
          },
          {
              name: item[0],
              type: 'effectScatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              rippleEffect: {
                  brushType: 'stroke'
              },
              label: {
                  normal: {
                      show: true,
                      position: 'right',
                      formatter: '{b}'
                  }
              },
              symbolSize: function (val) {
                  return val[2] / 8;
              },
              itemStyle: {
                  normal: {
                      color: color[i]
                  }
              },
              data: item[1].map(function (dataItem) {
                  return {
                      name: dataItem[1].name,
                      value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                  };
              })
          },
          {
              name: item[0],
              type: 'effectScatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              rippleEffect: {
                  brushType: 'stroke'
              },
              label: {
                  normal: {
                      show: true,
                      position: 'right',
                      formatter: '{b}'
                  }
              },
              symbolSize: function (val) {
                  return val[2] / 8;
              },
              itemStyle: {
                  normal: {
                      color: color[i]
                  }
              },
              data: item[1].map(function (dataItem) {
                  return {
                      name: dataItem[0].name,
                      value: geoCoordMap[dataItem[0].name].concat([dataItem[1].value])
                  };
              })
          }
          );
    });
    console.log(series)

    let option = {
        // backgroundColor: '#404a59',
        /*title : {
            text: 'China Southern Airlines 2018',
            subtext: 'Beijing, Shanghai, Guangzhou travel TOP10 Cities',
            left: 'center',
            textStyle : {
                color: '#fff'
            }
        },*/
        tooltip : {
            trigger: 'item',
            formatter:function(params, ticket, callback){
                console.log(params);
                if(params.seriesType=="effectScatter") {
                    return ""+params.data.name+"<br/>"+params.data.value[2];
                }else if(params.seriesType=="lines"){
                    return params.data.fromName+">"+params.data.toName+"<br />"+params.data.value;
                }else{
                    return params.name;
                }
            }
        },
        legend: {
            show: false,
            orient: 'vertical',
            top: 'bottom',
            right: '20px',
            data:['数据', '数据源', '节点'],
            textStyle: {
                color: '#fff'
            },
            selectedMode: 'multiple',
        },
        geo: {
            map: provinceName,
            label: {
                emphasis: {
                    show: true,
                    color:'#fff'
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: {
                        type: 'linear-gradient',
                        x: 0,
                        y: 400,
                        x2: 0,
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(37,108,190,0.3)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(15,169,195,0.3)' // 50% 处的颜色
                        }],
                        global: true // 缺省为 false
                    },
                    borderColor: '#4ecee6',
                    borderWidth: 1
                },
                emphasis: {
                    areaColor: {
                        type: 'linear-gradient',
                        x: 0,
                        y: 300,
                        x2: 0,
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(37,108,190,1)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(15,169,195,1)' // 50% 处的颜色
                        }],
                        global: true // 缺省为 false
                    }
                }
            },
            emphasis: {
                itemStyle: {
                    areaColor: '#0160AD'
                },
                label: {
                    show: 0,
                    color: '#fff'
                }
            },
        },
        series: series
    };
    return option;
}

echartMap.flyLinesMapForChinaMobile = (data=[], chartInfo)=>{
    let provinceName = chartInfo.provinceName || 'china'

    var geoCoordMap = {
        // 北京
        '海淀区': [116.329519, 39.972134],
        '东城区': [116.416357, 39.928353],
        '丰台区': [116.287149, 39.858427],
        '大兴区': [116.341014, 39.784747],
        '密云区': [116.843177, 40.376834],
        '平谷区': [117.121383, 40.140701],
        '延庆区': [115.974848, 40.456951],
        '怀柔区': [116.642349, 40.315704],
        '房山区': [116.143267, 39.749144],
        '昌平区': [116.231204, 40.220660],
        '朝阳区': [116.601144, 39.948574],
        '石景山区': [116.222982, 39.906611],
        '西城区': [116.365868, 39.912289],
        '通州区': [116.656435, 39.909946],
        '门头沟区': [116.102009, 39.940646],
        '顺义区': [116.654561, 40.130347],

        '东直门机房': [116.426319,39.941823],
        '望京机房': [116.471323,40.021592],
        '三台机房（朝阳东坝）': [116.548703,39.959982],
        '昌平机房': [116.232533,40.205443],
        '亦庄机房': [116.564135,39.825658],
        '大白楼机房': [116.362053,39.774385],
        '菜市口机房': [116.374425,39.889297],
    };
    var BJData = [
        [{name:'望京机房'}, {name:'东直门机房',value:95}],
        [{name:'三台机房（朝阳东坝）'}, {name:'东直门机房',value:120}],
        [{name:'昌平机房'}, {name:'东直门机房',value:95}],
        [{name:'亦庄机房'}, {name:'东直门机房',value:95}]
    ];

    var SHData = [
        [{name:'大白楼机房'}, {name:'东直门机房',value:95}],
        [{name:'菜市口机房'}, {name:'东直门机房',value:95}]
    ];

    var GZData = [
        // [{name:'朝阳区'}, {name:'昌平区',value:95}],
        // [{name:'平谷区'}, {name:'昌平区',value:95}]
    ];

    // var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

    var convertData = function (data) {
        console.log(data);
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord],
                    value: dataItem[1].value
                });
            }
        }
        return res;
    };

    var color = ['#ff6246', '#fdf71a', '#f858aa'];
    var series = [];
    [['数据', BJData], ['数据源', SHData], ['节点', GZData]].forEach(function (item, i) {
        //console.log(item,i);
        series.push(
            {
                name: item[0],
                type: 'lines',
                zlevel: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: '#fff',
                    symbolSize: 3
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 2,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0],
                type: 'lines',
                zlevel: 2,
                symbol: ['none', 'arrow'],
                symbolSize: 10,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    // symbol: planePath,
                    symbol: 'arrow',
                    symbolSize: 10
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 1,
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0],
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                symbolSize: function (val) {
                    return val[2] / 8;
                },
                itemStyle: {
                    normal: {
                        color: color[i]
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            },
            {
                name: item[0],
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                symbolSize: function (val) {
                    return val[2] / 8;
                },
                itemStyle: {
                    normal: {
                        color: color[i]
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[0].name,
                        value: geoCoordMap[dataItem[0].name].concat([dataItem[1].value])
                    };
                })
            }
        );
    });
    console.log(series)

    let option = {
        // backgroundColor: '#404a59',
        /*title : {
            text: 'China Southern Airlines 2018',
            subtext: 'Beijing, Shanghai, Guangzhou travel TOP10 Cities',
            left: 'center',
            textStyle : {
                color: '#fff'
            }
        },*/
        tooltip : {
            trigger: 'item',
            formatter:function(params, ticket, callback){
                console.log(params);
                if(params.seriesType=="effectScatter") {
                    return ""+params.data.name+"<br/>"+params.data.value[2];
                }else if(params.seriesType=="lines"){
                    return params.data.fromName+">"+params.data.toName+"<br />"+params.data.value;
                }else{
                    return params.name;
                }
            }
        },
        legend: {
            show: false,
            orient: 'vertical',
            top: 'bottom',
            right: '20px',
            data:['数据', '数据源', '节点'],
            textStyle: {
                color: '#fff'
            },
            selectedMode: 'multiple',
        },
        geo: {
            map: provinceName,
            label: {
                emphasis: {
                    show: true,
                    color:'#fff'
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: {
                        type: 'linear-gradient',
                        x: 0,
                        y: 400,
                        x2: 0,
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(37,108,190,0.3)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(15,169,195,0.3)' // 50% 处的颜色
                        }],
                        global: true // 缺省为 false
                    },
                    borderColor: '#4ecee6',
                    borderWidth: 1
                },
                emphasis: {
                    areaColor: {
                        type: 'linear-gradient',
                        x: 0,
                        y: 300,
                        x2: 0,
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(37,108,190,1)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(15,169,195,1)' // 50% 处的颜色
                        }],
                        global: true // 缺省为 false
                    }
                }
            },
            emphasis: {
                itemStyle: {
                    areaColor: '#0160AD'
                },
                label: {
                    show: 0,
                    color: '#fff'
                }
            },
        },
        series: series
    };
    return option;
}

echartMap.scatterMap = (data=[], chartInfo)=>{
    let provinceName = chartInfo.provinceName || 'china'
    let zoom = chartInfo.zoom || 1

    var geoCoordMap = {
        // 北京
        '海淀区': [116.329519, 39.972134],
        '东城区': [116.416357, 39.928353],
        '丰台区': [116.287149, 39.858427],
        '大兴区': [116.341014, 39.784747],
        '密云区': [116.843177, 40.376834],
        '平谷区': [117.121383, 40.140701],
        '延庆区': [115.974848, 40.456951],
        '怀柔区': [116.642349, 40.315704],
        '房山区': [116.143267, 39.749144],
        '昌平区': [116.231204, 40.220660],
        '朝阳区': [116.601144, 39.948574],
        '石景山区': [116.222982, 39.906611],
        '西城区': [116.365868, 39.912289],
        '通州区': [116.656435, 39.909946],
        '门头沟区': [116.102009, 39.940646],
        '顺义区': [116.654561, 40.130347],
    };
    var BJData = [
        {name:'大兴区',value:10},
        {name:'平谷区',value:25},
        {name:'密云区',value:30},
        {name:'延庆区',value:40},
        {name:'房山区',value:50},
        {name:'昌平区',value:60},
        {name:'石景山区',value:70},
        {name:'通州区',value:80},
        {name:'顺义区',value:90}
    ];
    BJData.forEach(e=>{
        if(e.value >=0 && e.value <30){
            e.img ='image:///gxb/imgs/makerYellow.png'
        }else if( e.value >=30 && e.value <60){
            e.img = 'image:///gxb/imgs/makerjuse.png'
        }else{
            e.img = 'image:///gxb/imgs/makerRed.png'
        }
    })
    var SHData = [

    ];
    var PTData = [
        {name:'昌平区',value:'联通数据安全管理平台'}
    ];

    var GZData = [

    ];

    var convertData = function (data) {
        console.log(data);
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord],
                    value: dataItem[1].value
                });
            }
        }
        return res;
    };

    var color = ['#a6c84c', '#ffa022', '#46bee9'];
    var series = [];
    [['数据', BJData], ['数据源', SHData], ['节点', GZData], ['平台', PTData]].forEach(function (item, i) {
        console.log(item,i);
        if(item[0] == '平台'){
            series.push(
            {
                name: item[0],
                type: 'scatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    show: false,
                    position: 'right',
                    formatter: '{b}'
                },
                symbol: "image:///gxb/imgs/xing.png",
                /*symbolSize: function (val) {
                    return val[2] / 8;
                },*/
                symbolSize: [25, 25],
                itemStyle: {
                    normal: {
                        color: color[i]
                    }
                },
                data: item[1].map(function (dataItem) {
                    console.log(2222,dataItem)
                    return {
                        name: dataItem.name,
                        value: [116.132204, 40.22066, dataItem.value],//geoCoordMap[dataItem.name].concat([dataItem.value])
                    };
                })
            });
        }else{
            series.push(
                {
                    name: item[0],
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        show: false,
                        position: 'right',
                        formatter: '{b}'
                    },
                    // symbol: "image:///gxb/imgs/blueMarkerSmall.png",
                    /*symbolSize: function (val) {
                        return val[2] / 8;
                    },*/
                    symbol: function (value, params) {
                        return params.data.img;
                    },
                    symbolSize: [18, 31],
                    itemStyle: {
                        normal: {
                            color: color[i]
                        }
                    },
                    data: item[1].map(function (dataItem) {
                        console.log(11111,dataItem)
                        return {
                            name: dataItem.name,
                            value: geoCoordMap[dataItem.name].concat([dataItem.value]),
                            img:dataItem.img
                        };
                    })
                });
        }


    });
    console.log(series)

    let option = {
        // backgroundColor: '#404a59',
        /*title : {
            text: 'China Southern Airlines 2018',
            subtext: 'Beijing, Shanghai, Guangzhou travel TOP10 Cities',
            left: 'center',
            textStyle : {
                color: '#fff'
            }
        },*/
        tooltip : {
            trigger: 'item',
            formatter:function(params, ticket, callback){
                console.log(params);
                if(params.seriesType=="scatter") {

                    if(params.seriesName=='平台'){
                        return params.data.value[2]//`联通数据安全管理平台`

                    }
                    // return "业务系统名称<br/>"+params.data.name+""+params.data.value[2];
                    return `业务系统名称<br/>` +
                      `接入方式：节点用户<br/>接入数据量：100000<br/>告警次数：2`
                }else if(params.seriesType=="lines"){
                    return params.data.fromName+">"+params.data.toName+"<br />"+params.data.value;
                }else{
                    return params.name;
                }
            }
        },
        legend: {
            show: false,
            orient: 'vertical',
            top: 'bottom',
            right: '20px',
            data:['数据', '数据源', '节点'],
            textStyle: {
                color: '#fff'
            },
            selectedMode: 'multiple',
        },
        geo: {
            map: provinceName,
            label: {
                emphasis: {
                    show: true,
                    color:'#fff'
                }
            },
            roam: true,
            zoom: zoom,
            itemStyle: {
                normal: {
                    areaColor: {
                        type: 'linear-gradient',
                        x: 0,
                        y: 400,
                        x2: 0,
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(37,108,190,0.3)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(15,169,195,0.3)' // 50% 处的颜色
                        }],
                        global: true // 缺省为 false
                    },
                    borderColor: '#4ecee6',
                    borderWidth: 1
                },
                emphasis: {
                    areaColor: {
                        type: 'linear-gradient',
                        x: 0,
                        y: 300,
                        x2: 0,
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(37,108,190,1)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(15,169,195,1)' // 50% 处的颜色
                        }],
                        global: true // 缺省为 false
                    }
                }
            },
            emphasis: {
                itemStyle: {
                    areaColor: '#0160AD'
                },
                label: {
                    show: 0,
                    color: '#fff'
                }
            },
        },
        series: series
    };
    return option;
}

/**
 * 柱状图3D效果柱子上下加圆环
 * @param data
 * @param chartInfo
 * @returns {{yAxis: {axisLabel: {color: string, show: boolean, fontSize: number}, axisLine: {show: boolean}, splitLine: {lineStyle: {color: string}, show: boolean}, axisTick: {show: boolean}, type: string}, xAxis: [{axisLabel: {formatter: function(*): (string), rotate: *|number, color: string, show: boolean, fontSize: number, lineHeight: number, interval: number}, data: [], splitArea: {areaStyle: {color: [string, string]}, show: boolean}, axisLine: {lineStyle: {color: string}, show: boolean}, splitLine: {show: boolean}, axisTick: {show: boolean}, type: string}, {axisLabel: {formatter: string, show: boolean}, data: [], splitArea: {show: boolean}, axisLine: {show: boolean}, splitLine: {show: boolean}, axisTick: {show: boolean}, type: string}], grid: {top: string, left: string, bottom: string, right: string, containLabel: boolean}, series: [{barWidth: number, symbolRepeat: boolean, symbolMargin: string, data: [], symbolSize: string[], symbolOffset: number[], zlevel: number, type: string}, {barWidth: number, symbolRepeat: boolean, symbolMargin: string, data: [], symbolSize: string[], symbolOffset: number[], xAxisIndex: number, tooltip: {show: boolean}, zlevel: number, type: string}], tooltip: {trigger: string}}}
 */
echartMap.barCake3D = function (data = [], chartInfo) {
    var bar_bg1 = {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(222,89,90,0.74902)'
            }, {
                offset: 1,
                color: 'rgba(222,89,90,0.16078)'
            }]),
        }
    };
    var bar_bg2 = {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(58,193,250,0.74902)'
            }, {
                offset: 1,
                color: 'rgba(58,193,250,0.16078)'
            }]),
        }
    };
    var base1 = 'image:///image/guangdian/img/base1.png';
    var base2 = 'image:///image/guangdian/img/base2.png';
    var cap1 = '#ee5d5d';
    var cap2 = '#3ac1fa';

    // var bar_data = [
    //     {
    //         name: '纺织',
    //         value: 480,
    //     },
    //     {
    //         name: '机械',
    //         value: 350,
    //     },
    //     {
    //         name: '轻工',
    //         value: 300,
    //     },
    //     {
    //         name: '钢铁',
    //         value: 250,
    //     },
    //     {
    //         name: '石油化工',
    //         value: 180,
    //     }
    // ];
    var xAxis_name = [];
    var series = [];
    var bar = [];
    var base_data = [];
    var cap_data = [];
    for (var i = 0; i < data.length; i++) {
        xAxis_name.push(data[i].name);
        if (i == 0) {
            bar.push({
                name: data[i].name,
                value: data[i].value,
                itemStyle: bar_bg1,
            });
            base_data.push({
                name: data[i].name,
                value: 0,
                symbol: base1,
            });
            cap_data.push({
                name: data[i].name,
                value: data[i].value,
                itemStyle: {
                    color: cap1
                },
            });
        } else {
            bar.push({
                name: data[i].name,
                value: data[i].value,
                itemStyle: bar_bg2,
            });
            base_data.push({
                name: data[i].name,
                value: 0,
                symbol: base2,
            });
            cap_data.push({
                name: data[i].name,
                value: data[i].value,
                itemStyle: {
                    color: cap2
                },
            });
        }
    };
    series.push({
        type: 'bar',
        barWidth: 26,
        symbolOffset: [0, -5.5],
        zlevel: 2,
        data: bar
    }, {
        type: 'scatter',
        hoverAnimation: false,
        coordinateSystem: 'cartesian2d',
        symbolOffset: [0, 3], //相对于原本位置的偏移量
        symbolSize: [41, 16],
        tooltip: {
            show: false
        },
        zlevel: 3,
        data: base_data
    }, {
        type: 'scatter',
        hoverAnimation: false,
        coordinateSystem: 'cartesian2d',
        symbol: 'circle',
        symbolOffset: [0, 0], //相对于原本位置的偏移量
        symbolSize: [26, 8],
        tooltip: {
            show: false
        },
        label: {
            normal: {
                show: false,
            }
        },
        zlevel: 3,
        data: cap_data
    })
    var option01 = {
        grid: {
            top: '15%',
            bottom: '5%',
            left: '3%',
            right: '5%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: [{
            type: 'category',
            splitLine: {
                show: false
            },
            axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                show: true,
                lineStyle: {
                    color: 'rgba(230, 230, 230, 0.302)'
                }
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: true,
                fontSize: 14,
                color: '#feffff',
                margin: 13,
                interval: 0,
                rotate: chartInfo.rotate ? chartInfo.rotate : 0, //x轴名字倾斜
                formatter: function (value) {
                    var str = "";
                    var num = 1; //每行显示字数
                    if (chartInfo.labelWordNumPerLine) {
                        num = chartInfo.labelWordNumPerLine
                    }
                    var valLength = value.length; //该项x轴字数
                    var rowNum = Math.ceil(valLength / num); // 行数

                    if (rowNum > 1) {
                        for (var i = 0; i < rowNum; i++) {
                            var temp = "";
                            var start = i * num;
                            var end = start + num;

                            temp = value.substring(start, end) + "\n";
                            str += temp;
                        }
                        return str;
                    } else {
                        return value;
                    }
                }
            },
            data: xAxis_name,
        }, ],
        yAxis: {
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(230, 230, 230, 0.102)'
                }
            },
            axisLine: { //坐标轴轴线相关设置。就是数学上的x轴
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: true,
                fontSize: 14,
                fontFamily: 'Aldrich-R',
                color: 'rgba(255,255,255,.6)',
            },
        },
        series: series
    };
    return option01;
}

export default echartMap

// 竖型柱状图渐变色

export const barVerticalJB = (data = [], chartInfo) => {
    const barColorListTop = [
        ['#33fff9', 'rgb(51,255,249,.3)', 'rgb(51,255,249,.05)'],
        ['#33c1ff', 'rgb(51,193,255,.3)', 'rgb(51,193,255,.05)'],
        ['#33fff9', 'rgb(51,255,249,.3)', 'rgb(51,255,249,.05)'],
        ['#33c1ff', 'rgb(51,193,255,.3)', 'rgb(51,193,255,.05)'],
        ['#33fff9', 'rgb(51,255,249,.3)', 'rgb(51,255,249,.05)'],
        ['#33c1ff', 'rgb(51,193,255,.3)', 'rgb(51,193,255,.05)']
    ];
    // console.log(data)
    if (!data.length) return {};
    const xAxis = [];
    if (chartInfo.isSort) {
        data = data.sort(compareDesc("value"));
    }
    data.forEach(item => {
        if (!item.name) return;
        xAxis.push(item.name);
    });
    return {
        // color: ['#ffc637', '#229ae9'],
        grid: {
            top: "10px",
            left: "3%",
            right: "4%",
            bottom: "10px",
            containLabel: true
        },
        tooltip: {
            show: true,
            textStyle: {
                fontSize: 16,
            },
            /*formatter(params) {
                return `${params.name}<br>${cusIndent}：${params.value}`;
            },*/
            trigger: 'axis',
            axisPointer: {
                type: "shadow"
            }
        },
        yAxis: [{
            type: "value",
            axisTick: {
                show: false
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#03a9f4",
                    opacity: 0.5
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#32c0fe",
                    opacity: 0.05
                }
            },
            axisLabel: {
                color: "#fff",
                fontSize: 12,
                tooltip: {
                    show: true
                },
                formatter: function (value) {
                    return value.length > 6 ? value.slice(0, 6) + "..." : value;
                }
            },
        }],
        xAxis: [{
            type: "category",
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#000000",
                    opacity: 0.1
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#32c0fe",
                    opacity: 0.05
                }
            },
            axisLabel: {
                color: "#fff",
                fontSize: 14,
                tooltip: {
                    show: true
                },
                // rotate: 45,
                // interval: 0,
                formatter: function (value) {
                    return (value.length > 6 ? (value.slice(0, 6) + "...") : value)
                },
            },
            data: xAxis
        }],
        series: [{
            name: chartInfo.cusIndent ? chartInfo.cusIndent : '数量',
            type: "bar",
            smooth: true,
            barWidth: "30%",
            showSymbol: false,
            barMinHeight: 5,
            data: data.map((item, key) => {
                return {
                    ...item,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: barColorListTop[key][2]
                            }, {
                                offset: 1,
                                color: barColorListTop[key][1]
                            }]),
                            borderColor: barColorListTop[key][0],
                            borderWidth: 1
                        }
                    }
                };
            })
        }]
    };
};

echartMap.barVerticalJB = function (data = [], chartInfo) {
    return barVerticalJB(data, chartInfo)
}

// 玫瑰图 背景旋转

/**
 * 玫瑰图背景图旋转
 * @param data
 * @returns {{color: [string, string, string], legend: {formatter: (function(*): string), itemGap: number, top: string, orient: string, data: [], itemHeight: number, show: boolean, icon: string, itemWidth: number, right: number, textStyle: {rich: {v: {fontFamily: string, color: string, width: number, fontSize: number, align: string}, n: {padding: number[], color: string, width: number, fontSize: number}}}}, series: [{data: [], roseType: string, center: [string, string], itemStyle: {normal: {opacity: number}}, label: {normal: {show: boolean}}, labelLine: {normal: {show: boolean}}, type: string, radius: [string, string]}, {data: [], roseType: string, center: [string, string], label: {normal: {show: boolean}}, labelLine: {normal: {show: boolean}}, type: string, radius: [string, string]}], tooltip: {formatter: string, trigger: string}}}
 */
echartMap.pieLabelCd = function (data = []) {
    var chart02_color = ['#5072ff', '#33c1ff', '#33fff9', '#33ff94', '#d8ff33'];
    var chart02_pie1 = [];
    var chart02_pie2 = [];
    for (var i = 0; i < data.length; i++) {
        chart02_pie1.push({
            name: data[i].name,
            value: data[i].value,
            itemStyle: {
                normal: {
                    color: chart02_color[i],
                }
            }
        });
        chart02_pie2.push({
            name: data[i].name,
            value: data[i].value,
            itemStyle: {
                normal: {
                    color: chart02_color[i],
                }
            }
        });
    };
    var option02 = {
        tooltip: {
            trigger: 'item',
        },
        series: [{
                type: 'pie',
                radius: ['40%', '55%'],
                center: ['50%', '50%'],
                clockwise: false,
                label: {
                    normal: {
                        show: true,
                        formatter: function (item) {
                            var name = item.name
                            var percent = item.percent.toFixed(2)
                            var i = item.dataIndex
                            if (i % 2 == 0) {
                                return '{b|' + name + '}\n' + '{c1|' + percent + '%}'
                            } else {
                                return '{b|' + name + '}\n' + '{c2|' + percent + '%}'
                            }
                        },
                        alignTo: 'edge',
                        margin: 10,
                        padding: [0, 5],
                        rich: {
                            b: {
                                width: 90,
                                height: 20,
                                lineHeight: 25,
                                fontSize: 14,
                                color: '#fff',
                                padding: [-1, 0, 2, 0],
                            },
                            c1: {
                                width: 90,
                                fontSize: 14,
                                fontFamily: 'OPPOSans-R',
                                color: '#33c1ff',
                                padding: [5, 0],
                            },
                            c2: {
                                width: 90,
                                fontSize: 14,
                                fontFamily: 'OPPOSans-R',
                                color: '#33fff9',
                                padding: [5, 0],
                            },
                        },
                    }
                },
                labelLine: {
                    length2: 150,
                },
                zlevel: 2,
                data: chart02_pie1
            },
            {
                type: 'pie',
                radius: ['35%', '40%'],
                center: ['50%', '50%'],
                clockwise: false,
                silent: true,
                label: {
                    normal: {
                        show: false,
                    }
                },
                itemStyle: {
                    normal: {
                        opacity: 0.8
                    }
                },
                zlevel: 1,
                data: chart02_pie1
            },
        ]
    };
    return option02;
}
//TOP5 玫瑰图带特殊label样式
echartMap.pieLabel = function (data = []) {
    var chart03_color = ['#5072ff', '#33c1ff', '#33fff9', '#33ff94', '#d8ff33'];
    var chart03_pie1 = [];
    for (var i = 0; i < data.length; i++) {
        chart03_pie1.push({
            name: data[i].name,
            value: data[i].value,
            itemStyle: {
                normal: {
                    color: chart03_color[i],
                }
            }
        });
    };
    var option03 = {
        tooltip: {
            trigger: 'item',
        },
        series: [{
            type: 'pie',
            radius: ['10%', '50%'],
            center: ['50%', '50%'],
            roseType: 'radius',
            clockwise: false,
            label: {
                normal: {
                    show: true,
                    formatter: function (item) {
                        // console.log(item)
                        var name = item.name
                        var value = item.value
                        var percent = item.percent.toFixed(2)
                        var i = item.dataIndex + 1
                        // console.log(i)
                        if (i % 2 == 0) {
                            return '{i2|' + i + '}' + '{b|' + name + '}\n' + '{c2|' + value + '  |  ' + percent + '%}'
                        } else {
                            return '{i1|' + i + '}' + '{b|' + name + '}\n' + '{c1|' + value + '  |  ' + percent + '%}'
                        }
                    },
                    minMargin: 45,
                    alignTo: 'edge',
                    margin: 10,
                    padding: [-3, -10, 0, -10],
                    rich: {
                        i1: {
                            width: 22,
                            height: 22,
                            align: 'center',
                            fontSize: 14,
                            color: '#061847',
                            borderRadius: 15,
                            padding: [-2, -1, 0, -1],
                            backgroundColor: '#33fff9'
                        },
                        i2: {
                            width: 22,
                            height: 22,
                            align: 'center',
                            fontSize: 14,
                            color: '#061847',
                            borderRadius: 15,
                            padding: [-2.5, -1, 1, -1],
                            backgroundColor: '#33c1ff'
                        },
                        b: {
                            width: 60,
                            height: 20,
                            fontSize: 14,
                            color: '#fff',
                            align: 'left',
                        },
                        c1: {
                            width: 120,
                            fontSize: 14,
                            fontFamily: 'OPPOSans-R',
                            color: '#33fff9',
                            align: 'center',
                            padding: [5, 0],
                        },
                        c2: {
                            width: 120,
                            fontSize: 14,
                            fontFamily: 'OPPOSans-R',
                            color: '#33c1ff',
                            align: 'center',
                            padding: [5, 0],
                        },
                    },
                }
            },
            labelLine: {
                length2: 300,
            },
            zlevel: 2,
            data: chart03_pie1
        }, ]
    }
    return option03;
}
 //  新版玫瑰图
 echartMap.newPieLabel = function (data = []){
    var datas = [

        // ////////////////////////////////////////
        [
            { name: '圣彼得堡来客', value: 115.6 },
            { name: '陀思妥耶夫斯基全集', value: 1 },
            { name: '史记精注全译（全6册）', value: 0.8 },
            { name: '加德纳艺术通史', value: 0.5 },
            { name: '表象与本质', value: 0.5 },
            { name: '其它', value: 3.8 }
        ],

    ];

   var option = {
        title: {
            text: '阅读书籍分布',
            left: 'center',
            textStyle: {
                color: '#999',
                fontWeight: 'normal',
                fontSize: 14
            }
        },
        series: datas.map(function (data, idx) {
            var top = idx * 33.3;
            return {
                type: 'pie',
                roseType: 'radius',
                radius: ['10%', '50%'],
                center: ['50%', '50%'],
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                label: {
                    alignTo: 'edge',
                    formatter: '{name|{b}}\n{time|{c} 小时}',
                    minMargin: 5,
                    edgeDistance: 10,
                    lineHeight: 15,
                    rich: {
                        time: {
                            fontSize: 10,
                            color: '#999'
                        }
                    }
                },
                labelLine: {
                    length: 15,
                    length2: 100,
                    maxSurfaceAngle: 80
                },
                labelLayout: function (params) {
                    var isLeft = params.labelRect.x < myChart.getWidth() / 2;
                    var points = params.labelLinePoints;
                    // Update the end point.
                    points[2][0] = isLeft
                        ? params.labelRect.x
                        : params.labelRect.x + params.labelRect.width;

                    return {
                        labelLinePoints: points
                    };
                },
                data: data
            }
        })
    };
    return option
 },
echartMap.piePecent = function (data = []) {
    const colors = ['rgba(0,0,0,0)', '#4f73fd', '#34c0fe', '#33fef8', '#34ff94', '#b0ff32', '#b433ff'].reverse();
    var chart03_pie1 = [];
    for (var i = 0; i < data.length; i++) {
        chart03_pie1.push({
            name: data[i].name,
            value: data[i].value,
            itemStyle: {
                normal: {
                    color: colors[i],
                }
            }
        });
    };
    var option = {

        polar: {

        },
        angleAxis: {
            show: false,
            // min: 0,
            // max: function (value) {
            //     return value.max * 4 / 3;
            // }
        },
        radiusAxis: {
            type: 'category',
            axisLabel: {
                interval: 0,
                color: "#2df",
                fontSize: 16
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false,
                alignWithLabel: true
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: "rgba(17, 51, 68, 0.8)"
                }
            },
            data: data.map(function (item) {
                return item.name
            }),
        },
        series: [{
            type: 'bar',
            coordinateSystem: 'polar',
            barWidth: 8,
            data: chart03_pie1
        }]
    }
    return option;
}
echartMap.lineCircleSymbol = function (dataInfo = []) {
    // const _lineSymbol = 'image:///image/shandong/img/line_symbol2.png'
    // const _lineColor = '#33fff9'
    // const xAxisDate = [...data.map(v => v.name)]
    // const lineDate = [...data.map(v => v.value)]
    // var option = {
    //     tooltip: {
    //         trigger: 'axis',
    //         formatter: function(params) {
    //           var result = ''
    //           var dotHtml = '<span style="display:inline-block;margin-right:10px;border-radius:50%;width:30px;height:30px;background-color:' + _lineColor + '"></span>'
    //           params.forEach(function (item) {
    //             result += item.axisValue + "</br>" + dotHtml + item.data
    //           })
    //           return result
    //         },
    //         textStyle: {
    //           fontSize: 34,
    //         }
    //       },
    //       backgroundColor: 'transparent',
    //       grid: {
    //         top: '9%',
    //         bottom: '5%',
    //         left: '2%',
    //         right: '4%',
    //         containLabel: true
    //       },
    //       xAxis: [
    //         {
    //           type: 'category',
    //           boundaryGap: true,
    //           splitLine: {
    //             show: false
    //           },
    //           splitArea: {
    //             show: true,
    //             areaStyle: {
    //               color: ['rgba(25, 85, 128, 0.2)','transparent']
    //             }
    //           },
    //           axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
    //             show: true,
    //             lineStyle: {
    //               color: 'rgba(255, 255, 255, 0.251)'
    //             }
    //           },
    //           axisTick: {
    //             show: false,
    //           },
    //           axisLabel: {
    //             textStyle: {
    //               fontSize: 24,
    //               fontFamily: 'OPPOSansM',
    //               color: 'rgba(255, 255, 255, 0.502)',
    //             },
    //             margin: 15,
    //           },
    //           data: xAxisDate
    //         },
    //         {
    //           type: 'category',
    //           boundaryGap: true,
    //           splitLine: {
    //             show: false
    //           },
    //           splitArea: {
    //             show: false
    //           },
    //           axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
    //             show: true,
    //             lineStyle: {
    //               color: 'rgba(255, 255, 255, 0.251)'
    //             }
    //           },
    //           axisTick: {
    //             show: false,
    //           },
    //           axisLabel: {
    //             show: false,
    //             formatter: ''
    //           }
    //         }
    //       ],
    //       yAxis: {
    //         type: 'value',
    //         splitLine: {
    //           show: true,
    //           lineStyle: {
    //             color: 'rgba(255, 255, 255, 0.149)'
    //           }
    //         },
    //         axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
    //           show: false
    //         },
    //         axisTick: {
    //           show: false
    //         },
    //         axisLabel: {
    //           textStyle: {
    //             fontSize: 24,
    //             fontFamily: 'OPPOSansM',
    //             color: 'rgba(255, 255, 255, 0.502)',
    //           },
    //           margin: 15
    //         }
    //       },
    //       series: [
    //         {
    //           type: 'line',
    //           symbol: _lineSymbol,
    //           symbolSize: 34,
    //           itemStyle: {
    //             normal: {
    //               color: _lineColor
    //             }
    //           },
    //           data: lineDate
    //         }
    //       ]
    // }
    const _lineSymbol1 = 'image:///image/shandong/img/line_symbol1.png'
    const _lineSymbol2 = 'image:///image/shandong/img/line_symbol2.png'
    dataInfo = JSON.parse(JSON.stringify(dataInfo))
    let dataFieldInfo = dataInfo.fieldInfo
    let data = dataInfo.data
    let xAxisName = []
    for (let i in data) {
        xAxisName.push(data[i].name)
    }
    // dataFieldInfo中补充字段value，表示当前字段对应的数组数据
    for (let j in dataFieldInfo) {
        dataFieldInfo[j].value = []
        for (let i in data) {
            dataFieldInfo[j].value.push(data[i][dataFieldInfo[j].field])
        }
    }
    let series = []
    // let colorArray1 = ['rgb(33, 132, 255)','rgb(209, 72, 80)','rgb(88, 165, 78)','rgb(255, 143, 113)','rgb(112, 220, 255)']
    // let colorArray2 = ['rgba(33, 132, 255, 0.4)','rgba(209, 72, 80, 0.4)','rgba(88, 165, 78, 0.4)','rgba(255, 143, 113, 0.4)','rgba(112, 220, 255, 0.4)']
    let colorArray1 = ['#33fff9', '#eed636']

    let colorTotal = colorArray1.length
    let icon = '';
    for (let i in dataFieldInfo) {
        if (dataInfo.isYellow) {
            icon = _lineSymbol1
        } else {
            if (i == 0) {
                icon = _lineSymbol2
            } else {
                icon = _lineSymbol1
            }
        }

        let color = [];
        if (dataInfo.fieldInfo[i].color) {
            color = dataInfo.fieldInfo[i].color
        } else {
            color = false
        }
        series.push({
            name: dataFieldInfo[i].desc,
            type: 'line',
            smooth: false,
            symbol: icon,
            symbolSize: 16,
            emphasis: {
                label: {
                    show: false,
                }
            },
            itemStyle: {
                normal: {
                    color: dataInfo.isYellow ? '#eed636' : (color[0] || colorArray1[i % colorTotal])
                }
            },
            lineStyle: {
                normal: {
                    color: dataInfo.isYellow ? '#eed636' : (color[0] || colorArray1[i % colorTotal])
                }
            },
            data: dataFieldInfo[i].value,
        })
    }

    var option07 = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            show: dataInfo.legend || false,
            icon: 'rect',
            itemWidth: 12,
            itemHeight: 12,
            itemGap: 50,
            top: 0,
            right: 0,
            textStyle: {
                fontSize: 12,
                color: '#fff',
            },
        },
        grid: {
            top: '15%',
            bottom: '5%',
            left: '3%',
            right: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {
                show: false,
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(108, 149, 255, 0.059)', 'transparent']
                }
            },
            axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                show: true,
                onZero: true,
                lineStyle: {
                    color: 'rgba(230, 230, 230, .302)'
                }
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    fontFamily: 'Aldrich',
                    color: '#feffff',
                },
                rotate: 30
            },
            data: xAxisName,
        },
        yAxis: {
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(230, 230, 230, .102)'
                }
            },
            axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    fontFamily: 'Aldrich',
                    color: '#feffff',
                },
            },
        },
        series: series
    }
    return option07;
}
/**
 * 柱状图3D效果-纯色效果
 * @param data
 * @param chartInfo
 * @returns {{yAxis: {axisLabel: {color: string, show: boolean, fontSize: number}, axisLine: {show: boolean}, splitLine: {lineStyle: {color: string}, show: boolean}, axisTick: {show: boolean}, type: string}, xAxis: [{axisLabel: {formatter: function(*): (string), rotate: *|number, color: string, show: boolean, fontSize: number, lineHeight: number, interval: number}, data: [], splitArea: {areaStyle: {color: [string, string]}, show: boolean}, axisLine: {lineStyle: {color: string}, show: boolean}, splitLine: {show: boolean}, axisTick: {show: boolean}, type: string}, {axisLabel: {formatter: string, show: boolean}, data: [], splitArea: {show: boolean}, axisLine: {show: boolean}, splitLine: {show: boolean}, axisTick: {show: boolean}, type: string}], grid: {top: string, left: string, bottom: string, right: string, containLabel: boolean}, series: [{barWidth: number, symbolRepeat: boolean, symbolMargin: string, data: [], symbolSize: string[], symbolOffset: number[], zlevel: number, type: string}, {barWidth: number, symbolRepeat: boolean, symbolMargin: string, data: [], symbolSize: string[], symbolOffset: number[], xAxisIndex: number, tooltip: {show: boolean}, zlevel: number, type: string}], tooltip: {trigger: string}}}
 */
echartMap.bar3DBg = function (data = [], chartInfo) {
    var _picBar = "image:///image/shandong/img/pic_bar2.png"
    var _picBarBg = "image:///image/shandong/img/pic_bar2_bg.png"
    if (chartInfo.color == 'yellow') {
        _picBar = "image:///image/shandong/img/pic_bar2.png"
        _picBarBg = "image:///image/shandong/img/pic_bar2_bg.png"
    } else if (chartInfo.color == 'blue') {
        _picBar = "image:///image/shandong/img/pic_bar1.png"
        _picBarBg = "image:///image/shandong/img/pic_bar1_bg.png"
    }
    const _barColor = '#7ef4ff'
    const xAxisDate = [...data.map(v => v.name)]
    const barDate = [...data.map(v => v.value)]
    const barBg = [...data.map(() => {
        return getMaxValue(data)
    })]

    var option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = ''
                var dotHtml = '<span style="display:inline-block;margin-right:10px;border-radius:50%;width:14px;height:14px;background-color:' + _barColor + '"></span>'
                params.forEach(function (item) {
                    result += item.axisValue + "</br>" + dotHtml + item.data
                })
                return result
            },
            textStyle: {
                fontSize: 14,
            }
        },
        backgroundColor: 'transparent',
        grid: {
            top: '10%',
            bottom: '3%',
            left: '2%',
            right: '4%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            splitLine: {
                show: false
            },
            // splitArea: {
            //     show: true,
            //     areaStyle: {
            //         color: ['rgba(25, 85, 128, 0.2)', 'transparent']
            //     }
            // },
            axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                show: true,
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.251)'
                }
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    fontFamily: 'OPPOSansM',
                    color: 'rgba(255, 255, 255, 0.502)',
                },
                formatter: function (params) {
                    var val = "";
                    if (params.length > 4) {
                        val = params.substr(0, 4) + '...';
                        return val;
                    } else {
                        return params;
                    }
                },
                margin: 15,
            },
            data: xAxisDate
        }],
        yAxis: {
            type: 'value',
            splitNumber: 4,
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.149)'
                }
            },
            axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    fontFamily: 'OPPOSansM',
                    color: 'rgba(255, 255, 255, 0.502)',
                },
                margin: 15
            }
        },
        // dataZoom: [
        //     {
        //         show: data.length>1?true:false,
        //         start: 0,
        //         end: 100,
        //         fillerColor: "rgba(110, 137, 171, 0.2)",
        //         borderColor: "#3c647e",
        //         textStyle: {
        //             color: "rgba(249, 4, 4, 1)"
        //           }
        //     },
        //     // {
        //     //     type: 'inside',
        //     //     start: 94,
        //     //     end: 100
        //     // },
        //     // {
        //     //     show: true,
        //     //     yAxisIndex: 0,
        //     //     filterMode: 'empty',
        //     //     width: 30,
        //     //     height: '80%',
        //     //     showDataShadow: false,
        //     //     left: '93%'
        //     // }
        // ],
        series: [{
                type: 'pictorialBar',
                barWidth: 16,
                symbol: _picBar,
                symbolRepeat: true,
                symbolSize: ['100%', '100%'],
                symbolOffset: [0, 0],
                symbolMargin: '-35%',
                zlevel: 2,
                data: barDate
            },
            // { // 柱子背景
            //     type: 'pictorialBar',
            //     tooltip: {
            //         show: false,
            //     },
            //     barWidth: 16,
            //     symbol: _picBarBg,
            //     symbolSize: ['100%', '100%'],
            //     symbolOffset: [0, 0],
            //     xAixsIndex: 1,
            //     zlevel: 1,
            //     data: barBg
            // },
            { // 渐变阴影
                type: 'bar',
                tooltip: {
                    show: false,
                },
                barWidth: 16,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0, 0, 0, 0)'
                    }, {
                        offset: 1,
                        color: 'rgba(0, 0, 0, .5)'
                    }]),
                },
                xAixsIndex: 2,
                zlevel: 3,
                data: barDate
            }
        ]
    }
    return option;
}
/**
 * 柱状图锥形
 * @param data
 * @param chartInfo
 * @returns {{yAxis: {axisLabel: {color: string, show: boolean, fontSize: number}, axisLine: {show: boolean}, splitLine: {lineStyle: {color: string}, show: boolean}, axisTick: {show: boolean}, type: string}, xAxis: [{axisLabel: {formatter: function(*): (string), rotate: *|number, color: string, show: boolean, fontSize: number, lineHeight: number, interval: number}, data: [], splitArea: {areaStyle: {color: [string, string]}, show: boolean}, axisLine: {lineStyle: {color: string}, show: boolean}, splitLine: {show: boolean}, axisTick: {show: boolean}, type: string}, {axisLabel: {formatter: string, show: boolean}, data: [], splitArea: {show: boolean}, axisLine: {show: boolean}, splitLine: {show: boolean}, axisTick: {show: boolean}, type: string}], grid: {top: string, left: string, bottom: string, right: string, containLabel: boolean}, series: [{barWidth: number, symbolRepeat: boolean, symbolMargin: string, data: [], symbolSize: string[], symbolOffset: number[], zlevel: number, type: string}, {barWidth: number, symbolRepeat: boolean, symbolMargin: string, data: [], symbolSize: string[], symbolOffset: number[], xAxisIndex: number, tooltip: {show: boolean}, zlevel: number, type: string}], tooltip: {trigger: string}}}
 */
echartMap.barArrowBg = function (data = [], chartInfo) {
    const _barSymbol = 'path://d="M93.462,332.492 L93.462,332.500 C93.462,332.500 93.269,332.499 92.910,332.496 C92.552,332.499 92.359,332.500 92.359,332.500 L92.359,332.492 C79.239,332.399 -45.863,331.500 19.113,331.500 C74.186,331.500 88.759,117.676 92.359,33.746 L92.359,0.500 C92.359,0.500 92.484,7.582 92.910,19.661 C93.337,7.582 93.462,0.500 93.462,0.500 L93.462,33.746 C97.061,117.676 111.634,331.500 166.708,331.500 C231.684,331.500 106.582,332.399 93.462,332.492 Z"'
    const _barColor = '#f3b861'
    const xAxisDate = [...data.map(v => v.name)]
    const barDate = [...data.map(v => v.value)]
    const _barAreaColor = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
        offset: 0,
        color: 'rgba(243, 184, 97, 1)'
    }, {
        offset: 0.5,
        color: 'rgba(243, 184, 97, 0.4)'
    }, {
        offset: 1,
        color: 'rgba(243, 184, 97, 0)'
    }])

    var option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = ''
                var dotHtml = '<span style="display:inline-block;margin-right:10px;border-radius:50%;width:14px;height:14px;background-color:' + _barColor + '"></span>'
                params.forEach(function (item) {
                    result += item.axisValue + "</br>" + dotHtml + item.data
                })
                return result
            },
            textStyle: {
                fontSize: 14,
            }
        },
        backgroundColor: 'transparent',
        grid: {
            top: '10%',
            bottom: '3%',
            left: '2%',
            right: '4%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            splitLine: {
                show: false
            },
            // splitArea: {
            //     show: true,
            //     areaStyle: {
            //         color: ['rgba(25, 85, 128, 0.2)', 'transparent']
            //     }
            // },
            axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                show: true,
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.251)'
                }
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    fontFamily: 'OPPOSansM',
                    color: 'rgba(255, 255, 255, 0.502)',
                },
                margin: 15,
                rotate:20,
            },
            data: xAxisDate
        }],
        yAxis: {
            type: 'value',
            splitNumber: 4,
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.149)'
                }
            },
            axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    fontFamily: 'OPPOSansM',
                    color: 'rgba(255, 255, 255, 0.502)',
                },
                margin: 15
            }
        },
        series: [{
            type: 'pictorialBar',
            symbol: _barSymbol,
            // barMinHeight:4,
            itemStyle: {
                color: _barAreaColor,
                borderWidth: 1,
                borderColor: '#f3b861'
            },
            data: barDate
        }]
    }
    return option;
}
/**
 * 柱状图3D效果-纯色效果
 * @param data
 * @param chartInfo
 * @returns {{yAxis: {axisLabel: {color: string, show: boolean, fontSize: number}, axisLine: {show: boolean}, splitLine: {lineStyle: {color: string}, show: boolean}, axisTick: {show: boolean}, type: string}, xAxis: [{axisLabel: {formatter: function(*): (string), rotate: *|number, color: string, show: boolean, fontSize: number, lineHeight: number, interval: number}, data: [], splitArea: {areaStyle: {color: [string, string]}, show: boolean}, axisLine: {lineStyle: {color: string}, show: boolean}, splitLine: {show: boolean}, axisTick: {show: boolean}, type: string}, {axisLabel: {formatter: string, show: boolean}, data: [], splitArea: {show: boolean}, axisLine: {show: boolean}, splitLine: {show: boolean}, axisTick: {show: boolean}, type: string}], grid: {top: string, left: string, bottom: string, right: string, containLabel: boolean}, series: [{barWidth: number, symbolRepeat: boolean, symbolMargin: string, data: [], symbolSize: string[], symbolOffset: number[], zlevel: number, type: string}, {barWidth: number, symbolRepeat: boolean, symbolMargin: string, data: [], symbolSize: string[], symbolOffset: number[], xAxisIndex: number, tooltip: {show: boolean}, zlevel: number, type: string}], tooltip: {trigger: string}}}
 */
 echartMap.bar3DBgRevrser = function (data = [], chartInfo) {
    // var _picBar = "image:///image/shandong/img/pic_bar2.png"
    // var _picBarBg = "image:///image/shandong/img/pic_bar2_bg.png"
    // if (chartInfo.color == 'yellow') {
    //     _picBar = "image:///image/shandong/img/pic_bar2.png"
    //     _picBarBg = "image:///image/shandong/img/pic_bar2_bg.png"
    // } else if (chartInfo.color == 'blue') {
    //     _picBar = "image:///image/shandong/img/pic_bar1.png"
    //     _picBarBg = "image:///image/shandong/img/pic_bar1_bg.png"
    // }
    function compare(property) {
        return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        };
    }
    let dataNew = data.sort(compare('value'))
    const _barColor = '#7ef4ff'
    const xAxisDate = [...dataNew.map(v => v.name)]
    const barDate = [...dataNew.map(v => v.value)]

    var option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = ''
                var dotHtml = '<span style="display:inline-block;margin-right:10px;border-radius:50%;width:14px;height:14px;background-color:' + _barColor + '"></span>'
                params.forEach(function (item) {
                    result += item.axisValue + "</br>" + dotHtml + item.data
                })
                return result
            },
            textStyle: {
                fontSize: 14,
            }
        },
        backgroundColor: 'transparent',
        grid: {
            top: '3%',
            bottom: '3%',
            left: '2%',
            right: '4%',
            containLabel: true
        },
        xAxis: [{
            type: 'value',
            boundaryGap: true,
            splitLine: {
                show: false
            },
            minInterval: 1,
            // splitArea: {
            //     show: true,
            //     areaStyle: {
            //         color: ['rgba(25, 85, 128, 0.2)', 'transparent']
            //     }
            // },
            axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                show: true,
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.251)'
                }
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    fontFamily: 'OPPOSansM',
                    color: 'rgba(255, 255, 255, 0.502)',
                },
                formatter: function (params) {
                    var val = "";
                    if (params.length > 5) {
                        val = params.substr(0, 5) + '...';
                        return val;
                    } else {
                        return params;
                    }
                },
                margin: 15,
                rotate: 30
            },

        }],
        yAxis: {
            type: 'category',

            splitNumber: 4,
            // splitLine: {
            //     show: true,
            //     lineStyle: {
            //         color: 'rgba(255, 255, 255, 0.149)'
            //     }
            // },
            axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    fontFamily: 'OPPOSansM',
                    color: 'rgba(255, 255, 255, 0.502)',
                },
                formatter: function (params) {
                    var val = "";
                    if (params.length > 5) {
                        val = params.substr(0, 5) + '...';
                        return val;
                    } else {
                        return params;
                    }
                },
                margin: 15,
            },
            data: xAxisDate
        },
        series: [{
                type: 'bar',
                barWidth: 16,
                // symbol: _picBar,
                // symbolRepeat: true,
                symbolSize: ['100%', '100%'],
                symbolOffset: [0, 0],
                // symbolMargin: '-35%',
                zlevel: 2,
                data: barDate,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: 'rgb(51,255,249,.05)'
                        }, {
                            offset: 1,
                            color:'rgb(51,255,249,.3)'
                        }]),
                        borderColor:'#33fff9',
                        borderWidth: 1
                    }
                }
            },
            // { // 渐变阴影
            //     type: 'bar',
            //     tooltip: {
            //         show: false,
            //     },
            //     barWidth: 16,
            //     itemStyle: {
            //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //             offset: 0,
            //             color: 'rgba(0, 0, 0, 0)'
            //         }, {
            //             offset: 1,
            //             color: 'rgba(0, 0, 0, .5)'
            //         }]),
            //     },
            //     xAixsIndex: 2,
            //     zlevel: 3,
            //     data: barDate
            // }
        ]
    }
    return option;
}
/**
 * 柱状图3D效果-纯色效果  黄色效果
 * @param data
 * @param chartInfo
 * @returns {{yAxis: {axisLabel: {color: string, show: boolean, fontSize: number}, axisLine: {show: boolean}, splitLine: {lineStyle: {color: string}, show: boolean}, axisTick: {show: boolean}, type: string}, xAxis: [{axisLabel: {formatter: function(*): (string), rotate: *|number, color: string, show: boolean, fontSize: number, lineHeight: number, interval: number}, data: [], splitArea: {areaStyle: {color: [string, string]}, show: boolean}, axisLine: {lineStyle: {color: string}, show: boolean}, splitLine: {show: boolean}, axisTick: {show: boolean}, type: string}, {axisLabel: {formatter: string, show: boolean}, data: [], splitArea: {show: boolean}, axisLine: {show: boolean}, splitLine: {show: boolean}, axisTick: {show: boolean}, type: string}], grid: {top: string, left: string, bottom: string, right: string, containLabel: boolean}, series: [{barWidth: number, symbolRepeat: boolean, symbolMargin: string, data: [], symbolSize: string[], symbolOffset: number[], zlevel: number, type: string}, {barWidth: number, symbolRepeat: boolean, symbolMargin: string, data: [], symbolSize: string[], symbolOffset: number[], xAxisIndex: number, tooltip: {show: boolean}, zlevel: number, type: string}], tooltip: {trigger: string}}}
 */
 echartMap.bar3DBgRevrserYellow = function (data = [], chartInfo) {
    // var _picBar = "image:///image/shandong/img/pic_bar2.png"
    // var _picBarBg = "image:///image/shandong/img/pic_bar2_bg.png"
    // if (chartInfo.color == 'yellow') {
    //     _picBar = "image:///image/shandong/img/pic_bar2.png"
    //     _picBarBg = "image:///image/shandong/img/pic_bar2_bg.png"
    // } else if (chartInfo.color == 'blue') {
    //     _picBar = "image:///image/shandong/img/pic_bar1.png"
    //     _picBarBg = "image:///image/shandong/img/pic_bar1_bg.png"
    // }
    function compare(property) {
        return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        };
    }
    let dataNew = data.sort(compare('value'))
    const _barColor = '#7ef4ff'
    const xAxisDate = [...dataNew.map(v => v.name)]
    const barDate = [...dataNew.map(v => v.value)]

    var option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = ''
                var dotHtml = '<span style="display:inline-block;margin-right:10px;border-radius:50%;width:14px;height:14px;background-color:' + _barColor + '"></span>'
                params.forEach(function (item) {
                    result += item.axisValue + "</br>" + dotHtml + item.data
                })
                return result
            },
            textStyle: {
                fontSize: 14,
            }
        },
        backgroundColor: 'transparent',
        grid: {
            top: '3%',
            bottom: '3%',
            left: '2%',
            right: '4%',
            containLabel: true
        },
        xAxis: [{
            type: 'value',
            boundaryGap: true,
            splitLine: {
                show: false
            },
            minInterval: 1,
            // splitArea: {
            //     show: true,
            //     areaStyle: {
            //         color: ['rgba(25, 85, 128, 0.2)', 'transparent']
            //     }
            // },
            axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                show: true,
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.251)'
                }
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    fontFamily: 'OPPOSansM',
                    color: 'rgba(255, 255, 255, 0.502)',
                },
                formatter: function (params) {
                    var val = "";
                    if (params.length > 5) {
                        val = params.substr(0, 5) + '...';
                        return val;
                    } else {
                        return params;
                    }
                },
                margin: 15,
                rotate: 30
            },

        }],
        yAxis: {
            type: 'category',

            splitNumber: 4,
            // splitLine: {
            //     show: true,
            //     lineStyle: {
            //         color: 'rgba(255, 255, 255, 0.149)'
            //     }
            // },
            axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    fontFamily: 'OPPOSansM',
                    color: 'rgba(255, 255, 255, 0.502)',
                },
                formatter: function (params) {
                    var val = "";
                    if (params.length > 5) {
                        val = params.substr(0, 5) + '...';
                        return val;
                    } else {
                        return params;
                    }
                },
                margin: 15,
            },
            data: xAxisDate
        },
        series: [{
                type: 'bar',
                barWidth: 16,
                // symbol: _picBar,
                // symbolRepeat: true,
                symbolSize: ['100%', '100%'],
                symbolOffset: [0, 0],
                // symbolMargin: '-35%',
                zlevel: 2,
                data: barDate,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: 'rgb(222,185,17,0.3)'
                        }, {
                            offset: 1,
                            color:'rgb(222,185,17,.8)'
                        }]),
                        borderColor:'#rgb(222,185,17)',
                        borderWidth: 1
                    }
                }
            },
            // { // 渐变阴影
            //     type: 'bar',
            //     tooltip: {
            //         show: false,
            //     },
            //     barWidth: 16,
            //     itemStyle: {
            //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //             offset: 0,
            //             color: 'rgba(0, 0, 0, 0)'
            //         }, {
            //             offset: 1,
            //             color: 'rgba(0, 0, 0, .5)'
            //         }]),
            //     },
            //     xAixsIndex: 2,
            //     zlevel: 3,
            //     data: barDate
            // }
        ]
    }
    return option;
}


/**
 * 柱状图3D效果-纯色效果 加滚动条
 * @param data
 * @param chartInfo
 * @returns {{yAxis: {axisLabel: {color: string, show: boolean, fontSize: number}, axisLine: {show: boolean}, splitLine: {lineStyle: {color: string}, show: boolean}, axisTick: {show: boolean}, type: string}, xAxis: [{axisLabel: {formatter: function(*): (string), rotate: *|number, color: string, show: boolean, fontSize: number, lineHeight: number, interval: number}, data: [], splitArea: {areaStyle: {color: [string, string]}, show: boolean}, axisLine: {lineStyle: {color: string}, show: boolean}, splitLine: {show: boolean}, axisTick: {show: boolean}, type: string}, {axisLabel: {formatter: string, show: boolean}, data: [], splitArea: {show: boolean}, axisLine: {show: boolean}, splitLine: {show: boolean}, axisTick: {show: boolean}, type: string}], grid: {top: string, left: string, bottom: string, right: string, containLabel: boolean}, series: [{barWidth: number, symbolRepeat: boolean, symbolMargin: string, data: [], symbolSize: string[], symbolOffset: number[], zlevel: number, type: string}, {barWidth: number, symbolRepeat: boolean, symbolMargin: string, data: [], symbolSize: string[], symbolOffset: number[], xAxisIndex: number, tooltip: {show: boolean}, zlevel: number, type: string}], tooltip: {trigger: string}}}
 */
 echartMap.bar3DBgRevrserAdd = function (data = [], chartInfo) {
    // var _picBar = "image:///image/shandong/img/pic_bar2.png"
    // var _picBarBg = "image:///image/shandong/img/pic_bar2_bg.png"
    // if (chartInfo.color == 'yellow') {
    //     _picBar = "image:///image/shandong/img/pic_bar2.png"
    //     _picBarBg = "image:///image/shandong/img/pic_bar2_bg.png"
    // } else if (chartInfo.color == 'blue') {
    //     _picBar = "image:///image/shandong/img/pic_bar1.png"
    //     _picBarBg = "image:///image/shandong/img/pic_bar1_bg.png"
    // }
    function compare(property) {
        return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        };
    }
    let dataNew = data.sort(compare('value'))
    const _barColor = '#7ef4ff'
    const xAxisDate = [...dataNew.map(v => v.name)]
    const barDate = [...dataNew.map(v => v.value)]

    var option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = ''
                var dotHtml = '<span style="display:inline-block;margin-right:10px;border-radius:50%;width:14px;height:14px;background-color:' + _barColor + '"></span>'
                params.forEach(function (item) {
                    result += item.axisValue + "</br>" + dotHtml + item.data
                })
                return result
            },
            textStyle: {
                fontSize: 14,
            }
        },
        backgroundColor: 'transparent',
        grid: {
            top: '3%',
            bottom: '3%',
            left: '2%',
            right: '4%',
            containLabel: true
        },
        dataZoom: [
            {
               start:0,//默认为0
               end: 50,//默认为100
               type: 'slider',
               maxValueSpan:10,//显示数据的条数(默认显示10个)
               show: true,
               yAxisIndex: [0],
               handleSize: 1,//滑动条的 左右2个滑动条的大小
               width:'10',
            //    height: '80%',//组件高度
            //    left: 600, //左边的距离
            //    right: 8,//右边的距离
            //    top: 50,//上边边的距离
               borderColor: "rgba(43,48,67,0.8)",
               fillerColor: '#42788d',//滑动块的颜色
               backgroundColor: 'rgba(13,33,117,0)',//两边未选中的滑动条区域的颜色
               showDataShadow: false,//是否显示数据阴影 默认auto
               showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
            //    realtime:true, //是否实时更新
            //    filterMode: 'filter',
            //    yAxisIndex: [0,1],//控制的y轴
            },
            {
                show:true,
                type: 'inside',
                yAxisIndex: [0],
                start: 0,
                end: 36
            }
        ],
        xAxis: [{
            type: 'value',
            boundaryGap: true,
            splitLine: {
                show: false
            },
            minInterval: 1,
            // splitArea: {
            //     show: true,
            //     areaStyle: {
            //         color: ['rgba(25, 85, 128, 0.2)', 'transparent']
            //     }
            // },
            axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                show: true,
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.251)'
                }
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    fontFamily: 'OPPOSansM',
                    color: 'rgba(255, 255, 255, 0.502)',
                },
                formatter: function (params) {
                    var val = "";
                    if (params.length > 5) {
                        val = params.substr(0, 5) + '...';
                        return val;
                    } else {
                        return params;
                    }
                },
                margin: 15,
                rotate: 30
            },

        }],
        yAxis: {
            type: 'category',

            splitNumber: 4,
            // splitLine: {
            //     show: true,
            //     lineStyle: {
            //         color: 'rgba(255, 255, 255, 0.149)'
            //     }
            // },
            axisLine: { //坐标轴轴线相关设置。就是数学上的y轴
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    fontFamily: 'OPPOSansM',
                    color: 'rgba(255, 255, 255, 0.502)',
                },
                formatter: function (params) {
                    var val = "";
                    if (params.length > 5) {
                        val = params.substr(0, 5) + '...';
                        return val;
                    } else {
                        return params;
                    }
                },
                margin: 15,
            },
            data: xAxisDate
        },
        series: [{
                type: 'bar',
                barWidth: 16,
                // symbol: _picBar,
                // symbolRepeat: true,
                symbolSize: ['100%', '100%'],
                symbolOffset: [0, 0],
                // symbolMargin: '-35%',
                zlevel: 2,
                data: barDate,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: 'rgb(51,255,249,.05)'
                        }, {
                            offset: 1,
                            color:'rgb(51,255,249,.3)'
                        }]),
                        borderColor:'#33fff9',
                        borderWidth: 1
                    }
                }
            },
            // { // 渐变阴影
            //     type: 'bar',
            //     tooltip: {
            //         show: false,
            //     },
            //     barWidth: 16,
            //     itemStyle: {
            //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //             offset: 0,
            //             color: 'rgba(0, 0, 0, 0)'
            //         }, {
            //             offset: 1,
            //             color: 'rgba(0, 0, 0, .5)'
            //         }]),
            //     },
            //     xAixsIndex: 2,
            //     zlevel: 3,
            //     data: barDate
            // }
        ]
    }
    return option;
}


/**
 * 柱状图的圆形图
 * @param data
 * @param chartInfo
 * @returns
 */

 echartMap.cirleBar = function(data= [] ) {
    let color = ["#17a1de","#3469dd",'#e9e11f',"#04ba17","#1def94","#0df2e9", ]

    let max = Math.max(...data.map(item=>item.value));
    let sum = eval(data.map(item=>item.value).join('+'))
  let  option = {
        // backgroundColor: '#000',
        angleAxis: {
            show: 0,
            clockwise: false,
            max: max + max/3
        },
        radiusAxis: {
            type: 'category',
            data: data.map(item => {
                return item.name + ':' + item.value + '('+ (item.value / sum * 100).toFixed(1) +'%)'
            }),
            z: 10,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false
            },
            nameTextStyle: {
                fontSize: 23
              },
            axisLabel: {
                interval: 0,
                color: '#fff',
                align: 'left',
                margin: -10,
                fontSize: 16

            }
        },
        polar: {
            show: 0,
            center: ['50%', '50%']
        },
        series: [{
            type: 'bar',
            data: data.map((item, index) => {
                return {
                    value: item.value,
                    name: item.name,
                    itemStyle: {
                        color: color[index]
                    }
                }
            }),
            label: {
                show: true,
                position: 'top',
            },
            barWidth: 20,
            coordinateSystem: 'polar',
        }]
    };

return option
 }

/**
 * 仪表盘
 * @param data
 * @param chartInfo
 * @returns
 */

 echartMap.dashboardtwo = function(data = {}) {
    //  let data = {name:'当前速度',value:70,iskm:false}
    let iskm = data.iskm
	var dataArr = '60';
			var colorSet = {
			    color: '#31F3FF'
			};
			var color1 = {
	            type: "linear",
	            x: 0,
	            y: 0,
	            x2: 1,
	            y2: 1,
	            colorStops: [
	                {
		                offset: 0,
		                color: "rgba(255,255,255,0.3)"
	                },
	                {
	                    offset: 1,
	                    color: "rgba(255,255,255,0.6)"
	                }
	            ],
	                global: false
	        }
	        var color2 = {
	            type: "linear",
	            x: 0,
	            y: 0,
	            x2: 1,
	            y2: 1,
	            colorStops: [
	                {
		                offset: 0,
		                color: "#31F3FF"
	                },
	                {
	                    offset: 1,
	                    color: "#2DE696"
	                }
	            ],
	                global: false
	        }

		let	option = {
			    // backgroundColor: '#0E1327',
			    tooltip: {
			        formatter: "{a} <br/>{b} : {c}%"
			    },

			    series: [
			    	{
			            name: "内部进度条",
			            type: "gauge",
			            // center: ['20%', '50%'],
			            radius: '52%',

			            splitNumber: 10,
			            axisLine: {
			                lineStyle: {
			                    color: [
			                        [data.value / 100, colorSet.color],
			                        [1, colorSet.color]
			                    ],
			                    width: 2
			                }
			            },
			            axisLabel: {
			                show: false,
			            },
			            axisTick: {
			                show: false,

			            },
			            splitLine: {
			                show: false,
			            },
			            itemStyle: {
			                color:"#ffffff"
			            },
			            detail: {
			            	show: false,
			                formatter: function(value) {
			                    if (value !== 0) {
			                        var num = Math.round(value ) ;
			                        return parseInt(num).toFixed(0)+"%";
			                    } else {
			                        return 0;
			                    }
			                },
			                offsetCenter: [0, 67],
			                textStyle: {
			                    padding: [0, 0, 0, 0],
			                    fontSize: 18,
			                    fontWeight: '700',
			                    color: '#ffffff'
			                }
			            },
			            title: { //标题
			                show: false,
			                offsetCenter: [0, 46], // x, y，单位px
			                textStyle: {
			                    color: "rgba(0,0,0,0)",
			                    fontSize: 14, //表盘上的标题文字大小
			                    fontFamily: 'PingFangSC'
			                }
			            },
			            data: [{
			                name: "",
			                value: data.value,
			            }],
			            pointer: {
			                show: true,
			                length: '70%',
			                radius: '20%',
			                width: 3 //指针粗细

			            },
			            animationDuration: 4000,
			        },
			        {
			            name: "内部阴影",
			            type: "gauge",
			            radius: '44%',
			            splitNumber: 10,
			            axisLine: {
			                lineStyle: {
			                    color: [
			                        [data.value / 100, new echarts.graphic.LinearGradient(
			                            0, 1, 0, 0, [{
			                                    offset: 0,
			                                    color: 'rgba(45,230,150,0)',
			                                }, {
			                                    offset: 0.5,
			                                    color: 'rgba(45,230,150,0.2)',
			                                },
			                                {
			                                    offset: 1,
			                                    color: '#31F3FF',
			                                }
			                            ]
			                        )],
			                        [
			                            1, 'rgba(28,128,245,0)'
			                        ]
			                    ],
			                    width: 100

			                },
			            },
			            axisLabel: {
			                show: false,
			            },
			            axisTick: {
			                show: false,

			            },
			            splitLine: {
			                show: false,
			            },
			            itemStyle: {
			                show: false,
			            },

			        },
			        {
			            name: "内部小圆",
			            type: "gauge",
			            // center: ['20%', '50%'],
			            radius: '46%',

			            splitNumber: 10,
			            axisLine: {
			                lineStyle: {
			                    color: [
			                        [data.value / 100, color2],
			                        [1, "rgba(0,0,0,0)"]
			                    ],
			                    width: 10
			                }
			            },
			            axisLabel: {
			                show: false,
			            },
			            axisTick: {
			                show: false,

			            },
			            splitLine: {
			                show: false,
			            },
			            itemStyle: {
			                show: false,
			            },
			        },
			        {
			            name: '外部刻度',
			            type: 'gauge',
			            //  center: ['20%', '50%'],
			            radius: '48%',
			            min: 0, //最小刻度
			            max: 100, //最大刻度
			            splitNumber: 5, //刻度数量
			            startAngle: 225,
			            endAngle: -45,
			            axisLine: {
			                show: true,
			                lineStyle: {
			                    width: 1,
			                    color: [
			                        [1, 'rgba(0,0,0,0)']
			                    ]
			                }
			            }, //仪表盘轴线
			            axisLabel: {
			                show: true,
			                color: '#31F3FF',
			                fontSize:14,
			                fontFamily:'SourceHanSansSC-Regular',
			                fontWeight:'bold',
			                // position: "top",
                    		distance: -30,
			                formatter: function(v) {
			                    switch (v + '') {
			                        case '0':
			                            return '0';
			                        case '10':
			                            return '10';
			                        case '20':
			                            return '20';
			                        case '30':
			                            return '30';
			                        case '40':
			                            return '40';
			                        case '50':
			                            return '50';
			                        case '60':
			                            return '60';
			                        case '70':
			                            return '70';
			                        case '80':
			                            return '80';
			                        case '90':
			                            return '90';
			                        case '100':
			                            return '100';
			                    }
			                }
			            }, //刻度标签。
			            axisTick: {
			                show: true,
			                splitNumber: 3,
			                lineStyle: {
			                    color: color1, //用颜色渐变函数不起作用
			                    width: 1,
			                },
			                length: -6
			            }, //刻度样式
			            splitLine: {
			                show: true,
			                length: -12,
			                lineStyle: {
			                    color: color1, //用颜色渐变函数不起作用
			                }
			            }, //分隔线样式
			            detail: {
			                show: false
			            }
			        },
			        {
			            name: "内部进度条",
			            type: "gauge",
			            // center: ['20%', '50%'],
			            radius: '20%',

			            splitNumber: 10,
			            axisLine: {
			                lineStyle: {
			                    color: [
			                        [data.value / 100, colorSet.color],
			                        [1, colorSet.color]
			                    ],
			                    width: 1
			                }
			            },
			            axisLabel: {
			                show: false,
			            },
			            axisTick: {
			                show: false,

			            },
			            splitLine: {
			                show: false,
			            },
			            itemStyle: {
			                color:"#ffffff"
			            },
			            detail: {
			                formatter: function(value) {
			                    if (value !== 0) {
			                        var num = Math.round(value ) ;
                                    var text = iskm?"Km/h":'%'
			                        return parseInt(num).toFixed(0)+text;
			                    } else {
			                        return 0;
			                    }
			                },
			                offsetCenter: [0, "300%"],
			                textStyle: {
			                    padding: [0, 0, 0, 0],
			                    fontSize: 23,
			                    color: "#e7d431"
			                }
			            },
			            title: { //标题
			                show: true,
			                offsetCenter: [0, "400%"], // x, y，单位px
			                textStyle: {
			                    color: "#31F3FF",
			                    fontSize: 23, //表盘上的标题文字大小
			                    fontWeight: 400,
			                    fontFamily: 'MicrosoftYaHei'
			                }
			            },
			            data: [data],
			            pointer: {
			                show: true,
			                length: '70%',
			                radius: '20%',
			                width: 3 //指针粗细

			            },
			            animationDuration: 4000,
			        },
			        { //指针上的圆
		            type: 'pie',
		            tooltip: {
		                show: false
		            },
		            hoverAnimation: false,
		            legendHoverLink: false,
		            radius: ['0%', '4%'],
		            center: ['50%', '50%'],
		            label: {
		                normal: {
		                    show: false
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            data: [{
		                value: 120,
		                itemStyle: {
		                    normal: {
		                        color: "#ffffff",
		                    },
		                }
		            }]
		        },

			    ]
			};

return option
 }
/**
 * 仪表盘简洁版
 * @param data
 * @param chartInfo
 * @returns
 */

 echartMap.dashboardThree = function(data = {}) {
    var value = '4';
    var getmax = 100;

    var getvalue = data.value;

 let option = {
        title: [
            {
                text: data.name,
                top:'5%',
                // bottom: '5%',

                x: 'center',

                borderColor: '#1598FF',

                borderWidth: 1,

                borderRadius: 56,

                backgroundColor: '#1598FF33',

                padding: [6, 25],

                textStyle: {
                    // fontWeight: 'bold',

                    fontSize: 12,

                    color: '#fff',
                },
            },
        ],

        angleAxis: {
            show: false,

            max: (getmax * 360) / 270, //-45度到225度，二者偏移值是270度除360度

            type: 'value',

            startAngle: 225, //极坐标初始角度

            splitLine: {
                show: false,
            },
        },
        barMaxWidth: 10, //圆环宽度

        radiusAxis: {
            show: false,

            type: 'category',
        },

        //圆环位置和大小

        polar: {
            center: ['50%', '60%'],

            radius: '120%',
        },

        series: [
            {
                type: 'bar',

                data: [
                    {
                        //上层圆环，显示数据

                        value: getvalue,

                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                {
                                    offset: 0,
                                    color:data.color+'43',
                                },
                                {
                                    offset: 1,
                                    color:data.color
                                },
                            ]),
                        },
                    },
                ],

                barGap: '-100%', //柱间距离,上下两层圆环重合

                coordinateSystem: 'polar',

                roundCap: true, //顶端圆角

                z: 3, //圆环层级，同zindex
            },

            {
                //下层圆环，显示最大值

                type: 'bar',

                data: [
                    {
                        value: getmax,

                        itemStyle: {
                            color: data.color,

                            opacity: 0.3,

                            borderWidth: 0,
                        },
                    },
                ],

                barGap: '-100%',

                coordinateSystem: 'polar',

                roundCap: true,

                z: 1,
            },

            //仪表盘

            {
                type: 'gauge',

                startAngle: 225, //起始角度，同极坐标

                endAngle: -45, //终止角度，同极坐标

                axisLine: {
                    show: false,
                },

                splitLine: {
                    show: false,
                },

                axisTick: {
                    show: false,
                },

                axisLabel: {
                    show: false,
                },

                splitLabel: {
                    show: false,
                },

                pointer: {
                    // 分隔线
                    show:false,//是否显示指针
                    shadowColor: 'auto', //默认透明

                    shadowBlur: 5,

                    length: '50%',

                    width: '2',
                },

                itemStyle: {
                    color: '#1598FF',

                    borderColor: '#1598FF',

                    borderWidth: 3,
                },

                detail: {
                    formatter: function (params) {
                        return getvalue + '%';
                    },

                    color: data.color,

                    fontSize: 20,

                    offsetCenter: [0, '30%'],
                },

                title: {
                    show: false,
                },

                data: [
                    {
                        value: getvalue,
                    },
                ],
            },


        ],
    };


return option
 }

/**
 * 仪表盘2，支持多个参数控制，如示例
 * @param data
 * @returns {{series: *[]}}
 */
 echartMap.dashboard2 = function(data=[]){
     var highlight = '#03b7c9';

     /*var demoData = [
         { name: '电压', value: 70, unit: 'Km/h', pos: ['50%', '50%'], range: [0, 280], splitNum: 14 }
     ];*/

     let option = {
         // backgroundColor: '#222939',

         series: (function() {
             var result = [];

             data.forEach(function(item) {
                 result.push(
                   // 外围刻度
                   {
                       type: 'gauge',
                       center: item.pos?item.pos:['50%', '50%'],
                       radius: '63.33%',  // 1行3个
                       splitNumber: item.splitNum || 10,
                       min: item.range[0],
                       max: item.range[1],
                       startAngle: 225,
                       endAngle: -45,
                       axisLine: {
                           show: true,
                           lineStyle: {
                               width: 2,
                               shadowBlur: 0,
                               color: [
                                   [1, highlight]
                               ]
                           }
                       },
                       axisTick: {
                           show: true,
                           lineStyle: {
                               color: highlight,
                               width: 1
                           },
                           length: -5,
                           splitNumber: 10
                       },
                       splitLine: {
                           show: true,
                           length: -14,
                           lineStyle: {
                               color: highlight,
                           }
                       },
                       axisLabel: {
                           distance: -20,
                           textStyle: {
                               color: highlight,
                               fontSize: '14',
                               fontWeight: 'bold'
                           }
                       },
                       pointer: {
                           show: 0
                       },
                       detail: {
                           show: 0
                       }
                   },

                   // 内侧指针、数值显示
                   {
                       name: item.name,
                       type: 'gauge',
                       center: item.pos?item.pos:['50%', '50%'],
                       radius: '60.33%',
                       startAngle: 225,
                       endAngle: -45,
                       min: item.range[0],
                       max: item.range[1],
                       axisLine: {
                           show: true,
                           lineStyle: {
                               width: 16,
                               color: [
                                   [1, 'rgba(255,255,255,.1)']
                               ]
                           }
                       },
                       axisTick: {
                           show: 0,
                       },
                       splitLine: {
                           show: 0,
                       },
                       axisLabel: {
                           show: 0
                       },
                       pointer: {
                           show: true,
                           length: '105%'
                       },
                       detail: {
                           show: true,
                           offsetCenter: [0, '100%'],
                           textStyle: {
                               fontSize: 20,
                               color: 'yellow'
                           },
                           formatter: [
                               '{value} ' + (item.unit || ''),
                               '{name|' + item.name + '}'
                           ].join('\n'),
                           rich: {
                               name: {
                                   fontSize: 18,
                                   lineHeight: 30,
                                   color: '#5ee3ff'
                               }
                           }
                       },
                       itemStyle: {
                           normal: {
                               color: highlight,
                           }
                       },
                       data: [{
                           value: item.value
                       }]
                   }
                 );
             });

             return result;
         })()
     };
     return option;
 }

/**
 * 双向柱状图
 * @param data
 * @param chartInfo
 * @returns
 */

 echartMap.twoBar = function(data= [] ) {

let legendData = new Set();
legendData.add("");
// legendData.add("拥堵");
// legendData.add("周期异常");
// legendData.add("绿信比异常");


let yAxisDataN = new Set();
let yAxisDataV = new Set();

_.forEach(data, (d) => {
    yAxisDataN.add(d.name);
    _.forEach(d.data, (item) => {
        // yAxisDataN.add(item.name);
        // if (d.name == 'left') {
        //     yAxisDataN.add(item.name);
        // }
        // if (d.name == 'right') {
        //     yAxisDataV.add(item.name);
        // }
        // yAxisData.add(item.label);
    });
});

let top = 20;
let bottom = 60;

legendData = [...legendData];
yAxisDataN = [...yAxisDataN];
yAxisDataV = [...yAxisDataV];
let a =_.map(data, d =>  d.value)


let option = {
    tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        show:false,
        icon: "circle",
        left: 'center',
        bottom: 24,

        formatter: (name) => {


            return '{a|' + name + '}'

        },
        textStyle: {
            rich: {
                a: {
                    padding: [8, 15, 8, 15],
                    align: 'center',
                    //  backgroundColor: "#238bf2",

                },
                b: {
                    padding: [8, 15, 8, 15],
                    align: 'center',
                    backgroundColor: "#f9c807"
                }
            }
        },
        data: legendData
    },
    grid: [{
        left: '10%',
        width: '39%',
        containLabel: true,
        bottom
    }, {
        left: '50%',
        width: '0%',
        top: top + 16
    }, {
        right: '10%',
        width: '39%',
        containLabel: true,
        bottom
    }].map(item => _.merge({
        top
    }, item)),
    xAxis: [
        {
        type: 'value',
        inverse: true,
        axisLabel: {
            show: true
        },
        axisLine: {
            show: true
        },
        axisTick: {
            show: false
        },
        splitLine: {
            show: false
        }
    }, {
        gridIndex: 1,
        show: false
    }, {
        gridIndex: 2,
        type: 'value',
        axisLabel: {
            show: true
        },
        axisLine: {
            show: true
        },
        axisTick: {
            show: false
        },
        splitLine: {
            show: false
        }
    }].map((item) => _.merge(item, {
        // max: 500,
        minInterval: 1,
        axisLabel: {
            color: '#fff',
            margin: 8
        },
        splitLine: {
            lineStyle: {
                color: '#E0E0E0',
                type: 'dashed'
            }
        },
    })),
    yAxis: [{
            name: '', //坐标轴名称
            nameLocation: 'center',
            nameGap: 55,
            position: 'left',
            axisLabel: {
                color: '#fff',
                show: false,
                textStyle: {
                    color: '#fff'
                }
            },
            axisLine: {
                show: false,
                onZero: false,
                lineStyle: {
                    color: '#6a82ab'
                },

            },


            type: 'category',
            inverse: false,

            axisTick: {
                show: false
            },

            nameRotate: 90,

            data: yAxisDataN
        },
        {
            gridIndex: 1,
            position: 'center',
            type: 'category',
            axisLabel: {
                show: false

            },
            axisLine: {
                show: false
            }
        },
        {
            gridIndex: 2,
            position: 'left',
            axisLabel: {
                color: '#fff',
                show: true,
                textStyle: {
                    color: '#fff'
                }
            },
            axisLine: {
                show: false
            },
            type: 'category',
            inverse: false,

            axisTick: {
                show: false
            },

            data: yAxisDataN
        }
    ],
    series: [{
            name: '总数',
            label: {
                color: '#fff',
                position: 'left'
            },

            itemStyle: {
                // color: '#63bccf',
                color: function(params) {
                    　//首先定义一个数组
                    // var colorList = [
                    // '#e67504','#e59902','#64BD3D','#EE9201','#29AAE3',
                    // '#B74AE5','#e59902','#e67504'
                    // ];
                    var colorList = [
                        // new echarts.graphic.LinearGradient(
                        //     0, 0, 1, 1,
                        //     [
                        //         { offset: 0, color: '#e79300' },                   //柱图渐变色
                        //         { offset: 1, color: '#e70000' },                   //柱图渐变色
                        //     ]
                        // ),
                        // new echarts.graphic.LinearGradient(
                        //     0, 0, 1, 1,
                        //     [
                        //         { offset: 0, color: '#dfe700' },                   //柱图渐变色
                        //         { offset: 1, color: '#e79300' },                   //柱图渐变色
                        //     ]
                        // ),
                        new echarts.graphic.LinearGradient(
                            0, 0, 1, 1,
                            [
                                { offset: 0, color: '#dfe700' },                   //柱图渐变色
                                { offset: 1, color: '#e79300' },                   //柱图渐变色
                            ]
                        ),
                        new echarts.graphic.LinearGradient(
                            0, 0, 1, 1,
                            [
                                { offset: 0, color: '#dfe700' },                   //柱图渐变色
                                { offset: 1, color: '#e79300' },                   //柱图渐变色
                            ]
                        ),
                        new echarts.graphic.LinearGradient(
                            0, 0, 1, 1,
                            [
                                { offset: 0, color: '#dfe700' },                   //柱图渐变色
                                { offset: 1, color: '#e79300' },                   //柱图渐变色
                            ]
                        ),
                        new echarts.graphic.LinearGradient(
                            0, 0, 1, 1,
                            [
                                { offset: 0, color: '#dfe700' },                   //柱图渐变色
                                { offset: 1, color: '#e79300' },                   //柱图渐变色
                            ]
                        ),
                        new echarts.graphic.LinearGradient(
                            0, 0, 1, 1,
                            [
                                { offset: 0, color: '#dfe700' },                   //柱图渐变色
                                { offset: 1, color: '#e79300' },                   //柱图渐变色
                            ]
                        ),
                        new echarts.graphic.LinearGradient(
                            0, 0, 1, 1,
                            [
                                { offset: 0, color: '#dfe700' },                   //柱图渐变色
                                { offset: 1, color: '#e79300' },                   //柱图渐变色
                            ]
                        ),
                        new echarts.graphic.LinearGradient(
                            0, 0, 1, 1,
                            [
                                { offset: 0, color: '#dfe700' },                   //柱图渐变色
                                { offset: 1, color: '#e79300' },                   //柱图渐变色
                            ]
                        ),
                        new echarts.graphic.LinearGradient(
                            0, 0, 1, 1,
                            [
                                { offset: 0, color: '#dfe700' },                   //柱图渐变色
                                { offset: 1, color: '#e79300' },                   //柱图渐变色
                            ]
                        ),
                    ];
                    // return colorList[params.dataIndex]
                    // return         new echarts.graphic.LinearGradient(
                    //         0, 0, 1, 1,
                    //         [
                    //             { offset: 0, color: '#e79300' },                   //柱图渐变色
                    //             { offset: 1, color: '#e70000' },                   //柱图渐变色
                    //         ])
                    // },
                    return new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: '#468AFF'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(130, 93, 255, 0.12)'
                                        }
                                    ])
                                },
                    　　　　　//以下为是否显示
                    label: {
                        show: false
                    },

                barBorderRadius: [4, 0, 0, 4]
            },
            data: _.map(data, d => d.value1)
        },
        {
            xAxisIndex: 2,
            yAxisIndex: 2,
            name: '总数',
            label: {
                color: '#fff',
                position: 'right'
            },

            itemStyle: {
                color: function(params) {
                    　//首先定义一个数组
                    // var colorList = [
                    // '#e67504','#e59902','#64BD3D','#EE9201','#29AAE3',
                    // '#B74AE5','#e59902','#e67504'
                    // ];
                    var colorList = [
                        // new echarts.graphic.LinearGradient(
                        //     0, 0, 1, 1,
                        //     [
                        //         { offset: 1, color: '#e79300' },                   //柱图渐变色
                        //         { offset: 0, color: '#e70000' },                   //柱图渐变色
                        //     ]
                        // ),
                        // new echarts.graphic.LinearGradient(
                        //     0, 0, 1, 1,
                        //     [
                        //         { offset: 1, color: '#dfe700' },                   //柱图渐变色
                        //         { offset: 0, color: '#e79300' },                   //柱图渐变色
                        //     ]
                        // ),
                        new echarts.graphic.LinearGradient(
                            0, 0, 1, 1,
                            [
                                { offset: 1, color: '#42f6f5' },                   //柱图渐变色
                                { offset: 0, color: '#2e82f6' },                   //柱图渐变色
                            ]
                        ),
                        new echarts.graphic.LinearGradient(
                            0, 0, 1, 1,
                            [
                                { offset: 1, color: '#42f6f5' },                   //柱图渐变色
                                { offset: 0, color: '#2e82f6' },                   //柱图渐变色
                            ]
                        ),
                        new echarts.graphic.LinearGradient(
                            0, 0, 1, 1,
                            [
                                { offset: 1, color: '#42f6f5' },                   //柱图渐变色
                                { offset: 0, color: '#2e82f6' },                   //柱图渐变色
                            ]
                        ),
                        new echarts.graphic.LinearGradient(
                            0, 0, 1, 1,
                            [
                                { offset: 1, color: '#42f6f5' },                   //柱图渐变色
                                { offset: 0, color: '#2e82f6' },                   //柱图渐变色
                            ]
                        ),
                        new echarts.graphic.LinearGradient(
                            0, 0, 1, 1,
                            [
                                { offset: 1, color: '#42f6f5' },                   //柱图渐变色
                                { offset: 0, color: '#2e82f6' },                   //柱图渐变色
                            ]
                        ),

                    ];
                    // return colorList[params.dataIndex]
                    // return new echarts.graphic.LinearGradient(
                    //     0, 0, 1, 1,
                    //     [
                    //         { offset: 1, color: '#42f6f5' },                   //柱图渐变色
                    //         { offset: 0, color: '#2e82f6' },                   //柱图渐变色
                    //     ]
                    // )
                        return new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: 'rgba(211, 46, 88, 0.12)'
                                },
                                {
                                    offset: 1,
                                    color: '#FDC4A0'
                                }
                            ])
                    },

                barBorderRadius: [0, 4, 4, 0]
            },
            data: _.map(data, d => d.value2)
        },
    ].map(item => _.merge(item, {
        type: 'bar',
        barWidth: 8,
        label: {
            show: false,
            fontFamily: 'Rubik-Medium',
            fontSize: 14,
            distance: 10
        }
    }))
};
return option
 }
/**
 * 双向柱状图   有酷炫效果
 * @param data
 * @param chartInfo
 * @returns
 */

 echartMap.twoBarCool = function(data= [] ) {
     console.log('这是数据11111111',data)
    // var myData = []
    // var lastYearData = {
    //     1: []
    // }
    // var thisYearData = {
    //     1: []
    // }
    //  data.forEach(e=>{
    //      myData.push(e.name)
    //      lastYearData[1].push(e.value1)
    //      thisYearData[1].push(e.value2)
    //  })
    //  console.log(myData,lastYearData,thisYearData)
    var myData = ['一审服判息诉率', '撤诉率', '调解率', '实际执行率', '裁判自动履行率', '执行标的到位率', '再审审查率']
    var lineData = [100, 100, 100, 100, 100, 100, 100]
    var lastYearData = {
        1: [3, 20, 62, 34, 55, 65, 33]
    }
    var thisYearData = {
        1: [50, 38, 23, 39, 66, 66, 79]
    }
    var timeLineData = [1]
    var background = "#0e2147"; //背景

    var option = {
        baseOption: {
            backgroundColor: background,
            timeline: {
                show: false,
                top: 0,
                data: []
            },
            legend : {
                top : '0%',
                // left : '31%',
                itemWidth : 8,
                itemHeight : 8,
                itemGap: 143,
                icon : 'horizontal',
                textStyle : {
                    color : '#ffffff',
                    fontSize : 16,
                },
                data: ['2017', '2018']
            },
            grid: [{
                show: false,
                left: '5%',
                top: '15%',
                bottom: '8%',
                containLabel: true,
                width: '37%'
            }, {
                show: false,
                left: '51%',
                top: '15%',
                bottom: '8%',
                width: '0%'
            }, {
                show: false,
                right: '2%',
                top: '15%',
                bottom: '8%',
                containLabel: true,
                width: '37%'
            }],
            xAxis: [{
                type: 'value',
                inverse: true,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                position: 'top',
                axisLabel: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }, {
                gridIndex: 1,
                show: false
            }, {
                gridIndex: 2,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                position: 'top',
                axisLabel: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }],
            yAxis: [{
                type: 'category',
                inverse: true,
                position: 'right',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                data: myData
            }, {
                gridIndex: 1,
                type: 'category',
                inverse: true,
                position: 'left',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#ffffff',
                        fontSize: 12
                    }

                },
                data: myData.map(function(value) {
                    return {
                        value: value,
                        textStyle: {
                            align: 'center'
                        }
                    }
                })
            }, {
                gridIndex: 2,
                type: 'category',
                inverse: true,
                position: 'left',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false

                },
                data: myData
            }],
            series: []

        },
        options: []
    }

    option.baseOption.timeline.data.push(timeLineData[0])
    option.options.push({
        series: [
        {
            type: 'pictorialBar',
            xAxisIndex: 0,
            yAxisIndex: 0,
            symbol: 'rect',
            itemStyle: {
                normal: {
                    color: 'rgba(3,147,114,0.27)'
                }
            },
            barWidth: 10,
            symbolRepeat: true,
            symbolSize: 8,
            data: lineData,
            barGap: '-100%',
            barCategoryGap: 0,
            label: {
                normal: {
                    show: true,
                    formatter: (series) => {
                        return lastYearData[timeLineData[0]][series.dataIndex] + '%'
                    },
                    position: 'insideTopLeft',
                    textStyle:{
                        color: '#ffffff',
                        fontSize: 12,
                    },
                    offset: [0, -35],
                }
            },
            z: -100,
                animationEasing: 'elasticOut',
                 animationDelay: function (dataIndex, params) {
                return params.index * 30;
            }
        }, {
            name: '2017',
            type: 'pictorialBar',
            xAxisIndex: 0,
            yAxisIndex: 0,
            symbol: 'rect',
            barWidth: 10,
            itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color: '#039372'
                }
            },
            symbolRepeat: true,
            symbolSize: 8,
            data: lastYearData[timeLineData[0]],
            animationEasing: 'elasticOut',
            animationDelay: function (dataIndex, params) {
                return params.index * 30 * 1.1;
            }
        },
        {
            type: 'pictorialBar',
            xAxisIndex: 2,
            yAxisIndex: 2,
            symbol: 'rect',
            itemStyle: {
                normal: {
                    color: 'rgba(54,215,182,0.27)'
                }
            },
            barWidth: 10,
            symbolRepeat: true,
            symbolSize: 8,
            data: lineData,
            barGap: '-100%',
            barCategoryGap: 0,
            label: {
                normal: {
                    show: true,
                    formatter: (series) => {
                        return thisYearData[timeLineData[0]][series.dataIndex] + '%'
                    },
                    position: 'insideTopRight',
                    textStyle:{
                        color: '#ffffff',
                        fontSize: 12,
                    },
                    offset: [0, -35],
                }
            },
            z: -100,
                animationEasing: 'elasticOut',
                 animationDelay: function (dataIndex, params) {
                return params.index * 30;
            }
        }, {
            name: '2018',
            type: 'pictorialBar',
            xAxisIndex: 2,
            yAxisIndex: 2,
            symbol: 'rect',
            barWidth: 10,
            itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color: '#36d7b6'
                }
            },
            symbolRepeat: true,
            symbolSize: 8,
            data: thisYearData[timeLineData[0]],
            animationEasing: 'elasticOut',
            animationDelay: function (dataIndex, params) {
                return params.index * 30 * 1.1;
            }
        }
        ]
    });

return option
 }
/**
 * 双向柱状图   two
 * @param data
 * @param chartInfo
 * @returns
 */

 echartMap.twoBarCoolTwo = function(data= [] ) {
     console.log('这是数据11111111',data)
     let Ydata=[]
     let leftData=[]
     let rightData=[]
     data.forEach(e=>{
        Ydata.push(e.name)
        leftData.push(e.value1)
        rightData.push(e.value1)
     })
   let a = Math.max(...leftData)
   let b = Math.max(...rightData)
   let LeftMax = []
   let rightMax = []
   leftData.forEach(e=>{
        LeftMax.push(a)
        rightMax.push(b)
   })
     var option = {
        baseOption: {
            timeline: {
                show: false,
                top: 0,
                data: []
            },
            grid: [
                // 左边柱子
                {
                    show: false,
                    left: '10',
                    top: '10%',
                    bottom: '0',
                    containLabel: true,
                    width: '40%'
                },
                // 中间年龄
                {
                    show: false,
                    left: '51%',
                    top: '10%',
                    bottom: '2.5%',
                    width: '0%'
                },
                // 右边柱子
                {
                    show: false,
                    right: '10',
                    top: '10%',
                    bottom: '0',
                    containLabel: true,
                    width: '40%'
                }
            ],
            xAxis: [{
                    type: 'value',
                    inverse: true,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        color: '#08093f',
                    },
                    splitLine: {
                        show: false
                    }
                },
                {
                    gridIndex: 1,
                    show: false
                },
                {
                    gridIndex: 2,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        color: '#08093f',
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            yAxis: [{
                    type: 'category',
                    inverse: true,
                    position: 'right',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    data: Ydata
                },
                {
                    gridIndex: 1,
                    type: 'category',
                    inverse: true,
                    position: 'center',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            align: 'center',
                            color: '#9AA6E1',
                            fontSize: 15
                        }
                    },
                    data: Ydata
                },
                {
                    gridIndex: 2,
                    type: 'category',
                    inverse: true,
                    position: 'left',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    data: Ydata
                }
            ],
            series: []
        },
        options: [{
            series: [{
                    name: '背景1',
                    type: 'bar',
                    barWidth: 10,
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    z:-10,
                    barGap: '-100%',
                    barCategoryGap: 0,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5,
                            color: '#0a0c47'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            formatter: series => {
                                return series.data + '人';
                                //console.info(series.data);
                            },
                            position: 'insideTopLeft',
                            textStyle: {
                                color: '#ffffff',
                                fontSize: 12
                            },
                            offset: [0, -25]
                        }
                    },
                    data: LeftMax
                },
                {
                    name: '2017',
                    type: 'bar',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    barWidth: 10,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5,
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#468AFF'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(130, 93, 255, 0.12)'
                                }
                            ])
                        }
                    },
                    data: leftData
                },
                {
                    name: '背景2',
                    type: 'bar',
                    barWidth: 10,
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    z:-10,
                    barGap: '-100%',
                    barCategoryGap: 0,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5,
                            color: '#0a0c47'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            formatter: series => {
                                return series.data + '人';
                                //console.info(series.data);
                            },
                            position: 'insideTopRight',
                            textStyle: {
                                color: '#ffffff',
                                fontSize: 12
                            },
                            offset: [0, -25]
                        }
                    },
                    data: rightMax
                },
                {
                    name: '2018',
                    type: 'bar',
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    barWidth: 10,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5,
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: 'rgba(211, 46, 88, 0.12)'
                                },
                                {
                                    offset: 1,
                                    color: '#FDC4A0'
                                }
                            ])
                        }
                    },
                    data: rightData
                }
            ]
        }]
    }

return option
 }


/**
 * 气泡图
 * @param data
 * @param chartInfo
 * @returns
 */

 echartMap.bubble = function(data= [] ) {
    let series = []
            data.forEach((e,i)=>{
                if(i==0||i==1){
                    series.push({
                        "name": e.name,
                        "value": e.value,
                        "symbolSize": 100,
                        "draggable": false,
                        "itemStyle": {
                            "normal": {
                                "borderColor": "rgb(206, 188, 11)",
                                "borderWidth": 1,
                                // "shadowBlur":150,
                                // "shadowColor": "rgb(206, 188, 11)",
                                color: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.5,
                                    colorStops: [{
                                        offset: 0, color: 'rgb(206, 188, 11,0)' // 0% 处的颜色
                                    }, {
                                        offset: 0.5, color: 'rgb(206, 188, 11,0.1)' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'rgb(206, 188, 11,0.5)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }

                            }
                        }
                    })
                }else{
                    series.push({
                        "name": e.name,
                        "value": e.value,
                        "symbolSize": 80,
                        "draggable": false,
                        "itemStyle": {
                            "normal": {
                                "borderColor": "rgb(16,149,157)",
                                "borderWidth": 1,
                                // "shadowBlur": 50,
                                // "shadowColor": "#10959d",
                                color: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.5,
                                    colorStops: [{
                                        offset: 0, color: 'rgb(16,149,157,0)' // 0% 处的颜色
                                    }, {
                                        offset: 0.5, color: 'rgb(16,149,157,0.1)' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'rgb(16,149,157,0.5)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            }
                        }
                    })
                }
            })
  let  option = option = {
    // backgroundColor: '#fff',

    tooltip: {},
    animationDurationUpdate: function(idx) {
        // 越往后的数据延迟越大
        // conso
        return idx * 100;
    },
    animationEasingUpdate: 'bounceIn',
    color: ['#fff', '#fff', '#fff'],
    series: [{
        type: 'graph',
        layout: 'force',
        force: {
            repulsion: 100,
            edgeLength: 10
        },
        roam: false,
        draggable: false,
        label: {
            show: true,
            formatter: [
                '{name|{b}}',
                '{title|{c}}'

            ].join('\n'),
            rich: {
                title: {
                    fontSize: 18,
                    color: '#fff',
                    fontWeight:700,
                    align: 'center'
                },
                name: {
                    fontSize: 14,
                    color: '#fff',
                    align: 'center'
                }
            }
        },
        data: series
    }]
}
return option
 }
/**
 * 关系图
 * @param data
 * @param chartInfo
 * @returns
 */

 echartMap.diagram = function(data= [] ) {
    let resData = {
        nodes: [{
          name: '操作系统集团',
          category: 0
        }, {
          name: '浏览器有限公司',
          category: 0
        }, {
          name: 'HTML科技',
          category: 0
        }, {
          name: 'JavaScript科技',
          category: 0
        }, {
          name: 'CSS科技',
          category: 0
        }, {
          name: 'Chrome',
          category: 1
        }, {
          name: 'IE',
          category: 1
        }, {
          name: 'Firefox',
          category: 1
        }, {
          name: 'Safari',
          category: 1
        }],

        links: [{
          source: '浏览器有限公司',
          target: '操作系统集团',
          name: '参股'
        }, {
          source: 'HTML科技',
          target: '浏览器有限公司',
          name: '参股'
        }, {
          source: 'CSS科技',
          target: '浏览器有限公司',
          name: '参股'
        }, {
          source: 'JavaScript科技',
          target: '浏览器有限公司',
          name: '参股'
        }, {
          source: 'Chrome',
          target: '浏览器有限公司',
          name: '董事'
        }, {
          source: 'IE',
          target: '浏览器有限公司',
          name: '董事'
        }, {
          source: 'Firefox',
          target: '浏览器有限公司',
          name: '董事'
        }, {
          source: 'Safari',
          target: '浏览器有限公司',
          name: '董事'
        }, {
          source: 'Chrome',
          target: 'JavaScript科技',
          name: '法人'
        }]
      }

      const color1 = '#006acc';
      const color2 = '#ff7d18';
      const color3 = '#10a050';

      resData.nodes.forEach(node => {
        if (node.category === 0) {
          node.symbolSize = 100;
          node.itemStyle = {
            color: color1
          };
        } else if (node.category === 1) {
          node.itemStyle = {
            color: color2
          };
        }
      });

      resData.links.forEach(link => {
        link.label = {
          align: 'center',
          fontSize: 12
        };

        if (link.name === '参股') {
          link.lineStyle = {
            color: color2
          }
        } else if (link.name === '董事') {
          link.lineStyle = {
            color: color1
          }
        } else if (link.name === '法人') {
          link.lineStyle = {
            color: color3
          }
        }
      });

      let categories = [{
          name: '公司',
          itemStyle: {
              color: color1
          }
        },
        {
          name: '董事',
          itemStyle: {
              color: color2
          }
      }]

      console.log(resData,'!!!!!!!!!!!!')

      let option = {
        title: {
          show: false,
          text: '关系图谱',
        },
        legend: [{
          show: false,
          // selectedMode: 'single',
          data: categories.map(x => x.name),
          icon: 'circle'
        }],
        series: [{
          type: 'graph',
          layout: 'force',
          symbolSize: 58, // 58
          draggable: false,
          roam: true,
          focusNodeAdjacency: true,
          categories: categories,
          // edgeSymbol: ['', 'arrow'], // 箭头
          // edgeSymbolSize: [80, 10],
          edgeLabel: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 20
              },
              formatter(x) {
                return x.data.name;
              }
            }
          },
          label: {
              show: true,
              // position: 'bottom',
              // textStyle: {
              //   fontSize: 12
              // }
          },
          force: {
            repulsion: 2000, // 2000
            edgeLength: [100, 120] // 120
          },
          data: resData.nodes,
          links: resData.links
        }]
      }

return option
 }
/**
 * 3d饼图
 * @param data
 * @param chartInfo
 * @returns
 */

 echartMap.pie3D = function(data= [] ) {
   // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
    function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k,height) {

        // 计算
        let midRatio = (startRatio + endRatio) / 2;

        let startRadian = startRatio * Math.PI * 2;
        let endRadian = endRatio * Math.PI * 2;
        let midRadian = midRatio * Math.PI * 2;

        // 如果只有一个扇形，则不实现选中效果。
        if (startRatio === 0 && endRatio === 1) {
            isSelected = false;
        }

        // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
        k = typeof k !== 'undefined' ? k : 1 / 3 ;

        // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
        let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
        let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

        // 计算高亮效果的放大比例（未高亮，则比例为 1）
        let hoverRate = isHovered ? 1.05 : 1;

        // 返回曲面参数方程
        return {

            u: {
                min: -Math.PI,
                max: Math.PI * 3,
                step: Math.PI / 32
            },

            v: {
                min: 0,
                max: Math.PI * 2,
                step: Math.PI / 20
            },

            x: function(u, v) {
                if (u < startRadian) {
                    return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
                }
                if (u > endRadian ){
                    return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
                }
                return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
            },

            y: function(u, v) {
                if (u < startRadian) {
                    return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
                }
                if (u > endRadian ){
                    return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
                }
                return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
            },

            z: function(u, v) {
                if (u < - Math.PI * 0.5 ) {
                    return Math.sin(u);
                }
                if (u > Math.PI * 2.5 ){
                    return Math.sin(u);
                }
                return Math.sin(v) > 0 ? 20 : -1; //Math.sin(v) > 0 ? 1*height : -1;
            }
        };
    }

    // 生成模拟 3D 饼图的配置项
    function getPie3D(pieData, internalDiameterRatio) {

        let series = [];
        let sumValue = 0;
        let startValue = 0;
        let endValue = 0;
        let legendData = [];
        let k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio): 1 / 3;

        // 为每一个饼图数据，生成一个 series-surface 配置
        for (let i = 0; i < pieData.length; i++) {

            sumValue += pieData[i].value;

            let seriesItem = {
                name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
                type: 'surface',
                parametric: true,
                wireframe: {
                    show: false
                },
                pieData: pieData[i],
                pieStatus: {
                    selected: false,
                    hovered: false,
                    k: k
                }
            };

            if (typeof pieData[i].itemStyle != 'undefined') {

                let itemStyle = {};

                typeof pieData[i].itemStyle.color != 'undefined' ? itemStyle.color = pieData[i].itemStyle.color : null;
                typeof pieData[i].itemStyle.opacity != 'undefined' ? itemStyle.opacity = pieData[i].itemStyle.opacity : null;

                seriesItem.itemStyle = itemStyle;
            }
            series.push(seriesItem);
        }

        // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
        // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
        for (let i = 0; i < series.length; i++) {
            endValue = startValue + series[i].pieData.value;
            console.log(series[i]);
            series[i].pieData.startRatio = startValue / sumValue;
            series[i].pieData.endRatio = endValue / sumValue;
            series[i].parametricEquation = getParametricEquation(series[i].pieData.startRatio, series[i].pieData.endRatio, false, false, k,series[i].pieData.value);

            startValue = endValue;

            legendData.push(series[i].name);

        }



        // 准备待返回的配置项，把准备好的 legendData、series 传入。
        let option = {
            tooltip: {
                formatter: params => {
                    if (params.seriesName !== 'mouseoutSeries') {
                        return `${params.seriesName}<br/><span style="display:inline-block;margin-right:5px;
                        border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>
                        ${option.series[params.seriesIndex].pieData.value}(
                        ${(option.series[params.seriesIndex].pieData.value/sumValue*100).toFixed(2)}%)`;
                    }
                }
            },
            legend: {
                data: legendData,
                orient: 'vertical',
                left: 'left',
                y:'center',
                textStyle:{
                    color:'#fff',
                    fontSize:16
                }
            },
            xAxis3D: {
                min: -1,
                max: 1
            },
            yAxis3D: {
                min: -1,
                max: 1
            },
            zAxis3D: {
                min: -1,
                max: 1
            },
            grid3D: {
                show: false,
                boxHeight: 3,
                //top: '30%',
                bottom: '50%',
                // environment: '#021041',
                viewControl:{
                    distance:200,
                    alpha:45,
                    beta:130,
                },

            },
            series: series
        };

        return option;
    }
    let color = [ {
        "opacity": 0.8,
        "color": "#ffc033"
      }, {
        "opacity": 0.8,
        "color": "#33fefa"
      }, {
        "opacity": 0.8,
        "color": "#32ff94"
      }, {
        "opacity": 0.8,
        "color": "#4f73ff" // '#33fefa', '#ffc033', '#32ff94', '#4f73ff', '#32c0fe', '#6f7991', '#7f384a'
      }]
      data.forEach((e,i)=>{
          e.itemStyle= color[i]
      })
    // 传入数据生成 option
    let option = getPie3D(data,2);
    return option
 }

 /**
 * 关系图
 * @param data
 * @param chartInfo
 * @returns
 */
echartMap.guanxi = function(data= []){
console.log(data)
var size = 70; //节点大小


var listdata = [];
var links = [];
var legendes = ["手机IMSI", "车辆", "车牌号码", "车辆"];
var texts = [];

let carImg = ['/image/chelianwang/3-sijia.png','/image/chelianwang/3-yunshu.png','/image/chelianwang/3-qita.png',
'/image/chelianwang/3-tezhong.png','/image/chelianwang/3-chuzu.png','/image/chelianwang/3-xinneng.png',]

var carNum = {
    "私家车": "私家车",
    "运输车": "运输车",
    "其他车型": "其他车型",
    "特种车": "特种车",
    "车租车": "车租车",
    "新能源车": "新能源车",
};
// const relationShipCar = ["匹配车牌号码", "匹配车牌号码", "匹配车牌号码", "匹配车牌号码", "匹配车牌号码", "匹配车牌号码", "匹配车牌号码", "匹配车牌号码", "匹配车牌号码"];
const relationShipCar = '';

var mainRelationShip = {
    车辆: ""
};

function setDataPerson(json, n) {
    var i = 0;
    for (var p in json) {
        listdata.push({
            x: 50,
            y: 100,
            "name": p,
            "showName": json[p],
            "symbol": 'image://' + "/image/chelianwang/cheliang.png",
            "symbolSize": [139/1.5, 76/1.5],
            "category": n,
            "draggable": "false",
            formatter: function(params) {
                return params.data.showName;
            },
            label: {
                position: 'bottom'
            }
        });
        i++;
    }
}

function setDataCar(json, n) {
    var i = 0;
    for (var p in json) {
        listdata.push({
            x: i * 50,
            y: size + i * 10,
            "name": p,
            "showName": json[p],
            "symbol": 'image://' + carImg[i],
            "symbolSize": size,
            "category": n,
            "draggable": "false",
            formatter: function(params) {
                return params.data.showName;
            },
            label: {
                position: 'bottom'
            }
        });
        i++;
    }
}

function setLinkData(json, relarr, title) {
    if (relarr !== "") {
        var i = 0;
        for (var p in json) {
            links.push({
                "source": p,
                "target": title,
                "value": relarr[i],
                lineStyle: {
                    normal: {
                        // text: relarr[i],
                        color: 'source'
                    }
                }
            });
            i++;
        }
    } else {
        for (var p2 in json) {
            links.push({
                "source": p2,
                "target": title,
                "value": "",
                lineStyle: {
                    normal: {
                        color: 'source'
                    }
                }
            });
        }
    }
}

for (var i = 0; i < legendes.length; i++) {
    texts.push({
        "name": legendes[i]
    });
}

// setDataPhone(phoneNum, 0);
setDataCar(carNum, 2);
setDataPerson(mainRelationShip, 3);

// setLinkData(phoneNum, phoneIMSI, legendes[3]);
setLinkData(carNum, relationShipCar, legendes[3]);

let option = {
    title: {
        text: "",
        top: "top",
        left: "left",
        textStyle: {
            color: '#000000'
        }
    },
    tooltip: {
        formatter: '{b}'
    },

    legend: {
        show:false,
        data: legendes,
        textStyle: {
            color: '#000000'
        },
        icon: 'circle',
        type: 'scroll',
        orient: 'vertical',
        left: 10,
        top: 20,
        bottom: 20,
        itemWidth: 10,
        itemHeight: 10
    },
    animationDuration: 1000,
    animationEasingUpdate: 'quinticInOut',
    series: [{
        type: 'graph',
        layout: 'force',
        force: {
            repulsion: 80,
            gravity: 0,
            edgeLength: 33,
            layoutAnimation: false,
    },
        data: listdata,
        links: links,
        categories: texts,
        draggable:false,
        roam: false,
        nodeScaleRatio: 0,
        focusNodeAdjacency: false,
        lineStyle: {
            normal: {
                opacity: 0.5,
                width: 1.5,
                curveness: 0
            }
        },
        label: {
            normal: {
                show: true,
                position: 'inside',
                textStyle: {
                    color: '#fff',
                    fontWeight: 'normal',
                    fontSize: "12" //字体大小
                },
                formatter: function(params) {
                    return params.data.showName
                },
                fontSize: 18,
                fontStyle: '600',
            }
        },
        edgeLabel: {
            normal: {
                show: true,
                textStyle: {
                    fontSize: 12
                },
                formatter: "{c}"
            }
        }
    }],
    color: ['#e8b842', '#41b1ef', '#667aed', '#347fbb', '#772cdc',
        '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0'
    ]
};
return option

}
 /**
 * 关系图带值
 * @param data
 * @param chartInfo
 * @returns
 */
echartMap.guanxiNum = function(data= []){
console.log(data)
var size = 60; //节点大小


var listdata = [];
var links = [];
var legendes = ["手机IMSI", "车辆", "车牌号码", "车辆"];
var texts = [];

let carImg = ['/image/chelianwang/4-1.png','/image/chelianwang/4-2.png','/image/chelianwang/4-3.png',
'/image/chelianwang/4-4.png']

var carNum = {
    // "私家车": "私家车1",
    // "运输车": "运输车",
    // "其他车型": "其他车型",
    // "特种车": "特种车",
};
data.forEach(e=>{
    carNum[e.name]= e.name+'：'+e.value
})
// const relationShipCar = ["匹配车牌号码", "匹配车牌号码", "匹配车牌号码", "匹配车牌号码", "匹配车牌号码", "匹配车牌号码", "匹配车牌号码", "匹配车牌号码", "匹配车牌号码"];
const relationShipCar = '';

var mainRelationShip = {
    车辆: ""
};

function setDataPerson(json, n) {
    var i = 0;
    for (var p in json) {
        listdata.push({
            x: 50,
            y: 100,
            "name": p,
            "showName": json[p],
            "symbol": 'image://' + "/image/chelianwang/zhong.png",
            "symbolSize": 120,
            "category": n,
            "draggable": "false",
            formatter: function(params) {
                return params.data.showName;
            },
            label: {
                position: 'bottom'
            }
        });
        i++;
    }
}

function setDataCar(json, n) {
    var i = 0;
    for (var p in json) {
        listdata.push({
            x: i * 50,
            y: size + i * 10,
            "name": p,
            "showName": json[p],
            "symbol": 'image://' + carImg[i],
            "symbolSize": 50,
            "category": n,
            "draggable": "false",
            formatter: function(params) {
                return params.data.showName;
            },
            label: {
                position: 'bottom',
                fontSize:16,
            }
        });
        i++;
    }
}

function setLinkData(json, relarr, title) {
    if (relarr !== "") {
        var i = 0;
        for (var p in json) {
            links.push({
                "source": p,
                "target": title,
                "value": relarr[i],
                lineStyle: {
                    normal: {
                        // text: relarr[i],
                        color: 'source'
                    }
                }
            });
            i++;
        }
    } else {
        for (var p2 in json) {
            links.push({
                "source": p2,
                "target": title,
                "value": "",
                lineStyle: {
                    normal: {
                        color: 'source'
                    }
                }
            });
        }
    }
}

for (var i = 0; i < legendes.length; i++) {
    texts.push({
        "name": legendes[i]
    });
}

// setDataPhone(phoneNum, 0);
setDataCar(carNum, 2);
setDataPerson(mainRelationShip, 3);

// setLinkData(phoneNum, phoneIMSI, legendes[3]);
setLinkData(carNum, relationShipCar, legendes[3]);

let option = {
    title: {
        text: "",
        top: "top",
        left: "left",
        textStyle: {
            color: '#000000'
        }
    },
    tooltip: {
        formatter: '{b}'
    },

    legend: {
        show:false,
        data: legendes,
        textStyle: {
            color: '#000000'
        },
        icon: 'circle',
        type: 'scroll',
        orient: 'vertical',
        left: 10,
        top: 20,
        bottom: 20,
        itemWidth: 10,
        itemHeight: 10
    },
    animationDuration: 1000,
    animationEasingUpdate: 'quinticInOut',
    series: [{
        type: 'graph',
        layout: 'force',
        force: {
            repulsion: 50,
            gravity: 0,
            edgeLength: 30,
            layoutAnimation: true,
        },
        data: listdata,
        links: links,
        categories: texts,
        roam: true,
        nodeScaleRatio: 0,
        focusNodeAdjacency: false,
        lineStyle: {
            normal: {
                opacity: 0.5,
                width: 1.5,
                curveness: 0
            }
        },
        label: {
            normal: {
                show: true,
                position: 'inside',
                textStyle: {
                    color: '#fff',
                    fontWeight: 'normal',
                    fontSize: "12" //字体大小
                },
                formatter: function(params) {
                    return params.data.showName
                },
                fontSize: 18,
                fontStyle: '500',
            }
        },
        edgeLabel: {
            normal: {
                show: true,
                textStyle: {
                    fontSize: 12
                },
                formatter: "{c}"
            }
        }
    }],
    color: ['#e8b842', '#41b1ef', '#667aed', '#347fbb', '#772cdc',
        '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0'
    ]
};
return option

}
 /**
 * 内外双饼图
 * @param data
 * @param chartInfo
 * @returns
 */
echartMap.twoPie = function(data= [] ,chartInfo={}){
    let data1 = chartInfo.data1 || []
    let data2 = chartInfo.data2 || []
    let dataAll = [...data1, ...data2]

    // 图例开关，默认开启
    let showLegend = chartInfo.showLegend!=null?chartInfo.showLegend:true;
    // 标签是否显示
    let showLabel = chartInfo.showLabel!=null?chartInfo.showLabel:true;

     var pie1Color = [ '#ffc033','#33fefa', '#32ff94','#4f73ff',  '#32c0fe', '#6f7991','#7f384a',];
     var pie2Color =['#942fff', '#f690d7', '#82faba', '#4f73ff', '#32c0fe', '#6f7991', '#7f384a'];
     var borderColor =['#ffc033', '#33fefa', '#32ff94', '#4f73ff', '#32c0fe', '#6f7991', '#7f384a'];
    //  var pieColor = ['#33fefa', '#ffc033', '#32ff94', '#4f73ff', '#32c0fe', '#6f7991', '#7f384a'];
    //  var borderColor =['#33fefa', '#ffc033', '#32ff94', '#4f73ff', '#32c0fe', '#6f7991', '#7f384a'];
     let pieData1 = [];
     let pieData2 = [];
     let nameArray = []
     for (let i = 0; i < data1.length; i++) {
         nameArray.push(data1[i].name)
         pieData1.push({
             name: data1[i].name,
             value: data1[i].value,
             itemStyle: {
                 normal: {
                     color: pie1Color[i],
                     borderWidth: 1,
                     borderColor: pie1Color[i]
                 }
             }
         });
     };
    for (let i = 0; i < data2.length; i++) {
        nameArray.push(data2[i].name)
        pieData2.push({
            name: data2[i].name,
            value: data2[i].value,
            itemStyle: {
                normal: {
                    color: pie2Color[i],
                    borderWidth: 1,
                    borderColor: pie2Color[i]
                }
            }
        });
    }

     var option01 = {
         tooltip: {
             trigger: 'item',
             formatter: '{a} <br/>{b} : {c} ({d}%)'
         },
         legend: {
             show: showLegend,
             orient: 'vertical',
             left: 'left',
             y:'center',
             // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
             data: nameArray,
             /*textStyle: {
                 color: '#d5d5d5'
             },*/
             textStyle: {
                 color: '#77899c',
                 rich: {
                     a: {
                         color: '#d9edf8',
                         width: 30,
                     },
                     b: {
                         color: '#d9edf8',
                         width: 80,
                         align: 'right',
                     },
                     c: {
                         color: '#ffffff',
                         width: 100,
                         align: 'left',
                     },
                 },
             },
             formatter: function (name) {
                 let target;
                 for (let i = 0; i < dataAll.length; i++) {
                     if (dataAll[i].name == name) {
                         target = dataAll[i];
                     }
                 }
                 return `{a|${name}}{b|${target.value}}`;
             }
         },
         series: [
             // 外圈
             {
                 name: '数量',
                 type: 'pie',
                 // radius: '75%',
                 radius: ['60%', '80%'],
                 // 包含图例时，右下角偏移，否则居中
                 center: showLegend?['50%', '50%']:['50%', '50%'],
                 /*data: [
                     {value: 114775, name: '直接访问',},
                     {value: 192886, name: '邮件营销'},
                     {value: 234, name: '联盟广告'},
                     {value: 135, name: '视频广告'},
                     {value: 1548, name: '搜索引擎'}
                 ],*/
                 data: pieData1,
                 emphasis: {
                     itemStyle: {
                         shadowBlur: 10,
                         shadowOffsetX: 0,
                         shadowColor: 'rgba(0, 0, 0, 0.5)'
                     }
                 },
                 label: {
                     show: showLabel,
                     color: 'white',
                     position: 'outer',
                     alignTo: 'edge',
                     margin: 20
                 }
             },
             // 内圈
             {
                 name: '数量',
                 type: 'pie',
                 selectedMode: 'single',
                 radius: [0, '45%'],
                 label: {
                     show: false,
                     position: 'inner',
                     fontSize: 14,
                 },
                 labelLine: {
                     show: false
                 },
                 data: pieData2
             },
         ]
     };
    return option01
}

/**
 * 多环形饼图
 * @param data
 * @returns {{backgroundColor: string, series: *[], title: *[]}}
 */
echartMap.multiPie = function(data=[]){

    /*var data = [
        {
            name: '用卡活跃度',
            value: 1
        },{
            name: '持卡数环比 ↑',
            value: 44
        },{
            name: '持卡数同比 ↓',
            value: 35
        }]*/

    var titleArr= [], seriesArr=[];
    let colors=[['#15ffac', '#c9ffec'],['#ff8c37', '#ffdcc3'],['#a181fc', '#e3d9fe']]
    data.forEach(function(item, index){
        titleArr.push(
            {
                text:item.name,
                left: index * 33 + 16.5 +'%',
                bottom: '8px',
                textAlign: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: '14',
                    color: colors[index][0],
                    textAlign: 'center',
                },
            }
        );
        seriesArr.push(
            {
                name: item.name,
                type: 'pie',
                clockWise: false,
                radius: [30, 40],
                itemStyle:  {
                    normal: {
                        color: colors[index][0],
                        shadowColor: colors[index][0],
                        shadowBlur: 0,
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                    }
                },
                hoverAnimation: false,
                center: [index * 33 + 16.5 +'%', '50%'],
                data: [
                    {
                        value: 100 - item.value,
                        name: 'invisible',
                        itemStyle: {
                            normal: {
                                color: colors[index][1]
                            },
                            emphasis: {
                                color: colors[index][1]
                            }
                        }
                    },
                    {
                        value: item.value,
                        label: {
                            normal: {
                                formatter: function(params){
                                    return params.value+'%';
                                },
                                position: 'center',
                                show: true,
                                textStyle: {
                                    fontSize: '16',
                                    fontWeight: 'bold',
                                    color: colors[index][0]
                                }
                            }
                        },
                    }
                ]
            }
        )
    });


    let option = {
        // backgroundColor: "#fff",
        title:titleArr,
        series: seriesArr
    }
    return option;
}
/**
 * 环形饼图 小饼图
 * @param data
 * @returns {{backgroundColor: string, series: *[], title: *[]}}
 */
echartMap.smallPie = function(data=[],colors=[]){
    var seriesArr=[];
    colors = data[0].color
    // colors=[['#15ffac', '#c9ffec'],['#ff8c37', '#ffdcc3'],['#a181fc', '#e3d9fe']]
    data.forEach(function(item, index){
        seriesArr.push(
            {
                name: item.name,
                type: 'pie',
                clockWise: false,
                radius: [15, 20],
                itemStyle:  {
                    normal: {
                        color: colors,
                        shadowColor: colors,
                        shadowBlur: 0,
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                    }
                },
                hoverAnimation: false,
                // center: [index * 33 + 16.5 +'%', '50%'],
                data: [
                    {
                        value: 100 - item.value,
                        name: 'invisible',
                        itemStyle: {
                            normal: {
                                color: colors+'53'
                            },
                            emphasis: {
                                color: colors+'53'
                            }
                        }
                    },
                    {
                        value: item.value,
                        label: {
                            normal: {
                                formatter: function(params){
                                    // return params.value+'%';
                                },
                                position: 'center',
                                show: true,
                                textStyle: {
                                    fontSize: '16',
                                    fontWeight: 'bold',
                                    color: colors
                                }
                            }
                        },
                    }
                ]
            }
        )
    });


    let option = {
        series: seriesArr
    }
    return option;
}
/**
 * 柱状图带小圈
 * @param data
 * @returns {{backgroundColor: string, series: *[], title: *[]}}
 */
echartMap.quanPie = function(data=[]){
    //   var  data = [
    //     {
    //         name: 'user1',
    //         value: 100,
    //     },
    //     {
    //         name: 'user2',
    //         value: 20,
    //     },
    //     {
    //         name: 'user3',
    //         value: 23,
    //     },
    //     {
    //         name: 'user4',
    //         value: 44,
    //     }, {
    //         name: 'user1',
    //         value: 10,
    //     }
    // ];
    // let maxData = Math.max.apply(Math,data.map(item => { return item.value }))
    function  getArrByKey  (data, k)  {
        let key = k || "value";
        let res = [];
        if (data) {
            data.forEach(function(t) {
                res.push(t[key]);
            });
        }
        return res;
    };
    function  getSymbolData (data)  {
        let arr = [];
        for (var i = 0; i < data.length; i++) {
            arr.push({
                value: data[i].value,
                symbolPosition: 'end'
            })
        }
        return arr;
    }
   let opt = {
        index: 0
    }
   let color = ['#A71A2B'];
    data = data.sort((a, b) => {
        return b.value - a.value
    });
    let maxData = data[0].value
    console.log(getArrByKey(data, 'name'))
  let  option = {
        grid: {
            top: '2%',
            bottom: -15,
            right: 30,
            left: 30,
            containLabel: true
        },
        xAxis: {
            show: false
        },
        yAxis: [
            {
            triggerEvent: true,
            show: true,
            inverse: true,
            data: getArrByKey(data, 'name'),
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false,
                interval: 0,
                color: '#fff',
                align: 'left',
                margin: 80,
                fontSize: 13,
                formatter: function(value, index) {
                    return '{title|' + value + '}'
                },
                rich: {
                    title: {
                        width: 165
                    }
                }
            },
        },
        {
            triggerEvent: true,
            show: true,
            inverse: true,
            data: getArrByKey(data, 'name'),
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                interval: 0,
                shadowOffsetX: '-20px',
                color: ['#fff'],
                align: 'right',
                verticalAlign: 'bottom',
                lineHeight: 30,
                fontSize: 13,
                formatter: function(value, index) {
                    // return (data[index].value / data[index].sum) * 100
                    return data[index].value
                },
            }
        }
        ],
        series: [
            {
            name: 'XXX',
            type: 'pictorialBar',
            symbol: 'image:///gxb/imgs/quan.png',
            symbolSize: [50, 50],
            symbolOffset: [20, 0],
            z: 12,
            // label: {
            //     normal: {
            //         color: '#fff',
            //         show: true,
            //         // position: [0, '-20px'],
            //         textStyle: {
            //             fontSize: 16
            //         },
            //         formatter: function(a, b) {
            //             return (a.value/maxData*100).toFixed(2)+"%"
            //         }
            //     }
            // },
            itemStyle: {
                normal: {
                    color: '#14b1eb'
                }
            },
            data: getSymbolData(data)
        },
        {
            name: '条',
            type: 'bar',
            showBackground: true,
            barBorderRadius: 30,
            yAxisIndex: 0,
            data: data,
            barWidth: 10,
            // align: left,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        1,
                        0,
                        [{
                                offset: 0,
                                color: '#308ced'
                            },
                            {
                                offset: 0.7,
                                color: '#308ced'
                            },
                            {
                                offset: 1,
                                color: '#5EDEE5'
                            }
                        ],
                        false
                    ),
                    barBorderRadius: 10
                },
                // color: '#A71A2B',
                barBorderRadius: 4,
            },
            label: {
                normal: {
                    color: '#fff',
                    show: true,
                    position: [0, '-20px'],
                    textStyle: {
                        fontSize: 16
                    },
                    formatter: function(a, b) {
                        return a.name
                    }
                }
            }
        }]
    };
    return option;
}
/**
 * 柱状图 蓝色背景
 * @param data
 * @returns {{backgroundColor: string, series: *[], title: *[]}}
 */
echartMap.blueBar = function(data=[], chartInfo = {}){
    let name = []
    let value = []
    let valueName = chartInfo.valueName || ''
    data.forEach(e=>{
        name.push(e.name)
        value.push(e.value)
    })
  let  option = {
        title: {
            // text: '数量',
            textStyle: {
                fontWeight: 'normal',
                fontSize: 16,
                color: '#F1F1F3'
            },
            top: '10%',
            left: '1.5%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            confine: true, // 是否将 tooltip 框限制在图表的区域内。
            formatter: function (objs, index) {
                let obj = objs[0];
                console.log(obj)
                let icon  = '<span style=\"display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1fa2f7;\"></span>'
                return `${obj.name}<br/>${icon}${valueName}${valueName?'：':''} ${obj.value} `;
            },
        },

        grid: {
            top: '15%',
            right: '3%',
            left: '15%',
            bottom: '5px',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: name,
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.12)'
                }
            },
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    // fontFamily: 'OPPOSansM',
                    color: '#e2e9ff',
                },
                formatter: function (params) {
                    var val = "";
                    if (params.length > 5) {
                        val = params.substr(0, 5) + '...';
                        return val;
                    } else {
                        return params;
                    }
                },
                // margin: 15,
                rotate: 30
            },
            // axisLabel: {
            //     margin: 10,
            //     color: '#e2e9ff',
            //     textStyle: {
            //         fontSize: 14
            //     },
            // },
        }],
        yAxis: [{
            splitNumber: 3,
            axisLabel: {
                formatter: '{value}',
                color: '#e2e9ff',
            },
            axisLine: {
                show: false
            },
            splitLine: {
                 show: false,
                 lineStyle: {
                     color: '#233e64'
                 }
            },
        }],
        series: [{
            type: 'bar',
            data: value,
            barWidth: '20px',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0,244,255,1)' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(42,133,244,1)' // 100% 处的颜色
                    }], false),
                    // barBorderRadius: [30, 30, 30, 30],
                    shadowColor: 'rgba(0,160,221,0.5)',
                    shadowBlur: 4,
                }
            },
            // label: {
            //     normal: {
            //         show: true,
            //         lineHeight: 30,
            //         width: 80,
            //         height: 30,
            //         backgroundColor: 'rgba(0,160,221,0.1)',
            //         borderRadius: 200,
            //         position: ['-8', '-60'],
            //         distance: 1,
            //         formatter: [
            //             '    {d|●}',
            //             ' {a|{c}}     \n',
            //             '    {b|}'
            //         ].join(','),
            //         rich: {
            //             d: {
            //                 color: '#3CDDCF',
            //             },
            //             a: {
            //                 color: '#fff',
            //                 align: 'center',
            //             },
            //             b: {
            //                 width: 1,
            //                 height: 30,
            //                 borderWidth: 1,
            //                 borderColor: '#234e6c',
            //                 align: 'left'
            //             },
            //         }
            //     }
            // }
        }]
    };
    return option;
}






