# postMessage <Sound word="postMessage"/>

> 是浏览器提供的跨文档通信 API，实现不同源窗口/Worker之间的安全数据交互。通过结构化克隆算法传递数据，突破同源策略限制，成为现代
> Web 应用跨域通信的基石技术。

## 核心特性

1. 跨域安全通信。通过指定目标 origin 白名单，防止恶意站点窃听
2. 结构化克隆支持。自动序列化复杂对象（包含 `Map`/`Set`/`Blob` 等类型）
3. 多线程通信能力。支持与 `WebWorker`/`ServiceWorker` 进行主线程通信
4. 异步事件驱动。基于 `message` 事件实现非阻塞式通信
5. 通道复用性。单个窗口可同时与多个目标进行独立通信

## 应用场景

1. 跨域单点登录。不同子域间安全传递用户认证信息
2. 微前端架构。主子应用间的状态同步与事件通知
3. 高性能计算。主线程与 `WebWorker` 交换大数据计算结果
4. 第三方插件通信。与沙盒化 `iframe` 组件进行安全数据交互
5. PWA 离线通信。`ServiceWorker` 与页面间的缓存状态同步

## 代码示例

:::code-group
<<< @/examples/base/js/network/postMessage/index.html [窗口通信]
<<< @/examples/base/js/network/postMessage/WebWorker.js [WebWorker]
<<< @/examples/base/js/network/postMessage/ServiceWorker.js [ServiceWorker]
:::

## 浏览器兼容性提示

```js
// 兼容性检测
if (window.postMessage && window.addEventListener) {
  // 标准实现
} else {
  // 使用 window.name 或 hash 降级方案
}
```
