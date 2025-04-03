<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const draggableElement = ref(null)
const position = reactive({ x: 500, y: -85 })
const box = reactive({ top: 0, left: 0, viewportTop: 0, viewportLeft: 0 })
// 初始触摸/鼠标位置
const startX = ref(0)
const startY = ref(0)
const initialX = ref(0)
const initialY = ref(0)

// 渲染帧优化
const rafDebounce = function (fn: Function): () => void {
  let rafId = null

  return function (...args: any[]) {
    rafId && cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
      fn.apply(this, args)
      rafId = null
    })
  }
}

// ======================== 拖拽 ========================
const getClientCoordinates = (event) => {
  return event.touches && event.touches.length > 0 ? event.touches[0] : event
}

const startDrag = (event) => {
  const { clientX, clientY } = getClientCoordinates(event)

  startX.value = clientX
  startY.value = clientY
  initialX.value = position.x
  initialY.value = position.y

  // 添加事件监听
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', endDrag)
  document.addEventListener('touchmove', onDrag)
  document.addEventListener('touchend', endDrag)
}

const onDrag = rafDebounce((event) => {
  event.preventDefault()
  const { clientX, clientY } = getClientCoordinates(event)

  const dx = clientX - startX.value
  const dy = clientY - startY.value

  position.x = initialX.value + dx
  position.y = initialY.value + dy

  getPosition()
})

const endDrag = () => {
  // 移除事件监听
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', endDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', endDrag)
}

// ======================== 定位 ========================
const getPosition = () => {
  const { left, top } = draggableElement.value.getBoundingClientRect()

  Object.assign(box, {
    viewportTop: top.toFixed(),
    viewportLeft: left.toFixed(),
    top: (top + window.scrollY).toFixed(),
    left: (left + window.scrollX).toFixed(),
  })
}

onMounted(() => {
  document.addEventListener('scroll', getPosition)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  endDrag()
  document.removeEventListener('scroll', getPosition)
})
</script>

<template>
  <ul
    class="drag-box"
    ref="draggableElement"
    :style="{
      transform: `translate(${position.x}px, ${position.y}px)`,
      touchAction: 'none',
    }"
    @mousedown="startDrag"
    @touchstart.prevent="startDrag"
  >
    <li>top: {{ box.top }}</li>
    <li>left: {{ box.left }}</li>
    <li>viewTop: {{ box.viewportTop }}</li>
    <li>viewLeft: {{ box.viewportLeft }}</li>
  </ul>
</template>

<style scoped lang="scss">
.drag-box {
  position: absolute;
  cursor: move;
  user-select: none;
  z-index: 30;
}

ul {
  padding: 5px 20px;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
}
</style>
