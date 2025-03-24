<script setup lang="ts">
import { ref } from 'vue'
import DefineEmitsChildren from './DefineEmitsChildren.vue'

const text = ref('')
const handleChange = (value) => {
  text.value = '：触发了 change 事件，参数为 ' + value
}
const handleUpdate = (value) => {
  text.value = '：触发了 update 事件，参数为 ' + value
}
</script>

<template>
  <div class="parent demo-container">
    <p>
      <span>parent 组件</span>
      <span>{{ text }}</span>
    </p>

    <DefineEmitsChildren
      @change="handleChange"
      @update="handleUpdate"
    ></DefineEmitsChildren>
  </div>
</template>

<style scoped lang="scss"></style>
