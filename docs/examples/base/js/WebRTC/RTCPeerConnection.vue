<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'

const containerRef = ref()

// 状态管理
const localStream = ref(null)
const remoteStreams = ref(new Map()) // 用户ID -> 媒体流
const users = ref(new Set()) // 房间内用户列表
const peerConnections = ref(new Map()) // 用户ID -> RTCPeerConnection

// WebSocket 相关
const ws = ref(null)
const userId = ref(crypto.randomUUID().slice(0, 8)) // 生成短ID
const roomId = ref('default-room')
const status = ref('disconnected')

// DOM 引用
const localVideo = ref(null)
const remoteVideos = ref({}) // 动态视频元素引用存储

// 初始化媒体设备
const initMedia = async () => {
  try {
    localStream.value = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })
    if (localVideo.value) {
      localVideo.value.srcObject = localStream.value
    }
  } catch (error) {
    console.error('无法获取媒体设备:', error)
  }
}

// WebSocket 连接管理
const connectWebSocket = () => {
  ws.value = new WebSocket('wss://192.168.31.20:8080')

  ws.value.onopen = () => {
    status.value = '连接中'
    // 发送认证信息
    ws.value.send(
      JSON.stringify({
        type: 'auth',
        userId: userId.value,
        roomId: roomId.value,
      }),
    )
  }

  ws.value.onmessage = (event) => {
    const message = JSON.parse(event.data)
    switch (message.type) {
      case 'auth-success':
        handleAuthSuccess(message)
        break
      case 'user-joined':
        handleUserJoined(message)
        break
      case 'user-left':
        handleUserLeft(message)
        break
      case 'signal':
        handleSignal(message)
        break
      case 'error':
        handleError(message)
        break
    }
  }

  ws.value.onclose = () => {
    status.value = '断开连接'
    // cleanupConnections()
  }
}

// 处理认证成功
const handleAuthSuccess = (message) => {
  status.value = '已连接'
  users.value = new Set(message.existingUsers || [])
}

// 处理新用户加入
const handleUserJoined = (message) => {
  initiateCall(message.userId)
}

// 处理用户离开
const handleUserLeft = (message) => {
  users.value.delete(message.userId)
  const pc = peerConnections.value.get(message.userId)
  if (pc) {
    pc.close()
    peerConnections.value.delete(message.userId)
  }
  remoteStreams.value.delete(message.userId)
}

// 处理信令消息
const handleSignal = async (message) => {
  const data = message.data
  if (data.sdp) {
    await handleSDP(message.sender, data.sdp)
  } else if (data.ice) {
    await handleICE(message.sender, data.ice)
  }
}

// 创建对等连接
const createPeerConnection = (targetUserId) => {
  const pc = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  })
  peerConnections.value.set(targetUserId, pc)

  // 添加本地流
  localStream.value.getTracks().forEach((track) => {
    pc.addTrack(track, localStream.value)
  })

  // ICE 候选处理
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      sendSignal(targetUserId, { ice: event.candidate })
    }
  }

  // 远程流处理
  pc.ontrack = (event) => {
    const streams = event.streams
    if (streams && streams.length > 0) {
      remoteStreams.value.set(targetUserId, streams[0])
    }
  }

  // 连接状态监控
  pc.onconnectionstatechange = () => {
    if (pc.connectionState === 'disconnected') {
      handleUserLeft({ userId: targetUserId })
    }
  }

  return pc
}

// 发起呼叫
const initiateCall = async (targetUserId) => {
  if (users.value.has(targetUserId)) {
    ElMessage.success(`用户 ${targetUserId} 已在房间内`)
    return
  }
  users.value.add(targetUserId)

  const pc = createPeerConnection(targetUserId)

  try {
    const offer = await pc.createOffer()

    await pc.setLocalDescription(offer)
    sendSignal(targetUserId, { sdp: offer })
  } catch (error) {
    console.error('创建Offer失败:', error)
  }
}

