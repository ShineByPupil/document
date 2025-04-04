<script setup lang="ts">
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

<template>
  <div class="children demo-container">
    <p>children 组件</p>

    <pre>{{ attrs }}</pre>
  </div>
</template>

<style scoped lang="scss"></style>
