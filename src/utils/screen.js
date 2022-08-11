/**
 * 根据宽度获取响应式关键字
 * @param {*} w 宽度
 */
export function getSize(w) {
  let s = "md";
  if (w < 768) {
    s = "xs";
  } else if (w < 992) {
    s = "sm";
  } else if (w < 1200) {
    s = "md";
  } else if (w < 1920) {
    s = "lg";
  } else {
    s = "xl";
  }
  return s;
}

// 主动触发 window 的 resize
export function dispatchResize() {
  console.log("dispatchResize");
  var evt = document.createEvent("Event");
  evt.initEvent("resize", true, true);
  window.dispatchEvent(evt);
}

// 检查是否处于全屏状态, 如果全屏，返回全屏元素
export function isFullScreen() {
  return (
    document.fullscreenElement ||
    document.msFullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    false
  );
}

/**
 * 全屏与取消全屏
 * @param {*} isFullscreen 可选 当前是否全屏状态
 * @param {*} el 可选 要全屏的元素
 */
export function doFullScreen(isFullscreen, el = document.documentElement) {
  /*判断是否全屏*/
  var _isFullscreen;
  if (isFullscreen == undefined) {
    _isFullscreen = isFullScreen();
  } else {
    _isFullscreen = isFullscreen;
  }

  if (!_isFullscreen) {
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}
