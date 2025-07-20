# MessageChannel <Sound word="MessageChannel"/>

> 浏览器提供的双向通信管道创建工具，可生成一对互联的 MessagePort 对象。主要用于不同 JavaScript 执行上下文（如
> iframe/Worker/不同脚本）间的直接通信，为模块化架构提供安全可控的数据通道。

## 核心特性

1. 双向通信能力。每个通道包含 port1/port2 两个端口，支持双向独立通信
2. 零拷贝传输。通过端口直接传递消息，不经过主线程序列化（与 postMessage 协同）
3. 上下文隔离。通道两端运行在独立环境，天然防止变量污染
4. 微任务队列优化。消息传递使用微任务队列，确保时序一致性
5. 轻量级资源占用。通道仅在活跃时消耗资源，无持续性能开销

## 应用场景

1. iframe 父子通信。安全可控的跨文档消息传递
2. `WebWorker` 指令传输。主线程与 Worker 间的精准消息路由
3. 微前端事件总线。子应用间隔离通信的底层实现
4. 高性能插件系统。沙盒化插件与宿主应用的安全交互
5. React 渲染协调。React 内部调度器使用 MessageChannel 实现时间分片

## 基本用法

### 基础通道创建

```js
// 创建通信管道
const channel = new MessageChannel()

// 端口1监听消息
channel.port1.onmessage = (event) => {
  console.log('Port1 收到:', event.data)
  channel.port1.postMessage('Response from Port1')
}

// 端口2发送初始消息
channel.port2.postMessage('Hello from Port2')
channel.port2.onmessage = (event) => {
  console.log('Port2 收到响应:', event.data)
}

// 必须显式启动端口
channel.port1.start()
channel.port2.start()
```

### 跨文档通信实现

```js
<!-- 主页面 -->
<iframe src="child.html" id="child"></iframe>
<script>
    const iframe = document.getElementById('child');
    const channel = new MessageChannel();

    // 将 port2 传递给 iframe
    iframe.contentWindow.postMessage('INIT', '*', [channel.port2]);

    // 使用 port1 通信
    channel.port1.onmessage = (e) => {
    console.log('来自子页面的消息:', e.data);
};
    channel.port1.postMessage('主页面就绪');
</script>

<!-- 子页面 child.html -->
<script>
    window.addEventListener('message', (e) => {
    if (e.data === 'INIT') {
    const [port] = e.ports;
    port.onmessage = (e) => {
    console.log('子页面收到:', e.data);
    port.postMessage('子页面确认');
};
    port.start();
}
});
</script>
```

### Worker 精准通信

```js
// 主线程
const worker = new Worker('worker.js')
const channel = new MessageChannel()

// 发送 port2 给 Worker
worker.postMessage('SETUP', [channel.port2])

channel.port1.onmessage = (e) => {
  console.log('Worker 计算结果:', e.data)
}
channel.port1.postMessage({ task: 'CALC', data: 42 })

// worker.js
self.onmessage = (e) => {
  if (e.data === 'SETUP') {
    const [port] = e.ports
    port.onmessage = (e) => {
      if (e.data.task === 'CALC') {
        const result = e.data.data * 2
        port.postMessage(result)
      }
    }
    port.start()
  }
}
```

### 性能监控管道

```js
// 创建专用监控通道
const perfChannel = new MessageChannel()

// 业务端口
perfChannel.port1.onmessage = (e) => {
  performance.mark(`task_${e.data.id}_end`)
  const measure = performance.measure(
    `task_${e.data.id}`,
    `task_${e.data.id}_start`,
    `task_${e.data.id}_end`,
  )
  console.log('任务耗时:', measure.duration)
}

// 业务代码中埋点
function criticalTask() {
  performance.mark('task_001_start')
  perfChannel.port2.postMessage({ id: '001' })
  // ...执行任务
}
```

## 浏览器兼容性提示

```js
// 兼容性检测
if ('MessageChannel' in window) {
  // 使用原生实现
} else {
  // 使用 setTimeout 模拟（功能受限）
}
```
