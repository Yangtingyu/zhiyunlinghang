export default {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center',
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
      data: [
        { value: 1048, name: '数据违规出境' },
        { value: 735, name: 'web攻击' },
        { value: 580, name: '蠕虫攻击' },
        { value: 484, name: '敏感数据窃取' },
      ]
    }
  ]
};