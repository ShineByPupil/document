const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', (ws) => {
  console.log('新客户端连接')

  // 接收客户端消息
  ws.on('message', (data) => {
    console.log('收到客户端数据:', data)
    // 广播给所有客户端
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: 'broadcast',
            content: data.toString(),
          }),
        )
      }
    })
  })

  // 发送心跳包保持连接
  const heartbeat = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.ping()
    }
  }, 30000)

  // 连接关闭处理
  ws.on('close', () => {
    clearInterval(heartbeat)
    console.log('客户端断开')
  })
})
