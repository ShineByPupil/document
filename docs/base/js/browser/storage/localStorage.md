# localStorage - 持久化存储

> HTML5 的 Web Storage 方案，提供持久化键值存储。数据永久保存直至显式清除，作用域限定在协议+域名+端口层级。

## 核心特性

- **大容量**：5MB/域名（浏览器差异）
- **生命周期**：永久存储，除非手动清除或浏览器清理
- **作用域**：同源策略（协议+域名+端口）
- **同步访问**：阻塞式读写操作
- **事件通知**：`storage` 事件跨窗口同步
- **与服务器交互**：仅在客户端存储，不参与 HTTP 请求

## 应用场景

- 用户偏好设置（主题/布局）
- 离线数据缓存（非敏感数据）
- 表单草稿保存
- 静态资源版本标记
- 页面访问计数统计

## 基本用法

```js
// 数据存储
localStorage.setItem(
  'userSettings',
  JSON.stringify({
    darkMode: true,
    fontSize: 16,
  }),
)

// 数据读取
const settings = JSON.parse(localStorage.getItem('userSettings'))

// 事件监听（跨标签页）
window.addEventListener('storage', (e) => {
  console.log(`${e.key} 值变更:`, e.oldValue, '→', e.newValue)
})
```
