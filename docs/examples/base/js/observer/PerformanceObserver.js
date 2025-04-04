// 创建性能观察实例
const po = new PerformanceObserver((list) => {
  const entries = list.getEntries()
  entries.forEach((entry) => {
    console.log(`性能条目 [${entry.entryType}]: `, entry)
  })
})

// 配置观察类型
const types = [
  'paint', // 关键时间点（FP/FCP）
  'resource', // 资源加载
  'longtask', // 长任务（>50ms）
  'navigation', // 页面导航
  'first-input', // 首次用户输入延迟
]

// 开始观察
po.observe({ entryTypes: types })

// 高级用法：获取历史数据
po.observe({
  type: 'paint',
  buffered: true, // 获取已存在的性能条目
})

// 自定义指标示例（LCP监测）
const lcpObserver = new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries()
  const lastEntry = entries[entries.length - 1]
  console.log('LCP:', lastEntry.startTime)
})
lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

// 停止观察
po.disconnect()
