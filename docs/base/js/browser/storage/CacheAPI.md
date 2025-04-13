# Cache API <Sound word="Cache"/>

## 一、核心特性

- **网络资源缓存**
  - 与 `ServiceWorker` 配合，拦截请求并返回缓存响应
- **键值对存储**
  - 以 `Request` 对象为键，`Response` 对象为值
- **离线优先策略**
  - 支持在断网时返回缓存内容（PWA 核心）
- **生命周期可控**
  - 需手动管理缓存的添加、删除和更新

## 二、应用场景

- **离线应用支持**
  - 缓存 HTML/CSS/JS 等静态资源
- **加速重复访问**
  - 缓存 API 响应或 CDN 资源（如字体、图标）
- **版本化资源管理**
  - 通过缓存版本号实现增量更新

## 三、API

### 1. 缓存管理器

| 方法名                                | 返回值                           | 说明                                                        |
| ------------------------------------- | -------------------------------- | ----------------------------------------------------------- |
| **`caches.open(cacheName)`**          | `Promise<Cache>`                 | 打开指定名称的缓存，如果不存在则创建                        |
| **`caches.match(request, options?)`** | `Promise<Response \| undefined>` | 全局匹配请求，在所有缓存中查找与 `request` 匹配的第一个响应 |
| **`caches.has(cacheName)`**           | `Promise<boolean>`               | 检查是否存在指定名称的缓存                                  |
| **`caches.delete(cacheName)`**        | `Promise<boolean>`               | 删除指定名称的缓存对象                                      |
| **`caches.keys()`**                   | `Promise<string[]>`              | 获取所有缓存对象的名称                                      |

### 2. 缓存对象

| 方法名                                  | 返回值                           | 说明                                                               |
| --------------------------------------- | -------------------------------- | ------------------------------------------------------------------ |
| **`cache.add(request)`**                | `Promise<void>`                  | 获取指定请求的响应并添加到缓存。若请求失败，则拒绝 Promise         |
| **`cache.addAll(requests[])`**          | `Promise<void>`                  | 批量获取请求的响应并全部添加到缓存。若任意请求失败，则拒绝 Promise |
| **`cache.delete(request, options?)`**   | `Promise<boolean>`               | 删除缓存中与 `request` 匹配的条目                                  |
| **`cache.keys(request, options?)`**     | `Promise<Request[]>`             | 返回缓存中所有键（即 `Request` 对象）的数组，可选按 `request` 过滤 |
| **`cache.match(request, options?)`**    | `Promise<Response \| undefined>` | 返回缓存中与 `request` 匹配的第一个响应                            |
| **`cache.matchAll(request, options?)`** | `Promise<Response[]>`            | 返回缓存中与 `request` 匹配的所有响应数组                          |
| **`cache.put(request, response)`**      | `Promise<void>`                  | 将请求和对应响应存入缓存                                           |

### 3. options 可选配置

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

## 四、代码示例

:::code-group

```js {7-15} [ServiceWorker 缓存资源]
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

```js {4} [拦截请求返回缓存]
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

```js {3-5,8} [动态缓存管理]
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

:::
