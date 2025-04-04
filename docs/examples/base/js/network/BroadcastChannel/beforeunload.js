window.addEventListener('beforeunload', () => {
  if (currentChannel) {
    // 通知其他客户端
    currentChannel.postMessage({ type: 'CHANNEL_CLOSING' })
    currentChannel.close()
  }
})
