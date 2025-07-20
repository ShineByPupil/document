# WebRTC

> WebRTC（Web Real-Time Communication<Sound word="Web Real-Time Communication"/>）是一项支持浏览器和移动应用进行实时音视频通信的技术

## 核心概念

- **P2P（点对点通信）**
  - 核心目标：绕过中心服务器，直接建立端到端连接，降低延迟并减少带宽成本
  - 技术挑战：需解决 NAT 穿透、动态 IP 分配、防火墙限制等问题
  - 应用场景：视频会议、文件传输、游戏对战
- **NAT穿透（Network Address Translation Traversal）**
  - 核心目标：客户端通常位于私有网络（如家庭路由器）后，需通过公网可达的地址映射实现直连
  - 解决方案：
    - STUN（Session Traversal Utilities for NAT）：获取客户端的公网 IP:Port 映射
    - TURN（Traversal Using Relays around NAT）：当直连失败时通过中继服务器转发数据

## 一、getUserMedia <Sound word="getUserMedia"/>

> 媒体设备访问：获取用户的摄像头、麦克风等媒体设备权限，捕获音视频流

### 应用场景

- 视频会议/在线教育
- 生物特征认证（人脸识别/声纹验证）
- 实时直播/远程协助
- 语音输入与处理（配合 Web Speech API）

### 核心概念

- **媒体流 (MediaStream)**
  - 是多个轨道的容器，用于组合、传输音视频数据
- **媒体轨道 (MediaStreamTrack)**
  - 代表单个媒体源的数据通道，如摄像头的视频流 `video` 或麦克风的音频流 `audio`

### MediaStream 对象

- **属性**
  - **`id`** 由浏览器自动分配，开发者不可修改
  - **`active`** 只读，当流中至少存在一个未终止（`ended=false`）的轨道时为 `true`
- **方法**
  - **`addTrack()`** 将轨道添加到流中（同一轨道可属于多个流）
    - `(track: MediaStreamTrack): void`
  - **`removeTrack()`** 从流中移除指定轨道（仅移除引用，不会终止轨道）
    - `(track: MediaStreamTrack): void`
  - **`getTracks()`** 返回流中所有轨道的副本数组（修改此数组不影响原流）
    - `(): MediaStreamTrack[]`
  - **`getTrackById()`** 根据轨道 `id` 查找并返回对应轨道，未找到返回 `null`
    - `(id: string): MediaStreamTrack | null`
  - **`getAudioTracks()`** 返回所有音频轨道的副本数组
    - `(): MediaStreamTrack[]`
  - **`getVideoTracks()`** 返回所有视频轨道的副本数组
    - `(): MediaStreamTrack[]`
  - **`clone()`** 创建一个新流，包含原流的所有轨道（浅拷贝，与原流共享轨道对象）
    - `(): MediaStream`
- **事件**
  - **`onaddtrack`** 新轨道被添加到流中（如调用 `addTrack()`）
  - **`onremovetrack`** 轨道从流中移除（如调用 `removeTrack()`）

### MediaStreamTrack 对象

- **属性**
  - **`id`** 由浏览器自动分配，开发者不可修改
  - **`kind`** 轨道的媒体类型，值为 `"audio"` 或 `"video"`，只读
  - **`label`** 轨道来源的标签（如设备名称），可能为空字符串（受隐私限制），只读
  - **`readyState`** 轨道的活动状态：`"live"` 轨道正在传输数据; `"ended"` 轨道已终止
  - **`enabled`** 控制轨道是否有效：`true` 允许传输数据（默认值）; `false` 静音轨道
  - **`muted`** 只读，表示轨道是否被静音
- **方法**
  - **`applyConstraints()`** 动态调整轨道参数（如分辨率、帧率），失败时触发 `OverconstrainedError`
    - `(constraints: MediaTrackConstraints): Promise<void>`
  - **`getCapabilities()`** 返回设备支持的配置范围（如支持的宽高、帧率范围）
    - `(): MediaTrackCapabilities`
  - **`getConstraints()`** 返回当前应用的约束条件（开发者设置的参数）
    - `(): MediaTrackConstraints`
  - **`getCaptureHandle()`** 返回屏幕共享的句柄信息（仅在屏幕共享轨道中有效）
    - `(): MediaStreamTrackCaptureHandle`
  - **`getSettings()`** 返回实际生效的配置（如当前分辨率 `width: 1280`）
    - `(): MediaTrackSettings`
  - **`stop()`** 永久终止轨道（触发 `readyState` 变为 `"ended"` 和 `ended` 事件）
    - `(): void`
