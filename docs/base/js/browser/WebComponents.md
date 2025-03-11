# Web Components

> W3C 标准化的原生组件化方案，其以浏览器原生支持取代框架依赖

## 一、Custom Elements

> 允许开发者通过 JavaScript 扩展或自定义全新的 HTML 元素

### 应用场景

1. **UI 组件库开发**：创建按钮、卡片等可复用的 UI 组件
2. **领域特定组件**：如电商网站的“商品卡片”、音乐播放器的“进度条”
3. **第三方插件集成**：封装地图、图表等第三方功能为自定义标签

### API

| 生命周期方法                                               | 说明                                                     |
|------------------------------------------------------|--------------------------------------------------------|
| `customElements.define(name, constructor)`           | 注册自定义元素，`name` 需包含连字符，`constructor` 需继承自 `HTMLElement` |
| `connectedCallback()`                                | 元素首次插入 DOM 时触发，用于初始化 DOM 或资源加载                         |
| `disconnectedCallback()`                             | 元素从 DOM 移除时触发，用于清理资源                                   |
| `attributeChangedCallback(attrName, oldVal, newVal)` | 元素的被观察属性变化时触发，需配合 `observedAttributes` 静态属性使用          |
| `static observedAttributes`                          | 返回需要监听的属性名数组（如 `return ['name', 'age']`）               |

### 代码示例

:::demo
base/html/WebComponents/CustomElements
:::

## 二、Shadow DOM

> Web Components 的封装层技术，通过创建隔离的 DOM 子树（Shadow Tree）与样式作用域，将组件内部结构、样式与外部环境解耦。

### 应用场景

1. **组件样式隔离**：避免组件内样式影响全局 CSS
2. **动态主题切换**：在 Shadow DOM 内隔离主题样式，实现动态更换
3. **封装复杂组件**：如视频播放器，隐藏内部实现细节

### API

| 属性                               | 说明                                                  |
|----------------------------------|-----------------------------------------------------|
| `Element.attachShadow({ mode })` | 创建 Shadow DOM，`mode: 'open'` 允许外部访问，`'closed'` 禁止访问 |
| `ShadowRoot.innerHTML`           | 设置 Shadow DOM 内部结构                                  |
| `::slotted(selector)`            | CSS 伪类，用于样式化被 `<slot>` 投影的内容                        |
| `<slot name="...">`              | 内容投影插槽，可通过 `name` 属性实现具名插槽                          |

### 代码示例

:::demo
base/html/WebComponents/ShadowDOM
:::

## 三、HTML Templates

> Web Components 的静态内容模板技术，允许开发者定义可复用的 HTML 结构，方便组件化开发。

### 应用场景

1. **动态内容生成**：根据数据渲染列表、表格等动态内容
2. **重复结构复用**：如表格行、模态框的通用结构
3. **条件渲染**：按需显示/隐藏预定义的模板内容

### API

| 属性                 | 说明                                                       |
|--------------------|----------------------------------------------------------|
| `<template>`       | 定义可复用的 HTML 模板，内容不会被渲染，直到被 JavaScript 激活                 |
| `template.content` | 获取模板的文档片段（`DocumentFragment`），可通过 `cloneNode(true)` 克隆使用 |
| `<slot>` 在模板中      | 结合 Custom Elements 使用时，实现内容投影（需在 Shadow DOM 中）           |

### 代码示例

:::demo
base/html/WebComponents/HTMLTemplates
:::
