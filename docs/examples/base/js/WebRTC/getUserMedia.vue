<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Video 元素引用
const videoRef = ref(null)

// 媒体流对象
let mediaStream = null

const videoClose = function () {
  // 停止所有媒体轨道
  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop())
  }
}

const handleError = function (err) {
  console.error(`媒体设备访问失败: ${err.name}`)
  switch (err.name) {
    case 'NotAllowedError':
      alert('请允许摄像头/麦克风访问权限')
      break
    case 'NotFoundError':
      alert('未找到可用媒体设备')
      break
    case 'OverconstrainedError':
      alert('无法满足配置要求')
      break
  }
}

const videoInit = async function () {
  try {
    // 请求媒体设备权限
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
      audio: true,
    })

    // 保存媒体流引用
    mediaStream = stream

    // 设置视频源
    if (videoRef.value) {
      videoRef.value.srcObject = stream
    }
  } catch (err) {
    handleError(err)
  }
}

onMounted(() => {
  // 进入可见区域时初始化
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      videoInit()
      observer.disconnect()
    }
  })

  observer.observe(videoRef.value)
})

onBeforeUnmount(() => {
  videoClose()
})
</script>

<template>
  <video ref="videoRef" autoplay muted controls playsinline></video>

  <el-button-group>
    <el-button @click="videoInit">打开</el-button>
    <el-button @click="videoClose">关闭</el-button>
  </el-button-group>
</template>

<style scoped lang="scss">
video {
  margin-bottom: 10px;
}
</style>
