# Cache API - 资源存储

## 核心特性

- **存储大小**：动态分配（通常受浏览器限制）
- **生命周期**：手动控制缓存过期
- **作用域**：同源策略（协议+域名+端口）
- **异步操作**：基于 `Promise`
- **数据内容**：缓存网络请求（`Request`/`Response` 对象）
- 与 `ServiceWorker` 配合：实现离线优先策略

## 应用场景

- PWA（渐进式网络应用）的静态资源缓存（CSS、JS、图片）
- 离线访问关键资源（如文档、数据接口）

## API

- caches.open(cacheName)
- cache.add(request)
- cache.match(request)

## 基本用法

:::details 代码示例

- ServiceWorker 注册

```js
// 主线程中注册 ServiceWorker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((registration) => console.log('SW registered'))
    .catch((err) => console.log('Registration failed:', err))
}
```

- 缓存资源（ServiceWorker 线程）

```js
// sw.js
const CACHE_NAME = 'v1-static-cache'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        cache.addAll([
          '/styles/main.css',
          '/scripts/app.js',
          '/images/logo.png',
        ]),
      ),
  )
})
```

- 拦截请求返回缓存

```js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 返回缓存或回退到网络请求
      return response || fetch(event.request)
    }),
  )
})
```

- 动态缓存管理

```js
// 添加新条目
caches.open('v1-dynamic').then((cache) => {
  cache.put('/api/data', new Response(JSON.stringify(data)))
})

// 清理旧缓存
caches.keys().then((keys) => {
  keys.forEach((key) => {
    if (key !== CACHE_NAME) caches.delete(key)
  })
})
```

:::
