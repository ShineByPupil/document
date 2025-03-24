<script setup lang="ts">
import { ref } from 'vue'
import UseSlotsChildren from './UseSlotsChildren.vue'

const isShow = ref(true)
</script>

<template>
  <div class="parent demo-container">
    <p>parent 组件</p>

    <el-switch v-model="isShow" active-text="显示" inactive-text="隐藏" />

    <UseSlotsChildren>
      <template v-if="isShow" #footer>
        <div>自定义 Footer</div>
      </template>
    </UseSlotsChildren>
  </div>
</template>

<style scoped lang="scss"></style>
