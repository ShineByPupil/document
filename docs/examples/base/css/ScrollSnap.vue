<script setup lang="ts">

</script>

<template>
  <div class="scroll-snap">
    <!-- 横向轮播图 -->
    <div class="carousel">
      <div class="product-card">商品1</div>
      <div class="product-card">商品2</div>
      <div class="product-card">商品3</div>
    </div>

    <!-- 垂直分页 -->
    <div class="page-container">
      <div class="page">第一页</div>
      <div class="page">第二页</div>
      <div class="page">第三页</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scroll-snap {
  $colors: #FF6B6B, #4ECDC4, #45B7D1;

  background: var(--bg-color-soft);
  color: white;
  text-shadow: 0 2px 4px #000000;

  /* 横向商品轮播图 */
  .carousel {
    overflow-x: auto; /* 允许横向滚动 */
    scroll-snap-type: x mandatory; /* X轴强制对齐 */
    display: flex;
    gap: 20px; /* 商品间距 */
    padding: 20px 0;

    /* 隐藏滚动条（保持功能） */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none;
    }

    /* 商品卡片 */
    .product-card {
      scroll-snap-align: start; /* 对齐起始边缘 */
      min-width: 100%; /* 手机端占屏幕80%宽度 */
      padding: 20px;
      border-radius: 10px;

      @for $i from 0 to 3 {
        &:nth-child(#{length($colors)}n + #{$i + 1}) {
          background: nth($colors, ($i % length($colors)) + 1);
        }
      }
    }
  }

  /* 垂直分页效果 */
  .page-container {
    height: 50vh; /* 全屏高度 */
    overflow-y: auto;
    scroll-snap-type: y proximity; /* Y轴接近对齐 */

    .page {
      scroll-snap-align: start; /* 对齐顶部 */
      height: 100%;
      padding: 20px;

      @for $i from 0 to 3 {
        &:nth-child(#{length($colors)}n + #{$i + 1}) {
          background: nth($colors, ($i % length($colors)) + 1);
        }
      }
    }
  }
}
</style>
