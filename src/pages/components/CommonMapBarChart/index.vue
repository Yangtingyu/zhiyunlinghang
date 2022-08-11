<template>
  <div class="map-container" :style="{ height: height, width: width }">
    <green-map-sd-bar v-if="provinceName=='山东'"
        @click="handleClick"
        :dataList='dataList'
        :width='width'
        :height='height'
        :style="customContainerStyle['山东']"
    />
    <!-- 指定背景图方式的地图，这里需要指定宽高 -->
    <div v-else class="map-box" :style="{ width: chartInfo.width || width, height: chartInfo.height || height, ...commonContainerStyle }">
      <div class="map">
        <zebra-common-echart
            notMerge
            isMap
            :mapName="chartInfo.mapName"
            :geojsonUrl="chartInfo.geojsonUrl"
            :delayTime="500"
            :chartInfo="chartInfo"
            :width="chartInfo.width || width"
            :height="chartInfo.height || height"
            @click="handleClick"
        />
      </div>
      <div class="map-bg" :style="mapBgStyle"></div>
    </div>
  </div>
</template>

<script>
import geoCoordMap from "@/components/zebra-common-echart/libs/cityZuoBiao.js";
import { mapState, mapMutations } from 'vuex'
export default {
  name: "CommonMapBarChart",
  props: {
    height: {
      type: String,
      default: '100%'
    },
    width: {
      type: String,
      default: '100%'
    },
    defaultZoom: {
      type: Number,
      default: 1.2
    },
    // 固定省，该值设置后，通过appFlag切换功能无效
    fixedProvinceName: {
      type: String,
      default: ''
    },
    dataList: {
      type: Array,
      default: function (){
        return [
          {
            name: "南昌市",
            value: 100
          },
          {
            name: "九江市",
            value: 80
          },
          {
            name: "上饶市",
            value: 70
          },
          {
            name: "抚州市",
            value: 90
          },
          {
            name: "宜春市",
            value: 50
          },
          {
            name: "吉安市",
            value: 30
          },
          {
            name: "赣州市",
            value: 20
          },
          {
            name: "景德镇市",
            value: 50
          },
          {
            name: "萍乡市",
            value: 50
          },
          {
            name: "新余市",
            value: 50
          },
          {
            name: "鹰潭市",
            value: 50
          }
        ]
      }
    },
    // 通用容器样式，用于微调位置（应用在所有地图上）
    commonContainerStyle: {
      type: Object,
      default: function () {
        return {};
      },
    },
    // 自定义容器样式，用于微调指定省份地图位置（需指定省份标识）
    customContainerStyle: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data(){
    return {
      // 3D背景地图特有配置
      mapConfig: {
        '江西': {
          // 通用图表类型
          type: 'jiangXiBarMap',
          // 地图背景图片
          backgroundImage: `url(${require('./img/jx_map.png')}) center no-repeat`,
          // 图表宽
          width: '945px',
          // 图表高
          height: '640px',
          // 地图缩放
          roam: false,
          // 地图定位信息（用于对准背景图）
          mapPositionInfo: {
            zoom: 0.9,
            aspectScale: 1.5,
            layoutCenter: ['50%','50%'],
            layoutSize: 800,
          },
          // 是否开启背景纹理
          enableBackgroundWenLi: false,
          // 柱图最大高度基数（0-1）
          maxValueBase: 0.9,
        },
        '山东': {
          // 通用图表类型
          type: 'jiangXiBarMap',
          // 地图背景图片
          backgroundImage: `url(/image/shandong/img/charts/sd_map.png) center no-repeat`,
          // 图表宽
          width: '945px',
          // 图表高
          height: '640px',
          // 地图缩放
          roam: false,
          // 地图定位信息（用于对准背景图）
          mapPositionInfo: {
            zoom: 1.16,
            aspectScale: 1.2,
            layoutCenter: ['50%','50%'],
            layoutSize: 800,
          },
          mapName: '山东',
          geojsonUrl: '/script/province/shandong.json',
          // 是否开启背景纹理
          enableBackgroundWenLi: false,
        },
        '甘肃': {
          // 地图缩放
          roam: true,
          mapPositionInfo: {
            zoom: 1.0,
            // aspectScale: 0.75,
            // layoutCenter: ['50%','50%'],
            // layoutSize: 800,
          },
          mapName: '甘肃',
          geojsonUrl: '/script/gaoDeGeojson/620000_full.json',
          // 是否开启背景纹理
          enableBackgroundWenLi: true,
        },
        '重庆': {
          // 地图缩放
          roam: true,
          mapPositionInfo: {
            zoom: 1.0,
            // aspectScale: 0.75,
            // layoutCenter: ['50%','50%'],
            // layoutSize: 800,
          },
          mapName: '重庆',
          geojsonUrl: '/script/gaoDeGeojson/500000_full.json',
          // 是否开启背景纹理
          enableBackgroundWenLi: true,
        },
        '上海': {
          // 地图缩放
          roam: true,
          mapPositionInfo: {
            zoom: 1.0,
            // aspectScale: 0.75,
            // layoutCenter: ['50%','50%'],
            // layoutSize: 800,
          },
          mapName: '上海',
          geojsonUrl: '/script/gaoDeGeojson/310000_full.json',
          // 是否开启背景纹理
          enableBackgroundWenLi: true,
          // 柱图最大高度基数（0-1）
          maxValueBase: 0.3,
        }
      }
    }
  },
  computed: {
    ...mapState({
      appFlag: state => state.d2admin.appFlag
    }),
    provinceName(){
      return this.fixedProvinceName || VUE_CONFIG.appConfigInfo[this.appFlag].provinceName || 'china'
    },
    chartInfo(){
      // 注意这里的key顺序，后面覆盖前面的值
      return {
        type: 'jiangXiBarMap',
        data: this.dataList,
        provinceName: this.provinceName,
        roam: true,
        mapPositionInfo: {
          aspectScale: 0.75,
        },
        mapName: 'china',
        geojsonUrl: '/script/gaoDeGeojson/100000_full.json',
        // 是否开启背景纹理
        enableBackgroundWenLi: true,
        // 柱图最大高度基数（0-1）
        maxValueBase: 0.5,
        // 省份单独指定时，替换默认值
        ...this.mapConfig[this.provinceName],
      }
      /*if(this.mapConfig[this.provinceName]){

      }else{
        // 通用地图配置
        return {
          type: 'barMap',
          // provinceName: '北京',
          // type: 'jiangXiBarMap',
          provinceName: this.provinceName,
          data: this.dataList,
          /!*mapPositionInfo: {
            zoom: 0.9,
            aspectScale: 1.5,
            layoutCenter: ['50%','50%'],
            layoutSize: 800,
          }*!/
        }
      }*/
    },
    // 地图背景样式
    mapBgStyle(){
      /*return {
        background: `url(${require('./img/jx_map.png')}) center no-repeat`
      }*/
      return {background: this.chartInfo.backgroundImage} || {}
    }
  },
  methods: {
    handleClick(params){
      console.log('params:', params)
      // 获取坐标
      params.pos = geoCoordMap[params.name]
      this.$emit("click", params);
    }
  }
}
</script>

<style scoped lang="scss">
.map-container{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

}

.map-box {
  //width: 945px;
  //height: 640px;
  position: absolute;
  //border: 1px solid red;
}
.map-box .map {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.map-box .map-bg {
  width: 100%;
  height: 100%;
  // background: url(./img/jx_map.png) center no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
