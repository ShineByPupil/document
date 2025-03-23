<script setup lang="ts">
import { ref } from 'vue'
import Lifecycle from './lifecycle.vue'

const keepalive = ref(true)
const show = ref(true)
const logs = ref<Array<{ time: string; hook: string; data?: any }>>([])

const toggleKeepalive = function () {
  clear()
  keepalive.value = !keepalive.value
}
const clear = function () {
  logs.value = []
}
const addLog = function (data) {
  logs.value.unshift(data)
}
</script>

<template>
  <div class="demo-only-show">
    <el-button-group>
      <el-button @click="toggleKeepalive" type="primary">
        {{ keepalive ? '关闭缓存' : '开启缓存' }}
      </el-button>
      <el-button @click="show = !show" type="primary">
        {{ show ? '卸载组件' : '挂载组件' }}
      </el-button>
      <el-button @click="clear" type="primary">清除日志</el-button>
    </el-button-group>

    <KeepAlive v-if="keepalive">
      <Lifecycle v-if="show" @log="addLog" />
    </KeepAlive>
    <Lifecycle v-else-if="show" @log="addLog" />

    <div class="log-container">
      <div
        v-for="(log, index) in logs"
        :key="index"
        class="log-item"
        :class="[log.hook.toLowerCase()]"
      >
        <span class="timestamp">{{ log.time }}</span>
        <span class="hook-name">{{ log.hook }}</span>
        <pre v-if="log.data" class="hook-data">{{ log.data }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-only-show {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
}

.log-container {
  grid-column: 1 / -1;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 10px;
  max-height: 400px;
  overflow-y: auto;
  background: var(--vp-c-bg-soft);
}

.log-item {
  padding: 8px 12px;
  margin: 4px 0;
  border-radius: 4px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-family: monospace;
}

.timestamp {
  color: #909399;
  margin-right: 10px;
}

.hook-name {
  color: #409eff;
  font-weight: bold;
}

.hook-data {
  color: #67c23a;
  margin: 4px 0 0 20px;
  font-size: 0.9em;
}

/* 不同生命周期阶段的颜色标记 */
.onbeforemount {
  border-left: 4px solid #e6a23c;
}
.onmounted {
  border-left: 4px solid #67c23a;
}
.onbeforeupdate {
  border-left: 4px solid #409eff;
}
.onupdated {
  border-left: 4px solid #f56c6c;
}
.onactivated {
  border-left: 4px solid #909399;
}
.ondeactivated {
  border-left: 4px solid #909399;
}
</style>
