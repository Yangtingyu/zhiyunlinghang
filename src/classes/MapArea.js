const { AMap } = window
const colors = ['#27c5ff', '#0090ff', '#005fed', '#0024c1', '#0b009b']
// 市区域高亮
export default class MapArea extends AMap.Polygon {
  name
  map
  center
  value
  level
  constructor(name, path, map) {
    super({
      path: path,
      strokeColor: '#87d4ff',
      strokeOpacity: 0.5,
      strokeWeight: 1.5,
      fillColor: '#0059ff',
      fillOpacity: 0.6,
      zIndex: 2
    })
    this.name = name
    this.map = map
    this.addEventListeners()
    this.center = this.getBounds().getCenter()
  }

  addEventListeners() {
    this.on('mouseover', e => {
      this.setOptions({ fillColor: '#fff', strokeColor: '#fff', zIndex: 3, strokeWeight: 3 })
      this.map.emit('areamouseover', this)
    })
    this.on('mouseout', e => {
      const fillColor = this.level === undefined ? '#0059ff' : colors[this.level]
      this.setOptions({ fillColor, strokeColor: '#87d4ff', zIndex: 2, strokeWeight: 1.5 })
      this.map.emit('areamouseout', this)
    })
    this.on('click', e => {
      this.map.emit('areaclick', this)
    })
  }

  setValue(value, level, item) {
    this.value = value
    this.extData = item || {}
    this.level = level
    const fillColor = this.level === undefined ? '#00b4ff' : colors[this.level]
    this.setOptions({ fillColor })
  }
}
