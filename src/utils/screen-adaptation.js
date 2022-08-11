/**
 * 屏幕适配代码
 * 按快捷键 Alt + (1、2、3、4) 切换不同的显示模式
 * 1：正常 1:1 显示，超出滚动，
 * 2：自动缩放居中，
 * 3：宽度适配，纵向滚动，
 * 4：高度适配，横向滚动
 */
export default function screenAdapation (el) {
  let mode = parseInt(localStorage.screenMode) || 3
  function _adapation () {
    if (!el) return
    el.setAttribute('style', '')
    if (mode === 1) {
      document.body.style.overflow = ''
      return
    }
    let nw = el.clientWidth
    let nh = el.clientHeight
    let left, top, scale
    if (mode === 2) {
      let w = window.innerWidth
      let h = window.innerHeight
      if (w / h > nw / nh) {
        scale = h / nh
        top = 0
        left = (w - nw * scale) / 2
      } else {
        scale = w / nw
        left = 0
        top = (h - nh * scale) / 2
      }
      el.setAttribute('style', 'position:absolute;transform: scale(' + scale + ');left:' + left + 'px;top:' + top + 'px;transform-origin:0 0;')
      document.body.style.overflow = 'hidden'
    }
    if (mode === 3) {
      // let w = document.body.clientWidth
      // 优化屏幕适配器，使其支持对body的缩放，以免加入body的弹窗不缩放
      let w = document.documentElement.clientWidth
      scale = w / nw
      el.setAttribute('style', 'transform: scale(' + scale + ');transform-origin:0 0;')
      document.body.style.overflow = ''
    }
    if (mode === 4) {
      // let h = document.body.clientHeight
      // 优化屏幕适配器，使其支持对body的缩放，以免加入body的弹窗不缩放
      let h = document.documentElement.clientHeight
      scale = h / nh
      el.setAttribute('style', 'transform: scale(' + scale + ');transform-origin:0 0;')
      document.body.style.overflow = ''
    }
  }
  _adapation()
  window.addEventListener('resize', _adapation)
  window.addEventListener('keydown', function (e) {
    if (!e.altKey) return
    switch (e.keyCode) {
      case 49:
        mode = 1
        break
      case 50:
        mode = 2
        break
      case 51:
        mode = 3
        break
      case 52:
        mode = 4
        break
    }
    localStorage.screenMode = mode
    _adapation()
  }, true)
}
