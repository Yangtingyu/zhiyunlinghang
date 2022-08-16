<template>
  <div class="wrapper">
    <zebra-echart :option="leftRadarOption" not-merge />
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {};
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    leftRadarOption() {
      const max = Math.max(...this.data.map((item) => item.val));
      const indicator = this.data.map((item) => ({
        name: item.name,
        max,
      }));
      return {
        //   backgroundColor: "#0B0D13",
        tooltip: {
          trigger: "item",
        },

        color: ["#068AC3", "#B2782C"],

        radar: {
          center: ["50%", "50%"], // 外圆的位置
          radius: "55%",
          name: {
            textStyle: {
              color: "#fff",
              fontSize: 15,
              fontWeight: 400,
              fontFamily: "PingFangSC-Regular,PingFang SC",
              fontStyle: "italic",
            },
          },
          // TODO:
          indicator,
          splitArea: {
            // 坐标轴在 grid 区域中的分隔区域，默认不显示。
            show: true,
            areaStyle: {
              // 分隔区域的样式设置。
              color: ["#00224A", "#00224A", "#00224A", "#00224A", "#00224A"], // 画布颜色 // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
            },
          },
          axisLine: {
            // 指向外圈文本的分隔线样式
            lineStyle: {
              color: "rgba(255,255,255,0.2)",
            },
          },
          splitLine: {
            lineStyle: {
              type: "solid",
              color: ["#1781BA", "#1781BA"], // 分隔线颜色
              width: 1, // 分隔线线宽
            },
          },
        },
        series: [
          {
            type: "radar",
            symbolSize: 5,
            data: [
              {
                // TODO:
                value: this.data.map((item) => item.val),
                name: "数据",
                areaStyle: {
                  normal: {
                    color: {
                      type: "radial",
                      x: 0.5,
                      y: 0.5,
                      r: 0.5,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(46,203,255, 0.14)", // 0% 处的颜色
                        },
                        {
                          offset: 0.15,
                          color: "rgba(46,203,255, 0.14)", // 100% 处的颜色
                        },
                        {
                          offset: 0.75,
                          color: "#057FB3", // 100% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#078DC6", // 100% 处的颜色
                        },
                      ],
                      global: false, // 缺省为 false
                    },
                  },
                },
                itemStyle: {
                  // 折线拐点标志的样式。
                  normal: {
                    // 普通状态时的样式
                    lineStyle: {
                      width: 1,
                    },
                    opacity: 0.3,
                  },
                  emphasis: {
                    // 高亮时的样式
                    lineStyle: {
                      width: 5,
                    },
                    opacity: 0,
                  },
                },
              },
            ],
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 220px;
}
</style>
