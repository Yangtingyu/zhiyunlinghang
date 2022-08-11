<template>
    <zebra-container-frame :src="src" />
</template>

<script>
    export default {
        name: "iframe-demo",
        data(){
            return {
                src: '',
                baseSrc: 'http://localhost:5116/#',
                flag: this.$route.query.flag
            }
        },
        mounted(){
            this.initFlag()
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'initFlag'
        },
        methods: {
            /**
             * 初始化图片地址
             */
            initFlag(){
                this.flag = this.$route.query.flag
                this.src = this.baseSrc + this.flag
            }
        },
        computed: {

        }
    }
</script>

<style>
    .cat__top-bar {
        display: none;
    }
</style>
