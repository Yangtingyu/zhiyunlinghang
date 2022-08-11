<!--/**
 * @name: baidumapDemo
 * @Author: xiao jun
 * @Date: 2022/4/8
 * @Description:
 */-->
<template>
  <div style="width: 100%;height: 100%;">
    <div ref="map" style="width: 100%;height: 100%;"></div>
    <div class="ps-ab" style="top: 100px;">
      <el-select v-model="mapStyle" placeholder="请选择" @change="mapStyleChange">
        <el-option
          v-for="item in mapStyleOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="ps-ab" style="top: 150px;">
      <el-button @click="mapTypeChange(0)">地图</el-button>
      <el-button @click="mapTypeChange(1)">卫星</el-button>
    </div>
    <div class="ps-ab" style="top: 200px;">
      <el-input placeholder="关键字" v-model="searchValue" @change="search"></el-input>
    </div>
    <div class="ps-ab" style="top: 250px;">
      <el-button @click="layerMarker">图片图层</el-button>
    </div>
    <div class="ps-ab" style="top: 300px;">
      <el-button @click="openDistance">测距</el-button>
      <el-button @click="distanceTool.close()">结束测距</el-button>
    </div>
    <div class="ps-ab" style="top: 350px;">
      <el-button @click="animateFn">轨迹动画</el-button>
      <el-button @click="trackAni._status===1?trackAni.pause():trackAni.continue()">
        {{trackAni&&trackAni._status===1?'暂停':'继续'}}
      </el-button>
    </div>
    <ul class="drawing-panel">
      <li class="bmap-btn bmap-marker" id="marker" @click="draw($event)"></li>
      <li class="bmap-btn bmap-polyline" id="polyline" @click="draw($event)"></li>
      <li class="bmap-btn bmap-rectangle" id="rectangle" @click="draw($event)"></li>
      <li class="bmap-btn bmap-polygon" id="polygon" @click="draw($event)"></li>
      <li class="bmap-btn bmap-circle" id="circle" @click="draw($event)"></li>
    </ul>
    <div style="position: absolute;bottom: 10px;left: 10px;z-index: 9;width: 1900px;cursor: pointer;">
      <zebra-common-echart :chartInfo="tendencyChart.chartInfo" :height="tendencyChart.height" :delayTime="tendencyChart.delayTime" :notMerge="tendencyChart.notMerge" @click="echartClick"></zebra-common-echart>
    </div>
  </div>
</template>

