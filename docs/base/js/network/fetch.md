# fetch

> 浏览器提供的现代网络请求接口，替代传统 XMLHttpRequest（XHR）。基于 Promise 设计，支持异步请求、流式数据处理和跨域资源请求（CORS），成为前端数据交互的核心工具

## 核心特性

1. Promise 驱动。天然支持异步操作，可通过 `async`/`await` 或 `.then()` 链式调用
2. 请求/响应对象化。提供 `Request` 和 `Response` 标准对象，实现规范化接口
3. 流式数据处理。支持分块读取响应内容，优化大文件传输性能
4. 灵活配置。通过 `init` 参数定制请求方法、头部、缓存策略等
5. CORS 原生支持。内置跨域请求处理机制，支持预检请求（Preflight）

## 应用场景

1. RESTful API 交互。与后端服务进行 CRUD 操作（GET/POST/PUT/DELETE）
2. 动态内容加载。异步获取并渲染页面局部数据
3. 文件上传/下载。通过 FormData 实现二进制文件传输
4. SSR 数据预取。服务端渲染时预先获取首屏数据
5. 流式内容处理。逐块处理大型 JSON/文本/媒体文件

## 代码示例

:::code-group
<<< @/examples/base/js/network/fetch/GET.js [GET 请求]
<<< @/examples/base/js/network/fetch/POST.js [POST 请求]
<<< @/examples/base/js/network/fetch/upload.js [文件上传]
<<< @/examples/base/js/network/fetch/abort.js [中断请求]
<<< @/examples/base/js/network/fetch/ReadableStream.js [流式读取响应]
:::

## 基本用法

## 浏览器兼容性提示

```js
// 兼容性检测
if (window.fetch) {
  // 使用原生 fetch
} else {
  // 降级到 XHR 或 polyfill
}
```

## API

**resource 想要获取的资源地址**

| 类型          | 说明                  | 示例                              |
| ------------- | --------------------- | --------------------------------- |
| **`string`**  | 直接使用 URL 字符串   | `'https://api.com/data'`          |
| **`URL`**     | URL 对象              | `new URL('https://api.com/data')` |
| **`Request`** | 预配置的 Request 对象 | `new Request('https://api.com')`  |

**options 自定义设置**

| 属性名               | 可选值                                                                                                                                                                                               | 说明                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **核心配置**         |                                                                                                                                                                                                      |                                                           |
| **`method`**         | `'GET'`(默认) \| `'POST'` \| `'PUT'` \| `'DELETE'` \| `'PATCH'` \| `'HEAD'` \| `'OPTIONS'` \| `'CONNECT'` \| `'TRACE'`                                                                               | HTTP 请求方法                                             |
| **`headers`**        | `Headers` 对象 \| 普通对象                                                                                                                                                                           | 请求头配置（如 `{ 'Content-Type': 'application/json' }`） |
| **`body`**           | `null`(默认) \| `ReadableStream<Uint8Array>` \| `Blob` \| `BufferSource` \| `FormData` \| `URLSearchParams` \| `string`                                                                              | 请求体数据（`'GET'`/`'HEAD'` 请求不可用）                 |
| **网络行为**         |                                                                                                                                                                                                      |                                                           |
| **`mode`**           | `'cors'`(默认) \| `'no-cors'` \| `'same-origin'` \| `'navigate'`                                                                                                                                     | 跨域请求模式                                              |
| **`credentials`**    | `'omit'` \| `'same-origin'`(默认) \| `'include'`                                                                                                                                                     | 是否携带 Cookie 和跨域凭证                                |
| **`cache`**          | `'default'`(默认) \| `'no-store'` \| `'reload'` \| `'no-cache'` \| `'force-cache'` \| `'only-if-cached'`                                                                                             | 缓存策略                                                  |
| **`redirect`**       | `'follow'`(默认) \| `'error'` \| `'manual'`                                                                                                                                                          | 是否自动跟随重定向                                        |
| **安全与策略**       |                                                                                                                                                                                                      |                                                           |
| **`referrer`**       | `string`                                                                                                                                                                                             | 指定来源页 URL                                            |
| **`referrerPolicy`** | `'no-referrer'` \| `'no-referrer-when-downgrade'` \| `'origin'` \| `'origin-when-cross-origin'` \| `same-origin` \| `'strict-origin'` \| `'strict-origin-when-cross-origin'`(默认) \| `'unsafe-url'` | 控制 Referer 头的发送策略                                 |
| **`integrity`**      | `string`（如 `'sha256-abcdef...'`）                                                                                                                                                                  | 子资源完整性校验 (SRI) 的哈希值                           |
| **高级控制**         |                                                                                                                                                                                                      |                                                           |
| **`keepalive`**      | `true` \| `false`(默认)                                                                                                                                                                              | 是否允许请求在页面关闭后继续存活                          |
| **`signal`**         | `AbortSignal` 对象 \| `null`(默认)                                                                                                                                                                   | 用于中止请求的信号对象（配合 `AbortController` 使用）     |
| **`window`**         | `null`                                                                                                                                                                                               | 通常设置为 `null`（保留字段，浏览器专用                   |
| **实验性功能**       |                                                                                                                                                                                                      |                                                           |
| **`priority`**       | `'auto'`(默认) \| `'high'` \| `'low'`                                                                                                                                                                | 请求优先级                                                |
| **`duplex`**         | `'half'`                                                                                                                                                                                             | 启用流式上传模式                                          |
