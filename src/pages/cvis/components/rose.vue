<template>
  <zebra-echart :option="chartOption" not-merge />
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
    chartOption() {
      return {
        grid: {
          left: "5%",
          top: "10%",
          bottom: 0,
          containLabel: true,
        },
        tooltip: {
          show: true,
          trigger: "item",
        },

        series: [
          {
            type: "pie",
            radius: [20, 100],
            center: ["50%", "50%"],
            roseType: "area",
            label: {
              formatter: "{name|{b}}\n{d}% | {c}",
              textStyle: {
                fontSize: 14,
              },
              rich: {
                name: {
                  fontSize: 14,
                  height: 20,
                  color: "#fff",
                },
              },
            },
            minAngle: 5,
            avoidLabelOverlap: true,

            data: this.data.map((item) => ({
              value: item.val,
              name: item.name,
            })),
            itemStyle: {
              normal: {
                color: function (params) {
                  //自定义颜色
                  var colorList = [
                    "#068AC3",
                    "#B2782C",
                    "#f8b551",
                    "#ededed",
                    "#2a7fff",
                    "#68bff9",
                    "#85fbf8",
                    "#ec928f",
                    "#ec928f",
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
      };
    },
  },
};
</script>
  