// 处理SDP
const handleSDP = async (senderId, sdp) => {
  const pc =
    peerConnections.value.get(senderId) || createPeerConnection(senderId)

  try {
    // 设置远程 SDP 描述
    await pc.setRemoteDescription(sdp)

    // 如果是 Offer,创建 Answer 并答复
    if (sdp.type === 'offer') {
      const answer = await pc.createAnswer()
      await pc.setLocalDescription(answer)
      sendSignal(senderId, { sdp: answer })
    }
  } catch (error) {
    console.error('处理SDP失败:', error)
  }
}

// 处理ICE候选
const handleICE = async (senderId, candidate) => {
  const pc = peerConnections.value.get(senderId)
  if (pc) {
    try {
      await pc.addIceCandidate(candidate)
    } catch (error) {
      console.error('添加ICE候选失败:', error)
    }
  }
}

// 发送信令
const sendSignal = (targetUserId, data) => {
  if (ws.value.readyState === WebSocket.OPEN) {
    ws.value.send(
      JSON.stringify({
        type: 'signal',
        target: targetUserId,
        data: data,
      }),
    )
  }
}

// 清理资源
const cleanupConnections = () => {
  peerConnections.value.forEach((pc) => pc.close())
  peerConnections.value.clear()
  remoteStreams.value.clear()

  if (localStream.value) {
    localStream.value.getTracks().forEach((track) => track.stop())
    localStream.value = null
  }
}

// 生命周期钩子
onMounted(() => {
  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) {
      observer.disconnect()
      await initMedia()
      connectWebSocket()
    }
  })

  observer.observe(containerRef.value)
})

onBeforeUnmount(() => {
  if (ws.value) ws.value.close()
  cleanupConnections()
})
</script>

<template>
  <div ref="containerRef" class="container">
    <!-- 状态显示 -->
    <div class="status-bar">
      <h3>基础信息</h3>
      <ul>
        <li>房间: {{ roomId }}</li>
        <li>用户ID: {{ userId }}</li>
        <li>状态: {{ status }}</li>
      </ul>
    </div>

    <!-- 用户列表 -->
    <div class="user-list">
      <h3>在线用户 ({{ users.size }})</h3>
      <ul>
        <li
          v-for="user in users"
          :key="user"
          @click="initiateCall(user)"
          :class="{ connected: peerConnections.has(user) || user === userId }"
        >
          <span :class="{ myself: user === userId }">{{ user }}</span>
          <span class="status-indicator"></span>
        </li>
      </ul>
    </div>

    <!-- 本地视频 -->
    <div class="video-container">
      <div class="video-box">
        <h3>本地视频</h3>
        <video ref="localVideo" autoplay muted class="video-element"></video>
      </div>

      <!-- 远程视频 -->
      <div
        v-for="[userId, stream] in remoteStreams"
        :key="userId"
        class="video-box"
      >
        <h3>用户 {{ userId }}</h3>
        <video
          :ref="(el) => (remoteVideos[userId] = el)"
          :srcObject="stream"
          autoplay
          class="video-element"
        ></video>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
  max-height: 100vh;
  overflow-y: auto;
}

// 状态显示
.status-bar {
  padding: 10px;
}

// 用户列表

.user-list {
  padding: 4px;
  border-radius: 8px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 4px;
    margin: 5px 0;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.2s;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  li:hover {
    background: #e0e0e0;
  }

  .connected {
    color: #4caf50;
  }

  .status-indicator {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ccc;
  }

  .connected .status-indicator {
    background: #4caf50;
    margin-right: 4px;
  }

  .myself {
    text-decoration: underline;
  }
}

// 视频
.video-container {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 5px;
  overflow-y: auto;

  .video-box {
    background: #000;
    border-radius: 8px;
    overflow: hidden;
  }

  .video-box h3 {
    color: white;
    padding: 4px;
    margin: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .video-element {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
}
</style>
