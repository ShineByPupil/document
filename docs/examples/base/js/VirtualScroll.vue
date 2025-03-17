<template>
  <!-- 外层容器，固定高度，触发滚动 -->
  <div ref="container" class="virtual-list-container" @scroll="handleScroll">
    <!-- 撑开总高度的占位元素 -->
    <div class="scroll-holder" :style="{ height: totalHeight + 'px' }"></div>

    <!-- 实际渲染的列表内容 -->
    <div
      class="visible-items"
      :style="{ transform: `translateY(${offset}px)` }"
    >
      <div
        v-for="item in visibleItems"
        :key="item.id"
        class="list-item"
        :style="{ height: itemHeight + 'px' }"
        @click="handleItemClick(item)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const items = ref(
  Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    text: `Item ${i + 1}`,
  })),
)
const itemHeight = 50
const buffer = 5

const container = ref(null) // 容器DOM引用
const scrollTop = ref(0) // 当前滚动位置

// 计算总高度
const totalHeight = computed(() => items.value.length * itemHeight)

// 计算可见项目的起始索引
const startIndex = computed(() => {
  return Math.max(0, Math.floor(scrollTop.value / itemHeight) - buffer)
})

// 计算可见项目的结束索引
const endIndex = computed(() => {
  return Math.min(
    items.value.length, // 不能超过总项数
    Math.ceil((scrollTop.value + containerHeight.value) / itemHeight) + buffer,
  )
})

// 容器高度（根据实际渲染高度自动获取）
const containerHeight = ref(0)
onMounted(() => {
  containerHeight.value = container.value?.clientHeight || 0
})

// 计算需要渲染的可见项目
const visibleItems = computed(() => {
  return items.value.slice(startIndex.value, endIndex.value)
})

// 计算内容偏移量（撑开上方空白区域）
const offset = computed(() => {
  return startIndex.value * itemHeight
})

const handleItemClick = (item) => {
  console.log('Clicked item:', item)
}

// 滚动事件处理
let rafId = null
const handleScroll = (e) => {
  const currentScrollTop = e.target.scrollTop // 立即获取最新值

  if (rafId) cancelAnimationFrame(rafId)

  rafId = requestAnimationFrame(() => {
    scrollTop.value = currentScrollTop // 使用已捕获的值
    rafId = null
  })
}
</script>

<style scoped>
.virtual-list-container {
  height: 200px; /* 容器固定高度 */
  overflow-y: auto; /* 启用垂直滚动 */
  position: relative; /* 为绝对定位子元素提供定位基准 */
}

.visible-items {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  box-sizing: border-box;

  &:last-child {
    border-bottom: 0;
  }
}
</style>
