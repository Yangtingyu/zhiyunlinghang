<template>
  <div class="hello">
    <sm-web-map :map-options="mapOptions" ref="superMap" @load="mapLoad">
      <!-- 地图切换 -->
      <sm-tdt-map-switcher :data="{tk:tk}"
                           :collapsed="false"></sm-tdt-map-switcher>
      <!-- 测绘 有问题 -->
      <sm-measure position="top-left"
                  :collapsed="false"></sm-measure>
      <!-- 搜索 -->
      <!--<sm-search :layer-names="layerNames"
                 :online-local-search='onlineLocalSearch'></sm-search>-->
      <sm-tdt-search position="top-left" :data="{tk:tk}"></sm-tdt-search>
      <sm-echarts-layer :options="echartsOptions"></sm-echarts-layer>
      <!-- 3D城市建模 有问题 -->
      <sm-animate-marker-layer :features="features"
                               type="rotatingTextBorder"
                               text-field="NAME"
                               :colors="['rgb(21, 209, 242)', 'rgba(21, 209, 242, 0.56)']"
                               :width="150"
                               :fit-bounds="false"></sm-animate-marker-layer>
      <sm-identify :layers="['民航数']"></sm-identify>
      <sm-track-layer :style-options="styleOptions"></sm-track-layer>
    </sm-web-map>
    <!-- 图表 -->
    <sm-chart icon-class=""
              :style="chartStyle"
              :options="echartOptions"
              :dataset="dataset"
              :dataset-options="datasetOptions"
              background="rgba(255, 255, 255, 0.5)"></sm-chart>
    <sm-chart icon-class=""
              :style="chartStyle1"
              :options="echartOptions1"
              :dataset="dataset"
              :dataset-options="datasetOptions1"
              background="rgba(255, 255, 255, 0.5)"></sm-chart>
    <sm-chart icon-class=""
              :style="chartStyle2"
              :options="echartOptions2"
              :dataset="dataset"
              :dataset-options="datasetOptions2"
              background="rgba(255, 255, 255, 0.5)"></sm-chart>
    <div class="ps-ab"><el-button @click="chartsAnimate">echarts动画</el-button></div>
    <div class="ps-ab" style="top: 350px;"><el-button @click="animationMap">飞线动画</el-button></div>
  </div>
</template>

<script>
  import axios from 'axios'
  import changchunBus from './json/changchunBus'
import VueiClient from '@supermap/vue-iclient-mapboxgl';

