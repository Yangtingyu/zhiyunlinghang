import echarts from 'echarts/lib/echarts'

// 颜色
const colors = [
    { type1: '3,169,244,', type2: { normal: { color: '#03a9f4' } } },
    { type1: '20,223,238,', type2: { normal: { color: '#14dfee' } } },
    { type1: '251,195,26,', type2: { normal: { color: '#fbc31a' } } },
    { type1: '253,137,35,', type2: { normal: { color: '#fd8923' } } },
    { type1: '255,66,15,', type2: { normal: { color: '#ff420f' } } }
]

const getColor = function(i, alpha1, alpha2, x, y, x2, y2) {
    let length = colors.length
    let color = colors[i < length ? (i < 0 ? 0 : i) : length - 1].type1
    let color1 = 'rgba(' + color + alpha1 + ')'
    let color2 = 'rgba(' + color + alpha2 + ')'
    return {
        normal: {
            color: new echarts.graphic.LinearGradient(x, y, x2, y2, [
                { offset: 0, color: color1 },
                { offset: 1, color: color2 }
            ]),
        }
    }
}

export default {
    // 饼图，实心圆
    getPieOption({ backgroundColor, legend, label, labelLine, color, series }) {
        let pieLegendData = []
        let newSeries = []
        if (series && series.length == 1) {
            let one = series[0]
            let radius = one.radius
            let center = one.center
            let series0Data = one.data
            let label = one.label
            let fontSize = label ? label.fontSize : null
            let color = label ? label.color : null
            let fontWeight = label ? label.fontWeight : null
            let labelLine = one.labelLine
            let lineStyle = labelLine ? labelLine.lineStyle : null
            let lineStyleColor = lineStyle ? lineStyle.color : null
            for (let i = 0; i < series0Data.length; i++) {
                pieLegendData.push(series0Data[i].name)
            }
            newSeries.push({
                type: 'pie',
                radius: radius ? radius : [ '0%', '70%' ],
                center: center ? center : [ '50%', '50%' ],
                itemStyle: one.itemStyle ? one.itemStyle : {},
                label: {
                    normal: {
                        formatter: function (a) {
                            return a.percent.toFixed(0) + '%'
                        },
                        show: true,
                        textStyle: {
                            fontSize: fontSize ? fontSize : 18,
                            color: color ? color : '#bdfaff',
                            fontWeight: fontWeight ? fontWeight : 'normal'
                        }
                    }
                },
                labelLine: { normal: { lineStyle: { color: lineStyleColor ? lineStyleColor : '#8dc7db' } } },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function(idx) {
                    return Math.random() * 200
                },
                data: series0Data
            })
        }
        let textStyle = legend ? legend.textStyle : null
        let legendTextStyleFontSize = textStyle ? textStyle.fontSize : 16
        let legendTextStyleColor = textStyle ? textStyle.color : [ '#bdfaff' ]
        let option = {
            backgroundColor: backgroundColor ? backgroundColor : 'transparent',
            tooltip: { trigger: 'item', formatter: '{b} : {c} ({d}%)' },
            legend: {
                top: legend && legend.top ? legend.top : 'auto',
                left: legend && legend.left ? legend.left : 'auto',
                right: legend && legend.right ? legend.right : 'auto',
                bottom: legend && legend.bottom ? legend.bottom : 'auto',
                orient: legend && legend.orient ? legend.orient : 'horizontal',
                icon: 'roundRect',
                itemWidth: 20,
                itemHeight: 13,
                itemGap: legend && legend.itemGap ? legend.itemGap : 10,
                textStyle: {
                    fontSize: legendTextStyleFontSize ? legendTextStyleFontSize : 16,
                    color: legendTextStyleColor ? legendTextStyleColor : [ '#bdfaff' ]
                },
                data: pieLegendData
            },
            series: newSeries
        }
        if (color) {
            option.color = color
        }

        return option
    },

    // 饼图，空心圆环
    getRingPieOption(data) {
        let legend = []
        let color = []
        for (let i = 0; i < data.length; i++) {
            legend.push(data[i].name)
            color.push(data[i].color)
        }
        return {
            tooltip: { trigger: 'item', formatter: '{b} : {c} ({d}%)' },
            legend: {
                right: 40,
                y: 'center',
                orient: 'vertical',
                icon: 'roundRect', //图例排列的方式
                itemWidth: 20,
                itemHeight: 13,
                itemGap: 20,
                textStyle: { fontSize: 16, color: ['#bdfaff'] },
                data: legend,
            },
            color: color,
            series: [{
                type: 'pie',
                radius: ['45%', '60%'],
                center: ['35%', '59%'],
                label: {
                    normal: {
                        formatter: function (a){
                            return a.percent.toFixed(0)+'%';
                        },
                        show: true,
                        textStyle: { fontSize: 18, color:'#bdfaff' },
                    }
                },
                labelLine: {
                    normal: {
                        // length: 20,
                        // length2: 70,
                        lineStyle: {
                            color: '#8dc7db'
                        }
                    }
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function(idx) {
                    return Math.random() * 200;
                },
                data: data
            }]
        }
    },

    // 条形图
    getBarOption(seriesInfos, grid) {
        let yAxisData = []
        let seriesInfo0 = seriesInfos[0]
        let seriesInfo0Data = seriesInfo0.seriesData
        let seriesInfo0DataLength = seriesInfo0Data.length
        for (let i = 0; i < seriesInfo0DataLength; i++) {
            let row = seriesInfo0Data[seriesInfo0DataLength - i - 1]
            yAxisData.push(row.name)
        }

        let legend = null
        let series = []
        let seriesLength = seriesInfos.length
        if (seriesLength == 1) {
            let colorLength = colors.length
            let seriesData = []
            for (let i = 0; i < seriesInfo0DataLength; i++) {
                let row = seriesInfo0Data[seriesInfo0DataLength - i - 1]
                seriesData.push({
                    value: row.value,
                    itemStyle: getColor(i % colorLength, 1, 1, 1, 0, 0, 0)
                })
            }
            series.push({
                name: seriesInfo0.seriesName,
                type: 'bar',
                data: seriesData,
                barWidth: 10,
                itemStyle: { normal: { color: '#fbc31a' } }
            })
        } else {
            let data = []
            for (let i = 0; i < seriesLength; i++) {
                let seriesInfo = seriesInfos[i]
                let seriesInfoData = seriesInfo.seriesData
                let seriesInfoDataLength = seriesInfoData.length
                let seriesData = []
                for (let i = 0; i < seriesInfoDataLength; i++) {
                    let row = seriesInfoData[seriesInfoDataLength - i - 1]
                    seriesData.push({
                        value: row.value
                    })
                }
                let color = seriesInfo.color
                let seriesName = seriesInfo.seriesName
                series.push({
                    name: seriesName,
                    type: 'bar',
                    stack: seriesInfo.stack,
                    data: seriesData,
                    barWidth: 10,
                    itemStyle: { normal: { color: color ? color : '#fbc31a' } }
                })
                data.push(seriesName)
            }
            legend = {
                x: 'center',
                top: 10,
                icon: 'rect',
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 30,
                textStyle: { fontSize: 12, color: ['#bdfaff'], },
                data
            }
        }
        let height = grid ? grid.height : null
        let top = grid ? grid.top : null
        let right = grid ? grid.right : null
        let bottom = grid ? grid.bottom : null
        return {
            grid: {
                left: '3%',
                height: height ? height : '200px',
                top: top ? top : null,
                right: right ? right : '7%',
                bottom: bottom ? bottom : '2%',
                containLabel: true
            },
            legend,
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            xAxis: {
                type: 'value',
                splitLine: { show: false },
                axisLine: { show: true, lineStyle: { color: '#257baa' } },
                axisTick: { show: false },
                axisLabel: { textStyle: { color: '#38dcf7', fontSize: 12 } }
            },
            yAxis: {
                type: 'category',
                data: yAxisData,
                splitLine: { show: false },
                axisLine: { show: true, lineStyle: { color: '#257baa' } },
                axisTick: { show: false },
                axisLabel: { textStyle: { color: '#38dcf7', fontSize: 12 }, interval: 0 }
            },
            series
        }
    },

    //雷达图
    getRadarOption(){
        const option = {
            title: {
                text: 'Basic Radar Chart'
            },
            legend: {
                data: ['Allocated Budget', 'Actual Spending']
            },
            radar: {
                // shape: 'circle',
                indicator: [
                    { name: 'Sales', max: 6500 },
                    { name: 'Administration', max: 16000 },
                    { name: 'Information Technology', max: 30000 },
                    { name: 'Customer Support', max: 38000 },
                    { name: 'Development', max: 52000 },
                    { name: 'Marketing', max: 25000 }
                ]
            },
            series: [
                {
                    name: 'Budget vs spending',
                    type: 'radar',
                    data: [
                        {
                            value: [4200, 3000, 20000, 35000, 50000, 18000],
                            name: 'Allocated Budget'
                        },
                        {
                            value: [5000, 14000, 28000, 26000, 42000, 21000],
                            name: 'Actual Spending'
                        }
                    ]
                }
            ]
        };
        return option;
    }
}
