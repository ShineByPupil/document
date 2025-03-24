<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots()
</script>

<template>
  <div class="children demo-container">
    <p>children 组件</p>

    <!-- 默认插槽 -->
    <slot></slot>

    <!-- 具名插槽 footer -->
    <slot name="footer" v-if="slots.footer" />
    <div v-else>默认 Footer</div>
  </div>
</template>

<style scoped lang="scss"></style>
