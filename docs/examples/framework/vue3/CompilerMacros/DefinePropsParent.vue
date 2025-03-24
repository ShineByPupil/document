<script setup lang="ts">
import { ref } from 'vue'
import DefinePropsChildren from './DefinePropsChildren.vue'

const title = ref('title')
const count = ref(222)
</script>

<template>
  <div class="parent demo-container">
    <p>parent 组件</p>

    <DefinePropsChildren :title="title" :count="count"></DefinePropsChildren>
  </div>
</template>

<style scoped lang="scss"></style>
