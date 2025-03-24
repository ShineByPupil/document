<script setup lang="ts">
import { ref } from 'vue'
import DefineModelChildren from './DefineModelChildren.vue'

const model = ref('model')
const message = ref()
</script>

<template>
  <div class="parent demo-container">
    <p>parent 组件</p>

    <el-input v-model="model" />
    <el-input v-model="message" />
    <DefineModelChildren v-model="model" v-model:message="message" />
  </div>
</template>

<style scoped lang="scss">
.parent {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
