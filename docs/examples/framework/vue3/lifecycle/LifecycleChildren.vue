<script setup lang="ts">
import {
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  onUnmounted,
} from 'vue'
const emit = defineEmits(['log'])

const addLog = (hook: string, data?: any) => {
  emit('log', hook, data)
}
// 初始化阶段
onBeforeMount(() => addLog('onBeforeMount'))
onMounted(() => addLog('onMounted'))

// 卸载阶段
onBeforeUnmount(() => addLog('onBeforeUnmount'))
onUnmounted(() => addLog('onUnmounted'))

// 缓存组件控制
onActivated(() => addLog('onActivated'))
onDeactivated(() => addLog('onDeactivated'))
</script>

<template>
  <div class="children demo-container">
    <p>children 组件</p>
  </div>
</template>

<style scoped lang="scss">
.children {
  flex: 0 0 100%; /* 占满整行 */
}
p {
  margin: 0;
}
</style>
