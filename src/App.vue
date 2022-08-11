<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import '@zebra-projects/zebra-ui/src/assets/style/public-class.scss';
// gxb项目全局样式，容器样式类名：gxb-container，全局样式尽量不要改变
@import "./assets/gxb/css/gxb-all";
// tailwind样式
.tailwind {
  @import "./assets/tailwind/tailwind.scss";
}


/**
 * element table 组件上使用 show-overflow-tooltip 来让超出列宽的文字隐藏
 * 但不使用 show-overflow-tooltip 的提示框
 * 因为 table 上的 tooltip 提示框无法停留显示，且当内容过多时出现显示问题
 * 提示弹框改为 el-popover 来实现
 */
.theme-dark-blue .el-tooltip__popper {
    display: none;
}

.table-popover {
    max-width: 900px;
}

// element弹窗的滚动条样式美化
.el-dialog.is-fullscreen, .el-dialog__wrapper{
  &::-webkit-scrollbar{width: 5px;height: 5px;background: #fbfbfb1f;} /* 滚动条整体部分，可以设置宽度啥的 */
  &::-webkit-scrollbar-corner{background: transparent;} /* 滚动条整体部分，可以设置宽度啥的 */
  &::-webkit-scrollbar-thumb{background: #ffffff59;border-radius: 2px;} /* 滚动的滑块 */
}


</style>
