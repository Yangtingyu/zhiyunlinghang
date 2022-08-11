const { AMap } = window

export default class Marker extends AMap.Marker {
  map
  circle
  constructor (map, title, position, radius = 500) {
    super({
      position: new AMap.LngLat(...position),
      icon: '/imgs/marker.png',
      offset: new AMap.Pixel(-25, -53),
      title
    })
    const circle = new AMap.Circle({
      center: new AMap.LngLat(...position),
      zIndex: 2,
      radius,
      strokeColor: '#00e4ff',
      strokeWeight: 1,
      strokeOpacity: 1,
      fillColor: '#00e4ff',
      fillOpacity: 0.2
    })
    this.map = map
    this.circle = circle
    map.markers.addOverlay(this)
    map.markerCircles.addOverlay(circle)

    this.on('click', async e => {
      map.setZoom(16.3)
      map.setCenter(this.getPosition())
    })

    // ⭕️圆圈动画
    // let _radius = 0
    // let reqId
    // function animate () {
    //   _radius += 5
    //   circle.setOptions({
    //     radius: _radius
    //   })
    //   if (radius >= 500) {
    //     _radius = 0
    //   }
    //   reqId = requestAnimationFrame(animate)
    // }
    // function cancelAnimate () {
    //   cancelAnimationFrame(reqId)
    //   reqId = null
    // }
  }

  clear () {
    this.map.markers.removeOverlay(this)
    this.map.markerCircles.removeOverlay(this.circle)
  }
}
