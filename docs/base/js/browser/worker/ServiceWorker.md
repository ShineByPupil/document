# ServiceWorker <Sound word="ServiceWorker"/>

> 浏览器实现的网络代理和离线缓存技术，充当 Web 应用与网络间的中间层。支持离线优先策略，是 PWA（渐进式 Web 应用）的核心技术。

## 一、核心特性

- **网络代理**
  - 拦截并控制页面网络请求（`fetch` 事件）
- **离线优先**
  - 通过 `Cache API` 实现离线资源缓存（PWA 核心）
- **后台运行**
  - 页面关闭后仍可执行任务（如推送通知、后台同步）
- **生命周期管理**
  - 需显式注册、更新和卸载，依赖 `install`/`activate` 事件
- **HTTPS 强制**
  - 生产环境要求 HTTPS（localhost 除外）

## 二、应用场景

- **离线应用**
  - 缓存关键资源（HTML/CSS/JS），支持断网访问
- **资源预加载**
  - 提前缓存用户可能访问的内容（如文章下一页）
- **推送通知**
  - 通过 `Push API` 实现用户订阅消息
- **性能优化**
  - 缓存 CDN 资源，减少重复下载

## 三、代码示例

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
