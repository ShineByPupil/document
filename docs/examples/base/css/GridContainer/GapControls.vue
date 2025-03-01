<script setup>
const prop = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const toggleEx = function (id) {
  switch (id) {
    case 1:
      Object.assign(prop.modelValue, {
        gap: '',
        rowGap: '10px',
        columnGap: ''
      })
      break;
    case 2:
      Object.assign(prop.modelValue, {
        gap: '',
        rowGap: '',
        columnGap: '10px'
      })
      break;
  }
}
</script>

<template>
  <el-button-group size="small">
    <el-button @click="toggleEx(1)">模板一</el-button>
    <el-button @click="toggleEx(2)">模板二</el-button>
  </el-button-group>

  <el-form-item label="gap" prop="gap">
    <el-input size="small" v-model="modelValue.gap" placeholder="例如：10px"></el-input>
  </el-form-item>

  <el-form-item label="row-gap" prop="rowGap">
    <el-input size="small" v-model="modelValue.rowGap" placeholder="覆盖整体行间距"></el-input>
  </el-form-item>

  <el-form-item label="column-gap" prop="columnGap">
    <el-input size="small" v-model="modelValue.columnGap" placeholder="覆盖整体列间距"></el-input>
  </el-form-item>
</template>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>
