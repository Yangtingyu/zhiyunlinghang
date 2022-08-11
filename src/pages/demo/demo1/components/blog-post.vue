<template>
    <div class="blog-post">
        <h1>{{post.title}}</h1>
        <button @click="$emit('enlarge-text',0.1)">
            放大字体
        </button>
        <div v-html="post.content"></div>
        <input
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
        >
    </div>
</template>

<script>
    export default {
        name: "blog-post",
        props: ['post','value']
    }
</script>

<style scoped>
    h1{
        color:#ccc;
    }

</style>