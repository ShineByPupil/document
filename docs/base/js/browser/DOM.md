# DOM - WEB API

> 文档对象模型。将 HTML/XML 文档抽象为节点树。提供跨平台的文档访问与操作方式，支持动态修改内容、结构和样式，是前端交互的核心基础。

## 一、插入节点

### 末尾插入

- `node.appendChild(newNode)`
- `element.append(...nodesOrStrings)`

```html
<div id="parent">
  <span>子节点1</span>
  <p>子节点2</p>
  <!-- 插入位置 -->
</div>
```

### 开头插入

- `element.prepend(...nodesOrStrings)`

```html
<div id="parent">
  <!-- 插入位置 -->
  <span>子节点1</span>
  <p>子节点2</p>
</div>
```

### 相邻插入

- `element.before(...nodesOrStrings)`

```html
<div>
  <span>子节点1</span>
  <!-- 插入位置 -->
  <p id="child">子节点2</p>
</div>
```

- `element.after(...nodesOrStrings)`

```html
<div>
  <span>子节点1</span>
  <p id="child">子节点2</p>
  <!-- 插入位置 -->
</div>
```

### 替换插入

- `node.replaceChild(newNode, oldNode)`

```html
<div id="parent">
  <span>子节点1</span>
  <oldNode>旧节点</oldNode>
  <!-- 替换位置 -->
  <p>子节点2</p>
</div>
```

- `element.replaceWith(...nodesOrStrings)`

```html
<div>
  <span>子节点1</span>
  <p id="child">子节点2</p>
  <!-- 替换位置 -->
</div>
```

### 精确插入

- `node.insertBefore(newNode, refNode)`

```html
<div id="parent">
  <!--  插入位置 -->
  <span id="refNode">子节点1</span>
  <p>子节点2</p>
</div>
```

- `element.insertAdjacentHTML(position, html)`
- `element.insertAdjacentText(position, text)`

```html
<!-- beforebegin -->
<div>
  <!-- afterbegin -->
  内容
  <!-- beforeend -->
</div>
<!-- afterend -->
```

## 二、删除节点

- `node.removeChild(childNode)`
- `element.remove()`

## 三、克隆节点

> 深度克隆（包括子节点，dom0事件被克隆，dom2事件不被克隆）

- `node.cloneNode(deep)`

## 四、节点遍历

- `node.childNodes` 返回包含所有类型子节点
- `node.firstChild` / `node.lastChild` 返回第一个/最后一个子节点
- `node.parentNode` 直接父节点
- `node.nextSibling` / `node.previousSibling` 返回相邻的下一个/上一个兄弟节点
- `element.children` 仅包含元素子节点（忽略文本、注释等）
- `element.firstElementChild` / `element.lastElementChild` 首尾元素子节点
- `element.parentElement` 父元素节点（仅当父节点是元素时有效）
- `element.nextElementSibling` / `element.previousElementSibling` 相邻元素兄弟节点

## 五、节点比较

- `node.contains(otherNode)` 是否包含某个节点
- `node.isEqualNode(otherNode)` 是否结构内容一致
- `node.isSameNode(otherNode)` 是否同一对象（===）
- `node.compareDocumentPosition(otherNode)` 精确判断节点之间的关系

| 常量名称                              | 值   | 说明                     |
| ------------------------------------- | ---- | ------------------------ |
| `Node.DOCUMENT_POSITION_DISCONNECTED` | `1`  | 两个节点不在同一文档树中 |
| `Node.DOCUMENT_POSITION_PRECEDING`    | `2`  | 目标节点在当前节点之前   |
| `Node.DOCUMENT_POSITION_FOLLOWING`    | `4`  | 目标节点在当前节点之后   |
| `Node.DOCUMENT_POSITION_CONTAINS`     | `8`  | 当前节点包含目标节点     |
| `Node.DOCUMENT_POSITION_CONTAINED_BY` | `16` | 当前节点被目标节点包含   |

## 六、查找接口

- **传统方法**
  - `document.getElementById(id)` 根据 ID 查找元素
  - `document.getElementsByClassName(className)` 返回具有指定类名的元素集合
  - `document.getElementsByTagName(tagName)` 返回具有指定标签名的元素集合
- **现代标准方法**
  - `element.querySelector(selector)` 返回匹配指定选择器的第一个元素
  - `element.querySelectorAll(selector)` 返回匹配选择器的所有元素
  - `element.closest(selector)` 从当前元素开始向上查找，返回最近的匹配元素

## 七、只读属性

- `node.nodeName` 节点名称
- `node.nodeType` 节点类型
- `node.nodeValue` 文本/注释的值
- `node.textContent` 节点所有纯文本内容

## 八、属性操作

- `element.setAttribute(name, value)` 设置指定元素上的属性值
- `element.getAttribute(name)` 返回元素的属性值
- `element.toggleAttribute(name, force?)` 切换元素的某个布尔属性的状态
- `element.hasAttribute(name)` 返回布尔值，元素的指定属性是否存在
- `element.removeAttribute(name)` 移除当前元素上的属性
