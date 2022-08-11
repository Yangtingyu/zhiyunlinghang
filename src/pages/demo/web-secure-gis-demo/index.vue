<template>
    <div class="world_map pa" style="width: 1920px;height: 890px;">
        <arcgis-map ref="gis" />
    </div>
</template>

<script>
    import arcgisMap from "@/components/gxb/arcgisMap/map.vue"
    export default {
        name: "web-secure-gis-demo",
        components: { arcgisMap },
    }
</script>

<style scoped>

</style>
