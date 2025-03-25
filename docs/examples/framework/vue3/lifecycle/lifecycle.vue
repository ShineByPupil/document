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
import LifecycleChildren from './LifecycleChildren.vue'

const emit = defineEmits(['log'])
const prop = defineProps<{ isNested: boolean }>()

const now = performance.now()
const getTime = () => ((performance.now() - now) / 1000).toFixed(4) + 's'

const num = ref(0)

const addLog = (hook: string, data?: any, type?: string) => {
  emit('log', { time: getTime(), hook, data, type: type || 'parent' })
}

// 初始化阶段
onBeforeMount(() => addLog('onBeforeMount'))
onMounted(() => addLog('onMounted'))

// 更新阶段
onBeforeUpdate(() => addLog('onBeforeUpdate'))
onUpdated(() => addLog('onUpdated'))

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
  <div class="parent demo-container">
    <p v-show="prop.isNested">parent 组件</p>

    <el-input-number v-model="num" :max="99999" />

    <LifecycleChildren
      v-if="prop.isNested"
      @log="(...args) => addLog(...args, 'child')"
    ></LifecycleChildren>
  </div>
</template>

<style scoped>
.parent {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px; /* 可选间距 */
}

p {
  margin: 0;
}
</style>
