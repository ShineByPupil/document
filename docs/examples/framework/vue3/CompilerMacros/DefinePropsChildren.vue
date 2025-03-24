<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    count?: number
  }>(),
  {
    title: 'title',
    count: 0,
  },
)
</script>

<template>
  <div class="children demo-container">
    <p>children 组件</p>

    <label>{{ title }}: {{ count }}</label>
  </div>
</template>

<style scoped lang="scss"></style>
