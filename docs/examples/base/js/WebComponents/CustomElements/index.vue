<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(async () => {
  // 动态导入包含浏览器API的模块
  const { UserCard } = await import('./finally')

  customElements.define('ce-user-card', UserCard)
})
</script>

<template>
  <div class="container">
    <ce-user-card name="张三" age="25"></ce-user-card>

    <ce-user-card>
      <span slot="name">李四</span>
      <span slot="age">30</span>
    </ce-user-card>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
