<template>
  <div ref="map" class="leaflet-gis-container" :style="{width: width,height: height}"></div>
</template>

<script>
import L from 'leaflet';
import { markerClusterGroup } from "leaflet.markercluster";
// 引入默认图标，解决图标路径问题
import icon from 'leaflet/dist/images/marker-icon.png';
import icon2x from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
// import 'leaflet-echarts/src/leaflet-echarts.js'
// import 'leaflet-echarts/lib/echarts.source.js'
import {echarts, allLeafletList} from './echarts-leaflet.js';
import {wgs84togcj02} from './latLngUtil.js'
// 虚线动画路径线，插件地址：https://gitlab.com/IvanSanchez/Leaflet.Path.DashFlow
import './L.Path.DashFlow.js'
import {getDistance, sumDistance} from '../../utils/map'

// 全屏按钮插件（包含在transform下，导致全屏无效，暂时隐藏该插件）
// import fullscreen from './leaflet.fullscreen/Control.FullScreen.js'
// import './leaflet.fullscreen/Control.FullScreen.scss'


export default {
  name: 'LeafletGis',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    // 默认坐标系，常见有：wgs84、gcj02等
    defaultCrs: {
      type: String,
      default: "wgs84"
    },
    // echart地图相关配置
    option: {
      type: Object,
      required: false,
      default: function (){
        return {}
      }
    },
    // 视口信息，包含坐标和放大比
    viewInfo: {
      type: Object,
      default: function (){
        return {
          latLng: [104.114129, 37.550339],
          zoom: 2
        }
      }
    },
    /* 标记点数据-基于leaflet.markercluster插件实现 */
    markerClusterData: {
      type: Array,
      default: function (){
        return [
          // 该格式已废弃
          /*[39.907175, 116.374086, '西单地铁-高德坐标'],
          [39.905804, 116.367818, '西单地铁-天地图坐标'],*/
          // 当前格式
          /*{
            lon: 116.367818,
            lat: 39.905804,
            name: '西单地铁-天地图坐标'
          },
          {
            lon: 116.374086,
            lat: 39.907175,
            name: '西单地铁-高德坐标'
          }*/
        ]
      }
    },
    // 标记点数据-最大值，与markerClusterData结合使用
    markerClusterMaxLength: {
      type: Number,
      default: null
    },
    // 是否禁用点聚合功能
    disableClusteringAtZoom: {
      type: Number||Object,
      default: null
    },
    /* 获取popup提示内容 */
    getPopupContent: {
      type: Function
    },
    /* 路径经纬度数据，虚线动画效果 */
    pathLatLngs: {
      type: Array,
      default: function (){
        return [
          /*[39.975515, 116.387957],
          [39.986584, 116.387383],
          [39.996551, 116.386953],
          [40.010579, 116.386021],
          [40.020323, 116.375402],
          [40.021275, 116.360574],
          [40.026184, 116.353304]*/
        ]
      }
    },

    iconClassData: {
      type: Object,
      default: function (){
        return {}
      }
    },

    // 多边形数据，value表示方式详见：https://leafletjs.com/reference.html#polygon
    polygonLatlngs: {
      type: Array,
      default: function (){
        return [
          /*{
            name: '单个多边形区',
            value: [[39.742861, 116.273181],[39.738317, 116.443557],[39.601108, 116.351968],[39.659512, 116.273181]]
          },
          {
            name: '边框型多边区',
            value:  [[39.538546, 116.27466],[39.537955, 116.29975],[39.519637, 116.298601],[39.520376, 116.273319]]
          }*/
          /*{
            name: '边框型多边区',
            value:  [
              [[39.546521, 116.251103],[39.548146, 116.318136],[39.508851, 116.317944], [39.511068, 116.254742]], // outer ring
              [[39.538546, 116.27466],[39.537955, 116.29975],[39.519637, 116.298601],[39.520376, 116.273319]] // hole
            ]
          },
          {
            name: '复合多边形区',
            value: [
              [ // first polygon
                [[39.455034, 116.205317],[39.45326, 116.284608],[39.429594, 116.249367]],
              ],
              [ // second polygon
                [[39.423085, 116.242472],[39.399705, 116.274265],[39.403257, 116.206849]]
              ]
            ]
          }*/
        ]
      }
    },
    // 是否开启打点数据筛选
    isMarkerInPolygonFilter: {
      type: Boolean,
      default: false
    },
    // 是否开启绘制
    isDraw: {
      type: Boolean,
      default: false
    },
    // 是否开启测距
    isRanging: {
      type: Boolean,
      default: false
    },
    // 区域绘制颜色
    areaColor: {
      type: String,
      default: 'red'
    },
    // 是否开启定位
    isLocation: {
      type: Boolean,
      default: false
    },

  },
  data () {
    return {
      echartsInstance: null,
      leafletInstance: null,
      currentTileCrs: this.defaultCrs,
      markers: null,
      // 路径线元素组，方便清空等操作
      pathLayerGroup: null,
      // 多边形点数据组
      polygonLatLngsGroup: null,
      isDrawArea: false,//是否开启绘制
      isRangingMap: false,//是否开启测距
      latlngs: [],//点击经纬度数组
      areaPolygon: null,//绘制区域多边形gon
      polyline: null,//绘制多边形线
      tempPolyline: null,//绘制多边形临时线
      rangingMarker: null,//测距
      distanceCount: '0',//距离总数
      clearCurrentLine: false,//绘制区域清除当前点
      locationMarker: null,//定位marker
    }
  },
  watch: {
    option: {
      handler: 'initMap',
      // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
      deep: true
    },
    viewInfo: {
      handler: 'setView',
      deep: true
    },
    //绘制区域监听
    isDraw: function (n) {
      this.isDrawArea = n
      if (!n) {
        this.latlngs = []
        this.polyline.setLatLngs([])
        this.tempPolyline.setLatLngs([])
        this.rangingMarker.clearLayers()
        this.areaPolygon = this.areaPolygon?this.areaPolygon.setLatLngs([]):null
      }
    },
    //测距监听
    isRanging: function (n) {
      this.isRangingMap = n
      if (!n) {
        this.latlngs = []
        this.polyline.setLatLngs([])
        this.rangingMarker.clearLayers()
        this.tempPolyline.setLatLngs([])
      }
    },
    //定位监听
    isLocation: function (n) {
      if (n) {
        if (this.locationMarker) {
          this.locationMarker.setLatLng(this.viewInfo.latLng)
        } else {
          let myIcon = L.icon({
            iconUrl: icon,
            shadowUrl: iconShadow,
            iconAnchor: [12, 41],
            iconRetinaUrl: icon2x,
            iconSize: [25, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
            tooltipAnchor: [16, -28],
            className: 'map-default-icon'
          });
          this.locationMarker = L.marker(this.viewInfo.latLng, {
            title: '',
            icon: myIcon,
            zIndexOffset: 10000
          })
          this.leafletInstance.addLayer(this.locationMarker)
        }
      } else {
        this.leafletInstance.removeLayer(this.locationMarker)
        this.locationMarker = null
      }
    },
    // 区域颜色变化
    areaColor: function (n) {
      this.polyline.setStyle({color: n})
      this.tempPolyline.setStyle({color: n})
    },
    markerClusterData: function () {
      this.clearMarkerClusterData()
      this.setMarkerClusterData()
    },
    disableClusteringAtZoom: function () {
      console.log('watcher disableClusteringAtZoom ~')
      this.clearMarkerClusterData()
      this.setMarkerClusterData()
    },
    pathLatLngs: {
      handler: function (){
        if(this.leafletInstance){
          this.clearPathLatLngs()
          this.setPathLatLngs()
        }else{
          this.initMap()
        }
      }
    },
    // 多边形数据变化
    polygonLatlngs: {
      handler: function (){
        if(this.leafletInstance){
          // 重新刷新多边形点数据
          this.clearPolygonLatLngs()
          this.setPolygonLatLngs()
        }else{
          this.initMap()
        }
      },
      deep: true
    },

  },
  mounted () {
    this.initMap()
    let _this = this;
    window.openPage = function (e) {
      // console.log(e);
      _this.$parent.$parent.gotoDevPage(e)
    }
    //清除测距
    window.clearRanging = function (e) {
      _this.$emit('handleClearRanging')
    }

    //清除当前线
    window.clearCurrentLine = function (e) {
      if (_this.latlngs.length>1) {
        _this.latlngs = _this.latlngs.slice(0,_this.latlngs.length-1)
        _this.polyline.setLatLngs(_this.latlngs);
        _this.rangingMarker._layers[Object.keys(_this.rangingMarker._layers)[0]].setLatLng(_this.latlngs[_this.latlngs.length-1])
        if (_this.latlngs.length==1) {
          _this.rangingMarker.removeLayer(Object.keys(_this.rangingMarker._layers)[0])
        }
      }
      _this.clearCurrentLine = true
    }
  },
  methods: {
    initMap () {
      let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconAnchor: [12, 41],
        iconRetinaUrl: icon2x,
        iconSize: [25, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
        tooltipAnchor: [16, -28],
      });
      L.Marker.prototype.options.icon = DefaultIcon;

      /*let Lmap = L.map(this.$refs.map).setView([40.2539, 116.4551], 8);
      // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      // http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{x}/{y}
      L.tileLayer('http://map.geoq.cn/arcgis/rest/services/{id}/MapServer/tile/{z}/{y}/{x}', {
        //         http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/8/103/213
        minZoom:2,
        maxZoom:19,
        attribution: 'GIS',
        id: 'ChinaOnlineStreetPurplishBlue',
        // tileSize: 256,
        // zoomOffset: -1
      }).addTo(Lmap);
      L.marker([43.5883, 87.9236]).addTo(Lmap)*/


      let leafletOption = {
        center: this.viewInfo.latLng,
        zoom: this.viewInfo.zoom,
        roam: true,
        layerControl: {
          position: 'bottomleft'
        },
        tiles: VUE_CONFIG.leafletGisTiles || [
          {
            label: '天地图-影像',
            urlTemplate: 'http://t2.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=b3ee3e34bd5943db310c585d9a260572',
            options: {
              attribution: '天地图',
              // 自定义属性，用于区分地图坐标系
              crs: 'wgs84'
            }
          },
          {
            // 地图标注，与影响图层使用相同的label，地图可以叠加显示
            label: '天地图-影像',
            urlTemplate: 'http://t2.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=b3ee3e34bd5943db310c585d9a260572',
            options: {
              attribution: '天地图',
              // 自定义属性，用于区分地图坐标系
              crs: 'wgs84'
            }
          },
          {
            // 未添加lable属性，表示当前底图，初始化时叠加
            urlTemplate: 'http://t2.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=b3ee3e34bd5943db310c585d9a260572',
            options: {
              attribution: '天地图',
              // 自定义属性，用于区分地图坐标系
              crs: 'wgs84'
            }
          },
          {
            label: '蓝黑版',
            urlTemplate: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
            options: {
              attribution: '',
              // 自定义属性，用于区分地图坐标系
              crs: 'gcj02'
            }
          },
          {
            label: '彩色版',
            urlTemplate: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
            options: {
              attribution: '',
              // 自定义属性，用于区分地图坐标系
              crs: 'gcj02'
            }
          },
          {
            label: '暖色版',
            urlTemplate: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}',
            options: {
              attribution: '',
              // 自定义属性，用于区分地图坐标系
              crs: 'gcj02'
            }
          },
          {
            label: '灰色版',
            urlTemplate: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
            options: {
              attribution: '',
              // 自定义属性，用于区分地图坐标系
              crs: 'gcj02'
            }
          },
          {
            label: 'OpenStreetMap',
            urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            options: {
              attribution: 'OpenStreetMap',
              // 自定义属性，用于区分地图坐标系
              crs: 'wgs84'
            }
          },
          {
            label: '天地图',
            urlTemplate: 'http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=b3ee3e34bd5943db310c585d9a260572',
            options: {
              attribution: '天地图',
              // 自定义属性，用于区分地图坐标系
              crs: 'wgs84'
            }
          }
        ]
      }

      this.echartsInstance = echarts.init(this.$refs.map)

      this.echartsInstance.setOption({leaflet: leafletOption,...this.option})

      // leaflet地图核心实例
      // this.leafletInstance = allLeafletList[0].getLeaflet()
      // console.log('地图实例：', allLeafletList[0].getLeaflet())
      this.leafletInstance = this.echartsInstance._coordSysMgr._coordinateSystems[0].getLeaflet()

      // 全屏按钮配置
      // create a fullscreen button and add it to the map
      /*fullscreen({
        position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
        title: '进入全屏', // change the title of the button, default Full Screen
        titleCancel: 'Exit fullscreen mode', // change the title of the button when fullscreen is on, default Exit Full Screen
        content: null, // change the content of the button, can be HTML, default null
        forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
        forcePseudoFullscreen: false, // force use of pseudo full screen even if full screen API is available, default false
        fullscreenElement: false // Dom element to render in full screen, false by default, fallback to map._container
      }).addTo(this.leafletInstance);*/

      // 设置标记点数据 - 基于leaflet.markercluster插件实现
      this.setMarkerClusterData()
      this.setPathLatLngs()
      // 设置多边形数据
      this.setPolygonLatLngs()

      let popup = L.popup();
      this.polyline = L.polyline([], {color: this.areaColor});
      this.tempPolyline = L.polyline([], {color: this.areaColor});
      this.rangingMarker = L.layerGroup()
      this.leafletInstance.on('click', (e)=>{
        console.log("当前点击的坐标为： " + e.latlng.toString())
        this.$emit('click',e)
        /*popup
            .setLatLng(e.latlng)
            .setContent("当前点击的坐标为： " + e.latlng.toString())
            .openOn(this.leafletInstance);*/
        if (this.clearCurrentLine) {
          this.clearCurrentLine = false
          return
        }
        this.getClickEvent(1,e)
      })

      //地图移动
      this.leafletInstance.on('move',(e) => {
        if (this.isLocation&&this.locationMarker) {
          this.locationMarker.setLatLng(this.leafletInstance.getCenter())
          this.$emit('locationMove',this.leafletInstance.getCenter())
        }
      })

      //鼠标移动
      this.leafletInstance.on('mousemove', (e)=>{
        // console.log("mousemove： " + e.latlng.toString())
        //绘制区域
        if (this.isDrawArea&&this.latlngs.length) {
          let latlngs = [this.latlngs[this.latlngs.length-1],[e.latlng.lat,e.latlng.lng],this.latlngs[0]]
          this.tempPolyline.setLatLngs(latlngs);
          this.leafletInstance.addLayer(this.tempPolyline)
          if (this.rangingMarkerTotal) {
            this.rangingMarker.removeLayer(this.rangingMarkerTotal)
            this.rangingMarkerTotal = null
          }
        }
        //测距
        if (this.isRangingMap&&this.latlngs.length) {
          let latlngs = [this.latlngs[this.latlngs.length-1],[e.latlng.lat,e.latlng.lng]]
          this.tempPolyline.setLatLngs(latlngs);
          this.leafletInstance.addLayer(this.tempPolyline)

          let distanceCount = sumDistance(this.distanceCount.includes('公里')?parseFloat(this.distanceCount):parseFloat(this.distanceCount)/1000,getDistance(e.latlng.lat,e.latlng.lng,this.latlngs[this.latlngs.length-1][0],this.latlngs[this.latlngs.length-1][1]))
          let myIcon3 = L.divIcon({className: 'map-label-icon',html: '<span style="display: block;color: #333;font-weight: bold;">总长：<span style="color: orange;">'+parseFloat(distanceCount)+'</span>'+distanceCount.slice(distanceCount.search(/[^\d.]/))+'</span>单机继续，双击结束'})
          if (this.rangingMarkerTotal) {
            this.rangingMarkerTotal.setLatLng(e.latlng)
            this.rangingMarkerTotal.setIcon(myIcon3)
          } else {
            this.rangingMarkerTotal = L.marker(e.latlng, {
              title: '',
              icon: myIcon3,
              zIndexOffset: 10000
            })
            this.leafletInstance.addLayer(this.rangingMarkerTotal)
          }
        }
        //未单击第一个点之前
        if ((this.isDrawArea||this.isRangingMap)&&!this.latlngs.length) {
          if (this.rangingMarkerTotal) {
            this.rangingMarkerTotal.setLatLng(e.latlng)
          } else {
            let myIcon2 = L.divIcon({className: 'map-label-icon',html: '单击确定起点'})
            this.rangingMarkerTotal = L.marker(e.latlng, {
              title: '',
              icon: myIcon2,
              zIndexOffset: 10000
            })
            this.rangingMarker.addLayer(this.rangingMarkerTotal)
            this.leafletInstance.addLayer(this.rangingMarker)
          }

        }

      })

      this.leafletInstance.on('dblclick', (e)=>{
        // console.log("mousemove： " + e.latlng.toString())
        this.getClickEvent(2,e)
      })

      this.leafletInstance.on('baselayerchange', e=>{
        console.log('baselayerchange', e)
        this.currentTileCrs = e.layer.options.crs
        // 重新刷新数据
        this.clearMarkerClusterData()
        this.setMarkerClusterData()

        // 重新刷新路径数据
        this.clearPathLatLngs()
        this.setPathLatLngs()

        // 重新刷新多边形点数据
        this.clearPolygonLatLngs()
        this.setPolygonLatLngs()
      })
      this.leafletInstance.on('zoomend', e=> {
        this.$emit('zoomend',e)
      })
      // 你当前的地图组件的对象应为是  'map'..
      // L.DomUtil.addClass(this.leafletInstance._container,'leaflet-cursor-pointer');



      /*L.circle([43.5883, 87.9236], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
      }).addTo(Lmap);*/

      /*setTimeout(()=>{
        L.marker([39.508902, 116.432491]).addTo(Lmap)
        Lmap.setView([39.508902, 116.432491], 15)
      },2000)*/


      /*// https://developer.mozilla.org/en-US/docs/Web/Events/resize
      (function() {
        var throttle = function(type, name, obj) {
          obj = obj || window;
          var running = false;
          var func = function() {
            if(running) {
              return;
            }
            running = true;
            requestAnimationFrame(function() {
              obj.dispatchEvent(new CustomEvent(name));
              running = false;
            });
          };
          obj.addEventListener(type, func);
        };

        /!* init - you can init any event *!/
        throttle("resize", "optimizedResize");
      })();

      // handle event
      window.addEventListener("optimizedResize", function() {
        myChart.resize({
          width: 'auto',
          height: 'auto'
        });
      });*/
    },

    //单机
    handleClick(e) {
      //绘制区域
      if (this.isDrawArea) {
        this.latlngs.push([e.latlng.lat,e.latlng.lng])
        this.polyline.addLatLng(e.latlng);
        this.leafletInstance.addLayer(this.polyline)
        // this.leafletInstance.addLayer(L.circle(e.latlng, {
        //   color: '#ff0000', fillColor: 'ff0000', fillOpacity: 1
        // }))
        if (this.latlngs.length>1) {
          if (Object.keys(this.rangingMarker._layers).length) {
            this.rangingMarker._layers[Object.keys(this.rangingMarker._layers)[0]].setLatLng(e.latlng)
          } else {
            let myIcon2 = L.divIcon({className: 'map-label-icon',html: '<span onclick="clearCurrentLine()">x</span>'})
            let rangingMarker2 = L.marker(e.latlng, {
              title: '',
              icon: myIcon2,
              zIndexOffset: 10000
            })
            this.rangingMarker.addLayer(rangingMarker2)
          }
          // console.log(this.rangingMarker._layers[Object.keys(this.rangingMarker._layers)[0]]);

        }
      }

      //测距
      if (this.isRangingMap) {
        this.latlngs.push([e.latlng.lat,e.latlng.lng])
        this.polyline.addLatLng(e.latlng);
        this.leafletInstance.addLayer(this.polyline)
        // this.leafletInstance.addLayer(L.circle(e.latlng, {
        //   radius: 1000,color: '#ff0000', fillColor: '#ffffff', fillOpacity: 0
        // }))
        let myIcon = L.divIcon({className: 'map-dot-icon'})
        let rangingMarker = L.marker(e.latlng, {
          title: '',
          icon: myIcon,
          zIndexOffset: 10000
        })
        this.rangingMarker.addLayer(rangingMarker)
        if (this.latlngs.length>1) {
          this.distanceCount = sumDistance(this.distanceCount.includes('公里')?parseFloat(this.distanceCount):parseFloat(this.distanceCount)/1000,getDistance(e.latlng.lat,e.latlng.lng,this.latlngs[this.latlngs.length-2][0],this.latlngs[this.latlngs.length-2][1]))
          let myIcon2 = L.divIcon({className: 'map-label-icon',html: this.distanceCount})
          let rangingMarker2 = L.marker(e.latlng, {
            title: '',
            icon: myIcon2,
            zIndexOffset: 10000
          })
          this.rangingMarker.addLayer(rangingMarker2)

        } else {
          let myIcon2 = L.divIcon({className: 'map-label-icon',html: '起点'})
          let rangingMarker2 = L.marker(e.latlng, {
            title: '',
            icon: myIcon2,
            zIndexOffset: 10000
          })
          this.rangingMarker.addLayer(rangingMarker2)
        }
        this.leafletInstance.addLayer(this.rangingMarker)
      }
    },

    //双击
    handleDblclick(e) {
      //绘制区域
      if (this.isDrawArea) {
        // this.latlngs = this.latlngs.slice(0,this.latlngs.length-2)
        this.areaPolygon = L.polygon(this.latlngs,{color: this.areaColor})
        this.leafletInstance.addLayer(this.areaPolygon)
        // this.latlngs.push(this.latlngs[0])
        // this.polyline.addLatLng(this.latlngs[0]);
        // this.leafletInstance.addLayer(this.polyline)

        this.$emit('handleDrawDone',JSON.parse(JSON.stringify(this.latlngs)))
        this.latlngs = []
        this.polyline.setLatLngs([])
        this.tempPolyline.setLatLngs([])
        this.isDrawArea = false
        this.rangingMarkerTotal = null
      }
      if (this.isRangingMap) {
        this.latlngs = []
        this.tempPolyline.setLatLngs([])
        if (this.rangingMarkerTotal) {
          let id = Object.keys(this.rangingMarker._layers).reverse()[0]
          let latlng = this.rangingMarker._layers[id]._latlng
          this.rangingMarker.removeLayer(this.rangingMarkerTotal)
          let myIcon3 = L.divIcon({className: 'map-label-icon',html: '<span style="display: block;color: #333;font-weight: bold;">总长：<span style="color: orange;">'+parseFloat(this.distanceCount)+'</span>'+this.distanceCount.slice(this.distanceCount.search(/[^\d.]/))+'</span>'})
          this.rangingMarkerTotal = L.marker(latlng, {
            title: '',
            icon: myIcon3,
            zIndexOffset: 10000
          })
          this.rangingMarker.addLayer(this.rangingMarkerTotal)
          let myIcon2 = L.divIcon({className: 'map-close-icon',html: '<span title="清除测距" onclick="clearRanging()">x</span>'})
          let rangingMarker2 = L.marker(latlng, {
            title: '',
            icon: myIcon2,
            zIndexOffset: 10000
          })
          this.rangingMarker.addLayer(rangingMarker2)
          this.leafletInstance.addLayer(this.rangingMarker)
          this.rangingMarkerTotal = null
        }
        this.isRangingMap = false
      }
    },

    // timer为全局变量
    getClickEvent(_type,e) {
      clearTimeout(this.timer);
      if (_type == 1) {
        this.timer = setTimeout(() => {
          console.log("单击");
          this.handleClick(e)
        }, 300);
      } else {
        console.log("双击");
        this.handleDblclick(e)
      }
    },

    /**
     * 设置当前可视位置
     */
    setView(){
      this.leafletInstance.setView(this.viewInfo.latLng, this.viewInfo.zoom)
    },
    /**
     * 设置标记点数据 - 基于leaflet.markercluster插件实现
     */
    setMarkerClusterData(){
      this.markers = L.markerClusterGroup({
        // 鼠标悬浮到聚合点时，是否显示轮廓线
        // When you mouse over a cluster it shows the bounds of its markers
        showCoverageOnHover: false,
        // removeOutsideVisibleBounds: true
        //  If set, at this zoom level and below, markers will not be clustered. This defaults to disabled.
        disableClusteringAtZoom: this.disableClusteringAtZoom,
        // maxClusterRadius: 10,
      });


      let _this = this;

      let addressPoints = this.markerClusterData
      if(this.markerClusterMaxLength){
        addressPoints = this.markerClusterData.slice(0, this.markerClusterMaxLength)
      }
      for (let i = 0; i < addressPoints.length; i++) {
        let a = addressPoints[i];
        let name = a.name;
        let lngLat = [a.lon-0,a.lat-0];
        //经纬度不符合条件的跳过
        if (!(lngLat[0]&&lngLat[1])){
          continue
        }
        // 坐标系：WGS84转GCj02
        if(this.currentTileCrs == 'gcj02'){
          lngLat = wgs84togcj02(a.lon-0,a.lat-0)
          // console.log('坐标转换：', [lngLat[1], lngLat[0]], a)
        }

        // 启用区域多边形筛选时
        if(this.isMarkerInPolygonFilter && !this.isLatlngsInPolygon(lngLat)){
          continue
        }

        let myIcon;
        if (a.flag === 'ly') {
          myIcon = L.divIcon({className: _this.iconClassData[a.ly]})
          a.name = a.ly
        } else if (a.flag === 'sb') {
          //设备点
          // myIcon = L.icon({
          //   iconUrl: '/image/w-beijing/img/application_icon_device.png',
          //   iconSize: [20, 20],
          //   iconAnchor: [20, 20],
          //   popupAnchor: [20, 20],
          //   className: 'map-device-icon'
          // });
          myIcon = L.divIcon({className: _this.iconClassData['设备']})
          a.name = '设备'
        } else if (a.flag === 'qy') {
          //企业点
          myIcon = L.icon({
            iconUrl: '/image/w-beijing/img/application_icon_company.png',
            iconSize: [12, 12],
            // iconAnchor: [12, 12],
            // popupAnchor: [12, 12],
            className: 'map-company-icon'
          });
          a.name = '企业'
        } else if (a.flag === 'area') {
          //区域点
          myIcon = L.icon({
            iconUrl: '/image/w-beijing/img/icon_location.png',
            iconSize: [40, 40],
            className: 'map-area-icon'
          });
          a.name = a.area_name
        } else {
          myIcon = L.icon({
            iconUrl: icon,
            shadowUrl: iconShadow,
            iconAnchor: [12, 41],
            iconRetinaUrl: icon2x,
            iconSize: [25, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
            tooltipAnchor: [16, -28],
            className: 'map-default-icon'
          });
        }
        let marker = L.marker(new L.LatLng(lngLat[1], lngLat[0]), {
          title: '',
          icon: myIcon,
          zIndexOffset: 10000
        })
                .on({
                  'click': function (e) {
                        _this.$emit('markerClick',Object.assign({},e,{markerData:a}))
                  },
                  'mouseover': function (e) {
                    _this.$emit('mouseover',Object.assign({},e,{markerData:a}))
                  },
                  'mouseout': function (e) {
                    _this.$emit('mouseout',Object.assign({},e,{markerData:a}))
                  }
                });
        if (a.name) {
          marker.bindTooltip(a.name)
        }
        //领域和设备需要详情
        if (a.flag === 'sb'||a.flag === 'ly') {
          let deviceDiv = `
        <div class="device-record-div">
<!--          <i class="el-icon-close"></i>-->
          <div class="company-record-div-top">
            <div class="company-record-div-top-l">
              <img src="/image/w-beijing/img/application_icon_08.png" alt="">
              <span title="${a.ly||''}(${a.qy||''})">${a.ly||''}(${a.qy||''})</span>
            </div>
          </div>
          <div class="company-record-div-main">
            <div class="company-record-div-item">
              <div><span>IMEI号：</span><span onclick="openPage(${a.imei})">${a.imei||''}</span></div>
              <div><span>APN：</span><span>${a.apn||''}</span></div>
<!--              <div><span>设备型号：</span><span>${a.sbxh||''}</span></div>-->
<!--              <div><span>设备类型：</span><span>${a.sblx||''}</span></div>-->
              <div><span>基站编号：</span><span>${a.jzbh||''}</span></div>
              <div><span>经度：</span><span>${a.lon||''}</span></div>
              <div><span>纬度：</span><span>${a.lat||''}</span></div>
            </div>
          </div>
        </div>
        `
          marker.bindPopup(deviceDiv);
        }
        let content =
          `<div class="marker-popup-content">
              <h4>${name}</h4>
              <!--<p>企业名称: 小米科技股份公司</p>-->
              <!--<p>注册地址: 中国-北京</p>-->
          </div>`
        // 自定义提示内容函数
        if(this.getPopupContent){
          content = this.getPopupContent(a)
        }

        // 包含name信息时，点击展示popup
        if(name){
          // marker.bindPopup(content);
        }
        this.markers.addLayer(marker);
      }
      this.leafletInstance.addLayer(this.markers);


    },
    /**
     * 清除已有标记点
     */
    clearMarkerClusterData(){
      this.leafletInstance.removeLayer(this.markers)
    },
    /**
     * 清除路径线经纬度数据
     */
    clearPathLatLngs(){
      this.leafletInstance.removeLayer(this.pathLayerGroup)
    },
    /**
     * 设置路径线数据
     */
    setPathLatLngs(){
      // 这里克隆数据
      let latlngs = this.pathLatLngs.slice(0)
      // 坐标系：WGS84转GCj02
      if(this.currentTileCrs == 'gcj02'){
        for(let i in latlngs){
          let lngLat = wgs84togcj02(latlngs[i][1],latlngs[i][0])
          latlngs[i] = lngLat.reverse()
        }
        // console.log('坐标转换：', [lngLat[1], lngLat[0]], a)
      }
      let path = L.polyline(latlngs, {
        color: '#f64d67',
        dashArray: "8,8",
        dashSpeed: -30
      });
      if(latlngs.length>0){
        this.leafletInstance.fitBounds(L.latLngBounds(path.getBounds()), {
          // 控制自动放大的最大级别，防止出现无底图问题
          maxZoom: 14
        });
      }

      let LayerGroup = L.layerGroup()

      var redIcon = L.icon({
        iconUrl: '/image/w-beijing/img/icon/leaf-red.png',
        shadowUrl: '/image/w-beijing/img/icon/leaf-red.png',

        iconSize:     [15, 20], // size of the icon
        shadowSize:   [15, 20], // size of the shadow
        iconAnchor:   [7.5, 20], // point of the icon which will correspond to marker's location
        shadowAnchor: [7.5, 20],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });

      for(let i in latlngs){
        // this.leafletInstance.addLayer(L.marker(latlngs[i]));
        LayerGroup.addLayer(L.marker(latlngs[i], {icon: redIcon}));
      }
      // this.leafletInstance.addLayer(L.marker(latlngs[0]));
      // this.leafletInstance.addLayer(L.marker(latlngs[latlngs.length - 1]));
      // this.leafletInstance.addLayer(path);
      LayerGroup.addLayer(path);
      this.pathLayerGroup = LayerGroup
      this.leafletInstance.addLayer(this.pathLayerGroup);

    },
    /**
     * 设置多边形区域数据
     */
    setPolygonLatLngs(){
      let LayerGroup = L.layerGroup()
      for(let i in this.polygonLatlngs){
        // 转换坐标系
        let newPolygonLatlngs =this.convertPolygonLatLngsCRS(this.polygonLatlngs[i].value)
        let polygon = L.polygon(newPolygonLatlngs, {color: 'red'}).bindTooltip(this.polygonLatlngs[i].name)
        // polygon.bindPopup(this.polygonLatlngs[i].name)
        LayerGroup.addLayer(polygon)
      }
      this.polygonLatLngsGroup = LayerGroup
      this.leafletInstance.addLayer(this.polygonLatLngsGroup);
    },
    /**
     * 清除路径线经纬度数据
     */
    clearPolygonLatLngs(){
      this.leafletInstance.removeLayer(this.polygonLatLngsGroup)
    },
    /**
     * 判断经纬度坐标是否在多边形区域中
     * @param lnglat
     * @returns {boolean}
     */
    isLatlngsInPolygon(lnglat){
      let polygonLatlngs = this.polygonLatlngs
      for(let i in polygonLatlngs){
        let lnglats = this.latlngsTolnglats(polygonLatlngs[i].value)
        if(this.isInPolygon(lnglat, lnglats)){
          console.log('经纬度值'+lnglat+'在多边形区域中')
          return true
        }
      }
      return false
    },
    /**
     * 转换多边形数据(注：包含坐标系转换)
     * @param latlngs
     * @returns {*[]}
     */
    latlngsTolnglats(latlngs){
      let lnglats = []
      for(let i in latlngs){
        let lnglat = []
        // 坐标系：WGS84转GCj02
        if(this.currentTileCrs == 'gcj02') {
          lnglat = wgs84togcj02(latlngs[i][1] - 0, latlngs[i][0] - 0)
          // console.log('坐标转换：', [lngLat[1], lngLat[0]], a)
        }else{
          lnglat = [latlngs[i][1] - 0, latlngs[i][0] - 0]
        }
        lnglats.push(lnglat)
      }
      return lnglats
    },
    convertPolygonLatLngsCRS(latlngs){
      let newLatlngs = []
      for(let i in latlngs){
        // 坐标系：WGS84转GCj02
        if(this.currentTileCrs == 'gcj02') {
          let lnglat = wgs84togcj02(latlngs[i][1] - 0, latlngs[i][0] - 0)
          // console.log('坐标转换：', [lngLat[1], lngLat[0]], a)
          newLatlngs.push([lnglat[1]-0, lnglat[0]-0])
        }else{
          newLatlngs.push(latlngs[i])
        }
      }
      return newLatlngs
    },
    /**
     * 判断坐标是否在多边形区域中（格式为经纬度lnglat）
     * @param checkPoint
     * @param polygonPoints
     * @returns {boolean}
     */
    isInPolygon(checkPoint, polygonPoints) {
      // console.log('isInPolygon参数：', checkPoint, polygonPoints)
      var counter = 0;
      var i;
      var xinters;
      var p1, p2;
      var pointCount = polygonPoints.length;
      p1 = polygonPoints[0];

      for (i = 1; i <= pointCount; i++) {
        p2 = polygonPoints[i % pointCount];
        if (
            checkPoint[0] > Math.min(p1[0], p2[0]) &&
            checkPoint[0] <= Math.max(p1[0], p2[0])
        ) {
          if (checkPoint[1] <= Math.max(p1[1], p2[1])) {
            if (p1[0] != p2[0]) {
              xinters =
                  (checkPoint[0] - p1[0]) *
                  (p2[1] - p1[1]) /
                  (p2[0] - p1[0]) +
                  p1[1];
              if (p1[1] == p2[1] || checkPoint[1] <= xinters) {
                counter++;
              }
            }
          }
        }
        p1 = p2;
      }
      if (counter % 2 == 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  beforeDestroy() {
    this.echartsInstance.dispose()
    console.log('LeafletGis的chart图表对象销毁后状态：', this.echartsInstance.isDisposed())
  },
}
</script>

<style lang="scss" scoped>
.leaflet-gis-container {
  /deep/ {
    .leaflet-container {
      background: transparent;
    }

    .leaflet-touch .leaflet-control-layers, .leaflet-touch .leaflet-bar {
      border: 2px solid rgba(0, 0, 0, 0.2);
      background-clip: padding-box;
      background-color: #000000a8;
      color: #d3d3d3;
    }

    .leaflet-bar a, .leaflet-bar a:hover {
      background-color: transparent;
    }

    /* 提示信息 */
    .leaflet-popup-content-wrapper, .leaflet-popup-tip {
      /*background: #2a2a2a96;*/
      color: #ffffff;
      font-size: 18px;
      /*box-shadow: 0 3px 14px rgba(141, 141, 141, 0.4);*/
      background: transparent;
    }

    /* 图层切换按钮 */
    .leaflet-control-layers-toggle {
      opacity: 0.5;
      background-size: 20px;
    }
    .leaflet-touch .leaflet-control-layers-toggle {
      width: 25px;
      height: 25px;
    }

    /* 放大缩小按钮 */
    .leaflet-control-zoom {
      display: none;
      position: relative;
      top: 77px;
    }

    /* 右下角角标标注 */
    .leaflet-control-attribution.leaflet-control {
      background: transparent;
    }

    /*marker*/
    .map-dot-icon{
      width: 6px !important;
      height: 6px !important;
      border-radius: 100px;
      border: 3px solid #ff0000;
      background-color: #ffffff;
    }
    .map-label-icon{
      margin-top: -10px!important;
      margin-left: 10px!important;
      width: auto !important;
      height: auto !important;
      background: white;
      border: 1px solid #666;
      color: #666;
      padding: 2px 5px;
      white-space: nowrap;
    }
    .map-close-icon{
      margin-top: -10px!important;
      margin-left: -30px!important;
      width: auto !important;
      height: auto !important;
      background: white;
      border: 1px solid #ff0000;
      color: #ff0000;
      padding: 2px 5px;
      white-space: nowrap;
      font-weight: bold;
    }

    .leaflet-cursor{
      cursor: url('/image/w-beijing/img/icon_ranging.png'),auto;
    }

  }
}
</style>