- **事件**
  - **`onended`** 触发条件：轨道终止（调用 `stop()` 或设备断开）
  - **`onmute`** 触发条件：轨道被静音（如设备硬件关闭）
  - **`onunmute`** 触发条件：轨道恢复非静音状态（如设备重新连接）

### 代码示例

```js
// 获取默认媒体流
const stream = await navigator.mediaDevices.getUserMedia({
  video: {
    width: { ideal: 1280 },
    facingMode: 'user',
  },
  audio: {
    noiseSuppression: true,
    echoCancellation: true,
  },
})
const video = document.querySelector('video')
video.srcObject = stream
```

:::details 设备枚举与切换

```js
// 获取所有媒体设备
async function getDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices()
  const cameras = devices.filter((d) => d.kind === 'videoinput')
  const mics = devices.filter((d) => d.kind === 'audioinput')

  return { cameras, mics }
}

// 切换摄像头
async function switchCamera(deviceId) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { deviceId: { exact: deviceId } },
  })
  videoElement.srcObject = stream
}
```

:::

:::details 动态调整约束

```js
// 修改分辨率
function setResolution(width, height) {
  const videoTrack = stream.getVideoTracks()[0]
  videoTrack.applyConstraints({
    width: { ideal: width },
    height: { ideal: height },
  })
}

// 切换摄像头方向
function toggleFacingMode() {
  const constraints = {
    facingMode: currentMode === 'user' ? 'environment' : 'user',
  }
  videoTrack.applyConstraints(constraints)
}
```

:::

:::details 流生命周期管理

```js
// 停止所有轨道
function stopStream() {
  stream.getTracks().forEach((track) => {
    track.stop() // 释放硬件设备
    track.enabled = false
  })
  videoElement.srcObject = null
}

// 单独禁用视频
function toggleVideo() {
  const videoTrack = stream.getVideoTracks()[0]
  videoTrack.enabled = !videoTrack.enabled
}
```

:::

:::warning 注意事项

- **安全要求**：必须在 HTTPS 或 localhost 环境下使用
- **兼容性处理**：`!navigator.mediaDevices?.getUserMedia && alert('当前浏览器不支持WebRTC')`
- **页面卸载时自动释放设备**

  ```js
  window.addEventListener('beforeunload', () => {
    stream?.getTracks().forEach((track) => track.stop())
  })
  ```

- 优先使用默认配置（`video: true`/`audio: true`）
- 使用 `ideal` 值避免约束冲突

:::

### 在线运行

:::demo
base/js/WebRTC/getUserMedia
:::

## 二、RTCPeerConnection <Sound word="RTCPeerConnection"/>

> P2P连接管理：处理信令、网络协商和数据传输。建立和维护端到端连接的核心API

### 核心概念

- **ICE（Interactive Connectivity Establishment）**
  - 核心目标：自动选择最优传输路径的框架
  - 候选类型：
    - Host Candidate：本地 IP 地址（仅局域网内有效）
    - Server-Reflexive Candidate：通过 STUN 获取的公网映射地址
    - Relayed Candidate：通过 TURN 服务器中继的地址
  - 工作流程：收集候选 → 交换候选 → 连通性测试 → 选择最佳路径
- **SDP（Session Description Protocol）**
  - 核心目标：协商双方媒体能力（编解码器、分辨率、传输协议等）
- **信令服务器**
  - 核心目标：协调连接建立，传递 SDP 和 ICE 候选（通常基于 WebSocket/HTTP）
  - 关键特性：协议无关性、临时性
- **STUN**
  - 核心目标：获取客户端的公网 IP:Port 映射

### 工作流程

- **阶段 1：创建 `RTCPeerConnection`**
  ```js
  const pc = new RTCPeerConnection({
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      {
        urls: 'turn:your-turn-server.com:5349',
        username: 'your-username',
        credential: 'your-password',
      },
    ],
  })
  ```
- **阶段 2：媒体流采集**

  ```js
  // 客户端A/B 均需在创建 Offer/Answer 前采集媒体流
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  })
  stream.getTracks().forEach((track) => pc.addTrack(track, stream))
  ```

