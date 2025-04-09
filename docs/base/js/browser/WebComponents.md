# Web Components - WEB API

> W3C 标准化的原生组件化方案，其以浏览器原生支持取代框架依赖

## 一、Custom Elements <Sound word="Custom Elements"/>

> 允许开发者通过 JavaScript 扩展或自定义全新的 HTML 元素

### 1. 应用场景

1. **UI 组件库开发**：创建按钮、卡片等可复用的 UI 组件
2. **领域特定组件**：如电商网站的“商品卡片”、音乐播放器的“进度条”
3. **第三方插件集成**：封装地图、图表等第三方功能为自定义标签

### 2. 代码示例

:::code-group
<<< @/examples/base/js/WebComponents/CustomElements/index.js [基础语法]
<<< @/examples/base/js/WebComponents/CustomElements/finally.js [完整示例]
:::

### 3. 在线演示

:::demo
base/js/WebComponents/CustomElements/index
:::

### 4. API

- **`customElements.define(name, constructor, options?)`**
  - 注册自定义元素
  - `name` 自定义元素名
  - `constructor` 自定义元素构造器。需继承自 `HTMLElement`
  - `options` 自定义元素配置对象
    - `extends` 继承的自定义元素名
- **`static observedAttributes`**
  - 监听的属性名
  - `static observedAttributes = ['name', 'age']`
  - `static get observedAttributes () { return ['name', 'age'] }`
- **`attributeChangedCallback(attrName, oldVal, newVal)`**
  - 元素的被观察属性变化时触发，需配合 `observedAttributes` 静态属性使用
  - `attrName` 变化的属性名
  - `oldVal` 变化前的属性值
  - `newVal` 变化后的属性值
- **`connectedCallback()`**
  - 元素首次插入 DOM 时触发，用于初始化 DOM 或资源加载
- **`disconnectedCallback()`**
  - 元素从 DOM 移除时触发，用于清理资源

## 二、Shadow DOM <Sound word="Shadow DOM"/>

> Web Components 的封装层技术，通过创建隔离的 DOM 子树（Shadow Tree）与样式作用域，将组件内部结构、样式与外部环境解耦。

### 1. 应用场景

1. **组件样式隔离**：避免组件内样式影响全局 CSS
2. **动态主题切换**：在 Shadow DOM 内隔离主题样式，实现动态更换
3. **封装复杂组件**：如视频播放器，隐藏内部实现细节

### 2. 代码示例

<<< @/examples/base/js/WebComponents/ShadowDOM/index.js [基础语法]

### 3. 在线演示

:::demo
base/js/WebComponents/ShadowDOM/index
:::

### 4. **`<slot>`** 插槽

#### 代码示例

<<< @/examples/base/js/WebComponents/ShadowDOM/slot.js{14-18,27-36,40-41,44-45} [插槽/样式穿透]

#### 在线演示

:::demo
base/js/WebComponents/ShadowDOM/slot
:::

#### CSS继承

- 继承属性
  > 继承属性会从父元素传递到子元素（包括穿透 Shadow DOM 边界）
  - 字体相关
    - `font-family`/`font-size`/`font-weight`/`font-style`/`line-height`
  - 文本相关
    - `color`/`text-align`/`text-indent`
  - 其他
    - `visibility`/`cursor`/`list-style-type`/`list-style-image`/`quotes`
- 非继承属性
  > 非继承属性不会自动传递给子元素，子元素需显式设置
  - 盒模型
    - `width`/`height`/`margin`/`padding`/`border`/`box-sizing`
  - 布局信息
    - `display`/`position`/`float`/`top`/`right`/`bottom`/`left`
  - 其他
    - `background-color`/`background-image`/`border-radius`/`overflow`/`z-index`

### 5. API

- `Element.attachShadow({ mode })` 创建并附加 Shadow DOM 到宿主元素
  - `mode`: `"open"` 允许外部访问，`"closed"` 禁止访问
- `ShadowRoot.innerHTML` 设置 Shadow DOM 内部结构
- `::slotted(selector)` 样式穿透伪元素。用于样式化被 `<slot>` 投影的内容
- `<slot name="...">` 插槽。可通过 `name` 属性实现具名插槽

## 三、HTML Templates <Sound word="HTML Templates"/>

> Web Components 的静态内容模板技术，允许开发者定义可复用的 HTML 结构，方便组件化开发。

### 1. 应用场景

1. **动态内容生成**：根据数据渲染列表、表格等动态内容
2. **重复结构复用**：如表格行、模态框的通用结构
3. **条件渲染**：按需显示/隐藏预定义的模板内容

### 2. 代码示例

<<< @/examples/base/js/WebComponents/HTMLTemplates/index.js

### 3. 在线演示

:::demo
base/js/WebComponents/HTMLTemplates/index
:::

### 4. API

- **`<template>`**
  - 定义可复用的 HTML 模板，内容不会被渲染，直到被 JavaScript 激活
- **`template.content`**
  - 获取模板的文档片段（`DocumentFragment`）
  - 通过 `cloneNode(true)` 克隆辅助使用
