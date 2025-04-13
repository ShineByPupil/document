# **`ResizeObserver`** <Sound word="ResizeObserver"/>

> 元素尺寸变化观察者，异步观察元素**内容**或**边框**尺寸变化。替代传统的 window.resize 事件，提供更细粒度的元素级尺寸监控

## 一、核心特性

- **元素尺寸监听**
  - 精准监测元素内容区域或边框尺寸变化（替代 `window.resize`）
- **高效无抖动**
  - 基于浏览器渲染引擎触发回调，避免手动轮询或 `requestAnimationFrame`
- **支持 SVG 和替换元素**
  - 可监测 `<svg>`、`<img>`、`<canvas>` 等元素的尺寸变化

## 二、应用场景

- **响应式布局调整**
  - 自适应容器大小变化（如动态图表重绘）
- **元素折叠/展开动画**
  - 根据尺寸变化触发 CSS 过渡效果
- **画布渲染优化**
  - `<canvas>` 尺寸变化时自动重置分辨率

## 三、实例方法

- **`observe(target, options?)`** <Sound word="observe"/> 开始观察
- **`unobserve(target)`** <Sound word="unobserve"/> 停止指定元素观察
- **`disconnect()`** <Sound word="disconnect"/> 停止所有观察

## 四、代码示例

<<< @/examples/base/js/observer/ResizeObserver.js
