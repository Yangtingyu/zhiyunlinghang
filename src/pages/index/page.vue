<template>
  <d2-container>
      <d2-page-cover
              :title="`欢迎使用${title}`"
              :sub-title="``">
          <img src="./image/icon.png">
      </d2-page-cover>
  </d2-container>
</template>

<script>
    export default {
        data(){
            return {
                title: process.env.VUE_APP_TITLE
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '@zebra-projects/zebra-ui/src/assets/style/public.scss';
.index-btn-group {
  color: $color-text-placehoder;
  span {
    color: $color-text-sub;
    &:hover {
      color: $color-text-main;
    }
  }
}
</style>
