# SharedWorker

> 浏览器提供的跨页面共享的后台线程技术，允许多个浏览器上下文（不同标签页、iframe、窗口）共享同一个 JavaScript
> 运行环境。适用于需要长期维持状态或协调多页面协作的场景，是 `WebWorker` 的高级形态。

## 核心特性

1. 多页面共享实例。同源下的多个页面可连接同一个 SharedWorker 实例
2. 独立生命周期。线程持续运行直至所有关联页面关闭
3. 端口通信机制。通过 MessagePort 建立双向通信管道
4. 共享内存支持。结合 SharedArrayBuffer 实现跨线程内存共享
5. 后台持续运行。即使所有页面关闭，仍可保持短暂存活（浏览器实现相关）

## 应用场景

1. 多标签页状态共享。维持全局应用状态（如登录凭证、主题配置）
2. 跨页面资源池管理。共享 WebSocket 连接或 IndexedDB 连接池
3. 后台定时任务协调。统一调度多个页面的定时请求（如数据同步）
4. 复杂计算资源共享。多个页面共享 WASM 计算模块或机器学习模型
5. 跨页面消息枢纽。实现广播/组播消息的中继转发

## 基础语法

### 创建共享线程

```js
// shared-worker.js
const connections = []

// 新连接建立时触发
onconnect = function (e) {
  const port = e.ports[0]
  connections.push(port)

  // 消息处理器
  port.onmessage = function (event) {
    // 广播消息到所有连接页面
    connections.forEach((conn) => {
      if (conn !== port) {
        conn.postMessage({
          from: event.data.clientId,
          message: event.data.text,
        })
      }
    })
  }

  // 初始化连接
  port.postMessage({ type: 'CONNECTED', workerId: self.workerId })
}
```

### 页面连接使用

```js
// 创建共享线程连接
const worker = new SharedWorker('shared-worker.js')
let clientId = crypto.randomUUID()

// 通过 port 通信
worker.port.onmessage = function (e) {
  if (e.data.type === 'CONNECTED') {
    console.log('Connected to worker:', e.data.workerId)
  } else {
    console.log('Received:', e.data.message)
  }
}

// 发送聊天消息
document.querySelector('#sendBtn').addEventListener('click', () => {
  worker.port.postMessage({
    clientId: clientId,
    text: document.querySelector('#input').value,
  })
})

// 显式打开端口连接
worker.port.start()
```

### 共享状态管理

```js
let sharedState = {
  counter: 0,
  lastUpdated: Date.now(),
}

function updateState(updater) {
  sharedState = { ...sharedState, ...updater() }
  connections.forEach((port) => {
    port.postMessage({
      type: 'STATE_UPDATE',
      state: sharedState,
    })
  })
}

// 示例：定时更新
setInterval(() => {
  updateState(() => ({
    counter: sharedState.counter + 1,
    lastUpdated: Date.now(),
  }))
}, 1000)
```

### 错误处理

```js
worker.onerror = (error) => {
  console.error('SharedWorker 错误:', error.message)
}

worker.port.onmessageerror = (event) => {
  console.error('消息解析失败:', event)
}
```

## 浏览器兼容性提示

```js
if ('SharedWorker' in window) {
  // 支持
} else {
  // 降级方案（如主线程处理）
}
```
