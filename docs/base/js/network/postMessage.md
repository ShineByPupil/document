# postMessage

> 是浏览器提供的跨文档通信 API，实现不同源窗口/Worker之间的安全数据交互。通过结构化克隆算法传递数据，突破同源策略限制，成为现代
> Web 应用跨域通信的基石技术。

## 核心特性

1. 跨域安全通信。通过指定目标 origin 白名单，防止恶意站点窃听
2. 结构化克隆支持。自动序列化复杂对象（包含 Map/Set/Blob 等类型）
3. 多线程通信能力。支持与 Web Worker/Service Worker 进行主线程通信
4. 异步事件驱动。基于 message 事件实现非阻塞式通信
5. 通道复用性。单个窗口可同时与多个目标进行独立通信

## 应用场景

1. 跨域单点登录。不同子域间安全传递用户认证信息
2. 微前端架构。主子应用间的状态同步与事件通知
3. 高性能计算。主线程与 Web Worker 交换大数据计算结果
4. 第三方插件通信。与沙盒化 iframe 组件进行安全数据交互
5. PWA 离线通信。Service Worker 与页面间的缓存状态同步

## 基本用法

### 窗口间通信示例

```html
<!-- 父页面 parent.html -->
<iframe src="child.html" id="childFrame"></iframe>
<script>
    const iframe = document.getElementById('childFrame');
    // 发送消息到子窗口
    iframe.contentWindow.postMessage(
            { type: 'AUTH_TOKEN', value: 'xyz123' },
            'https://child-domain.com' // 指定目标origin
    );

    // 接收子窗口消息
    window.addEventListener('message', (event) => {
        if (event.origin !== 'https://child-domain.com') return;
        console.log('收到子窗口数据:', event.data);
    });
</script>

<!-- 子页面 child.html -->
<script>
    // 接收父窗口消息
    window.addEventListener('message', (event) => {
        if (event.origin !== 'https://parent-domain.com') return;
        if (event.data.type === 'AUTH_TOKEN') {
            localStorage.setItem('token', event.data.value);
        }
        // 响应消息  
        event.source.postMessage('TOKEN_SAVED', event.origin);
    });
</script>
```

### Web Worker 通信示例

```js
// 主线程 main.js
const worker = new Worker('worker.js');

// 发送复杂对象
worker.postMessage({
    action: 'CALCULATE',
    data: new Float32Array([1.2, 3.4, 5.6])
});

// 接收处理结果
worker.onmessage = (e) => {
    console.log('计算结果:', e.data);
};

// worker.js  
self.onmessage = function (e) {
    const input = e.data;
    if (input.action === 'CALCULATE') {
        const result = input.data.reduce((a, b) => a + b);
        self.postMessage(result);
    }
};
```

### Service Worker 通信示例

```js
// 页面端 page.js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.controller.postMessage({
        type: 'UPDATE_CACHE',
        urls: ['/data.json']
    });

    navigator.serviceWorker.addEventListener('message', event => {
        console.log('Service Worker 响应:', event.data);
    });
}

// Service Worker sw.js
self.addEventListener('message', event => {
    if (event.data.type === 'UPDATE_CACHE') {
        caches.open('v1').then(cache => {
            cache.addAll(event.data.urls).then(() => {
                event.source.postMessage('CACHE_UPDATED');
            });
        });
    }
});
```

## 浏览器兼容性提示

```js
// 兼容性检测  
if (window.postMessage && window.addEventListener) {
    // 标准实现
} else {
    // 使用 window.name 或 hash 降级方案
}
```
