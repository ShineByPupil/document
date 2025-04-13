# **`PerformanceObserver`** <Sound word="PerformanceObserver"/>

> 性能指标观察者，用于监测特定类型的性能条目。相较于手动轮询性能数据，提供更高效的性能指标收集方式

## 配置项

### **`entryTypes`**

适用于传统性能条目类型（需批量配置）：

| 类型         | 说明                                       | 典型用途                      |
| ------------ | ------------------------------------------ | ----------------------------- |
| `frame`      | 页面每帧渲染性能数据（较少使用）           | 帧耗时分析                    |
| `navigation` | 页面导航性能数据（HTML文档请求）           | 白屏时间、DOM加载耗时         |
| `resource`   | 所有资源加载性能数据                       | JS/CSS/图片加载优化           |
| `mark`       | 通过 `performance.mark()` 添加的自定义标记 | 代码执行节点标记              |
| `measure`    | 通过 `performance.measure()` 测量的时间段  | 代码执行耗时测量              |
| `paint`      | 关键渲染时间点（FP/FCP）                   | 首次渲染/首次内容渲染时间监测 |

### **`type`**

现代性能指标类型（需单独配置，与 `buffered: true` 搭配使用）：

| 类型                       | 说明                                    | 对应 Web Vitals 指标 |
| -------------------------- | --------------------------------------- | -------------------- |
| `largest-contentful-paint` | 最大内容元素渲染时间                    | LCP                  |
| `first-input`              | 首次用户输入延迟（点击/滚动等）         | FID                  |
| `layout-shift`             | 累积布局偏移分数（需 `buffered: true`） | CLS                  |
| `longtask`                 | 主线程阻塞超过 50ms 的长任务            | 卡顿监测             |

## 实例方法

- **`observe(options)`** 开始观察
  - `entryTypes: string[]`（传统类型）
  - `type: string` + `buffered: boolean`（现代类型）
- **`disconnect()`** 停止所有观察
- **`takeRecords()`** 获取当前的性能条目并清空（同步操作，通常无需手动调用）

## 代码示例

<<< @/examples/base/js/observer/PerformanceObserver.js [基础语法]
