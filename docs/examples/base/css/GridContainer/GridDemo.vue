<template>
  <div class="grid-demo">
    <div class="grid-container" :style="gridStyles">
      <template v-if="activeTab === 'areasConfig'">
        <div
            class="grid-item"
            v-for="n in itemCount"
            :key="n"
            :style="{ gridArea: `a${ n }` }"
        >{{ `a${ n }` }}
        </div>
      </template>

      <template v-else>
        <div class="grid-item" v-for="n in itemCount" :key="n">{{ n }}</div>
      </template>

    </div>

    <div class="controls">
      <el-tabs type="border-card" v-model="activeTab" @tabChange="handleTabChange">
        <el-form ref="formRef" :model="gridConfig" label-width="auto">
          <el-tab-pane label="轨道设置" name="trackConfig">
            <TrackControls v-model="gridConfig" v-model:count="itemCount"/>
          </el-tab-pane>

          <el-tab-pane label="区域设置" name="areasConfig">
            <AreasControls v-model="gridConfig" v-model:count="itemCount"/>
          </el-tab-pane>

          <el-tab-pane label="间距设置" name="gapConfig">
            <GapControls v-model="gridConfig"/>
          </el-tab-pane>
        </el-form>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, provide } from 'vue'
import TrackControls from './TrackControls.vue'
import AreasControls from './AreasControls.vue'
import GapControls from './GapControls.vue'

const formRef = ref()
const itemCount = ref(9)
const activeTab = ref('trackConfig')

const gridConfig = reactive({
  columns: '1fr 1fr 1fr',
  rows: '1fr 1fr 1fr',
  autoFlow: 'row',
  autoColumns: '',
  autoRows: '',
  justifyItems: 'stretch',
  alignItems: 'stretch',
  justifyContent: 'start',
  alignContent: 'start',
  areas: `"a1 a1 a1"\n"a2 a3 a3"\n"a2 a3 a3"`,
  gap: '10px',
  rowGap: '',
  columnGap: ''
})

const gridStyles = computed(() => {
  return {
    display: 'grid',
    gridTemplateColumns: gridConfig.columns,
    gridTemplateRows: gridConfig.rows,
    gridAutoFlow: gridConfig.autoFlow,
    gridAutoColumns: gridConfig.autoColumns,
    gridAutoRows: gridConfig.autoRows,
    justifyItems: gridConfig.justifyItems,
    alignItems: gridConfig.alignItems,
    justifyContent: gridConfig.justifyContent,
    alignContent: gridConfig.alignContent,
    gridTemplateAreas: activeTab.value === 'areasConfig' ? gridConfig.areas : undefined,
    gap: '10px',
    ...activeTab.value === 'gapConfig' && {
      gap: gridConfig.gap,
      rowGap: gridConfig.rowGap || 'auto',
      columnGap: gridConfig.columnGap || 'auto',
    },

  }
})

const handleTabChange = function (tab) {
  reset()

  itemCount.value = tab === 'areasConfig' ? 3 : 9;
}

const reset = function () {
  formRef.value.resetFields()
}
provide('reset', reset)
</script>

<style lang="scss" scoped>
$colors: #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEEAD, #D4A5A5;

.grid-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;

  .grid-container {
    width: 16rem;
    height: 16rem;
    margin: 0 auto 1rem;
    padding: 0.6rem;

    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;

    .grid-item {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #FFFFFF;
      text-shadow: 0 2px 4px #000000;

      @for $i from 0 to 9 { // 支持最多24个项目循环
        &:nth-child(#{length($colors)}n + #{$i + 1}) {
          background: nth($colors, ($i % length($colors)) + 1);
        }
      }
    }
  }

  .controls {
    :deep(.el-collapse) {
      .el-collapse-item__header {
        justify-content: space-between;
      }

      .el-collapse-item__content {
        padding-bottom: 0;
      }

    }
  }
}
</style>
