const detectStorageUsage = (useLocalStorage = true) =>
  new Promise((resolve) => {
    const startTime = performance.now()
    const storage = useLocalStorage ? localStorage : sessionStorage
    const maxStorageSize = 5 * 1024 * 1024 // 5MB in bytes

    let usedBytes = 0

    for (const key of Object.keys(storage)) {
      const value = storage.getItem(key)
      usedBytes += key.length + value.length
    }

    const timeElapsed = performance.now() - startTime
    const usagePercentage =
      ((usedBytes / maxStorageSize) * 100).toFixed(2) + '%'

    resolve({
      usedBytes,
      timeElapsed,
      usagePercentage,
    })
  })

// 使用示例
detectStorageUsage().then((result) => {
  console.log(`检测完成，耗时 ${result.timeElapsed.toFixed(2)}ms`)
  console.log(`已用容量：${(result.usedBytes / 1024 / 1024).toFixed(2)}MB`)
  console.log(`使用百分比：${result.usagePercentage}`)
})
