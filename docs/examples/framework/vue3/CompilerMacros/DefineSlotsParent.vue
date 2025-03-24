<script setup lang="ts">
import DefineSlotsChildren from './DefineSlotsChildren.vue'
</script>

<template>
  <div class="parent demo-container">
    <p>parent 组件</p>

    <DefineSlotsChildren>
      <template #header="{ title }">
        <p>header 插槽，接受 title 参数：{{ title }}</p>
      </template>

      <template #default="{ message }">
        <p>default 插槽：{{ message }}</p>
      </template>
    </DefineSlotsChildren>
  </div>
</template>

<style scoped lang="scss"></style>
