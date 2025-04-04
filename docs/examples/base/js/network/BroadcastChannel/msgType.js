// 发送带类型标识的消息
broadcastChannel.postMessage({
  __type: 'SYSTEM_ALERT',
  content: '服务器即将维护',
  level: 'warning',
})

// 接收端过滤处理
broadcastChannel.onmessage = (event) => {
  const msg = event.data
  switch (msg.__type) {
    case 'SYSTEM_ALERT':
      showAlert(msg.content, msg.level)
      break
    case 'DATA_REFRESH':
      fetchNewData()
      break
  }
}
