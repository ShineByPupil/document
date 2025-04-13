# **`IntersectionObserver`** <Sound word="IntersectionObserver"/>

> 交叉观察者 监测目标元素与视窗/容器的交叉比例变化，针对元素可见性检测。滚动事件的细分领域，只在适当的时候触发回调，提高性能

## 一、核心特性

- **交叉视口检测**
  - 监听元素与视口/父容器的交叉状态（曝光率统计）
- **性能优化**
  - 隐式使用空闲时间计算，避免 `scroll` 事件频繁触发
- **阈值灵活配置**
  - 支持设置多个触发阈值（如 10%、50%、90% 可见时触发）

## 二、应用场景

- **懒加载（Lazy Load）**
  - 图片/组件进入视口时动态加载资源
- **广告曝光统计**
  - 记录广告元素的可见时长和比例
- **滚动动画触发**
  - 元素进入视口时执行 CSS 动画

## 配置项

| 属性              | 类型                   | 默认值  | 说明                           |
| ----------------- | ---------------------- | :-----: | ------------------------------ |
| **`root?`**       | `Element` \| `null`    | `null`  | 根元素（默认视口）             |
| **`rootMargin?`** | `string`               | `"0px"` | 根元素外边距（可触发提前加载） |
| **`threshold?`**  | `number` \| `number[]` |   `0`   | 可见比例阈值（0-1）            |

## 实例方法

- **`observe(target)`** <Sound word="observe"/> 开始观察
- **`unobserve(target)`** <Sound word="unobserve"/> 停止指定元素观察
- **`disconnect()`** <Sound word="disconnect"/> 停止所有观察
- **`takeRecords()`** <Sound word="takeRecords"/> 获取变化记录并清空，（同步操作，通常无需手动调用）

## 代码示例

<<< @/examples/base/js/observer/IntersectionObserver.js [基础语法]
