# ServiceWorker - WEB API

> 浏览器实现的网络代理和离线缓存技术，充当 Web 应用与网络间的中间层。支持离线优先策略，是 PWA（渐进式 Web 应用）的核心技术。

## 核心特性

1. **网络拦截**：可控制 fetch 请求的缓存策略
2. **独立生命周期**：install/activate/fetch 事件驱动
3. **后台同步**：支持后台数据同步（需用户授权）
4. **推送通知**：处理来自服务器的推送消息
5. **持久化存储**：配合 Cache API/IndexedDB 使用

## 应用场景

1. 离线应用资源缓存
2. 网络请求优化（缓存优先策略）
3. 后台数据预加载
4. 推送通知管理
5. 应用版本更新控制

## 代码示例

```js
// 注册 ServiceWorker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((reg) => console.log('注册成功:', reg.scope))
}

// sw.js
const CACHE_NAME = 'v1'
const ASSETS = ['/', '/app.js', '/style.css']

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)))
})

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)))
})

self.addEventListener('push', (e) => {
  const data = e.data.json()
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: '/icon.png',
  })
})
```
