// 1. 创建 WebSocket 连接
const socket = new WebSocket('wss://example.com/ws')

// 2. 连接建立事件
socket.addEventListener('open', (event) => {
  console.log('连接已建立')
  socket.send('Hello Server!') // 发送文本消息
})

// 3. 接收消息事件
socket.addEventListener('message', (event) => {
  console.log('收到消息:', event.data)
  const data = JSON.parse(event.data)
  updateUI(data) // 更新界面
})

// 4. 发送二进制数据
const buffer = new ArrayBuffer(8)
socket.send(buffer)

// 5. 错误处理与重连
socket.addEventListener('error', (error) => {
  console.error('连接错误:', error)
  setTimeout(connect, 3000) // 3秒后重连
})

// 6. 主动关闭连接
document.getElementById('closeBtn').onclick = () => {
  socket.close(1000, '用户主动断开') // 状态码+原因
}
