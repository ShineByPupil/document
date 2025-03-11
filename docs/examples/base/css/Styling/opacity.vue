<script setup lang="ts">
import { ref } from 'vue'

const opacity = ref(1)
</script>

<template>
  <div class="opacity-demo">
    <div class="opacity-container">
      <div class="box" :style="{ opacity: opacity }">
        透明度 {{ opacity.toFixed(1) }}
      </div>

      <div
        class="box"
        :style="{ background: `rgba(200, 200, 200, ${opacity})` }"
      >
        透明背景 (RGBA)
      </div>
    </div>

    <div class="controls">
      <el-form ref="formRef" label-width="auto">
        <el-form-item label="透明度">
          <el-slider :max="1" :step="0.1" v-model="opacity" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 基础样式 */
.opacity-demo {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;

  .opacity-container {
    display: flex;
    place-content: center;
    margin: 0 auto 1rem;
    padding: 10px;
    background: var(--vp-c-bg-soft);

    .box {
      width: 200px;
      height: 100px;
      margin: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--vp-c-divider);
    }
  }

  .controls {
    margin: 10px 0;
  }
}
</style>
