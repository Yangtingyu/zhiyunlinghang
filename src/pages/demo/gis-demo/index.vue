<template>
    <div class="world_map pa">
        <superMap ref="gis" v-if="mapType==='1'"/>
        <baidumapDemo ref="gis2" v-if="mapType==='2'"/>
        <div style="position: absolute;top: 10px;right: 10px;z-index: 9">
          <el-select v-model="mapType">
          <el-option value='1' label="super地图"></el-option>
          <el-option value='2' label="百度地图"></el-option>
          </el-select>
        </div>
    </div>
</template>

<script>
    import superMap from "./supermapDemo";
    import baidumapDemo from "./baidumapDemo";
    export default {
        name: "gis-demo",
        components: {superMap,baidumapDemo},
      data() {
          return {
            mapType: '2',//1是super，2是百度
          }
      }
    }
</script>

<style scoped>
  .world_map{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 1;
  }
</style>