- **阶段 3：SDP 创建与交换**

  - 客户端A

    ```js
    // 创建 Offer
    const offer = await pc.createOffer()
    // 并设置本地 SDP 描述，触发 ICE 候选收集
    await pc.setLocalDescription(offer)

    // 发送 Offer（通过信令服务器）
    ws.send(
      JSON.stringify({
        type: 'signal',
        target: targetUserId,
        data: { sdp: offer },
      }),
    )
    ```

  - 客户端B

    ```js
    // 接收 Offer
    ws.onmessage = async ({ data }) => {
      const { type, sender: targetUserId, data } = JSON.parse(data)

      // 如果没有pc需要创建……

      if (type === 'signal' && data.sdp) {
        // 设置远程 SDP 描述
        await pc.setRemoteDescription(data.sdp)

        if (data.sdp.type === 'offer') {
          // 创建 Answer
          const answer = await pc.createAnswer()
          // 设置本地 SDP 描述，触发 ICE 候选收集
          await pc.setLocalDescription(answer)

          ws.send(
            JSON.stringify({
              type: 'signal',
              target: targetUserId,
              data: { sdp: answer },
            }),
          )
        }
      }
    }
    ```

  - 客户端A

    ```js
    // 接收 Answer
    ws.onmessage = async ({ data }) => {
      const { type, sender: targetUserId, data } = JSON.parse(data)

      if (type === 'signal' && data.sdp) {
        await pc.setRemoteDescription(data.sdp) // 设置远程 SDP 描述
      }
    }
    ```

- **阶段 4：ICE 候选收集（需探测网络接口、查询 STUN/TURN 服务器）**

  - 客户端A/B 发送 ICE 候选

    ```js
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        ws.send(
          JSON.stringify({
            type: 'signal',
            target: targetUserId,
            data: { ice: event.candidate },
          }),
        )
      }
    }
    ```

  - 客户端B/A 接收 ICE 候选

    ```js
    ws.onmessage = async ({ data }) => {
      const { type, sender: targetUserId, data } = JSON.parse(data)

      if (type === 'signal' && data.ice) {
        await pc.addIceCandidate(data.ice)
      }
    }
    ```

### RTCPeerConnection 对象

:::details 属性

- **`connectionState`** 连接状态
  - `new` 初始状态
  - `connecting` 正在建立连接
  - `connected` 连接成功
  - `disconnected` 网络中断
  - `failed` 连接失败
  - `closed` 连接已关闭
- **`iceConnectionState`** ICE 连接状态
  - `new` 初始状态
  - `checking` 检查中
  - `connected` 连接成功
  - `completed` 连接完成
  - `disconnected` 网络中断
  - `failed` 连接失败
  - `closed` 连接已关闭
- **`signalingState`** 信令协商状态
  - `stable` 空闲状态
  - `have-local-offer` 本地已生成 Offer
  - `have-remote-offer` 收到远程 Offer
  - `have-local-pranswer` 本地生成临时 Answer
  - `have-remote-pranswer` 收到临时 Answer
- **`currentLocalDescription`**: 本地 SDP 描述（Offer/Answer）
- **`currentRemoteDescription`**: 远程 SDP 描述（Offer/Answer）

:::

:::details 方法

- **`addTrack()`** 添加本地媒体轨道（音频/视频）到连接中，返回发送器实例
  - `(track: MediaStreamTrack, ...stream: MediaStream)` → `RTCRtpSender`
- **`createOffer()`** 创建 SDP Offer，描述本地媒体能力（编解码器、分辨率等）
  - `(options?: RTCOfferOptions)` → `Promise<RTCSessionDescription>`
- **`createAnswer()`** 创建 SDP Answer，响应远程 Offer（仅在收到 Offer 后调用）
  - `(options?: RTCAnswerOptions)` → `Promise<RTCSessionDescription>`
- **`setLocalDescription()`** 设置本地 SDP 描述（通常在 `createOffer` 或 `createAnswer` 后调用）
  - `(description: RTCLocalSessionDescriptionInit)` → `Promise<void>`
- **`setRemoteDescription()`** 设置远程 SDP 描述（触发 ICE 候选收集和媒体协商）
  - `(description: RTCLocalSessionDescriptionInit)` → `Promise<void>`
- **`addIceCandidate()`** 添加远程 ICE 候选地址（通过信令服务器传递的候选路径）
  - `(candidate: RTCIceCandidateInit)` → `Promise<void>`
