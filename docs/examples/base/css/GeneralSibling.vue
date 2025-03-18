<script setup lang="ts"></script>

<template>
  <div class="demo-only-show">
    <h1>h1</h1>
    <p>p1</p>
    <div>div</div>
    <p>p2</p>
  </div>
</template>

<style scoped lang="scss">
h1 ~ p {
  color: red;
}
</style>
