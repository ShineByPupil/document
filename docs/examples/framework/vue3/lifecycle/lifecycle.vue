<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onRenderTriggered,
  onRenderTracked,
} from 'vue'
import { ElInputNumber, ElButton } from 'element-plus'

const emit = defineEmits(['log'])

const now = performance.now()
const getTime = () => ((performance.now() - now) / 1000).toFixed(5) + 's'

const num = ref(0)

const addLog = (hook: string, data?: any) => {
  emit('log', { time: getTime(), hook, data })
}

// 初始化阶段
onBeforeMount(() => addLog('onBeforeMount'))
onMounted(() => addLog('onMounted'))

// 更新阶段
onBeforeUpdate(() => {
  addLog('onBeforeUpdate')
})
onUpdated(() => {
  addLog('onUpdated')
})

// 卸载阶段
onBeforeUnmount(() => addLog('onBeforeUnmount'))
onUnmounted(() => addLog('onUnmounted'))

// 缓存组件控制
onActivated(() => addLog('onActivated'))
onDeactivated(() => addLog('onDeactivated'))

// 调试钩子
onRenderTriggered((e) => {
  addLog('onRenderTriggered', {
    key: e.key,
    type: e.type,
    target: e.target,
    newValue: e.newValue,
    oldValue: e.oldValue,
  })
})
onRenderTracked((e) => {
  addLog('onRenderTracked', {
    key: e.key,
    type: e.type,
    target: e.target,
    newValue: e.newValue,
    oldValue: e.oldValue,
  })
})
</script>

<template>
  <el-input-number v-model="num" :max="99999" />
</template>

<style scoped></style>
