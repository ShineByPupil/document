> 浮动（float）诞生于网页排版时代，最初设计目的为了实现 **图文混排效果**

<h3>清除浮动</h3>

:::code-group

```html [空元素清除法]
<!-- 简单直接，但污染HTML结构 -->
<div class="parent">
  <div class="float-left">浮动元素</div>
  <div style="clear: both"></div>
  <!-- 清除锚点 -->
</div>
```

```css [BFC: overflow]
/* 纯CSS，但滚动条影响使用 */
.parent {
  overflow: hidden; /* 或 auto */
}
```

```css [伪元素]
/* 通用clearfix方案 */
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}

/* 兼容旧版IE */
.clearfix {
  zoom: 1; /* 触发hasLayout */
}
```

```css [flow-root]
.parent {
  display: flow-root; /* 创建BFC */
}
```

:::
