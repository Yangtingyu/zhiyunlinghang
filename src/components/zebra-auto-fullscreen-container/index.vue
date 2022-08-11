<template>
  <div v-if="autoFullScreen" class="fullscreen-container">
    <div v-if="scaleModeDialogVisible" class="toggle-dialog" @click.self="scaleModeDialogVisible=false">
      <!--width,height,auto,none,stretch-->
      <div class="inner-toggle-dialog">
        <div class="close-btn" @click="scaleModeDialogVisible=false" title="点击关闭">
          <smart-icon value="window-close"/>
        </div>
        <el-radio-group v-model="fullscreenMode" @change="handleFullscreenModeChange">
          <el-radio label="auto">始终完整</el-radio>
          <el-radio label="stretch">撑满屏幕</el-radio>
          <el-radio label="width">宽度撑满</el-radio>
          <el-radio label="none">原始大小</el-radio>
          <el-radio label="height">高度撑满</el-radio>
          <el-radio label="default">系统默认</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="auto-container" :class="{'is-stretch': currentScaleMode=='stretch'}" :style="transformParentContainerStyle">
      <div ref="main" class="index-container" :style="getIndexContainerStyle"><!--id="main"-->
        <slot/>
      </div>
    </div>
  </div>
  <div v-else class="fullscreen-container">
    <div class="auto-container">
      <slot/>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
