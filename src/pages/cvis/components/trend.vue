<template>
  <div class="wrapper">
    <zebra-echart :option="trendOption" not-merge />
  </div>
</template>

<script type="text/javascript">
import echarts from 'echarts'
export default {
  data () {
    return {}
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    trendOption () {
      var fontColor = '#30eee9'
      return {
        grid: {
          left: 0,
          right: 0,
          top: '20%',
          bottom: 0,
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'item'
        },
        legend: {
          show: true,
          x: 'right',
          y: '25',
          icon: 'stack',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: '#1bb4f6'
          },
          data: ['安全日志']
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              color: fontColor
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#397cbc'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#195384'
              }
            },
            data: this.data.map((item) => item.startTime)
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            // max: Math.max(...this.data.map((item) => item.val)),
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#2ad1d2'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#27b4c2'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#11366e'
              }
            }
          }
        ],
        series: [
          {
            name: '安全日志',
            type: 'line',
            stack: '总量',
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: '#0092f6',
                lineStyle: {
                  color: '#0092f6',
                  width: 1
                },
                areaStyle: {
                  // color: '#94C9EC'
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: 'rgba(7,44,90,0.3)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(0,146,246,0.9)'
                    }
                  ])
                }
              }
            },
            markPoint: {
              itemStyle: {
                normal: {
                  color: 'red'
                }
              }
            },
            data: this.data
              .filter((item) => item.key == '安全日志')
              .map((item) => item.eventCount)
          },
          {
            name: '网络安全',
            type: 'line',
            stack: '总量',
            symbol: 'circle',
            symbolSize: 8,

            itemStyle: {
              normal: {
                color: '#00d4c7',
                lineStyle: {
                  color: '#00d4c7',
                  width: 1
                },
                areaStyle: {
                  // color: '#94C9EC'
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: 'rgba(7,44,90,0.3)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(0,212,199,0.9)'
                    }
                  ])
                }
              }
            },
            data: this.data
              .filter((item) => item.key == '网络安全')
              .map((item) => item.val)
          },
          {
            name: '漏洞',
            type: 'line',
            stack: '总量',
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: '#aecb56',
                lineStyle: {
                  color: '#aecb56',
                  width: 1
                },
                areaStyle: {
                  // color: '#94C9EC'
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: 'rgba(7,44,90,0.3)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(114,144,89,0.9)'
                    }
                  ])
                }
              }
            },
            data: this.data
              .filter((item) => item.key == '漏洞')
              .map((item) => item.val)
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 220px;
}
</style>
