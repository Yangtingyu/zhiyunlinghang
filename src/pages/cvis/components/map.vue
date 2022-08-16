<template>
  <zebra-echart :option="mapOption" not-merge />
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    mapType: {
      type: String,
      default: "china",
    },
  },

  computed: {
    mapOption() {
      const zoom = 1.2;

      var color = [
        "#6bcc75",
        "#65c78b",
        "#5fc2a0",
        "#5abead",
        "#52b9c7",
        "#4fb6d2",
        "#4ab2e5",
        "#52b9c7",
        "#5abead",
        "#dfae10",
        "#d5b314",
        "#c1bb1f",
        "#f34e2b",
        "#f56321",
        "#f56f1c",
        "#4ab2e5",
        "#4fb6d2",
        "#f58414",
        "#f58f0e",
        "#f5a305",
        "#e7ab0b",
        "#b9be23",
        "#e7ab0b",
        "#dfae10",
        "#d5b314",
        "#c1bb1f",
        "#b9be23",
        "#a6c62c",
        "#96cc34",
        "#89d23b",
        "#7ed741",
        "#77d64c",
        "#71d162",
      ];
      var points = [
        {
          value: [118.8062, 31.9208],
        },
        {
          value: [127.9688, 45.368],
        },
        {
          value: [110.3467, 41.4899],
        },
        {
          value: [125.8154, 44.2584],
        },
        {
          value: [116.4551, 40.2539],
        },
        {
          value: [106.504962, 29.533155],
        },
        {
          value: [114.4995, 38.1006],
        },
        {
          value: [117.4219, 39.4189],
        },
        {
          value: [112.3352, 37.9413],
        },
        {
          value: [109.1162, 34.2004],
        },
        {
          value: [103.5901, 36.3043],
        },
        {
          value: [106.3586, 38.1775],
        },
        {
          value: [101.4038, 36.8207],
        },
        {
          value: [103.9526, 30.7617],
        },
        {
          value: [108.384366, 30.439702],
        },
        {
          value: [113.0823, 28.2568],
        },
        {
          value: [102.9199, 25.46639],
        },
        {
          value: [119.4543, 25.9222],
        },
        {
          value: [91.11, 29.97],
        },
        {
          value: [87.68, 43.77],
        },
      ];

      const option = {
        // backgroundColor: "#013954",
        geo: {
          map: this.mapType,
          zoom,
          roam: false,
          itemStyle: {
            normal: {
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "#09132c", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#274d68", // 100% 处的颜色
                  },
                ],
                globalCoord: true, // 缺省为 false
              },
              shadowColor: "rgb(58,115,192)",
              shadowOffsetX: 10,
              shadowOffsetY: 11,
            },
            emphasis: {
              areaColor: "#2AB8FF",
              borderWidth: 0,
              color: "green",
              label: {
                show: false,
              },
            },
          },

          regions: [
            {
              name: "南海诸岛",
              itemStyle: {
                areaColor: "rgba(0, 10, 52, 1)",
                borderColor: "rgba(0, 10, 52, 1)",
                normal: {
                  opacity: 0,
                  label: {
                    show: false,
                    color: "#009cc9",
                  },
                },
              },
            },
          ],
        },
        color: color,
        series: [
          {
            type: "map",
            roam: false,
            itemStyle: {
              normal: {
                borderColor: "rgb(147, 235, 248)",
                borderWidth: 1,
                areaColor: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#09132c", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#274d68", // 100% 处的颜色
                    },
                  ],
                  globalCoord: true, // 缺省为 false
                },
              },
              emphasis: {
                areaColor: "#c56261",
              },
            },
            zoom,
            map: this.mapType, //使用
            data: [{ name: "重庆", selected: true }],
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            showEffectOn: "render",
            zlevel: 1,
            rippleEffect: {
              period: 15,
              scale: 4,
              brushType: "fill",
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                offset: [15, 0],
                color: "#1DE9B6",
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: function (i) {
                  return color[i.dataIndex];
                },
                shadowBlur: 10,
                shadowColor: "#333",
              },
            },
            symbolSize: 12,
            data: points,
          },
          {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "arrow", //箭头图标
              symbolSize: 7, //图标大小
            },
            lineStyle: {
              normal: {
                color: function (i) {
                  return color[i.dataIndex];
                },
                width: 1, //线条宽度
                opacity: 0.1, //尾迹线条透明度
                curveness: 0.3, //尾迹线条曲直度
              },
            },
            data:
              // this.data.map(item=>(
              //                   {
              //     coords: [
              //       [item.slon, item.slat],
              //       [item.dlon, item.dlat],
              //     ],
              //   }
              // ))

              [
                {
                  coords: [
                    [118.8062, 31.9208],
                    [106.504962, 29.533155],
                  ],
                },
                {
                  coords: [
                    [127.9688, 45.368],
                    [106.504962, 29.533155],
                  ],
                },
                {
                  coords: [
                    [110.3467, 41.4899],
                    [106.504962, 29.533155],
                  ],
                },
                {
                  coords: [
                    [125.8154, 44.2584],
                    [106.504962, 29.533155],
                  ],
                },
                {
                  coords: [
                    [116.4551, 40.2539],
                    [106.504962, 29.533155],
                  ],
                },
                {
                  coords: [
                    [119.4543, 25.9222],
                    [106.504962, 29.533155],
                  ],
                },
                {
                  coords: [
                    [114.4995, 38.1006],
                    [106.504962, 29.533155],
                  ],
                },
                {
                  coords: [
                    [117.4219, 39.4189],
                    [106.504962, 29.533155],
                  ],
                },
                {
                  coords: [
                    [112.3352, 37.9413],
                    [106.504962, 29.533155],
                  ],
                },
                {
                  coords: [
                    [109.1162, 34.2004],
                    [106.504962, 29.533155],
                  ],
                },
                {
                  coords: [
                    [103.5901, 36.3043],
                    [106.504962, 29.533155],
                  ],
                },
                {
                  coords: [
                    [106.3586, 38.1775],
                    [106.504962, 29.533155],
                  ],
                },
                {
                  coords: [
                    [101.4038, 36.8207],
                    [106.504962, 29.533155],
                  ],
                },
                {
                  coords: [
                    [103.9526, 30.7617],
                    [106.504962, 29.533155],
                  ],
                },
                {
                  coords: [
                    [108.384366, 30.439702],
                    [106.504962, 29.533155],
                  ],
                },
                {
                  coords: [
                    [113.0823, 28.2568],
                    [106.504962, 29.533155],
                  ],
                },
                {
                  coords: [
                    [102.9199, 25.46639],
                    [106.504962, 29.533155],
                  ],
                },
                {
                  coords: [
                    [91.11, 29.97],
                    [106.504962, 29.533155],
                  ],
                },
                {
                  coords: [
                    [87.68, 43.77],
                    [106.504962, 29.533155],
                  ],
                },
              ],
          },
        ],
      };
      return option;
    },
  },
};
</script>

<style>
</style>