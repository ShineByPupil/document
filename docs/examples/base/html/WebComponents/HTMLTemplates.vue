<script setup lang="ts">
import { ref, onMounted } from 'vue';

onMounted(() => {
  const template = document.getElementById('list-item-template');
  const list = document.getElementById('list');
  const items = ['Apple', 'Banana', 'Cherry'];

  // 克隆模板并填充数据
  items.forEach(item => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.text').textContent = item;
    list.appendChild(clone);
  });
})
</script>

<template>
  <template id="list-item-template">
    <li class="item">
      <span class="text"></span>
      <button class="delete">×</button>
    </li>
  </template>

  <ul id="list"></ul>
</template>
