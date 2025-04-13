# **`IntersectionObserver`** <Sound word="IntersectionObserver"/>

> 交叉观察者 监测目标元素与视窗/容器的交叉比例变化，针对元素可见性检测。滚动事件的细分领域，只在适当的时候触发回调，提高性能

## 配置项

|       属性        |          类型          | 默认值  | 说明                           |
| :---------------: | :--------------------: | :-----: | ------------------------------ |
|    **`root?`**    |  `Element` \| `null`   | `null`  | 根元素（默认视口）             |
| **`rootMargin?`** |        `string`        | `"0px"` | 根元素外边距（可触发提前加载） |
| **`threshold?`**  | `number` \| `number[]` |   `0`   | 可见比例阈值（0-1）            |

## 实例方法

- **`observe(target)`** 开始观察
- **`unobserve(target)`** 停止指定元素观察
- **`disconnect()`** 停止所有观察
- **`takeRecords()`** 获取变化记录并清空，（同步操作，通常无需手动调用）

## 代码示例

<<< @/examples/base/js/observer/IntersectionObserver.js [基础语法]