<script>

  import styleJson1 from './json/custom_map_config_lyxz'
  import styleJson2 from './json/custom_map_config_ym'
  import styleJson3 from './json/custom_map_config_zsz'
  import styleJson4 from './json/custom_map_config_h'

  export default {
    name: "baidumapDemo",
    data() {
      return {
        map: null,
        distanceTool: null,
        trackAni: null,
        searchValue: '',
        mapStyleOptions: [{
          value: '0',
          label: '默认'
        }, {
          value: '1',
          label: '绿野仙踪'
        }, {
          value: '2',
          label: '眼眸'
        }, {
          value: '3',
          label: '朱砂痣'
        }, {
          value: '4',
          label: '黑魔法'
        }],
        mapStyle: '1',
        markerView: null,
        //趋势图
        tendencyChart: {
          height: "171px",
          delayTime: 500,
          chartInfo: {
            type: 'lineChartFn',
            data: [
              {
                name: '05.06',
                value: '2000',
              },
              {
                name: '05.07',
                value: '2100',
              },
              {
                name: '05.08',
                value: '1100',
              },
              {
                name: '05.09',
                value: '2800',
              },
              {
                name: '05.10',
                value: '5900',
              }
            ],
            formateName: '',
          },
          notMerge: true,
        },
      }
    },
    mounted() {
      this.init()
    },
    destroyed() {
      this.map.destroy()
    },
    methods: {
      init() {
        this.map = new BMapGL.Map(this.$refs.map);          // 创建地图实例
        let map = this.map
        var point = new BMapGL.Point(116.404, 39.915);  // 创建点坐标
        map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

        this.mapStyleChange()

        // 创建城市选择控件
        var cityControl = new BMapGL.CityListControl({
          // 控件的停靠位置（可选，默认左上角）
          anchor: BMAP_ANCHOR_TOP_LEFT,
          // 控件基于停靠位置的偏移量（可选）
          offset: new BMapGL.Size(10, 5)
        });
        // 将控件添加到地图上
        map.addControl(cityControl);

        var navi3DCtrl = new BMapGL.NavigationControl3D();  // 添加3D控件
        map.addControl(navi3DCtrl);

        this.mapV3D(map)

        this.setArea(map)

        this.setMarker(map)

        this.setData(map,this.initData())

        this.getEchartsData()


      },

      mapStyleChange() {
        let map = this.map
        let json
        switch (this.mapStyle) {
          case "1":
            json = styleJson1;
            break;
          case "2":
            json = styleJson2;
            break;
          case "3":
            json = styleJson3;
            break;
          case "4":
            json = styleJson4;
            break;
          default:
            json = null
        }
        map.setMapStyleV2({styleJson: json});
// 隐藏室内图
        map.setDisplayOptions({
          indoor: false
        });
      },

      mapTypeChange(type) {
        let map = this.map
        map.setMapType(type === 1 ? BMAP_EARTH_MAP : BMAP_NORMAL_MAP);      // 设置地图类型为地球模式
      },

      setMarker(map) {
        var point = new BMapGL.Point(116.404, 39.915);  // 创建点坐标
        // 创建点标记
        var marker = new BMapGL.Marker(point);
        map.addOverlay(marker);
// 创建信息窗口
        var opts = {
          width: 200,
          height: 100,
          title: '详情'
        };
        var infoWindow = new BMapGL.InfoWindow('我爱恒安嘉新大家庭', opts);
// 点标记添加点击事件
        marker.addEventListener('click', function () {
          map.openInfoWindow(infoWindow, point); // 开启信息窗口
        });


        this.markerView = new mapvgl.View({
          map: map
        });
        var cities = [
          [116.38621, 39.999822],
          [116.389121, 40.000002],
          [116.381243, 39.999753],
          [116.380884, 39.997038],
          [116.378009, 39.996243],
          [116.386273, 39.995891],
          [116.388357, 39.997383],
          [116.383704, 40.002158],
          [116.383704, 40.002158],
          [116.383004, 40.000686],
          [116.387612, 40.001183],
          [116.388663, 40.002489],
          [116.38568, 40.004147],
          [116.381638, 40.003484],
          [116.381548, 40.002855],
          [116.38604, 40.005197],
          [116.386309, 40.003498],
          [116.387046, 40.000859],
          [116.390783, 40.001025],
          [116.3931, 40.004051],
        ];
        function shuffle(array) {
          var m = array.length,
            t, i;
          while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
          }
          return array;
        }
        cities = shuffle(cities)
        var colors = ['#f00', '#ff0', '#0ff', '#00f'];
        var data = cities.map((city, index) => {
          return {
            geometry: {
              type: 'Point',
              coordinates: city
            },
            color: colors[index % 4],
            // 圆的半径
            size: 10
          };
        });

        let opts2 = {
          width: 200,
          height: 100,
          title: '详情'
        };
        let infoWindow2 = new BMapGL.InfoWindow('我爱恒安嘉新大家庭', opts2);
        var simpleLayer = new mapvgl.CircleLayer({
          // 默认类型，绘制简单圆
          type: 'simple',
          borderWidth: 5,
          borderColor: '#000000',
          enablePicked: true,
          selectedColor: '#f0f', // 选中项颜色
          autoSelect: true, // 根据鼠标位置来自动设置选中项
          onClick: (e) => { // 点击事件
            console.log(e);
            map.openInfoWindow(infoWindow, new BMapGL.Point(e.dataItem.geometry.coordinates[0],e.dataItem.geometry.coordinates[1])); // 开启信息窗口
          }
        });
        this.markerView.addLayer(simpleLayer);
        simpleLayer.setData(data.slice(0, 3));

        var waveLayer = new mapvgl.CircleLayer({
          // 绘制带波纹扩散的圆
          type: 'wave',
          // 扩散半径，支持直接设置和回调两种形式
          radius: r => 1.6 * r,
          // 周期影响扩散速度，越小越快
          duration: 1 / 3,
          // 拖尾影响波纹数，越大越多
          trail: 4,
        });
        this.markerView.addLayer(waveLayer);
        waveLayer.setData(data.slice(3, 8));

        var bubbleLayer = new mapvgl.CircleLayer({
          // 绘制带泡泡的圆
          type: 'bubble',
          size: (size) => 3 * size,
          // 扩散半径，支持直接设置和回调两种形式，size为点的大小
          radius(size) {
            return 2 * size;
          },
          // 扩散时间
          duration: 1,
          // 渐隐时间
          trail: 1
        });
        this.markerView.addLayer(bubbleLayer);
        bubbleLayer.setData(data.slice(8, 15));

        var breathLayer = new mapvgl.CircleLayer({
          // 绘制呼吸显隐的圆
          type: 'breath',
          // 扩散半径，支持直接设置和回调两种形式，size为点的大小
          radius(size) {
            return size;
          },
          // 显示时间
          duration: 3,
          // 渐隐时间
          trail: 3
        });
        this.markerView.addLayer(breathLayer);
        breathLayer.setData(data.slice(15, 20));

        var radarhLayer = new mapvgl.CircleLayer({
          // 绘制雷达扫描的圆
          type: 'radar',
          unit: 'm',
          radius: 100000,
          // random: false,
          // 周期
          duration: 1,
          // 边缘抗锯齿，默认开启，可关闭
          antialias: false,
          // 渐变拖尾的角度，同时可控制旋转方向，默认顺时针，负值时反向旋转
          trail: -200
        });
        this.markerView.addLayer(radarhLayer);
        radarhLayer.setData(data.slice(20));
      },

      search() {
        let map = this.map
        var local = new BMapGL.LocalSearch(map, {
          renderOptions: {map: map}
        });
        local.search(this.searchValue);
      },

      draw(e) {
        let map = this.map
        var styleOptions = {
          strokeColor: '#5E87DB',   // 边线颜色
          fillColor: '#5E87DB',     // 填充颜色。当参数为空时，圆形没有填充颜色
          strokeWeight: 2,          // 边线宽度，以像素为单位
          strokeOpacity: 1,         // 边线透明度，取值范围0-1
          fillOpacity: 0.2          // 填充透明度，取值范围0-1
        };
        var labelOptions = {
          borderRadius: '2px',
          background: '#FFFBCC',
          border: '1px solid #E1E1E1',
          color: '#703A04',
          fontSize: '12px',
          letterSpacing: '0',
          padding: '5px'
        };

        // 实例化鼠标绘制工具
        var drawingManager = new BMapGLLib.DrawingManager(map, {
          // isOpen: true,        // 是否开启绘制模式
          enableCalculate: false, // 绘制是否进行测距测面
          enableSorption: true,   // 是否开启边界吸附功能
          sorptiondistance: 20,   // 边界吸附距离
          circleOptions: styleOptions,     // 圆的样式
          polylineOptions: styleOptions,   // 线的样式
          polygonOptions: styleOptions,    // 多边形的样式
          rectangleOptions: styleOptions,  // 矩形的样式
          labelOptions: labelOptions,      // label样式
        });
        console.log(drawingManager);
        draw(e.target)

        function draw(e) {
          var arr = document.getElementsByClassName('bmap-btn');
          for (var i = 0; i < arr.length; i++) {
            arr[i].style.backgroundPositionY = '0';
          }
          e.style.backgroundPositionY = '-52px';
          switch (e.id) {
            case 'marker': {
              var drawingType = BMAP_DRAWING_MARKER;
              break;
            }
            case 'polyline': {
              var drawingType = BMAP_DRAWING_POLYLINE;
              break;
            }
            case 'rectangle': {
              var drawingType = BMAP_DRAWING_RECTANGLE;
              break;
            }
            case 'polygon': {
              var drawingType = BMAP_DRAWING_POLYGON;
              break;
            }
            case 'circle': {
              var drawingType = BMAP_DRAWING_CIRCLE;
              break;
            }
          }
          console.log(drawingType);
          // 进行绘制
          if (drawingManager._isOpen && drawingManager.getDrawingMode() === drawingType) {
            drawingManager.close();
          } else {
            drawingManager.setDrawingMode(drawingType);
            drawingManager.open();
          }
        };
      },

      //图片图层
      layerMarker() {
        let map = this.map
        map.centerAndZoom(new BMapGL.Point(117.200, 36.2437), 18);
        map.enableScrollWheelZoom(true);
        map.setTilt(45);
        map.setDisplayOptions({
          poiText: false,  // 隐藏poi标注
          poiIcon: false,  // 隐藏poi图标
          building: false  // 隐藏楼块
        });


        var pStart = new BMapGL.Point(117.19635, 36.24093);
        var pEnd = new BMapGL.Point(117.20350, 36.24764);
        var bounds = new BMapGL.Bounds(new BMapGL.Point(pStart.lng, pEnd.lat), new BMapGL.Point(pEnd.lng, pStart.lat));
        var imgOverlay = new BMapGL.GroundOverlay(bounds, {
          type: 'image',
          url: require('./img/shouhuimap.png'),
          opacity: 1
        });
        map.addOverlay(imgOverlay);
      },

      animateFn() {
        let map = this.map
        map.centerAndZoom(new BMapGL.Point(116.297611, 40.047363), 17)
        var path = [{
          'lng': 116.297611,
          'lat': 40.047363
        }, {
          'lng': 116.302839,
          'lat': 40.048219
        }, {
          'lng': 116.308301,
          'lat': 40.050566
        }, {
          'lng': 116.305732,
          'lat': 40.054957
        }, {
          'lng': 116.304754,
          'lat': 40.057953
        }, {
          'lng': 116.306487,
          'lat': 40.058312
        }, {
          'lng': 116.307223,
          'lat': 40.056379
        }];
        var point = [];
        for (var i = 0; i < path.length; i++) {
          point.push(new BMapGL.Point(path[i].lng, path[i].lat));
        }
        var pl = new BMapGL.Polyline(point);
        this.trackAni = new BMapGLLib.TrackAnimation(map, pl, {
          overallView: true, // 动画完成后自动调整视野到总览
          tilt: 30,          // 轨迹播放的角度，默认为55
          duration: 20000,   // 动画持续时长，默认为10000，单位ms
          delay: 3000        // 动画开始的延迟，默认0，单位ms
        });
        this.trackAni.start();
      },

      openDistance() {
        let map = this.map
        this.distanceTool = new BMapGLLib.DistanceTool(map);
        this.distanceTool.open()
      },

      mapV3D(map) {
        let options = {
          heading: 0,
          tilt: 60,
          zoom: 16,
          center: [116.384131, 39.999627],
        }
        if (options.center && options.zoom) {
          let center = options.center;
          if (center instanceof Array) {
            center = new BMapGL.Point(options.center[0], options.center[1])
          }
          map.centerAndZoom(center, options.zoom);
        }

        map.setTilt(options.tilt);
        map.setHeading(options.heading);


        var view = new mapvgl.View({
          map: map
        });
        var layer = new mapvgl.ShapeLayer({
          color: 'rgb(0, 255, 255)',
          blend: 'lighter',
          style: 'window',
          textureScale: 0.1,
          data: [
            {
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [116.383785,39.998427],
                    [116.386749,39.998634],
                    [116.386839,39.99681],
                    [116.384486,39.996699],
                  ]
                ]
              },
              properties: {
                height: 50, // 多边形高度
              }
            },{
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [116.384647,39.996534],
                    [116.386821,39.996617],
                    [116.386983,39.994792],
                    [116.384989,39.995276],
                  ]
                ]
              },
              properties: {
                height: 100, // 多边形高度
              }
            },{
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [116.386839,40.000223],
                    [116.388241,39.999781],
                    [116.386839,39.999836],
                    [116.386911,40.000223],
                  ]
                ]
              },
              properties: {
                height: 100, // 多边形高度
              }
            },{
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [116.387109,39.995939],
                    [116.392499,39.995801],
                    [116.392517,39.994461],
                    [116.387073,39.994309],
                  ]
                ]
              },
              properties: {
                height: 50, // 多边形高度
              }
            },{
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [116.392463,40.000389],
                    [116.393523,40.00043],
                    [116.393684,39.994696],
                    [116.392624,39.99453],
                  ]
                ]
              },
              properties: {
                height: 50, // 多边形高度
              }
            },{
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [116.388366,39.998109],
                    [116.38984,39.997902],
                    [116.389768,39.997874],
                    [116.390936,39.997888],
                    [116.391007,39.997073],
                    [116.388456,39.996907],
                  ]
                ]
              },
              properties: {
                height: 150, // 多边形高度
              }
            },
          ]
        });
        var layer2 = new mapvgl.ShapeLayer({
          color: 'rgb(168,199,200)',
          blend: 'lighter',
          style: 'window',
          data: [
            {
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [116.383264,39.999905],
                    [116.38401,39.998717],
                    [116.385815,39.999],
                    [116.38577,40.000154],
                  ]
                ]
              },
              properties: {
                height: 500, // 多边形高度
              }
            }]
        })
        view.addLayer(layer);
        view.addLayer(layer2);

      },

      /**
       * 准备数据源
       * @returns {[]}
       */
      initData() {
        // 生成的数据信息
        let data = []
        // 城市数据信息
        let cities = [
          [116.38621, 39.999822],
          [116.389121, 40.000002],
          [116.381243, 39.999753],
          [116.380884, 39.997038],
          [116.378009, 39.996243],
          [116.386273, 39.995891],
          [116.388357, 39.997383],
          [116.383704, 40.002158],
          [116.383704, 40.002158],
          [116.383004, 40.000686],
        ]
        let cities2 = [
          [2.33472,47.317398],
          [17.935628,52.536327],
          [-2.080631,53.336613],
          [-3.552415,55.98064],
          [-78.613386,35.576621],
          [-98.776824,30.496796],
          [-107.018813,35.275438],
          [-112.022877,38.928776],
          [-115.849515,40.632057],
          [-108.564185,46.306949],
        ]
        // 需要定义 700 个 data 的数据项
        let randomCount = 20
        while (randomCount--) {
          // 获取每一个城市的中心点坐标 随机生成  在 所有城市范围内挑选 生成的随机数是 [0,cities.length] 创建开始开始城市和终点城市
          let start = cities2[parseInt(Math.random() * cities2.length, 10)]
          let end = cities[parseInt(Math.random() * cities.length, 10)]
          // 创建贝塞尔曲线对象
          let curve = new mapvgl.BezierCurve();
          // 根据起点和终点生成贝塞尔曲线坐标集
          curve.setOptions(
            {
              start: start,
              end: end
            }
          )
          let curveData = curve.getPoints()
          // 3. 创建data数据
          data.push(
            {
              geometry: {
                type: 'LineString',
                coordinates: curveData
              }
            }
          )
        }
        return data;
      },

      /**
       * 绘制数据源
       * @param map
       * @param data
       */
      setData(map, data) {
        // 创建图层管理器
        let view = new mapvgl.View(
          {map,effects: [
              new mapvgl.BrightEffect({
                threshold: 0,
                blurSize: 2,
                clarity: 0.4
              }),
            ],}
        );

        let flyLineLayer = new mapvgl.FlyLineLayer(
          {
            // 飞线动画方式  normal，默认值，飞线动画速度均匀  chaos，飞线动画速度不均匀
            style: 'normal',
            // 底线颜色
            color: 'rgba(33, 242, 214, 1)',
            // 飞线动画的颜色
            textureColor: 'red',
            // 飞线动画的宽度
            textureWidth: 20,
            // 飞线动画的长度，占整条线的百分比，取值0-100
            textureLength: 10,
            // 飞线动画的步长，步长越大动画速度越快 默认值 0.1
            step: 0.1
          }
        );

        view.addLayer(flyLineLayer);

        flyLineLayer.setData(data);
      },

      setArea(map) {

        // 绘制面
        var polygon = new BMapGL.Polygon([
          new BMapGL.Point(116.359154,40.006724),
          new BMapGL.Point(116.393325,40.008299),
          new BMapGL.Point(116.394008,39.994288),
          new BMapGL.Point(116.360303,39.992713),
        ], {
          strokeColor: 'red',
          strokeWeight: 2,
          strokeOpacity: 0.5,
          fillColor: 'red',
          fillOpacity: 0.1
        });
        map.addOverlay(polygon);

        var view = new mapvgl.View({
          map: map
        });
        var layer = new mapvgl.WallLayer({
          color: 'rgba(255, 0, 0, 0.5)',
          data: [{
            geometry: {
              type: 'LineString',
              coordinates: [
                [116.359154,40.006724],
                [116.393325,40.008299],
                [116.394008,39.994288],
                [116.360303,39.992713],
                [116.359154,40.006724]
              ]
            }
          }]
        });
        view.addLayer(layer)
      },

      getEchartsData() {
        let arr = []
        for (let i=31;i>0;i--) {
          let temp = {
            name: '03.' + (i<10?'0'+ i:i),
            value: Math.ceil(Math.random()*1000),
          }
          arr.unshift(temp)
        }
        this.tendencyChart.chartInfo.data = arr
      },

      echartClick(data) {
        console.log(data);
        this.markerView.removeAllLayers()
        this.setMarker(this.map)
      }

    }
  }
</script>

<style scoped lang="scss">

  .bm-view {
    width: 100%;
    height: 100%;
  }

  .ps-ab {
    position: absolute;
    top: 300px;
    left: 0;
    z-index: 9;
  }

  ul li {
    list-style: none;
  }

  .drawing-panel {
    z-index: 999;
    position: fixed;
    top: 1rem;
    margin-left: 5rem;
    padding-left: 0;
    border-radius: .25rem;
    height: 47px;
    box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
  }

  .bmap-btn {
    border-right: 1px solid #d2d2d2;
    float: left;
    width: 64px;
    height: 100%;
    background-image: url(//api.map.baidu.com/library/DrawingManager/1.4/src/bg_drawing_tool.png);
    cursor: pointer;
  }

  .drawing-panel .bmap-marker {
    background-position: -65px 0;
  }

  .drawing-panel .bmap-polyline {
    background-position: -195px 0;
  }

  .drawing-panel .bmap-rectangle {
    background-position: -325px 0;
  }

  .drawing-panel .bmap-polygon {
    background-position: -260px 0;
  }

  .drawing-panel .bmap-circle {
    background-position: -130px 0;
  }
</style>
