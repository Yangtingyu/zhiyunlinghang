<template>
  <scroll-container :content-height="contentHeight" :content-width="contentWidth" >
    <zebra-echart-local @click="click" :delayTime="delayTime" :isMap="isMap" :mapName="mapName" :geojsonUrl="geojsonUrl" :option="getOption" :notMerge="notMerge" :height="contentHeight" :width="contentWidth" />
  </scroll-container>
</template>

<script>
    import echartMap from './libs/echartOptionUtils.js'
    import ScrollContainer from '@/components/ScrollContainer'
    export default {
        // 通用图表，用于通过简单的配置生成图表
        name: "zebra-common-echart",
      components: { ScrollContainer },
      props: {
            /*contentHeight: {
              type: String,
              default: '100%'
            },*/
            // 行高
            rowHeight: {
              type: Number,
              default: null
            },
            // 默认行数
            rowCount: {
              type: Number,
              default: null
            },
            // 默认列数
            colCount: {
              type: Number,
              default: null
            },
            chartInfo: {
                type: Object,
                default: function () {
                    return {
                        type: 'barFn',// 图表类型
                        data: [
                            {name: 'A',value: 1},
                            {name: 'B',value: 2},
                            {name: 'C',value: 3}
                        ]
                    }
                }
            },
            /**
             * 是否替换默认地图数据，目前支持geojson地图数据格式
             */
            isMap: {
              type: Boolean,
              default: false
            },
            /**
             * 注册地图名称（isMap为true时生效）
             */
            mapName: {
              type: String,
              default: 'china'
            },
            /**
             * 注册地图geojson文件路径（isMap为true时生效）
             */
            geojsonUrl: {
              type: String,
              default: '/script/china1.json'
            },
            height: {
                type: String,
                default: '100%'
            },
            width: {
                type: String,
                default: '100%'
            },
            // 可选，是否不跟之前设置的 option 进行合并，默认为 false，即合并。
            // https://www.echartsjs.com/zh/api.html#echartsInstance.setOption
            notMerge: {
                type: Boolean,
                default: false
            },
            // 延时执行秒数
            delayTime: {
                type: Number,
                default: 0
            }
        },
        data(){
            return {

            }
        },
        methods:{
            click(params){
                this.$emit('click',params)
            }
        },
        computed: {
            getOption(){
                console.log('common-echart', this.chartInfo.type, echartMap)
                return echartMap[this.chartInfo.type](this.chartInfo.data, this.chartInfo)
            },
            contentHeight(){
              if(this.rowHeight){
                let dataLength = (this.chartInfo.data || []).length
                return this.rowHeight * dataLength + 'px'
              }else if(this.rowCount){
                let dataLength = (this.chartInfo.data || []).length
                return (parseFloat(this.height) / this.rowCount) * dataLength + 'px'
              }else{
                return "100%"
              }
            },
            contentWidth(){
              if(this.colCount){
                let dataLength = (this.chartInfo.data || []).length
                return (parseFloat(this.width) / this.colCount) * dataLength + 'px'
              }else{
                return "100%"
              }
            }
        }
    }
</script>

<style scoped>

</style>
