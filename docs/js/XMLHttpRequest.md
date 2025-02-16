# XMLHttpRequest

XHR 对象用于与服务器交互，在不刷新页面的情况下请求特定 URL，获取数据

```js
let xhr = new XMLHttpRequest();

xhr.open(method, url); // 初始化新的请求

xhr.setRequestHeader(header, value); // 设置请求头

xhr.send(); // 发送请求

xhr.onload = function () {}; // 请求完成时的回调函数

xhr.onreadystatechange = function () {}; // 监听 readyState 变化的事件

xhr.onerror = function () {}; // 请求发生错误时的回调函数
```

## 实例属性

|    参数    |                             说明                             |  类型  | 默认值 |
| :--------: | :----------------------------------------------------------: | :----: | :----: |
|   status   |                       HTTP 响应状态码                        | Number |   0    |
| readyState | 0-刚创建，1-open 已调用，2-send 已调用，3-请求中，4-请求完成 | Number |   0    |

## 实例方法

|                  参数                   |           说明           |
| :-------------------------------------: | :----------------------: |
|             [open()](#open)             |     初始化 HTTP 请求     |
|             [send()](#send)             |      发送 HTTP 请求      |
|                 abort()                 |   主动终止已发出的请求   |
| [setRequestHeader()](#setrequestheader) | 设置 HTTP 请求头部的方法 |

## 实例事件

|     事件名称     |                    说明                     |     回调参数      |
| :--------------: | :-----------------------------------------: | :---------------: |
|       load       |          请求**完成**时触发的事件           | Function(e:Event) |
| readystatechange | **readyState** 属性发生**变化**时触发的事件 | Function(e:Event) |
|      error       |        请求遇到**错误**时触发的事件         | Function(e:Event) |
|     timeout      |   由于预定**时间到期**而终止时触发的事件    | Function(e:Event) |

### open

```ts
type method = "GET" | "POST" | "PUT" | "DELETE" | "HEAD";

interface open {
  (
    method: method,
    url: string,
    async?: boolean, // 是否异步执行操作，默认为 true
    user?: string | null, // 可选的用户名用于认证用途；默认为 null
    password?: string | null // 可选的密码用于认证用途，默认为 null
  ): void;
}
```

### send

```ts
interface send {
  (
    body?: string | FormData | Blob | ArrayBuffer | ArrayBufferView | null
  ): void;
}
```

### setRequestHeader

```ts
interface setRequestHeader {
  (header: string, value: string): void;
}
```
