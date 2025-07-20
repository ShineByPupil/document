# WebTransport

> 基于 HTTP/3 协议的新型 Web API，为浏览器与服务器提供低延迟、双向通信能力。它支持混合传输模式（可靠流与不可靠数据报），旨在替代传统
> WebSocket 和 WebRTC 数据通道，成为现代实时应用的理想选择。

## 核心特性

1. 低延迟传输。基于 QUIC 协议实现，消除 TCP 队头阻塞问题，提升实时性
2. 混合传输模式。同时支持可靠有序的流（Streams）和不可靠无序的数据报（Datagrams）
3. 原生多路复用。单个连接支持多个独立数据通道，避免重复建立连接开销
4. 强安全性。强制使用 TLS 1.3 加密，保障数据传输安全
5. 拥塞控制。智能适应网络状况，自动优化传输效率

## 应用场景

1. 实时游戏。高频状态同步（如 MOBA/FPS 游戏），延迟敏感操作传输
2. 直播互动。弹幕、礼物消息与视频流并行传输，保障实时互动体验
3. IoT 设备控制。大规模设备双向通信，支持指令与传感器数据混合传输
4. AR/VR 应用。实时位姿数据流传输，保障沉浸式体验流畅性
5. 金融交易系统。高频交易指令的可靠传输与市场数据的实时推送

## 基本用法

```js
// 1. 创建连接
const url = 'https://example.com:4433/webtransport'
const transport = new WebTransport(url)

try {
  await transport.ready // 等待连接就绪
  console.log('WebTransport 连接成功')

  // 2. 发送不可靠数据报（UDP-like）
  const writer = transport.datagrams.writable.getWriter()
  await writer.write(new Uint8Array([1, 2, 3]))
  writer.releaseLock()

  // 3. 创建可靠双向流
  const stream = await transport.createBidirectionalStream()
  const readable = stream.readable
  const writable = stream.writable

  // 4. 接收数据
  const reader = readable.getReader()
  const { value, done } = await reader.read()
  console.log('收到数据:', value)

  // 5. 错误处理
  transport.closed
    .then(() => console.log('连接正常关闭'))
    .catch((e) => console.error('异常断开:', e))
} catch (e) {
  console.error('连接失败:', e)
}

// 6. 主动关闭
await transport.close()
```

## 浏览器兼容性提示

```js
if ('WebTransport' in window) {
  // 启用 WebTransport 功能
}
```
