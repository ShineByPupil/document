// 页面A：创建频道并发送消息
const channelA = new BroadcastChannel('app_channel')
channelA.postMessage({
  type: 'USER_UPDATE',
  data: { id: 123, name: 'Alice' },
})

// 页面B：订阅相同频道
const channelB = new BroadcastChannel('app_channel')
channelB.onmessage = (event) => {
  if (event.data.type === 'USER_UPDATE') {
    updateUserProfile(event.data.data)
  }
}

// 页面C：使用事件监听器
const channelC = new BroadcastChannel('app_channel')
channelC.addEventListener('message', (event) => {
  console.log('收到广播消息:', event.data)
})
