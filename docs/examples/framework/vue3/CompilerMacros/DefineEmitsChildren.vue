<script setup lang="ts">
const emit = defineEmits<{
  change: [id: number] // 具名元组语法
  update: [value: string]
}>()

const handleChange = () => {
  emit('change', 1)
}
const handleUpdate = () => {
  emit('update', '2')
}
</script>

<template>
  <div class="children demo-container">
    <p>children 组件</p>

    <el-button-group>
      <el-button @click="handleChange"> emit change </el-button>
      <el-button @click="handleUpdate"> emit update </el-button>
    </el-button-group>
  </div>
</template>

<style scoped lang="scss"></style>
