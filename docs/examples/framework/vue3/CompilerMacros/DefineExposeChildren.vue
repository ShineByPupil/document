<!-- Children.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

defineExpose({ count })
</script>

<template>
  <div class="children demo-container">
    <p>children 组件</p>

    <p>count：{{ count }}</p>
  </div>
</template>

<style scoped lang="scss"></style>