//const $ = () => import('jquery')
export default {
  name: "zebraAutoFullscreenContainer",
  components: {  },
  props: {
    /**
     * 自动全屏，屏幕高度与内容高度一致时触发（该功能暂时关闭）
     */
    autoFullScreen: {
      type: Boolean,
      default: true
    },
    /**
     * 缩放模式（默认值，可通过快捷键切换）
     * width：宽度撑满，高度自适应，容器上下可能留空，左右不留空
     */
    scaleMode: {
      type: String,
      default: 'width' //width,height,auto,none,stretch
    },
    /**
     * 是否居中（默认值，可通过快捷键切换）
     */
    center: {
      type: Boolean,
      default: false
    },
    /**
     * 容器内容原始宽度，默认1920
     */
    contentWidth: {
      type: Number,
      default: 1920
    },
    /**
     * 容器内容原始高度，默认1080
     */
    contentHeight: {
      type: Number,
      default: 1080
    },
    /**
     * 容器最小宽度，容器实际宽度小于该值会出现横向滚动条
     */
    minWidth: {
      type: Number,
      default: 1000
    }
  },
  data(){
    return {
      // 当前组件的模式
      currentScaleMode: this.scaleMode,
      currentCenter: this.center,
      // 缩放模式调整切换窗口
      scaleModeDialogVisible: false,
      // 全屏模式，对应切换按钮窗口，该值和currentScaleMode不一样的哦
      fullscreenMode: 'auto',

      transform: {
        transform: '',
        'transform-origin': `0 0 0`,
          left: 0,
          top: 0
      },
      transformParentContainerStyle: {
        'padding-left': '0'
      },
    }
  },
  watch: {
    // 影响布局的参数改变时，进行相应
    scaleModeWatch: 'handleResize'
  },
  mounted() {
    // 缓存包含布局设置时，加载缓存配置
    if(sessionStorage.screenMode){
      this.currentScaleMode = sessionStorage.screenMode
    }
    if(sessionStorage.screenModeCenter){
      this.currentCenter = (sessionStorage.screenModeCenter == 'true')
    }

    document.addEventListener('keydown',this.handleEvent)
    //window.addEventListener('resize', () => {this.handleResize()})
    window.addEventListener('resize', this.handleResize)
    /*window.onresize = () => {
        let isFullScrren = document.body.clientHeight == window.screen.height
        isFullScrren = false
        if (isFullScrren) {
            console.log('全屏')
            this.adaptation_fullScreen()
        } else {
            console.log('菜单屏')
            this.adaptation()
        }
    }*/
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered

      // 初始化dom相关数据
      //window.onresize()
      window.dispatchEvent(new Event('resize'))

      // 回调渲染完成
      this.$emit('mounted')
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    document.removeEventListener('keydown', this.handleEvent)
  },
  methods: {
    /*handleResize: debounce(function() {
          if (this.autoFullScreen) {
            let isFullScrren = document.body.clientHeight == window.screen.height
            isFullScrren = false
            if (isFullScrren) {
              console.log('全屏')
              this.adaptation_fullScreen()
            } else {
              console.log('菜单屏')
              this.adaptation()
            }
          }
        }, 0),*/
    handleResize(){
      if (this.autoFullScreen) {
        let isFullScrren = document.body.clientHeight == window.screen.height
        isFullScrren = false
        if (isFullScrren) {
          console.log('全屏')
          this.adaptation_fullScreen()
        } else {
          console.log('菜单屏')
          this.adaptation()
        }
      }
    },
    adaptation_fullScreen() {
      var w = document.body.clientWidth;
      var h = document.body.clientHeight;
      /*var nw = 1920,
          nh = 1080;*/
      var nw = this.contentWidth,
          nh = this.contentHeight;
      var left, top, scale;
      if (w / h > nw / nh) {
        scale = h / nh;
        top = 0;
        left = (w - nw * scale) / 2;
      } else {
        scale = w / nw;
        left = 0;
        top = (h - nh * scale) / 2;
      }
      this.$refs.main.setAttribute('style', 'transform: scale('+ scale +');left:'+left+'px;top:'+top+'px;');
      //document.getElementById('main').setAttribute('style', 'transform: scale('+ 1592/1920 +');left:'+0+'px;top:'+0+'px;');
      this.$refs.main.setAttribute('style', 'transform-origin: 0 0 0');
    },
    adaptation() {
      // 包含菜单自适应时
      //this.transform['transform-origin'] = `0 0 0`;
      //document.getElementById('main').setAttribute('style', 'transform-origin: 0 0 0');

      // 根据配置设置容器宽高
      /*this.transform.width = this.contentWidth
      this.transform.height = this.contentHeight*/

      let w = 1592
      // 菜单布局里时
      //if($('.d2-theme-container-aside').length>0){
      w = document.body.clientWidth
          - ($('.d2-theme-container-aside').length>0?$('.d2-theme-container-aside').width():0)
      // 布局中时，包含滚动条宽度
      if(!this.currentCenter && this.currentScaleMode!='stretch'){
        w -= 20
      }
      //}
      // 最小宽度
      let minWidth = this.minWidth
      if(w < minWidth){
        w = minWidth
      }

      console.log('宽度信息',document.body.clientWidth,$('.d2-theme-container-aside').width(),w)
      var h = document.body.clientHeight - ($('.d2-theme-header').length>0?$('.d2-theme-header').height():0);
      // 宽高均减1，防止屏幕浏览器视口包含小数时，1像素滚动条问题
      w--;
      h--;
      var nw = this.contentWidth,
          nh = this.contentHeight;
      console.log('全屏组件信息：',w,h,nw,nh)
      var left, top, scale;
      //if (w / h > nw / nh) {
      if (this.currentScaleMode == 'height') {
        scale = h / nh;
        top = 0;
        left = (w - nw * scale) / 2;
      } else if (this.currentScaleMode == 'width') {
        scale = w / nw;
        left = 0;
        top = (h - nh * scale) / 2;
      } else if ( this.currentScaleMode == 'auto' ){
        if (w / h > nw / nh)  {
          scale = h / nh;
          top = 0;
          left = (w - nw * scale) / 2;
        } else {
          scale = w / nw;
          left = 0;
          top = (h - nh * scale) / 2;
        }
      } else if ( this.currentScaleMode == 'none' ){
          scale = 1;
          left = 0;
          top = 0;
      } else if ( this.currentScaleMode == 'stretch'){
        top = 0;
        left = 0;
        scale = `${w / nw}, ${h / nh}`
      }
      //document.getElementById('main').setAttribute('style', 'transform: scale('+ scale +');left:'+left+'px;top:'+top+'px;');
      //document.getElementById('main').setAttribute('style', 'transform: scale('+ 1384/1600 +');left:'+0+'px;top:'+0+'px;');


      //let scale = (document.body.clientWidth - $('.d2-theme-container-aside').width()) / 1592
      //let scale = (document.body.clientHeight - $('.d2-theme-header').height()) / 917
      //this.height = 1080 * scale + 'px'
      this.transform.transform = `scale(${scale})`
      // 缩放比改变事件
      this.$emit('scaleChange', scale)
      // 居中时，配置left、top
      if(this.currentCenter){
        this.transform.left = left
        this.transform.top = top
      }else{
        this.transform.left = 0
        this.transform.top = 0
      }
      //this.transform['transform-origin'] = '0 0 0';

      if($('.d2-theme-container-aside').length>0){
        let paddingLeft = (w - nw * scale) / 2
        this.transformParentContainerStyle["padding-left"] = paddingLeft + 'px';
      }
    },
    handleEvent(e){
      if (!e.altKey) return
      switch (e.keyCode) {
        case 49:
          this.scaleModeDialogVisible = true
          /*this.currentScaleMode = 'auto'
          this.currentCenter = true*/
          this.handleFullscreenModeChange('auto')
          break
        case 50:
          /*this.currentScaleMode = 'stretch'
          this.currentCenter = true*/
          this.scaleModeDialogVisible = true
          this.handleFullscreenModeChange('stretch')
          break
        case 51:
          /*this.currentScaleMode = 'width'
          this.currentCenter = false*/
          this.scaleModeDialogVisible = true
          this.handleFullscreenModeChange('width')
          break
        case 52:
          /*this.currentScaleMode = 'none'
          this.currentCenter = false*/
          this.scaleModeDialogVisible = true
          this.handleFullscreenModeChange('none')
          break
        // ALT+C 还原默认
        case 67:
          /*// 设置为默认值
          this.currentScaleMode =  this.scaleMode
          this.currentCenter = this.center
          // 清除缓存值
          sessionStorage.removeItem('screenMode')
          sessionStorage.removeItem('screenModeCenter')*/
          this.scaleModeDialogVisible = true
          this.handleFullscreenModeChange('default')
          break
      }
      /*sessionStorage.screenMode = this.currentScaleMode
      sessionStorage.screenModeCenter = this.currentCenter*/
    },
    /**
     * 全屏模式切换按钮改变事件处理
     */
    handleFullscreenModeChange(mode){
      this.fullscreenMode = mode
      if(mode == 'auto'){
        this.currentScaleMode = 'auto'
        this.currentCenter = true
      }else if(mode == 'width'){
        this.currentScaleMode = 'width'
        this.currentCenter = false
      }else if(mode == 'height'){
        this.currentScaleMode = 'height'
        this.currentCenter = true
      }else if(mode == 'none'){
        this.currentScaleMode = 'none'
        this.currentCenter = false
      }else if(mode == 'stretch'){
        this.currentScaleMode = 'stretch'
        this.currentCenter = true
      }else if(mode == 'default'){
        // 设置为默认值
        this.currentScaleMode =  this.scaleMode
        this.currentCenter = this.center
        // 清除缓存值
        sessionStorage.removeItem('screenMode')
        sessionStorage.removeItem('screenModeCenter')
        return
      }
      sessionStorage.screenMode = this.currentScaleMode
      sessionStorage.screenModeCenter = this.currentCenter
    }
  },
  computed: {
    getIndexContainerStyle(){
      return {
        transform: this.transform.transform,
        'transform-origin': this.transform["transform-origin"],
        left: this.transform.left + 'px',
        top: this.transform.top + 'px',
        width: this.contentWidth + 'px',
        height: this.contentHeight + 'px'
      }
    },
    /**
     * 监听相关数据对象，防止单独监听多个值的，重复运算问题
     */
    scaleModeWatch(){
      const {currentScaleMode, currentCenter} = this
      return {
        currentScaleMode,
        currentCenter
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* 全屏容器 */
.fullscreen-container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}

/* 视图区域的滚动条透明处理 */
.auto-container{

  // 自动撑满模式，避免滚动条出现
  &.is-stretch {
    overflow: hidden;
  }

  &::-webkit-scrollbar-track-piece{
    background-color: rgba(10, 89, 158, 0.2);
    -webkit-border-radius:0;
  }
  &::-webkit-scrollbar{
    //width:8px;
    height:auto;
  }
  &::-webkit-scrollbar-thumb{
    height:50px;
    background-color: rgba(153, 153, 153, 0.24);
    -webkit-border-radius:4px;
    outline:1px solid rgba(255, 255, 255, 0.21);
    outline-offset:-2px;
    border: 1px solid #55a2ea6b;
  }
  &::-webkit-scrollbar-thumb:hover{
    height:50px;
    background-color: rgba(159, 159, 159, 0.29);
    -webkit-border-radius:4px;
  }
  &::-webkit-scrollbar-corner{
    background-color: rgba(159, 159, 159, 0.29);
  }
}
.auto-container {
  overflow: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  padding: 0 15px;
}

.index-container {
  position: absolute;
  overflow: hidden;
}

/*切换按钮对话框*/
.toggle-dialog {
  z-index: 9999;
  position: absolute;
  background: #00000036;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .inner-toggle-dialog {
    position: relative;
    background: #00000073;
    border-radius: 10px;
    padding: 30px 20px 20px;

    /deep/ {
      .el-radio {
        color: #b7b7b7;
      }
    }
    .close-btn {
      color: #ffffff5e;
      position: absolute;
      right: 5px;
      top: 5px;
      cursor: pointer;
    }
  }
}

</style>
