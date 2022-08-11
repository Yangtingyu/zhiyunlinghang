<template>
    <li>
        {{ title }}
        <button v-on:click="$emit('remove')" >Remove</button>
        <input
                v-bind:value="value"
                v-on:input="$emit('input',$event.target.value)"
        />
    </li>
</template>

<script>
    export default {
        name: 'todo-item',
        props: [
            'title'
        ]
    }
</script>