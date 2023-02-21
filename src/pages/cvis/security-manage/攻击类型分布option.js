export default function (data) {
  return {
    tooltip: {
      trigger: 'item'
    },
    grid: {
      right: "0",
      top: "10%",
      bottom: 0,
      containLabel: true,
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      y: 'center',
      textStyle: {
        fontSize: 14,
        color: '#feffff',
      },
    },
    color: ["#068AC3",
      "#B2782C",
      "#f8b551",
      "#ededed",
      "#2a7fff",
      "#68bff9",
      "#85fbf8",
      "#ec928f",
      "#ec928f",],
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data
      }
    ]
  }
};