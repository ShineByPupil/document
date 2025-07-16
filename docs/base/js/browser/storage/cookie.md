# cookie <Sound word="cookie"/>

> 最早期的浏览器存储方案，主要用于维持客户端与服务器的会话状态。通过 HTTP 头部在服务端与浏览器间自动传递，具有严格的同源策略和安全限制。

## 一、核心特性

- **容量极小**
  - 单域名限制约 **4KB**，总数量受浏览器策略限制
- **HTTP 自动传输**
  - 随请求头自动发送到服务器，可设置 `Domain` 和 `Path` 作用域
- **过期控制**
  - 支持 `Expires`(绝对时间)或 `Max-Age`(相对时间)定义生命周期
- **安全标记**
  - **`HttpOnly` 是否禁止 JS 访问**
    - `true` | `false`（默认）
  - **`Secure` 是否仅 HTTPS 中发送**
    - `true` | `false`（默认）
  - **`SameSite` 跨站请求时是否携带 Cookie**
    - `Strict` 最严格，仅同站请求携带
    - `Lax` 默认，GET 导航类请求携带（如链接跳转、表单）
    - `None` 所有跨站请求都携带，但必须设置 Secure

## 二、应用场景

- **会话管理**
  - 存储用户登录凭证（如 Session ID）
- **用户行为追踪**
  - 记录用户偏好或广告标识（需合规）
- **CSRF 防护**
  - 通过 `SameSite=Strict` 限制跨域请求
- **XSS 防护**
  - 通过 `HttpOnly` 防范脚本注入

## 三、代码示例

- 属性不区分大小写，但遵守首字母大写规范格式
- `Domain` / `Path` 不同，视为独立的 cookie
- 重新设置相同 `Max-Age` 会延长生命周期，而 `Expires` 不会

:::code-group
<<< @/examples/base/js/storage/cookie/read.js [读取]
<<< @/examples/base/js/storage/cookie/add.js [新增]
<<< @/examples/base/js/storage/cookie/delete.js [删除]
<<< @/examples/base/js/storage/cookie/update.js [更新]
:::
