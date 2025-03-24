<script setup lang="ts">
import UseAttrsChildren from './UseAttrsChildren.vue'
</script>

<template>
  <div class="parent demo-container">
    <p>children 组件</p>

    <UseAttrsChildren
      class="child"
      id="submit-btn"
      @click="() => {}"
      data-cy="submit-button"
    ></UseAttrsChildren>
  </div>
</template>

<style scoped lang="scss"></style>
