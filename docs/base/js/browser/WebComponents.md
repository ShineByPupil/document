# Web Components <Sound word="Web Components"/>

> W3C 标准化的原生组件化方案，其以浏览器原生支持取代框架依赖

## 一、Custom Elements <Sound word="Custom Elements"/>

> 允许开发者通过 JavaScript 扩展或自定义全新的 HTML 元素

### 1. 核心特性

- **自定义标签**
  - 允许开发者创建全新的 HTML 标签（如 `<my-button>`），扩展 HTML 语义
- **生命周期钩子**
  - 提供元素插入 DOM 时触发、元素移除时触发、属性变化时触发等生命周期方法
- **继承现有元素**
  - 可通过 `extends` 继承原生元素（如 `class MyButton extends HTMLButtonElement`），复用原生功能
- **命名规范**
  - 自定义元素名称必须包含连字符（如 `<my-button>`），避免与原生标签冲突

### 2. 应用场景

- **UI 组件库**
  - 构建可复用的 UI 组件，封装交互逻辑和默认行为，提升跨项目复用性
- **扩展原生元素**
  - 继承原生标签（如增强 `<button>` 的功能），添加动画、数据绑定等特性，保留原生语义和可访问性
- **微前端架构**
  - 不同团队开发的微应用通过自定义标签（如 `<app-header>`、`<dashboard-widget>`）集成，实现松耦合
- **动态功能注入**
  - 根据运行时条件（如用户权限）动态注册或卸载自定义元素，灵活控制页面功能

### 3. 代码示例

:::code-group
<<< @/examples/base/js/WebComponents/CustomElements/index.js [基础语法]
<<< @/examples/base/js/WebComponents/CustomElements/finally.js [完整示例]
:::

### 4. 在线演示

:::demo
base/js/WebComponents/CustomElements/index
:::

### 5. API

- **`customElements.define()`** <Sound word="define"/>
  > 注册自定义元素
  - `name: string` 自定义元素名
  - `constructor: { new(...params: any[]): HTMLElement }` 自定义元素构造器
  - `options?: { extends?: string }` 自定义元素配置对象
    - `extends` 继承的自定义元素名
- **`static observedAttributes`** <Sound word="observedAttributes"/>
  > 监听的属性名
  - `static observedAttributes = ['name', 'age']`
  - `static get observedAttributes () { return ['name', 'age'] }`
- **`attributeChangedCallback()`** <Sound word="attributeChangedCallback"/>
  > 元素的被观察属性变化时触发，需配合 `observedAttributes` 静态属性使用
  - `attrName: string` 变化的属性名
  - `oldVal: string | null` 变化前的属性值
  - `newVal: string | null` 变化后的属性值
- **`connectedCallback()`** <Sound word="connectedCallback"/>
  - 元素首次插入 DOM 时触发，用于初始化 DOM 或资源加载
- **`adoptedCallback()`** <Sound word="adoptedCallback"/>
  - 元素被移动到新的文档时触发，用于跨文档移动
- **`disconnectedCallback()`** <Sound word="disconnectedCallback"/>
  - 元素从 DOM 移除时触发，用于清理资源

## 二、Shadow DOM <Sound word="Shadow DOM"/>

> Web Components 的封装层技术，通过创建隔离的 DOM 子树（Shadow Tree）与样式作用域，将组件内部结构、样式与外部环境解耦。

### 1. 核心特性

- **封装隔离**
  - 创建独立的 DOM 子树（Shadow Tree），与主文档 DOM 隔离，避免外部 CSS 或 JavaScript 干扰
- **Shadow Root**
  - 通过 `element.attachShadow({ mode: 'open' })` 创建根节点，作为 Shadow DOM 的入口
- **作用域 CSS**
  - Shadow DOM 内的样式仅作用于内部元素，外部样式不侵入，内部样式也不泄漏（可通过 `::part()` 或 CSS 变量可控暴露）
- **插槽（Slots）**
  - 使用 `<slot>` 实现内容分发，允许外部内容插入到 Shadow DOM 的指定位置

### 2. 应用场景

