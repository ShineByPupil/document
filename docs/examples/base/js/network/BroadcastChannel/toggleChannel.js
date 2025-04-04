let currentChannel = null

function handleMessage() {
  // ...
}

function connectChannel(channelName) {
  if (currentChannel) currentChannel.close()
  currentChannel = new BroadcastChannel(channelName)
  currentChannel.onmessage = handleMessage
}

// 初始化默认频道
connectChannel('chat-room')

// 切换到通知频道
setTimeout(() => {
  connectChannel('notification-channel')
}, 5000)
