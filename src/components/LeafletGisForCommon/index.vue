<template>
  <div ref="map" class="leaflet-gis-container" :style="{width: width,height: height}"></div>
</template>

<script>
import { cloneDeep } from 'lodash';
import L from 'leaflet';
import { markerClusterGroup } from "leaflet.markercluster";
// 引入默认图标，解决图标路径问题
import icon from 'leaflet/dist/images/marker-icon.png';
import icon2x from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
// import 'leaflet-echarts/src/leaflet-echarts.js'
// import 'leaflet-echarts/lib/echarts.source.js'
import { echarts, allLeafletList } from './echarts-leaflet.js';
import { wgs84togcj02 } from './latLngUtil.js';
// 虚线动画路径线，插件地址：https://gitlab.com/IvanSanchez/Leaflet.Path.DashFlow
import './L.Path.DashFlow.js';

// 全屏按钮插件（包含在transform下，导致全屏无效，暂时隐藏该插件）
// import fullscreen from './leaflet.fullscreen/Control.FullScreen.js'
// import './leaflet.fullscreen/Control.FullScreen.scss'


export default {
  name: 'LeafletGisForCommon',
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
      default: "gcj02"
    },
    // echart地图相关配置
    option: {
      type: Object,
      required: false,
      default: function () {
        return {};
      }
    },
    // 视口信息，包含坐标和放大比
    viewInfo: {
      type: Object,
      default: function () {
        return {
          latLng: [104.114129, 37.550339],
          zoom: 2
        };
      }
    },
    /* 标记点数据-基于leaflet.markercluster插件实现 */
    markerClusterData: {
      type: Array,
      default: function () {
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
        ];
      }
    },
    /* 获取popup提示内容 */
    getPopupContent: {
      type: Function
    },
    /* 路径经纬度数据，虚线动画效果 */
    pathLatLngs: {
      type: Array,
      default: function () {
        return [
          /*{
            lat: 39.975515,
            lng: 116.387957,
            markerType: 'redRippleIcon', // 可选，redRippleIcon表示点为涟漪效果
          }*/
        ];
      }
    },
  },
  data() {
    return {
      echartsInstance: null,
      leafletInstance: null,
      currentTileCrs: this.defaultCrs,
      markers: null,
      // 路径线元素组，方便清空等操作
      pathLayerGroup: null,
      pointers: [],
    };
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
    markerClusterData: function () {
      this.clearMarkerClusterData();
      this.setMarkerClusterData();
    },
    pathLatLngs: {
      handler: function () {
        if (this.leafletInstance) {
          this.clearPathLatLngs();
          this.setPathLatLngs();
        } else {
          this.initMap();
        }
      }
    }
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
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
      };

      this.echartsInstance = echarts.init(this.$refs.map);

      this.echartsInstance.setOption({ leaflet: leafletOption, ...this.option });

      // leaflet地图核心实例
      // this.leafletInstance = allLeafletList[0].getLeaflet()
      // console.log('地图实例：', allLeafletList[0].getLeaflet())
      this.leafletInstance = this.echartsInstance._coordSysMgr._coordinateSystems[0].getLeaflet();

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
      this.setMarkerClusterData();
      this.setPathLatLngs();

      let popup = L.popup();
      let that = this;
      this.leafletInstance.on('click', (e) => {
        console.log(that.pointers, e.latlng, 'that.pointers');
        /*
        popup
          .setLatLng(e.latlng)
          .setContent(content)
          .openOn(this.leafletInstance);
      }*/
        console.log("当前点击的坐标为： " + e.latlng);
      });

      this.leafletInstance.on('baselayerchange', e => {
        console.log('baselayerchange', e);
        this.currentTileCrs = e.layer.options.crs;
        // 重新刷新数据
        this.clearMarkerClusterData();
        this.setMarkerClusterData();

        // 重新刷新路径数据
        this.clearPathLatLngs();
        this.setPathLatLngs();
      });




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
    /**
     * 设置当前可视位置
     */
    setView() {
      this.leafletInstance.setView(this.viewInfo.latLng, this.viewInfo.zoom);
    },
    /**
     * 设置标记点数据 - 基于leaflet.markercluster插件实现
     */
    setMarkerClusterData() {
      this.markers = L.markerClusterGroup(
        {
          // 鼠标悬浮到聚合点时，是否显示轮廓线
          // When you mouse over a cluster it shows the bounds of its markers
          showCoverageOnHover: false
        }
      );
      let _this = this;

      let addressPoints = this.markerClusterData;

      for (let i = 0; i < addressPoints.length; i++) {
        let a = addressPoints[i];
        let name = a.name;
        let lngLat = [a.lon - 0, a.lat - 0];
        // 坐标系：WGS84转GCj02
        if (this.currentTileCrs == 'gcj02') {
          lngLat = wgs84togcj02(a.lon - 0, a.lat - 0);
          // console.log('坐标转换：', [lngLat[1], lngLat[0]], a)
        }
        let marker = L.marker(new L.LatLng(lngLat[1], lngLat[0]), { title: name })
          .on('click', function (e) {
            // alert(JSON.stringify(a));
            _this.$emit('markerClick', Object.assign({}, e, { markerData: a }));
            // a --- {
            //   "country": "中国",
            //   "lng": 102.729674,
            //   "province": "北京市",
            //   "city": "北京",
            //   "event_date": 20211110,
            //   "imei": "3597390723876900",
            //   "basstastr": "基站编号",
            //   "lat": 25.009411,
            //   "eventdate": 20211110
            // };
            let content = `<div>
              <h4>${name}</h4>
              <p>经度：${a.lng}</p>
              <p>纬度：${a.lat}</p>
              <p>时间：${a.eventdate}</p>
        </div>`;

            // 自定义提示内容函数
            if (this.getPopupContent) {
              content = this.getPopupContent(a);
            }

            let popup = L.popup();
            // 包含name信息时，点击展示popup
            if (name) {
              marker.bindPopup(content);
            }
          });

        this.markers.addLayer(marker);
      }
      this.leafletInstance.addLayer(this.markers);


    },
    /**
     * 清除已有标记点
     */
    clearMarkerClusterData() {
      this.leafletInstance.removeLayer(this.markers);
    },
    /**
     * 清除路径线经纬度数据
     */
    clearPathLatLngs() {
      this.leafletInstance.removeLayer(this.pathLayerGroup);
    },
    /**
     * 设置路径线数据
     */
    setPathLatLngs() {
      // 这里克隆数据，这里是对象格式的数组
      // let pathLatLngs = this.pathLatLngs.slice(0)
      let pathLatLngs = cloneDeep(this.pathLatLngs);
      // leaflet的数组格式的数组
      let latlngs = [];
      // 坐标系：WGS84转GCj02
      if (this.currentTileCrs == 'gcj02') {
        for (let i in pathLatLngs) {
          // 校验数据必须包含lng和lat数据
          if (pathLatLngs[i].lng && pathLatLngs[i].lat) {
            let lngLat = wgs84togcj02(pathLatLngs[i].lng, pathLatLngs[i].lat);
            // latlngs[i] = lngLat.reverse()
            pathLatLngs[i].lng = lngLat[0];
            pathLatLngs[i].lat = lngLat[1];
            this.pointers.push(pathLatLngs[i]);
            latlngs.push([lngLat[1], lngLat[0]]);
          }
        }
        // console.log('坐标转换：', [lngLat[1], lngLat[0]], a)
      } else {
        for (let i in pathLatLngs) {
          // 校验数据必须包含lng和lat数据
          if (pathLatLngs[i].lng && pathLatLngs[i].lat) {
            // let lngLat = wgs84togcj02(pathLatLngs[i].lng,pathLatLngs[i].lat)
            // latlngs[i] = lngLat.reverse()
            // pathLatLngs[i].lng = pathLatLngs[i].lng
            // pathLatLngs[i].lat = pathLatLngs[i].lat
            latlngs.push([pathLatLngs[i].lat, pathLatLngs[i].lng]);
          }
        }
      }
      console.log('polyline的参数latlngs：', latlngs);
      // 路径线组
      let LayerGroup = L.layerGroup();
      // 校验数据必须有值，不能为[]，否则path等对象移除时会出错，导致二次使用无效
      if (latlngs.length > 0) {
        let path = L.polyline(latlngs, {
          color: '#f64d67',
          dashArray: "8,8",
          dashSpeed: -30
        });

        this.leafletInstance.fitBounds(L.latLngBounds(path.getBounds()), {
          // 控制自动放大的最大级别，防止出现无底图问题
          maxZoom: 20,
          // animate: true,
          // duration: 1
        });


        // 红色标记点
        var redIcon = L.icon({
          iconUrl: '/image/w-beijing/img/icon/leaf-red.png',
          shadowUrl: '/image/w-beijing/img/icon/leaf-red.png',

          iconSize: [15, 20], // size of the icon
          shadowSize: [15, 20], // size of the shadow
          iconAnchor: [7.5, 20], // point of the icon which will correspond to marker's location
          shadowAnchor: [7.5, 20],  // the same for the shadow
          popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        // 红色涟漪效果点
        let redRippleIcon = L.divIcon({
          className: 'red-ripple-icon',
          html: `<div class="content warning">
                <div class="one"><p></p><span></span></div>
                <div class="ten"><p></p><span></span></div>
              </div>`,
          bgPos: [0, 0]
        });

        for (let i in pathLatLngs) {
          // this.leafletInstance.addLayer(L.marker(latlngs[i]));
          if (pathLatLngs[i].markerType == 'redRippleIcon') {
            LayerGroup.addLayer(L.marker([pathLatLngs[i].lat, pathLatLngs[i].lng], { icon: redRippleIcon }));
          } else {
            LayerGroup.addLayer(L.marker([pathLatLngs[i].lat, pathLatLngs[i].lng], { icon: redIcon }));
          }

        }
        // this.leafletInstance.addLayer(L.marker(latlngs[0]));
        // this.leafletInstance.addLayer(L.marker(latlngs[latlngs.length - 1]));
        // this.leafletInstance.addLayer(path);
        LayerGroup.addLayer(path);
      }
      // 路径线元素组，方便清空等操作
      this.pathLayerGroup = LayerGroup;
      this.leafletInstance.addLayer(this.pathLayerGroup);
    }
  },
  beforeDestroy() {
    this.echartsInstance.dispose();
    console.log('LeafletGis的chart图表对象销毁后状态：', this.echartsInstance.isDisposed());
  },
}
</script>

