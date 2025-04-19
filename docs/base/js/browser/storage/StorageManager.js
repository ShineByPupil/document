// 请求持久化存储权限（需用户授权）
navigator.storage.persist().then((persisted) => {
  console.log(`持久化存储 ${persisted ? '已启用' : '被拒绝'}`)
})

// 检查当前是否已启用持久化存储
navigator.storage.persisted().then((persisted) => {
  console.log(`当前存储类型：${persisted ? '持久化' : '临时'}`)
})

// 获取更详细存储类型使用情况
navigator.storage.estimate().then(({ usage, quota, usageDetails }) => {
  console.log(
    `${formatBytes(usage)} / ${formatBytes(quota)} (已用空间 / 总配额)`,
  )
  console.log('详细使用情况：', usageDetails)
})

// 自动将 bytes 转换为合适的单位（Bytes/KB/MB/...）并保留 n 位小数
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
  // 计算当前大小级别（0→Bytes，1→KB，2→MB…）
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  // 除以对应的 1024^i，并保留小数
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
