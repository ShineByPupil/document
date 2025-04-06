<script setup>
import { onMounted } from 'vue'
import { createShadowBox } from './index.js'

onMounted(() => {
  const shadowHost = createShadowBox()
  document.getElementById('shadow-container').appendChild(shadowHost)
})
</script>
<template>
  <div class="shadow-demo">
    <!-- Shadow DOM 演示区域 -->
    <div id="shadow-container"></div>

    <!-- 普通 DOM 对比区域 -->
    <div class="comparison">
      <p>外部普通DOM内容：</p>
      <button>普通按钮</button>
    </div>

    <!-- 代码展示区域 -->
    <div class="code-container">
      <pre><code class="css-code">/* 全局样式 */
button {
  background: red !important;
  margin: 10px;
  cursor: pointer;
}</code></pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
.shadow-demo {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* 保持原有按钮样式 */
button {
  background: red !important;
  margin: 10px;
  cursor: pointer;
}

.code-container {
  grid-column: 1 / -1;
  border-radius: 6px;

  pre {
    margin: 0;
    overflow-x: auto;
  }

  .css-code {
    display: block;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 14px;
    //color: #333;
    line-height: 1.5;
    white-space: pre-wrap;
    padding: 12px;
    background: var(--vp-code-block-bg);
    border: 1px solid var(--vp-c-divider);
    border-radius: 4px;
  }
}
</style>
