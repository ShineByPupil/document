<script setup lang="ts">
import { onMounted } from 'vue'
import { renderList } from './index.js'

onMounted(() => {
  // 获取列表容器
  const list = document.getElementById('list')
  // 模拟的数据
  const items = ['Apple', 'Banana', 'Cherry']
  // 调用模块方法渲染列表
  renderList(list, items)
})
</script>

<template>
  <ul id="list"></ul>
</template>
