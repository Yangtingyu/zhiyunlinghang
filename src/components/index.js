import Vue from 'vue'


// 全屏自动缩放控制组件
Vue.component('zebra-auto-fullscreen-container-local', () => import('./zebra-auto-fullscreen-container'))
// 图标组件不生效，这里再次声明可解决该问题
Vue.component('d2-icon', () => import('@zebra-projects/zebra-ui/src/components/d2-icon'))

// 数字动画组件
Vue.component('d2-count-up', () => import('./d2-count-up'))
// 轮播组件
Vue.component('zebra-seamless-scroll-component', () => import('./zebra-seamless-scroll-component'))
// 通用图表组件（封装常见组件）
Vue.component('zebra-common-echart', () => import('./zebra-common-echart'))

Vue.component('CommonMapBarChart', () => import('@/pages/components/CommonMapBarChart'))
// 导入leafletGis组件（应用领域等界面专用）
Vue.component('LeafletGis', () => import('@/components/LeafletGis'))
// 导入leafletGis组件(通用，如需修改，请务必向下兼容)
Vue.component('LeafletGisForCommon', () => import('@/components/LeafletGisForCommon'))
