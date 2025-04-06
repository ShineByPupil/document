<script setup lang="ts">
import './finally'
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
