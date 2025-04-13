# sessionStorage <Sound word="sessionStorage"/>

> 数据仅在会话期间保留。关闭标签页或浏览器后自动清除，适合临时性数据存储。

## 一、核心特性

- **会话级存储**
  - 数据仅在当前标签页有效，关闭标签页后自动清除
- **同源隔离**
  - 不同标签页（即使同源）无法共享数据
- **纯前端操作**
  - 数据不发送到服务器，仅通过 JS API (`setItem`/`getItem`) 访问
- **容量适中**
  - 单域名通常支持 **5MB**

## 二、应用场景

- **临时表单保存**
  - 页面刷新时保留未提交的表单数据
- **单页应用状态暂存**
  - 存储当前页面的临时交互状态
- **敏感数据短期缓存**
  - 避免敏感信息持久化（如 OAuth 临时 Token）

## 三、代码示例

:::code-group

```js [基本用法]
// 新增
sessionStorage.setItem('checkoutStep', 'payment')

// 删除
sessionStorage.removeItem('checkoutStep')

// 修改
sessionStorage.setItem('checkoutStep', 'payment1')

// 读取
const step = sessionStorage.getItem('checkoutStep')
```

```js [应用场景]
// 保存当前步骤
sessionStorage.setItem('checkoutStep', 'payment')

// 绑定恢复页面状态事件
window.addEventListener('pageshow', () => {
  const step = sessionStorage.getItem('checkoutStep')
  if (step) navigateToStep(step)
})

// 刷新页面也会清除敏感数据
window.addEventListener('beforeunload', () => {
  sessionStorage.removeItem('tempToken')
})
```

:::
