# WebWorker <Sound word="WebWorker"/>

> WebWorker 是浏览器提供的**多线程解决方案**，允许在后台线程中运行脚本。通过将 CPU 密集型任务分流到独立线程，避免阻塞主线程，提升复杂
> Web 应用的响应性能。

## 一、核心特性

- **多线程执行**
  - 独立于主线程运行脚本，避免阻塞 UI 渲染
- **受限环境**
  - 无法直接操作 `DOM`、`window` 或 `document` 对象
- **消息驱动**
  - 通过 `postMessage` 与主线程通信，数据需序列化
- **专用或共享**
  - 支持 `DedicatedWorker`（单页面独享）和 `SharedWorker`（多页面共享）

## 二、应用场景

- **CPU 密集型计算**
  - 图像处理、复杂算法（如加密、物理模拟）
- **后台数据处理**
  - 日志分析、大文件解析
- **实时监控**
  - 高频传感器数据采集（如 WebSocket 流处理）

## 三、代码示例

```js
// 主线程 main.js
const worker = new Worker('worker.js', { type: 'module' })

worker.postMessage({
  type: 'CALC_FIB',
  num: 40,
})

worker.onmessage = (e) => {
  console.log('结果:', e.data)
}

// worker.js
self.onmessage = function (e) {
  if (e.data.type === 'CALC_FIB') {
    const result = fibonacci(e.data.num)
    self.postMessage(result)
  }
}

function fibonacci(n) {
  return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2)
}
```

:::warning 注意事项

1. 频繁的大数据量传递（如巨型数组）会因结构化克隆产生性能损耗

   ```js
   worker.postMessage(buffer, [buffer]) // 转移所有权，零拷贝
   ```

2. 兼容性与作用域
   - Worker 内无法访问 `document`、`window`、`localStorage`（但支持 `IndexedDB`、`WebSockets`）
   - 存在同源策略限制
3. 错误处理 `worker.onerror` 捕获 Worker 内部异常，避免静默失败

:::