export default {
  data () {

    return {
      map: null,
      features: {},
      echartsOptions: null,
      mapOptions: {
        container: 'map', // container id
        style: {
          version: 8,
          sources: {
            'raster-tiles': {
              type: 'raster',
              tiles: [
                'https://iserver.supermap.io/iserver/services/map-china400/rest/maps/China/zxyTileImage.png?z={z}&x={x}&y={y}'
                // 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity_Mobile/MapServer/tile/{z}/{y}/{x}'
              ],
              tileSize: 256
            }
          },
          layers: [
            {
              id: 'simple-tiles',
              type: 'raster',
              source: 'raster-tiles',
              minzoom: 0,
              maxzoom: 22
            }
          ]
        },
        center: [116.45423056455218, 39.91980158816503],
        zoom: 5,
        renderWorldCopies: false
      },
      tk: '1d109683f4d84198e37a38c442d68311',
      //图表
      chartStyle: {
        position: "absolute",
        bottom: "10px",
        right: "10px"
      },
      chartStyle1: {
        position: "absolute",
        bottom: "10px",
        right: "420px"
      },
      chartStyle2: {
        position: "absolute",
        bottom: "10px",
        right: "830px"
      },
      dataset: new VueiClient.commontypes.iPortalDataParameter({
        url: "https://iportal.supermap.io/iportal/web/datas/676516522",
        maxFeatures: 20
      }),
      // echarts中涉及到超图数据series和坐标轴的字段的配置
      datasetOptions: [
        {
          seriesType: "bar", //图表类型
          isStastic: true, //是否统计, 默认不统计
          isStack: true, //是否堆叠, 默认不堆叠
          xField: "机场", //x坐标轴数据字段
          yField: "2016起降架次（架次）" //统计的数据，legned默认名字
        },
        {
          seriesType: "bar",
          isStastic: true,
          isStack: true,
          xField: "机场",
          yField: "2017起降架次（架次）",
        }
      ],
      datasetOptions1: [
        {
          seriesType: "line", //图表类型
          isStastic: true, //是否统计, 默认不统计
          isStack: true, //是否堆叠, 默认不堆叠
          xField: "机场", //x坐标轴数据字段
          yField: "2016旅客吞吐量（人次）" //统计的数据，legned默认名字
        },
        {
          seriesType: "line",
          isStastic: true,
          isStack: true,
          xField: "机场",
          yField: "2017旅客吞吐量（人次）"
        }
      ],
      datasetOptions2: [
        {
          seriesType: "scatter", //图表类型
          isStastic: true, //是否统计, 默认不统计
          isStack: false, //是否堆叠, 默认不堆叠
          xField: "机场", //x坐标轴数据字段
          yField: "同比增速%" //统计的数据，legned默认名字
        }
      ],
      styleOptions: {},
      // 和echarts一样的配置
      echartOptions: {
        legend: { data: ['2016起降架次（架次）', '2017起降架次（架次）'] }, //与yField数据一致
        tooltip: { formatter: "{b0}: {c0}" },
        grid: {
          top: 30,
          bottom: 60,
          left: 60,
          right: 30
        }
      },
      echartOptions1: {
        legend: { data: ['2016旅客吞吐量（人次）', '2017旅客吞吐量（人次）'] }, //与yField数据一致
        tooltip: { formatter: "{b0}: {c0}" },
        grid: {
          top: 30,
          bottom: 60,
          left: 60,
          right: 30
        }
      },
      echartOptions2: {
        legend: { data: ['同比增速%'] },//与yField数据一致
        tooltip: { formatter: "{b0}: {c0}" },
      }
    };

  },
  created () {
    var url = "./text-marker.json"/*json文件url*/
    //var building_url = "./buildings.json"
    var request = new XMLHttpRequest();
    request.open("get", url);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    request.onload = () => {/*XHR对象获取到返回信息后执行*/
      if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
        this.features = JSON.parse(request.responseText);
        console.log(this.features);
      }
    }
    // var request2 = new XMLHttpRequest();
    // request2.open("get", building_url);/*设置请求方法与路径*/
    // request2.send(null);/*不发送数据到服务器*/
    // request2.onload = () => {/*XHR对象获取到返回信息后执行*/
    //   if (request2.status == 200) {/*返回状态为200，即为数据获取成功*/
    //     this.mapOptions.style.sources.buildings.data = JSON.parse(request2.responseText);
    //   }
    // }
    this.getData()
  },
  mounted () {

  },

  methods: {
    getData() {
      let data = changchunBus
      this.echartsOptions = {
          animation: false,
          GLMap: {
            roam: true,
          },
          coordinateSystem: 'GLMap',
          geo: {
            map: 'GLMap',
          },
          series: [
            {
              type: 'lines',
              polyline: true,
              data: data,
              silent: true,
              lineStyle: {
                normal: {
                  opacity: 0.2,
                  width: 1,
                },
              },
              progressiveThreshold: 500,
              progressive: 100,
            },
            {
              type: 'lines',
              coordinateSystem: 'GLMap',
              polyline: true,
              data: data,
              lineStyle: {
                normal: {
                  width: 0.2,
                },
              },
              effect: {
                constantSpeed: 40,
                show: true,
                trailLength: 0.02,
                symbolSize: 2,
              },
            },
          ],
        }

    },

    chartsAnimate() {
      this.map.flyTo({center: [125.35, 43.86], zoom: 10})
    },

    animationMap() {
      let map = this.map
      this.map.flyTo({center: [-96, 37.8], zoom: 3})
      // San Francisco
      var origin = [-122.414, 37.776];

// Washington DC
      var destination = [-77.032, 38.913];

// A simple line from origin to destination.
      var route = {
        "type": "FeatureCollection",
        "features": [{
          "type": "Feature",
          "geometry": {
            "type": "LineString",
            "coordinates": [
              origin,
              destination
            ]
          }
        }]
      };

// A single point that animates along the route.
// Coordinates are initially set to origin.
      var point = {
        "type": "FeatureCollection",
        "features": [{
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": origin
          }
        }]
      };

// Calculate the distance in kilometers between route start/end point.
      var lineDistance = turf.lineDistance(route.features[0], 'kilometers');

      var arc = [];

// Number of steps to use in the arc and animation, more steps means
// a smoother arc and animation, but too many steps will result in a
// low frame rate
      var steps = 500;

// Draw an arc between the `origin` & `destination` of the two points
      for (var i = 0; i < lineDistance; i += lineDistance / steps) {
        var segment = turf.along(route.features[0], i, 'kilometers');
        arc.push(segment.geometry.coordinates);
      }

// Update the route with calculated arc coordinates
      route.features[0].geometry.coordinates = arc;

// Used to increment the value of the point measurement against the route.
      var counter = 0;

      // Add a source and layer displaying a point which will be animated in a circle.
      map.addSource('route', {
        "type": "geojson",
        "data": route
      });

      map.addSource('point', {
        "type": "geojson",
        "data": point
      });

      map.addLayer({
        "id": "route",
        "source": "route",
        "type": "line",
        "paint": {
          "line-width": 2,
          "line-color": "#007cbf"
        }
      });

      map.addLayer({
        "id": "point",
        "source": "point",
        "type": "symbol",
        "layout": {
          "icon-image": "airport-15",
          "icon-rotate": ["get", "bearing"],
          "icon-rotation-alignment": "map",
          "icon-allow-overlap": true,
          "icon-ignore-placement": true
        }
      });

      function animate() {
// Update point geometry to a new position based on counter denoting
// the index to access the arc.
        point.features[0].geometry.coordinates = route.features[0].geometry.coordinates[counter];

// Calculate the bearing to ensure the icon is rotated to match the route arc
// The bearing is calculate between the current point and the next point, except
// at the end of the arc use the previous point and the current point
        point.features[0].properties.bearing = turf.bearing(
          turf.point(route.features[0].geometry.coordinates[counter >= steps ? counter - 1 : counter]),
          turf.point(route.features[0].geometry.coordinates[counter >= steps ? counter : counter + 1])
        );

// Update the source with this new data.
        map.getSource('point').setData(point);

// Request the next frame of animation so long the end has not been reached.
        if (counter < steps) {
          requestAnimationFrame(animate);
        }

        counter = counter + 1;
      }

      document.getElementById('replay').addEventListener('click', function() {
// Set the coordinates of the original point back to origin
        point.features[0].geometry.coordinates = origin;

// Update the source layer
        map.getSource('point').setData(point);

// Reset the counter
        counter = 0;

// Restart the animation.
        animate(counter);
      });

// Start the animation.
      animate(counter);
    },

    mapLoad({map}) {
      this.map = map
      this.map.flyTo({center: [116.45423056455218, 39.91980158816503], zoom: 16})
      this.setMarker()
    },

    setMarker() {
      var marker = new mapboxgl.Marker()
        .setLngLat([116.45423056455218, 39.91980158816503])
        .addTo(this.map);

      var markerHeight = 50, markerRadius = 10, linearOffset = 25;
      var popupOffsets = {
        'top': [0, 0],
        'top-left': [0,0],
        'top-right': [0,0],
        'bottom': [0, -markerHeight],
        'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'left': [markerRadius, (markerHeight - markerRadius) * -1],
        'right': [-markerRadius, (markerHeight - markerRadius) * -1]
      };
      var popup = new mapboxgl.Popup({offset: popupOffsets, className: 'my-class'})
        .setLngLat([116.45423056455218, 39.91980158816503])
        .setHTML("<h1>Hello World!</h1>")
        .setMaxWidth("300px")
      marker.setPopup(popup)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
  .ps-ab{
    position: absolute;
    top: 300px;
    left: 0;
  }

.overlay {
  position: absolute;
  top: 10px;
  left: 10px;
}

.overlay button {
  font:600 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  background-color: #3386c0;
  color: #fff;
  display: inline-block;
  margin: 0;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 3px;
}

.overlay button:hover {
  background-color:#4ea0da;
}
</style>
