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

### 缓存管理器

| 方法名                                | 返回值                           | 说明                                                        |
| ------------------------------------- | -------------------------------- | ----------------------------------------------------------- |
| **`caches.open(cacheName)`**          | `Promise<Cache>`                 | 打开指定名称的缓存，如果不存在则创建                        |
| **`caches.match(request, options?)`** | `Promise<Response \| undefined>` | 全局匹配请求，在所有缓存中查找与 `request` 匹配的第一个响应 |
| **`caches.has(cacheName)`**           | `Promise<boolean>`               | 检查是否存在指定名称的缓存                                  |
| **`caches.delete(cacheName)`**        | `Promise<boolean>`               | 删除指定名称的缓存对象                                      |
| **`caches.keys()`**                   | `Promise<string[]>`              | 获取所有缓存对象的名称                                      |

### 缓存对象

| 方法名                                  | 返回值                           | 说明                                                               |
| --------------------------------------- | -------------------------------- | ------------------------------------------------------------------ |
| **`cache.add(request)`**                | `Promise<void>`                  | 获取指定请求的响应并添加到缓存。若请求失败，则拒绝 Promise         |
| **`cache.addAll(requests[])`**          | `Promise<void>`                  | 批量获取请求的响应并全部添加到缓存。若任意请求失败，则拒绝 Promise |
| **`cache.delete(request, options?)`**   | `Promise<boolean>`               | 删除缓存中与 `request` 匹配的条目                                  |
| **`cache.keys(request, options?)`**     | `Promise<Request[]>`             | 返回缓存中所有键（即 `Request` 对象）的数组，可选按 `request` 过滤 |
| **`cache.match(request, options?)`**    | `Promise<Response \| undefined>` | 返回缓存中与 `request` 匹配的第一个响应                            |
| **`cache.matchAll(request, options?)`** | `Promise<Response[]>`            | 返回缓存中与 `request` 匹配的所有响应数组                          |
| **`cache.put(request, response)`**      | `Promise<void>`                  | 将请求和对应响应存入缓存                                           |

### options 可选配置

| 属性名             | 默认值 | 说明                                      |
| ------------------ | :----: | ----------------------------------------- |
| **`ignoreSearch`** | false  | 是否忽略 URL 查询参数                     |
| **`ignoreMethod`** | false  | 是否忽略请求方法，默认只允许 `GET`/`HEAD` |
| **`ignoreVary`**   | false  | 是否忽略 `Vary` 响应头                    |

:::warning 注意事项

- 支持的请求方法默认仅限 `GET`/`HEAD`
- `ignoreMethod` 仅用于查询，不能绕过存储时的 `GET`/`HEAD` 限制
- `cache.add()` 和 `cache.addAll()`，强制发起网络请求，受到http缓存头影响

:::

## 基本用法

### ServiceWorker 注册

```js
// 主线程中注册 ServiceWorker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((registration) => console.log('ServiceWorker已注册'))
    .catch((err) => console.log('注册失败:', err))
}
```

### 缓存资源（ServiceWorker 线程）

```js {7-15}
// sw.js
const CACHE_NAME = 'v1-static-cache'

self.addEventListener('install', (event) => {
  // 等待核心缓存都已经成功载入，再完成安装阶段
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

### 拦截请求返回缓存

```js {4}
self.addEventListener('fetch', (event) => {
  // 阻止浏览器默认的 fetch 操作
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 返回缓存或回退到网络请求
      return response || fetch(event.request)
    }),
  )
})
```

### 动态缓存管理

```js {3-5,8}
const CACHE_NAME = 'v1-static-cache'
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
