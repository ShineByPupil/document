<script setup>
import { ref } from 'vue'

const activeNames = ref(['1', '2'])

// 父容器控制
import { containerProps, containerStyles, reset as resetContainer } from './containerProps.ts'

// 子容器控制
import {
  sizeUnits,
  alignOptions,
  currentIndex,
  toggleActive,
  items,
  flexItemModel,
  addItem,
  reset as resetItems,
  removeItem,
  getItemStyle
} from './ItemsManager.ts'

const reset = () => {
  resetContainer()
  resetItems()
}
</script>

<template>
  <div class="flex-playground">
    <!-- 可视化容器 -->
    <article class="flex-container" :style="containerStyles">
      <!-- 动态子项目 -->
      <div
          v-for="(item, index) in items"
          :key="index"
          class="flex-item"
          :class="{ active: currentIndex === index }"
          :style="getItemStyle(item)"
          @click="toggleActive(index)"
      >
        {{ index + 1 }}
      </div>
    </article>

    <el-collapse v-model="activeNames">
      <el-collapse-item :title="`容器控制区：${ items.length }个元素`" name="1">
        <el-form class="controls flex-controls" label-width="auto" label-position="top">
          <el-button-group size="small">
            <el-button :disabled="items.length >= 6" @click="addItem">增加</el-button>
            <el-button :disabled="items.length <= 3" @click="removeItem">减少</el-button>
            <el-button @click="reset">重置</el-button>
          </el-button-group>

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
      </el-collapse-item>

      <el-collapse-item :title="`容器子项目控制区：Item ${ currentIndex + 1 }`" name="2">
        <el-form class="controls flex-item-controls" :model="flexItemModel" label-width="auto">
          <el-form-item label="flex-grow">
            <el-slider size="small" :max="2" :step="0.1" v-model="flexItemModel.flexGrow"/>
          </el-form-item>

          <el-form-item label="flex-shrink">
            <el-slider size="small" :max="2" :step="0.1" v-model="flexItemModel.flexShrink"/>
          </el-form-item>

          <el-form-item label="flex-basis">
            <el-input size="small" type="number" v-model.number="flexItemModel.flexBasis.value">
              <template #append>
                <el-select size="small" v-model="flexItemModel.flexBasis.unit" style="width: 4rem">
                  <el-option v-for="unit in sizeUnits" :value="unit">{{ unit }}</el-option>
                </el-select>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="order">
            <el-input size="small" type="number" v-model.number="flexItemModel.order"></el-input>
          </el-form-item>

          <el-form-item label="align-self">
            <el-radio-group v-model="flexItemModel.alignSelf" size="small">
              <el-radio-button v-for="opt in alignOptions" :label="opt" :value="opt"/>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="scss" scoped>
$colors: #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEEAD, #D4A5A5;

.flex-playground {
  margin-top: 6px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;

  // 可视化区域
  .flex-container {
    display: flex;
    width: 16rem;
    height: 16rem;
    background: var(--vp-c-bg-soft);
    border-radius: 8px;
    margin: 20px auto;
    padding: 10px;

    .flex-item {
      color: #FFFFFF;
      text-shadow: 0 2px 4px #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 2rem;
      min-height: 2rem;
      border-radius: 6px;
      transition: all 0.3s;
      cursor: pointer;

      @for $i from 0 to 24 { // 支持最多24个项目循环
        &:nth-child(#{length($colors)}n + #{$i + 1}) {
          background: nth($colors, ($i % length($colors)) + 1);
        }
      }
    }
  }

  // 控制面板
  :deep(.el-collapse) {
    .el-collapse-item__content {
      padding: 0;
    }
  }

  form.controls {
    padding: 10px;
    background: var(--vp-c-bg-soft);
    border-radius: 6px;

    .el-form-item {
      margin-bottom: 0;

      :deep(label.el-form-item__label) {
        margin-bottom: 0;
      }
    }
  }
}
</style>
