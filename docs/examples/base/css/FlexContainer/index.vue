<script setup>
import { reactive, computed } from 'vue'

const containerProps = reactive({
  flexDirection: { value: 'row', options: ['row', 'row-reverse', 'column', 'column-reverse'] },
  flexWrap: { value: 'nowrap', options: ['nowrap', 'wrap', 'wrap-reverse'] },
  justifyContent: {
    value: 'flex-start',
    options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']
  },
  alignItems: { value: 'stretch', options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'] },
  alignContent: { value: 'stretch', options: ['stretch', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around'] },
  gap: { value: 0, options: [0, 1, 2, 3] }
})

const createNewItem = () => ({ order: 0, flexGrow: 0, flexShrink: 1, flexBasis: 4, alignSelf: 'auto' })

const items = reactive([createNewItem(), createNewItem(), createNewItem()])
const amount = computed(() => items.length)

const addItem = function ()  {
  items.push({ order: 0, flexGrow: 0, flexShrink: 1, flexBasis: 4, alignSelf: 'auto' })
}
const removeItem = function ()  {
  items.pop()
}
const reset = function ()  {
  items.splice(0, items.length)
  items.push(createNewItem(), createNewItem(), createNewItem())
  containerProps.flexDirection.value = 'row'
  containerProps.flexWrap.value = 'nowrap'
  containerProps.justifyContent.value = 'flex-start'
  containerProps.alignItems.value = 'stretch'
  containerProps.alignContent.value = 'stretch'
  containerProps.gap.value = 0
}
</script>

<template>
  <div class="flex-playground">
    <!-- 可视化区域 -->
    <div
        class="flex-container"
        :style="{
        display: 'flex',
        flexDirection: containerProps.flexDirection.value,
        flexWrap: containerProps.flexWrap.value,
        justifyContent: containerProps.justifyContent.value,
        alignItems: containerProps.alignItems.value,
        alignContent: containerProps.alignContent.value,
        gap: `${containerProps.gap.value}rem`
      }"
    >
      <div
          v-for="(item, index) in items"
          :key="index"
          class="flex-item"
          :style="{
          order: item.order,
          flexGrow: item.flexGrow,
          flexShrink: item.flexShrink,
          flexBasis: `${item.flexBasis}rem`,
          alignSelf: item.alignSelf
        }"
      >
        {{ index + 1 }}
      </div>
    </div>

    <!-- 控制面板 -->
    <el-form class="controls" :model="containerProps" label-width="auto">
      <el-form-item :label="`数量: ${amount}`">
        <el-button-group size="small">
          <el-button :disabled="amount >= 6" @click="addItem">增加</el-button>
          <el-button :disabled="amount <= 3" @click="removeItem">减少</el-button>
          <el-button @click="reset">重置</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item
          v-for="[propKey, propValue] in Object.entries(containerProps)"
          :key="propKey"
          :label="propKey"
      >
        <el-radio-group v-model="containerProps[propKey].value" size="small">
          <el-radio-button v-for="opt in propValue.options" :label="opt" :value="opt"/>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>


<style lang="scss" scoped>
$colors: #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEEAD, #D4A5A5;

.flex-playground {
  margin-top: 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;

  // 可视化区域
  .flex-container {
    box-sizing: border-box;
    width: 16rem;
    height: 16rem;
    background: var(--vp-c-bg-soft);
    margin: 20px auto;
    padding: 10px;
    border-radius: 4px;

    .flex-item {
      color: #FFFFFF;
      transition: all 1s;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 2rem;
      min-height: 2rem;

      @for $i from 0 to 24 { // 支持最多24个项目循环
        &:nth-child(#{length($colors)}n + #{$i + 1}) {
          background: nth($colors, ($i % length($colors)) + 1);
        }
      }
    }
  }

  // 控制面板
  form.controls {
    .el-form-item {
      margin-bottom: 0;

      :deep(label.el-form-item__label) {
        margin-bottom: 0;
      }
    }
  }
}
</style>