- **`close()`** 终止连接并释放所有资源（媒体轨道需手动关闭）
  - `()` → `void`
- **`createDataChannel()`** 创建数据通道
  - `(label: string, options?: RTCDataChannelInit)` → `RTCDataChannel`

:::

:::details 事件

- **`onicecandidate`** `RTCPeerConnection` 创建后，发现新的 ICE 候选地址时
- **`ontrack`** 接收到远程媒体流时（如对方开启摄像头/麦克风）
- **`onconnectionstatechange`** 全局连接状态（`connectionState`）变化时
- **`oniceconnectionstatechange`** ICE 连接状态（`iceConnectionState`）变化时
- **`onnegotiationneeded`** 需要重新协商媒体参数时（如新增/移除轨道）
- **`onsignalingstatechange`** 信令状态（`signalingState`）变化时

:::

### 代码示例

演示需要后台服务

:::details 信令服务器

```js
const fs = require('fs')
const path = require('path')
const https = require('https')
const { WebSocket, WebSocketServer } = require('ws')
const { v4: uuidv4 } = require('uuid')

// 证书配置
const server = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'certs/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs/cert.pem')),
})

// 房间数据结构
const rooms = new Map() // Map<roomId, Map<userId, WebSocket>>
global.rooms = rooms
// WebSocket 服务配置
const wss = new WebSocketServer({ server })

// 心跳检测配置
const HEARTBEAT_INTERVAL = 30000 // 30秒
const CONNECTION_TIMEOUT = 60000 // 60秒

wss.on('connection', (ws) => {
  let heartbeat = null
  let timeout = null
  const connectionId = uuidv4()
  let currentRoom = null
  let userId = null

  // 心跳机制
  const resetTimeout = () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      console.log(`连接 ${connectionId} 超时断开`)
      ws.terminate()
    }, CONNECTION_TIMEOUT)
  }

  // 初始化连接
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString())

      switch (message.type) {
        // 处理身份认证
        case 'auth':
          userId = message.userId || uuidv4()
          currentRoom = message.roomId

          if (!rooms.has(currentRoom)) {
            rooms.set(currentRoom, new Map())
          }

          const room = rooms.get(currentRoom)
          if (room.size >= 10) {
            ws.send(
              JSON.stringify({
                type: 'error',
                message: '房间已满（最大10人）',
              }),
            )
            ws.close()
            return
          }

          room.set(userId, ws)

          // 通知现有用户
          broadcastToRoom(currentRoom, {
            type: 'user-joined',
            userId,
            existingUsers: Array.from(room.keys()).filter(
              (id) => id !== userId,
            ),
          })

          // 发送连接确认
          ws.send(
            JSON.stringify({
              type: 'auth-success',
              userId,
              roomId: currentRoom,
              existingUsers: Array.from(room.keys()),
            }),
          )

          // 启动心跳
          heartbeat = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.ping()
            }
          }, HEARTBEAT_INTERVAL)

          resetTimeout()

          break
        // 处理信令消息
        case 'signal':
          const targetUser = rooms.get(currentRoom)?.get(message.target)
          if (targetUser && targetUser.readyState === WebSocket.OPEN) {
            targetUser.send(
              JSON.stringify({
                type: 'signal',
                sender: userId,
                data: message.data, // 包含 sdp/ice
              }),
            )
          }

          break
      }
    } catch (error) {
      console.error('消息处理失败:', error)
    }
  })

  // 连接关闭处理
  ws.on('close', () => {
    clearInterval(heartbeat)
    clearTimeout(timeout)

    if (currentRoom && rooms.has(currentRoom)) {
      const room = rooms.get(currentRoom)
      room.delete(userId)

      if (room.size === 0) {
        rooms.delete(currentRoom)
      } else {
        // 通知其他用户
        broadcastToRoom(currentRoom, {
          type: 'user-left',
          userId,
        })
      }
    }
  })

  // 心跳响应
  ws.on('pong', resetTimeout)
})

// 房间广播工具函数
function broadcastToRoom(roomId, message) {
  const room = rooms.get(roomId)
  if (!room) return

  room.forEach((client, uid) => {
    if (uid !== message.userId && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message))
    }
  })
}

// 启动服务
const PORT = 8080
server.listen(PORT, () => {
  console.log(`信令服务运行在 wss://localhost:${PORT}`)
})
```

:::

:::demo
base/js/WebRTC/RTCPeerConnection
:::

## 三、RTCDataChannel <Sound word="RTCDataChannel"/>

> 数据通道：不参与媒体传输，独立传输任意二进制数据（SCTP over DTLS 协议）

### 核心特性

- **传输模式控制**
  - 有序传输（`ordered: true`）
  - 可靠/不可靠传输（`maxRetransmits` 或 `maxPacketLifeTime`）
- **多通道支持**
  - 单连接可创建多个独立通道（最多65534个）
  - 支持标签分类（`label` 属性）
- **协议灵活性**
  - 传输任意二进制数据（Blob/ArrayBuffer）
  - 支持自定义子协议（`protocol` 字段）
- **流量控制**
  - 内置拥塞控制机制
  - `bufferedAmount` 监控发送队列
- **低延迟优化**
  - 默认使用SCTP over DTLS
  - 优先级配置（实验性 `priority` 属性）

### 应用场景

- 实时游戏状态同步
- 大文件分片传输
- 即时消息聊天系统
- 远程设备控制指令传输
- 分布式计算数据交换

### RTCDataChannel 对象

:::details 属性

- **`id`** （`number`）通道的唯一标识符（只读，由浏览器自动分配）
- **`label`** （`string`）用户自定义的通道标签（只读）`const dc = pc.createDataChannel("chat")`
- **`binaryType`** （`"blob"` | `"arraybuffer"`）设置或获取接收二进制数据的类型 （可写）
- **`bufferedAmount`** （`number`）当前缓冲区中未发送的字节数（只读）
- **`bufferedAmountLowThreshold`** （`number`）触发 `onbufferedamountlow` 事件的阈值
- **`maxPacketLifeTime`** （`number` | `null`）数据包最大存活时间（毫秒），用于不可靠传输模式
- **`maxRetransmits`** （`number` | `null`）数据包最大重传次数，用于不可靠传输模式
- **`negotiated`** （`boolean`）是否通过外部协商建立通道（避免 SDP 交换）
- **`onbufferedamountlow`** （`Function` | `null`）当 `bufferedAmount` 低于阈值时触发的事件回调
- **`ordered`** （`boolean`）是否保证数据包按序到达
- **`protocol`** （`string`）自定义子协议名称（类似 WebSocket 子协议）
- **`readyState`** （`"connecting"` | `"open"` | `"closing"` | `"closed"`）通道的当前状态（只读）
- **`reliable`** （`boolean`）是否启用可靠传输（已弃用，用 `ordered` 和 `maxRetransmits` 替代）

:::
:::details 方法

- **`send()`** 通过通道发送数据（支持多种格式）
  - `(string | Blob | ArrayBuffer | ArrayBufferView): void`
- **`close()`** 主动关闭通道
  - `(): void`

:::
:::details 事件

- **`onbufferedamountlow`** 当 `bufferedAmount` 降至 `bufferedAmountLowThreshold` 以下时触发
- **`onclose`** 通道完全关闭后触发
- **`onclosing`** 通道开始关闭时触发（`close()` 调用后）
- **`onerror`** 通道发生错误时触发
- **`onmessage`** 接收到对方发送的数据时触发
- **`onopen`** 通道成功建立连接时触发

:::

### 代码示例

- 创建通道

```js
// 1. 创建 DataChannel（发起方）
const pc = new RTCPeerConnection(config) // 已成功连接的 RTCPeerConnection 实例
const dc = pc.createDataChannel('chat', {
  ordered: true, // 消息是否按序到达（默认 true）
  maxRetransmits: 3, // 最大重传次数（影响可靠性）
})

