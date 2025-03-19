# DOM - WEB API

> 文档对象模型。将 HTML/XML 文档抽象为节点树。提供跨平台的文档访问与操作方式，支持动态修改内容、结构和样式，是前端交互的核心基础。

## DOM 树遍历

```js
// 深度优先遍历
function traverse(node) {
  console.log(node.nodeName)
  for (const child of node.childNodes) {
    traverse(child)
  }
}

// 使用 TreeWalker 高效遍历
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT)
while (walker.nextNode()) {
  console.log(walker.currentNode.tagName)
}
```

## 节点（Node）

### 插入节点

- `parent.insertBefore(newNode, referenceNode)` 将一个节点插入到指定节点之前

```html
<div id="parent">
  <!--  插入位置 -->
  <span id="referenceNode">子节点1</span>
  <p>子节点2</p>
</div>
```

- `parent.appendChild(newNode)` 将一个节点附加到指定父节点的末尾

```html
<div id="parent">
  <span>子节点1</span>
  <p>子节点2</p>
  <!-- 插入位置 -->
</div>
```

- `parent.replaceChild(newNode, oldNode)` 将一个节点替换另一个节点

```html
<div id="parent">
  <span>子节点1</span>
  <oldNode>旧节点</oldNode>
  <!-- 替换位置 -->
  <p>子节点2</p>
</div>
```

- 批量插入

```js
// 创建元素的最佳实践
const fragment = document.createDocumentFragment() // 减少重排

// 批量插入
for (let i = 0; i < 100; i++) {
  const p = document.createElement('p')
  p.textContent = `Item ${i}`
  fragment.appendChild(p)
}
document.body.appendChild(fragment)
```

### 克隆节点

```js
// 深度克隆（包括子节点，dom0事件被克隆，dom2事件不被克隆）
const clonedNode = node.cloneNode(true)
```

### 删除节点

```js
node.parentNode && node.parentNode.removeChild(node)
```

## 元素（Element）

> `Element` 是 `Node` 的子类

```js
Element.prototype instanceof Node // true
```

### 插入元素

- `parent.append(newNode)` 在当前 Element 的最后一个子节点之后插入一组 Node 对象或字符串对象

```html
<div id="parent">
  <span>子节点1</span>
  <p>子节点2</p>
  <!-- 插入位置 -->
</div>
```

- `parent.prepend(newNode)` 在当前元素的第一个子节点之前插入一组 Node 对象或字符串对象

```html
<div id="parent">
  <!-- 插入位置 -->
  <span>子节点1</span>
  <p>子节点2</p>
</div>
```

- `child.before(newNode)` 在当前元素之前插入一组 Node 对象或字符串对象

```html
<div>
  <span>子节点1</span>
  <!-- 插入位置 -->
  <p id="child">子节点2</p>
</div>
```

- `child.after(newNode)` 在当前元素之后插入一组 Node 对象或字符串对象

```html
<div>
  <span>子节点1</span>
  <p id="child">子节点2</p>
  <!-- 插入位置 -->
</div>
```

- `child.replaceWith(newNode)` 替换一组 Node 对象或字符串对象到当前元素

```html
<div>
  <span>子节点1</span>
  <p id="child">子节点2</p>
  <!-- 替换位置 -->
</div>
```

### 移除元素

```js
node.remove() // 直接移除自身
```

### 选择器

```js
// 静态选择（返回非实时集合）
const list = document.querySelectorAll('.item')

// 动态选择（返回实时 HTMLCollection）
const liveList = document.getElementsByClassName('active')

// 链式查询
const input = document
  .getElementById('form')
  .querySelector('input[name="email"]')
```

### 属性操作

```js
element.setAttribute('data-uid', '123') // 动态设置属性
const value = element.getAttribute('aria-label') // 获取属性值
element.toggleAttribute('disabled', true) // 动态切换属性
```

- dataset API

```js
// 示例1
element.dataset.userRole = 'admin'
element.dataset.userRole // 'admin'

// 示例2
element.setAttribute('data-user-role', 'admin')
element.getAttribute('data-user-role') // 'admin'
```

### 内容操作

```js
// 指定位置插入
div.insertAdjacentText('beforeend', 'New content')
div.insertAdjacentHTML('beforeend', '<p>New content</p>')

// 整体替换
div.textContent = '<script>alert(1)</script>'
div.innerHTML = '<p>New content</p>'
```

- 插入位置

```html
<!-- beforebegin -->
<div>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</div>
<!-- afterend -->
```
