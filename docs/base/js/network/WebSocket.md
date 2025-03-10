# WebSocket

> 基于 TCP 的双向通信协议，通过一次握手建立持久连接，实现客户端与服务器的全双工实时通信。突破 HTTP
> 请求-响应模式限制，提供毫秒级延迟的数据传输能力，是构建实时交互应用的基石技术。

## 核心特性

1. 全双工通信。客户端与服务器可同时发送/接收数据，无需等待请求响应
2. 低延迟传输。协议头开销仅 2-10 字节，显著降低通信延迟
3. 持久化连接。单个 TCP 连接持续有效，避免重复建立连接开销
4. 跨域原生支持。通过 `wss://` 协议自动处理跨域安全限制
5. 协议扩展性。支持子协议协商（如 STOMP、MQTT），适应不同业务场景

## 应用场景

1. 实时聊天系统。消息即时送达与已读状态同步
2. 多人在线游戏。玩家位置同步与实时战斗交互
3. 金融交易终端。股票价格实时推送与高频交易指令传输
4. 物联网控制中心。设备状态实时监控与远程指令下发
5. 协同编辑工具。多用户文档/代码实时协同编辑

## 基础语法

### 客户端实现

```js
// 1. 创建 WebSocket 连接  
const socket = new WebSocket('wss://example.com/ws');

// 2. 连接建立事件  
socket.addEventListener('open', (event) => {
    console.log('连接已建立');
    socket.send('Hello Server!'); // 发送文本消息  
});

// 3. 接收消息事件  
socket.addEventListener('message', (event) => {
    console.log('收到消息:', event.data);
    const data = JSON.parse(event.data);
    updateUI(data); // 更新界面  
});

// 4. 发送二进制数据  
const buffer = new ArrayBuffer(8);
socket.send(buffer);

// 5. 错误处理与重连  
socket.addEventListener('error', (error) => {
    console.error('连接错误:', error);
    setTimeout(connect, 3000); // 3秒后重连  
});

// 6. 主动关闭连接  
document.getElementById('closeBtn').onclick = () => {
    socket.close(1000, '用户主动断开'); // 状态码+原因  
};
```

### 服务端实现

> （Node.js + ws 库）

```js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('新客户端连接');

    // 接收客户端消息  
    ws.on('message', (data) => {
        console.log('收到客户端数据:', data);
        // 广播给所有客户端  
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: 'broadcast',
                    content: data.toString()
                }));
            }
        });
    });

    // 发送心跳包保持连接  
    const heartbeat = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.ping();
        }
    }, 30000);

    // 连接关闭处理  
    ws.on('close', () => {
        clearInterval(heartbeat);
        console.log('客户端断开');
    });
});
```

## 浏览器兼容性提示

```js
if ('WebSocket' in window) {
    // 使用原生 WebSocket  
} else {
    // 降级到轮询或第三方库（如 Socket.IO）  
}
```
