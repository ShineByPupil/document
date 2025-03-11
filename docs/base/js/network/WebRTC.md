# WebRTC

> 由 Google 发起的开源项目，使浏览器无需插件即可实现实时音视频通信与P2P数据传输。基于 UDP 协议实现毫秒级延迟，通过 NAT
> 穿透技术建立直接设备连接，彻底改变传统实时通信架构。

## 核心特性

1. 端到端直连。绕过服务器直接建立设备间连接（P2P），降低传输延迟
2. 媒体处理引擎。集成音视频采集、编码、网络适应等全套处理管线
3. 自适应传输。根据网络状况动态调整码率、分辨率（Simulcast/SVC）
4. NAT穿透能力。通过 ICE/STUN/TURN 技术突破复杂网络环境限制
5. 安全加密传输。强制使用 DTLS/SRTP 加密，保障通信隐私安全

## 应用场景

1. 视频会议系统。多人实时音视频会议（如 Zoom/Google Meet 替代方案）
2. 直播连麦互动。观众与主播实时双向音视频互动
3. 远程桌面控制。浏览器间低延迟屏幕共享与指令传输
4. P2P文件传输。大文件直接分块传输，避免服务器中转
5. AR/VR协作。实时3D空间数据同步与沉浸式交互

## 基本用法

### 视频通话实现

```js
// 获取本地媒体流
async function initLocalStream() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 720 },
      audio: true,
    })
    document.getElementById('localVideo').srcObject = stream
    return stream
  } catch (e) {
    console.error('设备访问失败:', e)
  }
}

// 创建P2P连接
const pc = new RTCPeerConnection({
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'turn:turn.example.com', username: 'user', credential: 'pass' },
  ],
})

// 交换ICE候选
pc.onicecandidate = (event) => {
  if (event.candidate) {
    signaling.send({ type: 'ice', candidate: event.candidate })
  }
}

// 接收远程流
pc.ontrack = (event) => {
  document.getElementById('remoteVideo').srcObject = event.streams[0]
}

// 发起呼叫
async function call() {
  const stream = await initLocalStream()
  stream.getTracks().forEach((track) => pc.addTrack(track, stream))

  const offer = await pc.createOffer()
  await pc.setLocalDescription(offer)
  signaling.send({ type: 'offer', sdp: offer.sdp })
}

// 应答处理
signaling.onMessage(async (message) => {
  if (message.type === 'offer') {
    await pc.setRemoteDescription(
      new RTCSessionDescription({
        type: 'offer',
        sdp: message.sdp,
      }),
    )
    const answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)
    signaling.send({ type: 'answer', sdp: answer.sdp })
  }
  if (message.type === 'ice') {
    pc.addIceCandidate(new RTCIceCandidate(message.candidate))
  }
})
```

### 数据通道传输

```js
// 创建数据通道
const dc = pc.createDataChannel('fileTransfer')

dc.onopen = () => {
  console.log('数据通道就绪')
  const file = new Blob([
    /* 文件数据 */
  ])
  const chunkSize = 16384
  const reader = file.stream().getReader()

  function sendChunk() {
    reader.read().then(({ done, value }) => {
      if (done) {
        dc.send(JSON.stringify({ type: 'EOF' }))
        return
      }
      dc.send(value)
      sendChunk()
    })
  }

  sendChunk()
}

// 接收端处理
pc.ondatachannel = (event) => {
  const dc = event.channel
  dc.onmessage = (e) => {
    if (typeof e.data === 'string') {
      const cmd = JSON.parse(e.data)
      if (cmd.type === 'EOF') completeFile()
    } else {
      buffer.push(e.data)
    }
  }
}
```

## RTCPeerConnection

>

### 应用场景

1. 视频会议系统
2. 远程医疗问诊
3. 在线教育直播
4. 智能安防监控

### 基础语法

```js
// 创建 RTCPeerConnection
const pc = new RTCPeerConnection()

// 创建数据通道
const dc = pc.createDataChannel('chat')
dc.onmessage = (e) => console.log('对方消息:', e.data)
dc.onopen = () => dc.send('Hello Peer!')

// ICE 协商处理
pc.onicecandidate = (e) => {
  if (e.candidate) {
    // 发送 candidate 到对方
  }
}

// 接收远程描述
pc.setRemoteDescription(remoteDescription)
```

## RTCDataChannel

> 是 WebRTC 提供的基于 SCTP 协议的双向数据通道，允许浏览器间直接传输任意格式数据（如文本、二进制文件、游戏状态）。其继承
> WebRTC 的低延迟、高吞吐特性，支持可靠（TCP-like）与不可靠（UDP-like）传输模式，结合端到端加密保障安全性

### 应用场景

1. 多人实时在线游戏
2. 协同编辑工具
3. 物联网设备控制
4. 金融实时交易系统

### 基础语法

```js
// 创建带配置的数据通道
const dc = pc.createDataChannel('fileTransfer', {
  ordered: false, // 是否保证顺序
  maxRetransmits: 3, // 最大重传次数
  protocol: 'binary', // 传输协议类型
})

// 二进制数据传输
dc.binaryType = 'arraybuffer'

// 接收方监听数据通道
pc.ondatachannel = ({ channel }) => {
  channel.onmessage = ({ data }) => {
    if (data instanceof ArrayBuffer) {
      // 处理二进制数据
    } else {
      console.log('Received:', data)
    }
  }
}

// 大文件分片发送示例
function sendFile(file) {
  const chunkSize = 16384
  let offset = 0

  const reader = new FileReader()
  reader.onload = () => {
    dc.send(reader.result)
    offset += chunkSize
    if (offset < file.size) readNext()
  }

  function readNext() {
    const slice = file.slice(offset, offset + chunkSize)
    reader.readAsArrayBuffer(slice)
  }

  readNext()
}
```

## MediaStream

> 媒体控制

### 应用场景

1. 实时视频滤镜与 AR 特效
2. 语音识别与翻译
3. 生物特征认证
4. 本地音视频录制

### 基础语法

```js
// 获取屏幕共享流
async function shareScreen() {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { cursor: 'always' },
      audio: false,
    })

    // 替换现有视频轨道
    const [videoTrack] = stream.getVideoTracks()
    const sender = pc.getSenders().find((s) => s.track.kind === 'video')
    await sender.replaceTrack(videoTrack)
  } catch (err) {
    console.error('屏幕共享失败:', err)
  }
}

// 动态切换摄像头
async function switchCamera(deviceId) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { deviceId: { exact: deviceId } },
  })

  const newVideoTrack = stream.getVideoTracks()[0]
  const sender = pc.getSenders().find((s) => s.track.kind === 'video')
  await sender.replaceTrack(newVideoTrack)

  // 关闭旧轨道
  sender.track.stop()
}
```
