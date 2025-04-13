# **`ResizeObserver`** <Sound word="ResizeObserver"/>

> 元素尺寸变化观察者，异步观察元素**内容**或**边框**尺寸变化。替代传统的 window.resize 事件，提供更细粒度的元素级尺寸监控

## 实例方法

- **`observe(target, options?)`** 开始观察
- **`unobserve(target)`** 停止指定元素观察
- **`disconnect()`** 停止所有观察

## 代码示例

<<< @/examples/base/js/observer/ResizeObserver.js
