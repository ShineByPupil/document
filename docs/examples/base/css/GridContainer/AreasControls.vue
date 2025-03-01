<script setup>
const prop = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['update:count'])

const toggleEx = function (id) {
  switch (id) {
    case 1:
      emit('update:count', 5)
      prop.modelValue.areas = '"a1 a2 a2"\n"a1 a5 a3"\n"a4 a4 a3"'
      break;
    case 2:
      emit('update:count', 5)
      prop.modelValue.areas = '"a1 . a2"\n". a3 ."\n"a4 . a5"'
      break;
  }
}
</script>

<template>
  <el-button-group size="small">
    <el-button @click="toggleEx(1)">模板一</el-button>
    <el-button @click="toggleEx(2)">模板二</el-button>
  </el-button-group>

  <el-form-item label="count" prop="count">
    <el-input-number
        size="small"
        :model-value="count"
        @input="val => $emit('update:count', val)"
        :min="1"
        :max="6"
    />
  </el-form-item>

  <el-form-item label="*-template-areas" prop="areas">
    <el-input type="textarea" size="small" :rows="4" v-model="modelValue.areas"></el-input>
  </el-form-item>
</template>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>
