<script setup lang="ts"></script>

<template>
  <div>home</div>
</template>

<style scoped lang="scss">
div {
  position: relative;
  padding: 10px;
  // box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;

  box-shadow: inset 0 4px 6px rgba(255, 0, 0, 0.3),
    /* 下阴影 */ inset 0 -4px 6px rgba(0, 255, 0, 0.3); /* 上阴影 */

  &::before {
    position: absolute;
    top: 0;
    left: 30%;
    content: '';
    display: block;
    // border-left: 10px solid red;

    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
    border-left: 50px solid #000;
  }
}
</style>
