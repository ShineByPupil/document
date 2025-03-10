# BroadcastChannel

> HTML5 提供的跨页面通信接口，允许同源环境下不同浏览器上下文（标签页/窗口/iframe）直接通信。通过命名管道实现发布-订阅模式，是轻量级页面协同的标准化解决方案。

## 核心特性

1. 同源通信限制。仅允许相同协议/域名/端口的页面间通信
2. 频道命名机制。通过唯一频道名称创建通信管道（如"chat_channel"）
3. 消息广播模式。单条消息自动广播到所有订阅频道的页面
4. 结构化克隆支持。支持传输复杂对象（包括 File/Blob/ArrayBuffer 等）
5. 自动资源回收。页面关闭时自动断开连接，避免内存泄漏

## 应用场景

1. 多标签页状态同步。用户登录态切换/主题模式变更全局通知
2. 跨页面数据更新。商品列表页与详情页的库存实时同步
3. 分布式计算协作。多个页面协同处理大数据集任务
4. 实时仪表盘同步。多窗口展示的监控数据统一刷新
5. 页面集群控制。主控页面批量关闭/刷新子页面

## 基本用法

### 基础通信实现

```js
// 页面A：创建频道并发送消息  
const channelA = new BroadcastChannel('app_channel');
channelA.postMessage({
    type: 'USER_UPDATE',
    data: { id: 123, name: 'Alice' }
});

// 页面B：订阅相同频道  
const channelB = new BroadcastChannel('app_channel');
channelB.onmessage = (event) => {
    if (event.data.type === 'USER_UPDATE') {
        updateUserProfile(event.data.data);
    }
};

// 页面C：使用事件监听器  
const channelC = new BroadcastChannel('app_channel');
channelC.addEventListener('message', (event) => {
    console.log('收到广播消息:', event.data);
});
```

### 消息类型过滤

```js
// 发送带类型标识的消息  
broadcastChannel.postMessage({
    __type: 'SYSTEM_ALERT',
    content: '服务器即将维护',
    level: 'warning'
});

// 接收端过滤处理  
broadcastChannel.onmessage = (event) => {
    const msg = event.data;
    switch (msg.__type) {
        case 'SYSTEM_ALERT':
            showAlert(msg.content, msg.level);
            break;
        case 'DATA_REFRESH':
            fetchNewData();
            break;
    }
};
```

### 频道管理

```js
// 动态切换频道  
let currentChannel = null;

function connectChannel(channelName) {
    if (currentChannel) currentChannel.close();
    currentChannel = new BroadcastChannel(channelName);
    currentChannel.onmessage = handleMessage;
}

// 发送二进制数据  
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    currentChannel.postMessage({
        type: 'FILE_UPLOAD',
        data: file
    });
});

// 显式关闭连接  
window.addEventListener('beforeunload', () => {
    if (currentChannel) currentChannel.close();
});
```

## 浏览器兼容性提示

```js
// 特性检测与降级  
if ('BroadcastChannel' in window) {
    // 使用原生 API  
} else {
    // 使用 localStorage 事件模拟  
    const pseudoChannel = {
        postMessage: (data) => {
            localStorage.setItem('broadcast', JSON.stringify(data));
            localStorage.removeItem('broadcast');
        },
        onmessage: () => {
        }
    };
    window.addEventListener('storage', (e) => {
        if (e.key === 'broadcast') {
            pseudoChannel.onmessage({ data: JSON.parse(e.newValue) });
        }
    });
}
```
