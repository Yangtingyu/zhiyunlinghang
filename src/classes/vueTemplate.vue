<template>
  <div class="provinceMapBox"></div>
</template>
<script>
export default {
  name: "provinceMapBox",
  components: {},
  props: {},
  computed: {
    now: function (t) {
      return t;
    },
  },
  watch: {
    test: {
      handler(val, oldVal) {},
      deep: true, //true 深度监听
      immediate: true,
    },
  },
  data() {
    return {
      test: "",
    };
  },
  mounted() {},
  methods: {},
  beforeDestroy() {},
};
</script>
<style scoped>
.provinceMapBox {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>>