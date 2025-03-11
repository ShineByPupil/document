# Web Workers

> Web Workers 是浏览器提供的**多线程解决方案**，允许在后台线程中运行脚本。通过将 CPU 密集型任务分流到独立线程，避免阻塞主线程，提升复杂
> Web 应用的响应性能。

## 核心特性

1. **独立上下文**：运行在全局 DedicatedWorkerGlobalScope 环境
2. **消息通信**：通过 postMessage/onmessage 与主线程交互
3. **无 DOM 访问**：无法直接操作 DOM 或访问 window 对象
4. **模块支持**：现代浏览器支持 ES Module（需设置 type: "module"）
5. **线程类型**：专用线程（Dedicated）和共享线程（Shared）

## 应用场景

1. 大数据集解析/转换
2. 复杂数学计算（如加密算法）
3. 图像/视频处理
4. 实时数据分析（如股票行情）
5. 游戏物理引擎计算

## 代码示例

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
