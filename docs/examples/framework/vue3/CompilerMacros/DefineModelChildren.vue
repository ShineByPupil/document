<script setup lang="ts">
const model = defineModel({ default: '1' })
const message = defineModel<string>('message', { default: 'message' })
</script>

<template>
  <div class="children demo-container">
    <p>children 组件</p>

    <el-input v-model="model" />
    <el-input v-model="message" />
  </div>
</template>

<style scoped lang="scss">
.children {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
