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
        legend: {
          show: true,
          bottom: "0",
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          y: -100,
        },
        tooltip: {
          show: true,
          trigger: "item",
        },
        graphic: {
          //图形中间图片
          elements: [
            {
              type: "image",
              style: {
                image: "https://oss.xiudo.cn/uPic/circle_pie_bg.png",
                width: 200,
                height: 200,
              },
              left: "center",
              top: "center",
            },
          ],
        },

        series: [
          {
            type: "pie",
            zlevel: 2,
            silent: true, //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
            startAngle: 360,
            radius: ["60%", "68%"],
            label: { show: false },
            labelLine: { show: false },

            data: this.data.map((item) => ({
              value: item.val,
              name: item.name,
              per: item.per,
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
  