- **第三方插件/小工具**
  - 开发嵌入第三方页面的组件（如评论框、广告条），避免与宿主页面冲突
- **复杂组件封装**
  - 如视频播放器（`<video-player>`），内部结构复杂且需独立样式（进度条、控制按钮），避免外部 CSS 覆盖
- **主题化组件**
  - 通过 CSS 变量（`var(--theme-color)`）暴露可控样式接口，允许外部调整组件主题，同时保护内部样式细节
- **避免全局污染**
  - 在大型应用中，防止团队协作时的样式命名冲突

### 3. 代码示例

<<< @/examples/base/js/WebComponents/ShadowDOM/index.js [基础语法]

### 4. 在线演示

:::demo
base/js/WebComponents/ShadowDOM/index
:::

### 5. **`<slot>`** 插槽

#### 代码示例

<<< @/examples/base/js/WebComponents/ShadowDOM/slot.js{14-18,27-36,40-41,44-45} [插槽/样式穿透]

#### 在线演示

:::demo
base/js/WebComponents/ShadowDOM/slot
:::

#### CSS继承

- **继承属性**
  > 继承属性会从父元素传递到子元素（包括穿透 Shadow DOM 边界）
  - 字体相关
    - `font-family` / `font-size` / `font-weight` / `font-style` / `line-height`
  - 文本相关
    - `color` / `text-align` / `text-indent`
  - 其他
    - `visibility` / `cursor` / `list-style-type` / `list-style-image` / `quotes`
- **非继承属性**
  > 非继承属性不会自动传递给子元素，子元素需显式设置
  - 盒模型
    - `width` / `height` / `margin` / `padding` / `border` / `box-sizing`
  - 布局信息
    - `display` / `position` / `float` / `top` / `right` / `bottom` / `left`
  - 其他
    - `background-color` / `background-image` / `border-radius` / `overflow` / `z-index`

### 6. API

- **`Element.attachShadow({ mode })`** <Sound word="attachShadow"/>
  > 创建并附加 Shadow DOM 到宿主元素
  - `mode`: `"open"` 允许外部访问，`"closed"` 禁止访问
- **`ShadowRoot.innerHTML`**
  - 设置 Shadow DOM 内部结构
- **`::slotted(selector)`**
  - 样式穿透伪元素。用于样式化被 `<slot>` 投影的内容
- **`<slot name="...">`**
  - 插槽。可通过 `name` 属性实现具名插槽

## 三、HTML Templates <Sound word="HTML Templates"/>

> Web Components 的静态内容模板技术，允许开发者定义可复用的 HTML 结构，方便组件化开发。

### 1. 核心特性

- **惰性定义**
  - 通过 `<template>` 标签定义可复用的 HTML 结构，初始加载时不渲染、不执行资源
- **按需激活**
  - 通过 JavaScript 克隆（`template.content.cloneNode(true)`）并插入文档后，内容才会生效
- **结构复用**
  - 支持结合数据动态生成内容（如循环、条件判断），作为 Custom Elements 或 Shadow DOM 的模板基础

### 2. 应用场景

- **动态内容生成**
  - 结合数据循环渲染列表、表格等动态内容
- **服务端渲染（SSR）占位**
  - 服务端返回 `<template>` 占位，客户端激活后填充动态内容，优化首屏加载体验
- **复杂结构预定义**
  - 定义模态框、表格等复杂 HTML 结构，减少客户端拼接字符串的冗余代码
- **跨组件复用片段**
  - 将通用结构（如页脚、导航栏）抽象为模板，供多个自定义元素复用

### 3. 代码示例

<<< @/examples/base/js/WebComponents/HTMLTemplates/index.js

### 4. 在线演示

:::demo
base/js/WebComponents/HTMLTemplates/index
:::

### 5. API

- **`<template>`**
  - 定义可复用的 HTML 模板，内容不会被渲染，直到被 JavaScript 激活
- **`template.content`**
  - 获取模板的文档片段（`DocumentFragment`）
  - 通过 `cloneNode(true)` 克隆辅助使用
