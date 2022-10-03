<template>
    <div>
        <h1>{{text}}</h1>
    </div>
</template>

<script setup>
const props=defineProps(['text'])
console.log(props.text)
</script>