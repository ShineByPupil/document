# EventSource <Sound word="EventSource"/>

> 实现服务器推送事件（Server-Sent Events，SSE）的浏览器 API，基于 HTTP 长连接实现单向实时通信（服务端 →
> 客户端）。采用纯文本协议，支持自动重连，是构建实时应用的轻量化解决方案。

## 核心特性

1. 单向实时通道。服务端主动推送更新，客户端无法反向发送数据
2. 自动重连机制。网络中断时自动尝试重新建立连接（默认3秒重试）
3. 简单文本协议。数据格式为纯文本流（text/event-stream），易调试实现
4. 原生事件驱动。支持自定义事件类型，通过标准 EventListener 处理
5. HTTP 兼容性。复用现有 HTTP 基础设施，无特殊协议要求

## 应用场景

1. 实时通知系统。站内消息提醒、邮件到达通知推送
2. 金融行情播报。股票价格、加密货币汇率实时更新
3. 新闻直播流。突发新闻的持续滚动更新推送
4. 物联网状态监控。设备温度、电量等指标的实时展示
5. 社交媒体动态。朋友圈点赞/评论的实时同步

## 基础语法

```js
// 1. 创建事件源连接
const eventSource = new EventSource('/sse-endpoint')

// 2. 监听默认消息事件
eventSource.onmessage = (e) => {
  console.log('收到消息:', e.data)
}

// 3. 监听自定义事件类型
eventSource.addEventListener('stockUpdate', (e) => {
  const data = JSON.parse(e.data)
  updateStockChart(data)
})

// 4. 错误处理（含自动重连）
eventSource.onerror = () => {
  console.log('连接异常，尝试重连中...')
  // eventSource.close() 可手动关闭
}

// 5. 自定义配置（示例：携带认证信息）
const authSource = new EventSource('/private-events', {
  withCredentials: true, // 发送 cookies
})
```

## 浏览器兼容性提示

```js
if ('EventSource' in window) {
  // 启用 SSE 功能
} else {
  // 降级方案（如长轮询）
}
```

## 服务端示例

```js
app.get('/sse-endpoint', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  // 定时推送
  const timer = setInterval(() => {
    res.write(`data: ${JSON.stringify({ time: Date.now() })}\n\n`)
  }, 1000)

  // 连接关闭时清理
  req.on('close', () => clearInterval(timer))
})
```