<style lang="scss" scoped>
.leaflet-gis-container {
  /deep/ {
    .leaflet-container {
      background: transparent;
    }

    .leaflet-touch .leaflet-control-layers,
    .leaflet-touch .leaflet-bar {
      border: 2px solid rgba(0, 0, 0, 0.2);
      background-clip: padding-box;
      background-color: #000000a8;
      color: #d3d3d3;
    }

    .leaflet-bar a,
    .leaflet-bar a:hover {
      background-color: transparent;
    }

    /* 提示信息 */
    .leaflet-popup-content-wrapper,
    .leaflet-popup-tip {
      background: #2a2a2a96;
      color: #ffffff;
      font-size: 18px;
      box-shadow: 0 3px 14px rgba(141, 141, 141, 0.4);
    }
    .leaflet-popup-content {
      font-size: 16px;
      line-height: 1.2;
      margin: 13px 20px 20px;
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

    /* 红色涟漪动画点 */
    .red-ripple-icon {
      .content {
        position: absolute;
        left: -3px;
        bottom: 0;
        width: 10px;
        height: 10px;
        z-index: 2;
      }

      .content div {
        background: #ffffff;
        width: 4px;
        height: 4px;
        border: 6px #f69409 solid;
        border-radius: 50%;
        position: relative;
      }

      /*告警状态*/
      .content.warning {
        div {
          border: 6px #f33c06 solid;
        }
        p,
        span {
          box-shadow: 0px 0px 1px #f33c06;
        }
        .ten {
          background: #f33c06;
        }
      }

      .content p,
      .content span {
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        animation: myfirst 1.5s infinite;
        box-shadow: 0px 0px 1px #f69409;
        margin: 0px;
      }
      .content span {
        animation-delay: 0.8s;
      }

      .content .one {
        position: absolute;
      }
      .content .ten {
        background: #f69409;
        position: absolute;
      }

      @keyframes myfirst {
        10% {
          transform: scale(1);
        }
        100% {
          transform: scale(8);
        }
      }
    }
  }
}
</style>