// 2. 监听 DataChannel 打开事件
dc.onopen = () => {
  console.log('DataChannel 已连接！')
  dc.send('Hello from 发起方！') // 发送消息
}

// 3. 接收对方消息
dc.onmessage = (event) => {
  console.log('收到消息：', event.data)
}

// 4. 错误处理
dc.onerror = (error) => {
  console.error('DataChannel 错误：', error)
}
```

:::details 大文件分片传输

发送端

```js
// 功能：将大文件分块通过 DataChannel 发送
async function sendFile(file) {
  const CHUNK_SIZE = 16384 // 16KB（符合 DataChannel 单消息建议大小）
  const reader = file.stream().getReader() // 使用流式 API 读取文件

  while (true) {
    // 逐块读取文件内容
    const { done, value } = await reader.read()
    if (done) break // 读取完成退出循环

    // 流量控制：防止发送速度超过网络处理能力
    while (dc.bufferedAmount > 1024 * 1024) {
      // 当缓冲区 > 1MB 时暂停
      // 每 100ms 检查一次缓冲区状态（避免阻塞主线程）
      await new Promise((r) => setTimeout(r, 100))
    }

    // 发送二进制数据（value 是 Uint8Array，取其底层 ArrayBuffer）
    dc.send(value.buffer) // 注意：此处假设 DataChannel 配置为可靠模式
  }

  // 优化建议：可在此发送结束标志通知接收方
}
```

接收端

```js
let receivedBuffers = [] // 存储接收到的所有数据块
let receivedCount = 0 // 计数器（用于触发合并操作）

