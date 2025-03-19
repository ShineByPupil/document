# cookie - 会话级存储

> 最早期的浏览器存储方案，主要用于维持客户端与服务器的会话状态。通过 HTTP 头部在服务端与浏览器间自动传递，具有严格的同源策略和安全限制。

## 核心特性

- **容量限制**：4KB/域名
- **自动携带**：每次请求自动携带在 HTTP 头部，增加流量消耗
- **生命周期**：
  - **会话级**：默认生命周期为浏览器会话期间，关闭标签页或浏览器后失效
  - **持久化**：
    - `Max-Age` 以秒为单位设置存活时间（优先级高于 `Expires`）
    - `Expires` 指定具体的 GMT 格式过期时间
  - 删除机制：将过期时间设为过去的时间点或设置 `Max-Age=0`。
- **作用域控制**：
  - 域名作用域 `Domain`：默认为当前域名（不包含子域名）
  - 路径作用域 `Path`：默认 `'/'`，限制 cookie 仅在指定路径及其子路径下生效
- **安全性**：
  - 传输安全 `Secure`：只允许 HTTPS 请求携带
  - 访问限制 `HttpOnly`：禁止 JavaScript 通过 `document.cookie` 读取，防范 `XSS` 攻击
  - 跨站策略 `SameSite`：控制跨站请求时是否发送 cookie，防范 `CSRF` 攻击
    - `Strict`：完全禁止
    - `Lax`：允许导航跳转携带
    - `None`：无限制

## 应用场景

- 用户身份认证（Session ID）
- 个性化设置存储（主题/语言）
- 跨页面状态保持（短期）

## 基本用法

- 读取 cookie
  - 无法读取特殊属性
  - 浏览器开发者工具能查看特殊属性

```js
const cookies = document.cookie.split(';').reduce((acc, str) => {
  const [k, v] = str.split('=')
  acc[k.trim()] = v
  return acc
}, {})

console.log(cookies)
// {
//   key1: "val1",
//   key2: "val2"
// }
```

- 新增 cookie
  - 每次新增只能设置一条 cookie，不支持批量设置
  - 属性不区分大小写，但按首字母大写规范格式

```js
document.cookie = `theme=dark; Max-Age=2592000; Path=/; Secure`
```

- 删除 cookie
  - 将过期时间设为过去的时间点或设置 `Max-Age=0`（且 `Domain`/`Path` 一致）
  - 如果不设置 `Max-Age`/`Expires` ，变为会话级，关闭标签页或浏览器后失效
  - `httpOnly` 存在，删除 cookie

```js
document.cookie = `theme=dark; Max-Age=0;`
```

- 修改 cookie
  - `Domain`/`Path` 不同，视为独立的 cookie
  - `Domain`/`Path`/`Max-Age`/`Expires`/`Secure`/`SameSite` 可修改的属性不传，设置为默认值
  - 重新设置相同 `Max-Age` 会延长生命周期，而 `Expires` 不会
  - `httpOnly` 客户端无法修改，服务端有权修改
  - `httpOnly` 存在，无法修改 cookie

```js
// theme由dark修改为dark1
// Max-Age 重置过期时间，等同于延迟
// Path=/ 为默认值，可以省略，无影响
// Secure 修改为空
document.cookie = `theme=dark1; Max-Age=2592000;`

// ❌ 涉及属性httpOnly，会被浏览器忽略
document.cookie = `theme=dark; HttpOnly;`
```
