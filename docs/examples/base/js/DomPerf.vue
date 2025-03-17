<script setup lang="ts">
import { ref, onMounted } from 'vue'

const ul = ref()
const li = ref()
let time_LayoutThrashing = ref(0)
let time_BatchProcessing = ref(0)

onMounted(() => {
  reset()
})

const reset = function () {
  time_LayoutThrashing.value = 0
  time_BatchProcessing.value = 0
  performance.clearMeasures('Wrong')
  performance.clearMeasures('Correct')
  li.value.forEach((li) => (li.style.width = Math.random() * 100 + 50 + 'px'))
}

const handleLayoutThrashing = function () {
  performance.mark('start') // 标记开始时间（用于 Performance 面板观察）

  li.value.forEach((el, i) => {
    const currentWidth = el.offsetWidth
    el.style.width = currentWidth + 10 + 'px'
  })

  performance.mark('end')
  performance.measure('Wrong', 'start', 'end')

  const measures = performance.getEntriesByName('Wrong')
  time_LayoutThrashing.value =
    measures.map((m) => m.duration).reduce((a, b) => a + b, 0) / measures.length
}

const handleBatchProcessing = function () {
  performance.mark('start')

  // 第一阶段：批量读取所有布局属性
  const widths = Array.from(li.value).map((el) => el.offsetWidth)

  // 第二阶段：批量写入修改
  li.value.forEach((el, i) => {
    el.style.width = widths[i] + 10 + 'px' // 使用预先读取的 widths 数组
  })

  performance.mark('end')
  performance.measure('Correct', 'start', 'end')

  const measures = performance.getEntriesByName('Correct')
  time_BatchProcessing.value =
    measures.map((m) => m.duration).reduce((a, b) => a + b, 0) / measures.length
}
</script>

<template>
  <div class="demo-only-show">
    <el-button-group>
      <el-button @click="reset">重置</el-button>
      <el-button @click="handleLayoutThrashing">读写交替</el-button>
      <el-button @click="handleBatchProcessing">先读后写</el-button>
    </el-button-group>

    <p>
      <label for="">读取交替平均用时：</label>
      <span>{{
        time_LayoutThrashing === 0
          ? '-'
          : time_LayoutThrashing.toFixed(4) + 'ms'
      }}</span>
    </p>

    <p>
      <label for="">先读后写平均用时：</label>
      <span>{{
        time_BatchProcessing === 0
          ? '-'
          : time_BatchProcessing.toFixed(4) + 'ms'
      }}</span>
    </p>

    <ul ref="ul">
      <li ref="li" v-for="i in 100"></li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
ul {
  height: 10vh;
  overflow: auto;
}

li {
  background: var(--vp-custom-block-details-bg);
  margin: 0.1rem;
  height: 1.2rem;
  transition: width 0.3s; /* 添加过渡动画方便观察变化 */
}
</style>
