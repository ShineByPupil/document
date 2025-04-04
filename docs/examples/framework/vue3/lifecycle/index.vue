<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import Lifecycle from './lifecycle.vue'

const config = reactive({
  isKeepalive: true, // 开启缓存
  isShow: true, // 挂载组件
  isDebug: false, // 调试钩子
  isNested: true, // 嵌套组件启用状态
})
const keepalive = ref(true)
const show = ref(true)
const logs = ref<Array<{ time: string; hook: string; data?: any }>>([])

const handleClear = function () {
  logs.value = []
}
const addLog = function (data) {
  logs.value.unshift(data)
}
const logFormat = computed(() =>
  config.isDebug
    ? logs.value
    : logs.value.filter(
        (n) => !['onRenderTriggered', 'onRenderTracked'].includes(n.hook),
      ),
)
</script>

<template>
  <div class="demo-only-show">
    <!-- 面板 -->
    <el-form :model="config" inline>
      <el-form-item>
        <el-checkbox v-model="config.isKeepalive">开启缓存</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="config.isShow">挂载组件</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="config.isDebug">调试钩子</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="config.isNested">嵌套组件</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button @click="handleClear">清除日志</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>

    <!-- 组件 -->
    <KeepAlive v-if="config.isKeepalive">
      <Lifecycle
        v-if="config.isShow"
        :isNested="config.isNested"
        @log="addLog"
      />
    </KeepAlive>
    <Lifecycle
      v-else-if="config.isShow"
      :isNested="config.isNested"
      @log="addLog"
    />

    <!-- 日志 -->
    <div class="log-container">
      <div
        v-for="(log, index) in logFormat"
        :key="index"
        class="log-item"
        :class="[log.hook.toLowerCase()]"
      >
        <span class="timestamp">{{ log.time }}</span>
        <span v-if="config.isNested" class="type-name">{{ log.type }}</span>
        <span class="hook-name">{{ log.hook }}</span>
        <pre v-if="log.data" class="hook-data">{{ log.data }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-only-show {
  display: grid;
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
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: start;
  gap: 10px;
  padding: 8px 12px;
  margin: 4px 0;
  border-radius: 4px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-family: monospace;
  font-size: 0.9em;
}

.timestamp {
  color: #909399;
  font-weight: bold;
}

.type-name {
  color: #06a60f;
  font-weight: bold;
}

.hook-name {
  color: #409eff;
  font-weight: bold;
}

.hook-data {
  grid-column: 1 / -1;
  color: #67c23a;
  margin: 4px 0 0 20px;
}

/* 初始化阶段 - 橙黄色系 */
.setup {
  border-left: 4px solid #ff9800; /* 落日橙 - 组合式API初始化 */
}

/* 挂载阶段 - 黄绿色系 */
.onbeforemount {
  border-left: 4px solid #e6a23c; /* 琥珀色 - 挂载前 */
}
.onmounted {
  border-left: 4px solid #67c23a; /* 草绿色 - 挂载完成 */
}

/* 更新阶段 - 蓝红色系 */
.onbeforeupdate {
  border-left: 4px solid #409eff; /* 天空蓝 - 更新前 */
}
.onupdated {
  border-left: 4px solid #f56c6c; /* 珊瑚红 - 更新完成 */
}

/* 缓存阶段 - 双灰色系 */
.onactivated {
  border-left: 4px solid #c0c4cc; /* 浅灰色 - 激活 */
}
.ondeactivated {
  border-left: 4px solid #909399; /* 深灰色 - 失活 */
}

/* 卸载阶段 - 紫红色系 */
.onbeforeunmount {
  border-left: 4px solid #9c27b0; /* 品紫色 - 卸载前 */
}
.onunmounted {
  border-left: 4px solid #673ab7; /* 深紫色 - 卸载完成 */
}
</style>
