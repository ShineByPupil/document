# **`MutationObserver`** <Sound word="MutationObserver"/>

> DOM 变化观察者，能够异步(微任务)观察指定元素及其子树的属性、内容、结构的变化

## 配置项

> MutationObserverInit

| 属性                     |    类型    | 默认值  | 说明                                 |
| ------------------------ | :--------: | :-----: | ------------------------------------ |
| **`attributes?`**        | `boolean`  | `false` | 是否观察节点属性变化                 |
| `attributeFilter?`       | `string[]` |  `[]`   | 限制只观察指定属性                   |
| `attributeOldValue?`     | `boolean`  | `false` | 是否记录属性变化前的值               |
| **`characterData?`**     | `boolean`  | `false` | 是否观察文本节点 `TextNode` 内容变化 |
| `characterDataOldValue?` | `boolean`  | `false` | 是否记录文本变化前的值               |
| **`childList?`**         | `boolean`  | `false` | 是否观察子节点的添加/移除            |
| **`subtree?`**           | `boolean`  | `false` | 是否深度观察                         |

## 实例方法

- **`observe(target, options?)`** 开始观察
- **`disconnect()`** 同步停止观察，**立即丢弃**所有已检测到但尚未报告给回调的变动
- **`takeRecords()`** 同步获取变化记录并清空，通常在 `disconnect` 之前使用

## 代码示例

:::code-group
<<< @/examples/base/js/observer/MutationObserver/attributes.js [观察属性变化]
<<< @/examples/base/js/observer/MutationObserver/characterData.js [观察文本内容]
<<< @/examples/base/js/observer/MutationObserver/childList.js [观察子节点的添加/移除]
<<< @/examples/base/js/observer/MutationObserver/takeRecords.js [takeRecords()]
:::
