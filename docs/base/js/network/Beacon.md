# Beacon API

> 浏览器提供的异步数据上报接口，专为页面关闭/跳转场景设计。它通过后台异步传输机制，确保关键数据（如分析日志）在页面卸载时可靠发送，且不阻塞页面切换流程。

## 核心特性

1. 无阻塞传输。数据发送不延迟页面卸载，保障用户体验流畅性
2. 可靠性保证。浏览器主动管理发送队列，即使在页面关闭后仍继续传输
3. 跨域支持。原生支持 CORS，可向不同域端点发送数据
4. 自动重试。内置失败重试机制，提升数据传输成功率
5. 轻量级调用。单行代码完成数据发送，无需处理复杂回调

## 应用场景

1. 用户行为分析。页面停留时长、按钮点击等行为数据采集
2. 错误监控。页面崩溃前的 JavaScript 错误日志上报
3. 性能指标上报。FP/FCP 等 Web Vitals 数据提交
4. 广告转化跟踪。用户跳转前的广告点击事件记录
5. 表单放弃率统计。未提交表单的填写进度追踪

## 基础语法

```js
// 1. 基础使用（自动使用 POST 方法）
const data = { event: 'page_unload', time: Date.now() };
navigator.sendBeacon('/analytics', new Blob([JSON.stringify(data)], {
    type: 'application/json'
});

// 2. 表单数据上报
const formData = new FormData();
formData.append('user', 'user123');
formData.append('action', 'logout');
navigator.sendBeacon('/track', formData);

// 3. URL编码数据
const params = new URLSearchParams({
    referrer: document.referrer,
    path: window.location.pathname
});
navigator.sendBeacon('/collect', params);

// 4. 发送验证（返回布尔值表示是否进入发送队列）
const success = navigator.sendBeacon(url, data);
console.log('数据已加入队列：', success);
```

## 浏览器兼容性提示

```js
if ('sendBeacon' in navigator) {
  // 启用 Beacon 功能
} else {
  // 降级方案（如同步 XMLHttpRequest）
}
```
