// echarts 公用配置
const chartConfig = {
  grid: {
    left:'14%',
    right: 0,
    top: 30,
    bottom: 40
  },
  xAxis: {
    type: 'category',
    axisTick: false,
    splitLine: {
      lineStyle: { color: 'rgba(255,255,255,0.15)' }
    },
    axisLine: {
      lineStyle: { color: 'rgba(255,255,255,0.1)' }
    },
    axisLabel: {
      interval: 0,
      textStyle: {
        color: 'rgba(255,255,255,0.5)',
        fontFamily: 'aldrich'
      }
    }
  },
  yAxis: {
    type: 'value',
    axisTick: false,
    splitLine: {
      lineStyle: { color: 'rgba(255,255,255,0.15)' }
    },
    axisLine: false,
    axisLabel: {
      interval: 0,
      textStyle: {
        color: 'rgba(255,255,255,0.5)',
        fontFamily: 'aldrich'
      }
    }
  },
  legend: {
    top: 0,
    itemWidth: 13,
    itemHeight: 13,
    icon: 'rect',
    textStyle: {
      color: 'rgba(255,255,255,0.5)',
      fontFamily: 'aldrich'
    }
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    appendToBody: false,
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: 'rgba(255,255,255,0.4)',
        width: 2
      }
    },
    extraCssText: 'border-radius: 0;background: rgba(0,0,0,0.8);padding: 15px;'
  }
}
export default chartConfig
