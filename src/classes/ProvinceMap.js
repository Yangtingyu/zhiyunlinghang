import request from '@/request'
import MapArea from './MapArea'
const { AMap } = window

/**
 * @param el 高德地图初始化需要的 div
 * @param province 省名称拼音，对应 '/public/geo-json/' 里的 geoJson 文件，用以区域高亮显示,
 * geoJson下载地址 http://datav.aliyun.com/tools/atlas/#&lat=31.80289258670676&lng=104.32617187499999&zoom=4
 * @param mapConfigs 高德地图初始化配置项
 */
export default class ProvinceMap extends AMap.Map {
  province
  prefectures = []
  mapConfigs = {}
  satellite // 卫星图层，只有切换图层时才被初始化
  roadNet // 路网图层（默认图层）
  buildingLayer = new AMap.Buildings({
    zooms: [15, 18],
    zIndex: 10,
    opacity: 1,
    heightFactor: 2
  })

  markers = new AMap.OverlayGroup([])
  markerCircles = new AMap.OverlayGroup([]) // marker 下面的圆圈，放到这里统一管理

  constructor (el, province, mapConfigs = {}) {
    super(el, Object.assign({}, {
      mapStyle: 'amap://styles/58591d4a341895a939cf757e45e22eab',
      viewMode: '3D',
      pitch: 60,
      zoom: 7.5,
      zooms: [5, 18],
      pitchEnable: true,
      rotateEnable: false,
      skyColor: '#4a556e'
    }, mapConfigs))

    this.province = province
    this.mapConfigs = mapConfigs
    this.roadNet = this.getLayers()[0]
    this.setLayers([this.roadNet, this.buildingLayer])
    this.loadProvince()
    this.add(this.markerCircles)
    this.add(this.markers)

    this.on('complete', () => {
      this.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.7)
      this.DirectionLight = new AMap.Lights.DirectionLight([-10, -10, 10], [1, 1, 1], 0.6)
    })
  }

  // 加载并显示省及地市边界goal
  async loadProvince () {
    console.log(this)
    const _this = this
    const { prefectures, mapConfigs } = this
    console.log(prefectures,mapConfigs)
    const requests = [
      request.get(`/geo-json/${this.province}.json`),
      request.get(`/geo-json/${this.province}-full.json`)
    ]
    const [borderJson, childrenJson] = await Promise.all(requests)
    const borderGeoJson = new AMap.GeoJSON({
      geoJSON: borderJson,
      getPolygon (geojson, lnglats) {
        const polygon = new AMap.Polygon({
          path: lnglats,
          strokeColor: '#87d4ff',
          strokeWeight: 4,
          fillOpacity: 0,
          zIndex: 1
        })
        return polygon
      }
    })
    const childrenGeoJson = new AMap.GeoJSON({
      geoJSON: childrenJson,
      getPolygon (geojson, lnglats) {
        const name = geojson.properties._parentProperities.name
        const polygon = new MapArea(name, lnglats, _this)
        prefectures.push(polygon)
        return polygon
      }
    })
    childrenGeoJson.setMap(this)
    borderGeoJson.setMap(this)

    if (!mapConfigs.center) this.setFitView(prefectures)

    this.on('zoomchange', (e) => {
      const zoom = this.getZoom()
      if (zoom > 10) prefectures.forEach(p => p.hide())
      else prefectures.forEach(p => p.show())
      if (zoom < 14) this.markerCircles.hide()
      else this.markerCircles.show()
    })

    // 鼠标点击地区
    this.on('areaclick', area => {
      this.setCenter(area.center)
      this.setZoom(10)
    })
    // 地市加载完成
    this.emit('provincecomplate', this)
  }

  setMapType (type) {
    if (type === 1) {
      if (this.satellite) this.satellite.hide()
    }
    if (type === 2) {
      if (this.satellite) {
        this.satellite.show()
      } else {
        this.satellite = this.satellite || new AMap.TileLayer.Satellite()
        this.setLayers([this.satellite, this.roadNet, this.buildingLayer])
      }
    }
  }

  // 设置图表数据
  setChartData (data = []) {
    const values = data.map(item => item.value).sort((a, b) => a - b)
    const max = values[values.length - 1]
    const min = values[0]
    const step = (max - min) / 4
    data.forEach(item => {
      const { name, value } = item
      const level = Math.ceil((value - min) / step)
      const arr = this.prefectures.filter(p => p.name === name)
      arr.forEach(p => { p.setValue(value, level) })
    })
  }

  clearMarkers () {
    this.markers.clearOverlays()
    this.markerCircles.clearOverlays()
  }
}
