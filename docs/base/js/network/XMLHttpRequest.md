# XMLHttpRequest

> 浏览器最早实现的异步通信 API，为 AJAX 技术的核心基础。尽管已被现代 Fetch API
> 取代，但在旧项目维护、文件上传进度监控等场景仍具实用价值，保有最广泛的浏览器兼容性支持。

## 核心特性

1. 异步/同步双模式。支持非阻塞异步请求（默认）与阻塞式同步请求
2. 全量生命周期控制。通过 readyState（0~4）精确追踪请求各阶段状态
3. 跨浏览器兼容。支持 IE7+ 及所有现代浏览器，兼容性天花板
4. 进度监控能力。提供 upload/download 进度事件，支持大文件传输反馈
5. 灵活数据格式。可处理文本、XML、JSON、Blob 等多种响应类型

## 应用场景

1. 旧系统维护。需要兼容 IE 浏览器的遗留项目改造
2. 带进度条文件上传。通过 `upload` 事件实现实时进度反馈
3. 长轮询（Long Polling）。服务端推送的早期实现方案
4. 兼容性优先项目。需支持老旧移动浏览器的特殊场景
5. 二进制流处理。通过 `xhr.responseType='arraybuffer'` 处理音视频流

## 代码示例

:::code-group
<<< @/examples/base/js/network/XMLHttpRequest/GET.js [基础语法]
<<< @/examples/base/js/network/XMLHttpRequest/timeout.js [设置超时]
<<< @/examples/base/js/network/XMLHttpRequest/abort.js [中断请求]
<<< @/examples/base/js/network/XMLHttpRequest/progress.js [监控上传]
:::

## 基本用法

## 浏览器兼容性提示

```js
// 超老IE兼容写法（已不推荐）
let oldXhr = window.XMLHttpRequest
  ? new XMLHttpRequest()
  : new ActiveXObject('Microsoft.XMLHTTP')
```

## XHR 与 fetch API 的区别

| 特性              | AJAX 独有                                        | fetch 独有           |
| ----------------- | ------------------------------------------------ | -------------------- |
| **请求状态管理**  | `readyState`、`onreadystatechange`               | ❌                   |
| **上传进度监控**  | `upload.onprogress`                              | ❌                   |
| **XML 数据支持**  | `responseXML`                                    | ❌                   |
| **超时控制**      | `timeout`、`ontimeout`                           | ❌                   |
| **请求取消**      | `abort()`                                        | `AbortController`    |
| **响应头操作**    | `getResponseHeader()`、`getAllResponseHeaders()` | `Headers` 对象       |
| **流式数据处理**  | ❌                                               | `response.body`      |
| **HTTP 错误处理** | 需手动检查 `status`                              | 需检查 `response.ok` |
| **Promise 支持**  | 需手动封装                                       | 原生支持             |
| **请求配置复用**  | ❌                                               | `Request` 对象       |

## API

| 名称                                | 说明                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------- |
| **实例属性**                        |                                                                           |
| **`readyState`**                    | 请求的状态（0: 未初始化, 1: 已打开, 2: 已发送, 3: 接收中, 4: 完成）       |
| **`status`**                        | HTTP 状态码（如 200 表示成功）                                            |
| **`statusText`**                    | HTTP 状态文本                                                             |
| **`response`**                      | 响应体（根据 `responseType` 可能是字符串、对象、二进制数据等）            |
| **`responseText`**                  | 响应体作为字符串（仅当 `responseType` 为 `""` 或 `text` 时有效）          |
| **`responseXML`**                   | 响应体作为 XML 文档（仅当 `responseType` 为 `document` 时有效）           |
| **`responseType`**                  | 设置响应类型（如 `""`、`"text"`、`"json"`、`"blob"`、`"arraybuffer"` 等） |
| **`timeout`**                       | 设置请求超时时间（单位：毫秒）                                            |
| **`withCredentials`**               | 是否携带跨域凭证（`true` 或 `false`）                                     |
| **`upload`**                        | 返回 `XMLHttpRequestUpload` 对象，用于监控上传进度                        |
| **实例方法**                        |                                                                           |
| **`open(method, url[, async])`**    | 初始化请求（method: 请求方法，url: 请求地址，async: 是否异步）            |
| **`send([body])`**                  | 发送请求（body: 请求体，如 FormData、Blob、ArrayBuffer 等）               |
| **`abort()`**                       | 中止请求                                                                  |
| **`setRequestHeader(name, value)`** | 设置请求头（name: 头字段名，value: 头字段值）                             |
| **`getResponseHeader(name)`**       | 获取指定响应头的值                                                        |
| **`getAllResponseHeaders()`**       | 获取所有响应头（以字符串形式返回）                                        |
| **事件**                            |                                                                           |
| **`onreadystatechange`**            | `readyState` 发生变化时触发                                               |
| **`onload`**                        | 请求完成时触发                                                            |
| **`onerror`**                       | 请求发生错误时触发                                                        |
| **`onabort`**                       | 请求被中断时触发                                                          |
| **`ontimeout`**                     | 请求超时时触发                                                            |
| **`onprogress`**                    | 请求正在接收数据时触发（用于监控下载进度）                                |
| **`onloadstart`**                   | 请求开始时触发                                                            |
| **`onloadend`**                     | 请求结束时触发（无论成功或失败）                                          |
| **`upload.onprogress`**             | 上传数据时触发（用于监控上传进度）                                        |