dc.onmessage = ({ data }) => {
  // 收集二进制数据块
  receivedBuffers.push(data)
  receivedCount++

  // 每接收 100 个数据块合并一次（平衡实时性和内存占用）
  if (receivedCount % 100 === 0) {
    // 创建 Blob 并生成临时下载链接
    const blob = new Blob(receivedBuffers, { type: 'application/octet-stream' })
    downloadAnchor.href = URL.createObjectURL(blob)
    downloadAnchor.download = 'received_file' // 默认文件名

    // 清空已合并的缓冲区（重要：防止内存泄漏）
    receivedBuffers = []
  }
}
```

:::

:::warning 注意事项

- **通道创建时机**：必须在RTCPeerConnection建立前创建（`negotiated: false`时）
- **消息大小限制**：单条消息最大256KB（不同浏览器可能不同）
- **传输可靠性选择**
  ```js
  // 不可靠模式配置
  { ordered: false, maxRetransmits: 0 }  // 最佳效果传输
  { ordered: true, maxPacketLifeTime: 1000 } // 有限时间可靠传输
  ```
- **二进制传输优化**
  - 优先使用ArrayBuffer代替Blob
  - 使用分片机制处理大文件
- **安全加密**：默认使用DTLS加密，无需额外配置
- **流量控制**：监控bufferedAmount避免内存溢出
  ```js
  function safeSend(data) {
    return new Promise((resolve) => {
      if (dc.bufferedAmount < 1024 * 1024) {
        dc.send(data)
        resolve()
      } else {
        const check = () => {
          if (dc.bufferedAmount < 1024 * 1024) {
            dc.send(data)
            resolve()
          } else {
            setTimeout(check, 100)
          }
        }
        check()
      }
    })
  }
  ```
- **浏览器差异处理**：Safari对非可靠通道支持有限
- **通道关闭顺序**：先关闭DataChannel再关闭PeerConnection

:::

### DataChannel vs fetch

| 特性             | DataChannel                                              | fetch                                                           |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------- |
| **传输方式**     | P2P直连（需通过信令服务器协商）                          | 客户端-服务器模型（HTTP请求-响应）                              |
| **延迟**         | 10-100ms（依赖NAT穿透，穿透失败时通过TURN中继延迟增加）  | 100ms-1s+（受网络波动和服务端处理影响，HTTP/3可优化至50-300ms） |
| **连接建立**     | 需信令服务器交换SDP + STUN/TURN穿透（10%-15%需TURN中继） | 直接通过DNS + TCP/TLS建立连接（无需额外协议）                   |
| **数据传输协议** | SCTP（面向消息，支持有序/无序、可靠/不可赖配置）         | HTTP/TCP（面向流，严格有序可靠，需手动处理消息边界）            |
| **典型应用场景** | 实时游戏同步、音视频补充信道、P2P文件分片传输            | RESTful API交互、静态资源加载、表单提交                         |
| **浏览器兼容性** | 需支持WebRTC（iOS 14.4+、Android 5+、主流桌面浏览器）    | 近乎全平台支持（包括旧版浏览器和Service Workers）               |
| **安全性**       | 默认DTLS加密，信令通道需额外保护（如WSS + Token鉴权）    | 依赖HTTPS + CORS，基础设施成熟                                  |
| **扩展成本**     | P2P节省服务器带宽，但TURN中继可能产生流量费用            | 需考虑服务器负载和CDN成本，适合中心化架构                       |
| **开发复杂度**   | 高（需处理ICE状态机、SDP协商、数据传输模式配置）         | 低（标准化API，开箱即用）                                       |
