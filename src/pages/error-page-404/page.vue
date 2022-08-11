<template>
  <div class="page-404">
    <p class="page-404_title">page not found</p>
    <el-button-group>
      <el-button @click="$router.replace({ path: '/' })">首页</el-button>
      <el-button @click="$router.go(-1)">返回</el-button>
    </el-button-group>
  </div>
</template>

<style lang="scss" scoped>
@import '@zebra-projects/zebra-ui/src/assets/style/public.scss';
.page-404 {
  background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;
  background-blend-mode: multiply,multiply;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .page-404_title {
    font-size: 20px;
    color: #FFF;
  }
}
</style>
