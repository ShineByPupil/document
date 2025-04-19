const detectStorageQuota = (isLocal = true) =>
  new Promise((resolve) => {
    const TEST_KEY = '__QUOTA_TEST__'
    let totalBytes = 0
    let chunkSize = 1024 * 1024 // 初始1MB大块
    let isPrecisionMode = false
    const startTime = performance.now()
    const Storage = isLocal ? localStorage : sessionStorage

    Storage.clear()

    const fillStorage = () => {
      try {
        const data = new Array(chunkSize).fill('0').join('')
        const currentValue = Storage.getItem(TEST_KEY) || ''

        // 容量预测算法：当剩余空间可能不足时切换模式
        if (
          !isPrecisionMode &&
          currentValue.length + data.length > 5 * 1024 * 1024
        ) {
          chunkSize = 1024 // 降级到1KB精度模式
          isPrecisionMode = true
        }

        Storage.setItem(TEST_KEY, currentValue + data)
        totalBytes += data.length

        // 使用RAF优化循环性能
        setTimeout(fillStorage, 0)
      } catch (e) {
        console.error(e)
        if (!isPrecisionMode && chunkSize > 1024) {
          // 大块填充失败时进入精度校准
          chunkSize = Math.floor(chunkSize / 2)
          isPrecisionMode = true
          setTimeout(fillStorage, 0)
        } else if (chunkSize >= 100) {
          // 最小分片100字节
          chunkSize = Math.floor(chunkSize / 2)
          setTimeout(fillStorage, 0)
        } else {
          // 最终结果校准
          const precision = 10 // 最终10字节级校准
          try {
            const lastData = new Array(precision).fill('0').join('')
            Storage.setItem(TEST_KEY, Storage.getItem(TEST_KEY) + lastData)
            totalBytes += precision
          } catch (e) {} // 忽略最终错误

          localStorage.clear()

          resolve({
            totalBytes: totalBytes - chunkSize, // 回退到最后一个成功值
            timeCost: performance.now() - startTime,
            chunks: chunkSize,
            precisionMode: isPrecisionMode,
          })
        }
      }
    }

    // 初始化环境
    fillStorage()
  })

// 使用示例
detectStorageQuota().then((result) => {
  console.log(`检测完成，耗时 ${result.timeCost.toFixed(2)}ms`)
  console.log(`总容量：${(result.totalBytes / 1024 / 1024).toFixed(2)}MB`)
  console.log(`检测模式：${result.precisionMode ? '精准模式' : '快速模式'}`)
})
