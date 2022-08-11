<template>
  <div>
    请稍后...
  </div>
</template>

<script>
  // 本页面用于智能跳转到对应主页，识别当前应用
  import { mapState } from 'vuex'
  export default {
    name: "smart-index",
    data(){
      return {

      }
    },
    created(){
      this.$router.push({path: this.defaultHomePage})
    },
    computed: {
      ...mapState({
        appFlag: state => state.d2admin.appFlag
      }),
      defaultHomePage(){
        return VUE_CONFIG.appConfigInfo[this.appFlag].defaultHomePage
      }
    }
  }
</script>

<style scoped>

</style>
