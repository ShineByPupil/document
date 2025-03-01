<script setup>
import { inject } from 'vue'

const reset = inject('reset')
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

const options1 = ['start', 'end', 'center', 'stretch']
const options2 = ['start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly']

const toggleEx = function (type) {
  reset();

  switch (type) {
    case 'fr':
      emit('update:count', 6)
      Object.assign(prop.modelValue, {
        columns: '1fr 2fr 1fr',
        rows: '1fr 1fr',
      })
      break;
    case 'repeat':
      emit('update:count', 25)
      Object.assign(prop.modelValue, {
        columns: 'repeat(5, 1fr)',
        rows: 'repeat(5, 1fr)',
      })
      break;
    case 'autoTrack':
      emit('update:count', 3)
      Object.assign(prop.modelValue, {
        columns: 'repeat(2, 1fr)',
        rows: '',
        autoRows: '1fr',
      })
      break;
    case 'align':
      emit('update:count', 4)
      Object.assign(prop.modelValue, {
        columns: 'repeat(2, 50px)',
        rows: 'repeat(2, 50px)',
      })
      break;
  }
}
</script>

<template>
  <label>轨道：</label>

  <el-button-group size="small">
    <el-button @click="toggleEx('fr')">fr单位</el-button>
    <el-button @click="toggleEx('repeat')">repeat()函数</el-button>
  </el-button-group>

  <el-form-item label="count" prop="count">
    <el-input-number
        size="small"
        :model-value="count"
        @input="val => $emit('update:count', val)"
        :min="1"
        :max="25"
    />
  </el-form-item>

  <el-form-item label="*-template-columns" prop="columns">
    <el-input size="small" v-model="modelValue.columns"></el-input>
  </el-form-item>

  <el-form-item label="*-template-rows" prop="rows">
    <el-input size="small" v-model="modelValue.rows"></el-input>
  </el-form-item>

  <el-form-item label="*-auto-flow" prop="autoFlow">
    <el-radio-group size="small" v-model="modelValue.autoFlow">
      <el-radio-button label="row" value="row"></el-radio-button>
      <el-radio-button label="column" value="column"></el-radio-button>
      <el-radio-button label="row dense" value="row dense"></el-radio-button>
      <el-radio-button label="column dense" value="column dense"></el-radio-button>
    </el-radio-group>
  </el-form-item>

  <label>隐式轨道：</label>

  <el-button-group size="small">
    <el-button @click="toggleEx('autoTrack')">模板一</el-button>
  </el-button-group>

  <el-form-item label="*-auto-columns" prop="autoColumns">
    <el-input size="small" v-model="modelValue.autoColumns"></el-input>
  </el-form-item>

  <el-form-item label="*-auto-rows" prop="autoRows">
    <el-input size="small" v-model="modelValue.autoRows"></el-input>
  </el-form-item>

  <label>对齐设置：</label>

  <el-button-group size="small">
    <el-button @click="toggleEx('align')">模板一</el-button>
  </el-button-group>

  <el-form-item label="justify-items" prop="justifyItems">
    <el-radio-group size="small" v-model="modelValue.justifyItems">
      <el-radio-button v-for="opt in options1" :label="opt" :value="opt"></el-radio-button>
    </el-radio-group>
  </el-form-item>

  <el-form-item label="align-items" prop="alignItems">
    <el-radio-group size="small" v-model="modelValue.alignItems">
      <el-radio-button v-for="opt in options1" :label="opt" :value="opt"></el-radio-button>
    </el-radio-group>
  </el-form-item>

  <el-form-item label="justify-content" prop="justifyContent">
    <el-radio-group size="small" v-model="modelValue.justifyContent">
      <el-radio-button v-for="opt in options2" :label="opt" :value="opt"></el-radio-button>
    </el-radio-group>
  </el-form-item>

  <el-form-item label="align-content" prop="alignContent">
    <el-radio-group size="small" v-model="modelValue.alignContent">
      <el-radio-button v-for="opt in options2" :label="opt" :value="opt"></el-radio-button>
    </el-radio-group>
  </el-form-item>
</template>

<style lang="scss" scoped>
label {
  font-size: 14px;
}

.el-form-item {
  margin-bottom: 0;
}
</style>
