# BroadcastChannel

> HTML5 提供的跨页面通信接口，允许同源环境下不同浏览器上下文（标签页/窗口/iframe）直接通信。通过命名管道实现发布-订阅模式，是轻量级页面协同的标准化解决方案。

## 核心特性

1. 同源通信限制。仅允许相同协议/域名/端口的页面间通信
2. 频道命名机制。通过唯一频道名称创建通信管道（如"chat_channel"）
3. 消息广播模式。单条消息自动广播到所有订阅频道的页面
4. 结构化克隆支持。支持传输复杂对象（包括 File/Blob/ArrayBuffer 等）
5. 自动资源回收。页面关闭时自动断开连接，避免内存泄漏

## 应用场景

1. 多标签页状态同步。用户登录态切换/主题模式变更全局通知
2. 跨页面数据更新。商品列表页与详情页的库存实时同步
3. 分布式计算协作。多个页面协同处理大数据集任务
4. 实时仪表盘同步。多窗口展示的监控数据统一刷新
5. 页面集群控制。主控页面批量关闭/刷新子页面

## 代码示例

:::code-group
<<< @/examples/base/js/network/BroadcastChannel/index.js [基础语法]
<<< @/examples/base/js/network/BroadcastChannel/msgType.js [消息类型]
<<< @/examples/base/js/network/BroadcastChannel/toggleChannel.js [动态切换频道]
<<< @/examples/base/js/network/BroadcastChannel/beforeunload.js [安全关闭]
:::

## 浏览器兼容性提示

```js
// 特性检测与降级
if ('BroadcastChannel' in window) {
  // 使用原生 API
} else {
  // 使用 localStorage 事件模拟
  const pseudoChannel = {
    postMessage: (data) => {
      localStorage.setItem('broadcast', JSON.stringify(data))
      localStorage.removeItem('broadcast')
    },
    onmessage: () => {},
  }
  window.addEventListener('storage', (e) => {
    if (e.key === 'broadcast') {
      pseudoChannel.onmessage({ data: JSON.parse(e.newValue) })
    }
  })
}
```
