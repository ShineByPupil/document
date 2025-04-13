### position 定位模式

| 属性值     | 发音                     | 定位基准            | 文档流 | 层叠控制 | 典型场景        |
| ---------- | ------------------------ | ------------------- | ------ | :------: | --------------- |
| `static`   | <Sound word="static"/>   | 正常流              | 保持   |    ❌    | 默认布局        |
| `relative` | <Sound word="relative"/> | 自身原始位置        | 保持   |    ✔️    | 微调元素位置    |
| `absolute` | <Sound word="absolute"/> | 最近的定位祖先      | 脱离   |    ✔️    | 弹出层/精准定位 |
| `fixed`    | <Sound word="fixed"/>    | 视口                | 脱离   |    ✔️    | 固定导航栏      |
| `sticky`   | <Sound word="sticky"/>   | 最近滚动容器 + 视口 | 混合   |    ✔️    | 吸顶效果        |

### **`z-index`** 与层叠规则

- **层叠上下文**
  - 一个独立的渲染层级，内部元素的层叠顺序在此上下文中计算，最终整个上下文作为一个整体参与父上下文的层级比较
- **层叠顺序**
  1. 根元素的背景/边框 `<html>`
  2. 定位元素（负 `z-index`）
  3. 块级元素（`block`）
  4. 浮动元素（`float`）
  5. 行内元素（`inline`）
  6. 定位元素（无 `z-index`）
  7. 定位元素（正 `z-index`）
- **创建新的层叠上下文**

:::code-group

```css [position]
.box {
  position: relative; /* 或者 absolute */
  z-index: 0; /* z-index ≠ auto */
}

.box {
  position: fixed; /* 或者 sticky，无需设置 z-index */
}
```

```css [flex/grid]
.box {
  display: flex; /* 或者 grid */
  z-index: 0; /* z-index ≠ auto */
}
```

```css [合成层]
.box {
  opacity: 0.5; /*  opacity < 1 */
}

/* 创建合成层也会生成新的层叠上下文 */
.box {
  transform: translateX(100px); /* 或者 filter: blur(5px) */
}

.box {
  will-change: transform;
}
```

:::
