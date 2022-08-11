<template>
  <div style="position: absolute; left: 0; right: 0; bottom: 0; top: 0;">
    <app-list-button v-if="enableAppFlagSwitchButton" style="position: absolute; z-index: 10; right: 20px;"/>
    <component :is="loginPageComponentName" v-bind="componentProps" ></component>
  </div>
</template>

<script>
// 本页面用于智能跳转到对应主页，识别当前应用
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'login-smart-switch',
  components: {
    "login-page-default": ()=>import("./page"),
    "login-page-green": ()=>import("./page"),
    "login-page-blue": ()=>import("./page"),
    "login-page-blue-sky": ()=>import("./page-v2"),
  },
  data(){
    return {
      // 要加载的组件名
      // loginPageComponentName: "login-page-default"
      enableAppFlagSwitchButton: VUE_CONFIG.enableAppFlagSwitchButton,
      // 组件对应的参数信息（key为动态组件名）
      componentPropsConfig: {
        'login-page-green': {
          theme: 'green'
        },
        'login-page-blue': {
          theme: 'blue'
        },
        'login-page-blue-sky': {
          theme: 'blue-sky'
        },
      }
    }
  },
  mounted(){
    // 路径中指定appFlag查询参数时，自动进入对应的AppFlag
    let queryAppFlag = this.$route.query.appFlag
    if(queryAppFlag){
      console.log('路径参数指定切换为应用：', queryAppFlag)
      if(VUE_CONFIG.appConfigInfo[queryAppFlag]){
        this.appFlagSet(queryAppFlag)
      }else{
        this.$alert('查询参数appFlag无效，请重新指定！','提示')
      }
    }
  },
  methods: {
    ...mapMutations([
      'appFlagSet'
    ]),
  },
  computed: {
    ...mapState({
      appFlag: state => state.d2admin.appFlag
    }),
    // 要加载的组件名
    loginPageComponentName(){
      return VUE_CONFIG.appConfigInfo[this.appFlag].loginPageType || "login-page-default"
    },
    /**
     * 组件prop参数，可用于指定主题等属性
     * @returns {*}
     */
    componentProps(){
      return this.componentPropsConfig[this.loginPageComponentName]
    }
  }

}
</script>

<style scoped>

</style>
