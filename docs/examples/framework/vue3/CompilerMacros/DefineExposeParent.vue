<!-- Parent.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import DefineExposeChildren from './DefineExposeChildren.vue'

const childrenRef = ref()
</script>

<template>
  <div class="parent demo-container">
    <p>parent 组件</p>
    <p>子组件 count：{{ childrenRef?.count }}</p>
    <el-button-group>
      <el-button @click="childrenRef.count++">增加</el-button>
      <el-button @click="childrenRef.count--">减少</el-button>
    </el-button-group>
    <DefineExposeChildren ref="childrenRef" />
  </div>
</template>

<style scoped lang="scss"></style>
