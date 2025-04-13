# localStorage <Sound word="localStorage"/>

> HTML5 的 Web Storage 方案，提供持久化键值存储。数据永久保存直至显式清除，作用域限定在协议+域名+端口层级。

## 一、核心特性

- **持久化存储**
  - 数据长期保留，除非手动清除或代码删除
- **同源共享**
  - 同一域名下的所有页面共享数据
- **同步访问**
  - 直接读写数据，可能阻塞主线程（不适用于高频操作）
- **容量较大**
  - 单域名通常支持 5MB
- **事件通知**
  - `storage` 事件跨窗口同步

## 二、应用场景

- **用户偏好存储**
  - 主题、语言、字体大小等设置
- **静态资源缓存**
  - 缓存不常变化的 JSON 配置或基础数据
- **离线数据备份**
  - 在网络中断时暂存关键数据（如草稿）

## 三、代码示例

:::code-group

```js [基本用法]
// 新增
localStorage.setItem('checkoutStep', 'payment')

// 删除
localStorage.removeItem('checkoutStep')

// 修改
localStorage.setItem('checkoutStep', 'payment1')

// 读取
const step = localStorage.getItem('checkoutStep')
```

```js [storage 事件]
// 跨标签页事件监听
window.addEventListener('storage', (e) => {
  console.log(`${e.key} 值变更:`, e.oldValue, '→', e.newValue)
})
```

:::
