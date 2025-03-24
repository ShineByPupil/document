<script setup lang="ts">
import { ref } from 'vue'

// 声明插槽类型：定义一个默认插槽和一个具名插槽
defineSlots<{
  default: (props: { message: string }) => any // 默认插槽，接受 message 参数
  header?: (props: { title: string }) => any // 可选的 header 插槽，接受 title 参数
}>()

const message = ref('message')
const title = ref('Hello Header')
</script>

<template>
  <div class="children demo-container">
    <p>children 组件</p>

    <!-- 使用具名插槽 header -->
    <slot name="header" :title="title"></slot>

    <!-- 使用默认插槽，传递 message 参数 -->
    <slot :message="message"></slot>
  </div>
</template>

<style scoped lang="scss"></style>
