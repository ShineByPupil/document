<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createSlotComponent } from './slot.js'

const container = ref()
onMounted(() => {
  const component = createSlotComponent()
  const template = document.createElement('template')
  template.innerHTML = `
    <p slot="header">我是标题内容</p>
    <h1>这里是正文内容</h1>
    <span>这是一段斜体绿色文字</span>
  `
  component.appendChild(template.content)
  container.value?.appendChild(component)
})
</script>

<template>
  <div ref="container"></div>
</template>
