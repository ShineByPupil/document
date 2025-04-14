<style scoped lang="scss">
.scroll-snap-x {
  overflow-x: auto;
  scroll-snap-type: x mandatory; /* X轴强制对齐 */
  scrollbar-width: none;
}
.scroll-snap-x div {
  scroll-snap-align: start; /* 对齐起始位置: start, center, end */
}

.scroll-snap-y {
  overflow-y: auto;
  scroll-snap-type: y proximity; /* Y轴接近对齐 */
}
</style>

<template>
  <div class="scroll-snap">
    <!-- 横向轮播图 -->
    <div class="carousel scroll-snap-x">
      <template v-for="i in 10">
        <div class="product-card">商品{{ i }}</div>
      </template>
    </div>

    <!-- 垂直分页 -->
    <div class="page-container scroll-snap-y">
      <template v-for="i in 10">
        <div class="page">第{{ i }}页</div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:list';
$colors: #ff6b6b, #4ecdc4, #45b7d1;

.scroll-snap {
  background: var(--bg-color-soft);
  color: white;
  text-shadow: 0 2px 4px #000000;
}

/* 横向商品轮播图 */
.carousel {
  display: flex;
  gap: 20px;
  padding: 20px 0;
}
/* 商品卡片 */
.carousel .product-card {
  min-width: 30%; /* 手机端占屏幕80%宽度 */
  padding: 20px;
  border-radius: 10px;

  @for $i from 0 to 3 {
    &:nth-child(#{list.length($colors)}n + #{$i + 1}) {
      background: list.nth($colors, ($i % list.length($colors)) + 1);
    }
  }
}

/* 垂直分页效果 */
.page-container {
  height: 50vh; /* 全屏高度 */
}

.page-container .page {
  scroll-snap-align: start; /* 对齐顶部 */
  height: 100%;
  padding: 20px;

  @for $i from 0 to 3 {
    &:nth-child(#{list.length($colors)}n + #{$i + 1}) {
      background: list.nth($colors, ($i % list.length($colors)) + 1);
    }
  }
}
</style>
