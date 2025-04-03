<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'

// 响应式状态
const measureElement = ref<HTMLElement | null>(null)

const isHiddenScroll = ref(false)
// 尺寸指标
const box = reactive({
  boxSizing: 'border-box',
  contentWidth: 0,
  contentHeight: 0,
  padding: 20,
  margin: 30,

  offset: { width: 0, height: 0 },
  client: { width: 0, height: 0 },
  scroll: { width: 0, height: 0 },
  BCR: { width: 0, height: 0 },
  style: { width: 0, height: 0 },
})

// 初始测量
onMounted(() => {
  const ob = new ResizeObserver((entries) => {
    Object.assign(box, {
      contentWidth: entries[0].contentRect.width,
      contentHeight: entries[0].contentRect.height,

      offset: {
        width: entries[0].target.offsetWidth,
        height: entries[0].target.offsetHeight,
      },
      client: {
        width: entries[0].target.clientWidth,
        height: entries[0].target.clientHeight,
      },
      scroll: {
        width: entries[0].target.scrollWidth,
        height: entries[0].target.scrollHeight,
      },
      BCR: {
        width: entries[0].target.getBoundingClientRect().width,
        height: entries[0].target.getBoundingClientRect().height,
      },
      style: {
        width: getComputedStyle(entries[0].target).width,
        height: getComputedStyle(entries[0].target).height,
      },
    })
  })

  ob.observe(measureElement.value!)
})
</script>

<template>
  <div class="geometry-container">
    <div class="control-panel">
      <el-form label-width="auto" size="small">
        <el-form-item label="Box-sizing">
          <el-radio-group v-model="box.boxSizing">
            <el-radio label="border-box" value="border-box" />
            <el-radio label="content-box" value="content-box" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="隐藏滚动">
          <el-checkbox v-model="isHiddenScroll" />
        </el-form-item>

        <el-form-item label="Border">10px</el-form-item>

        <el-form-item label="Padding">
          <el-slider v-model="box.padding" :min="0" :max="50" show-input />
        </el-form-item>

        <el-form-item label="margin">
          <el-slider v-model="box.margin" :min="0" :max="50" show-input />
        </el-form-item>
      </el-form>
    </div>

    <div
      ref="measureElement"
      class="measure-box"
      :class="{ 'is-hidden-scroll': isHiddenScroll }"
      :style="{
        boxSizing: `${box.boxSizing}`,
        padding: `${box.padding}px`,
        margin: `${box.margin}px`,
      }"
    >
      内容区域
      <span class="size-label"
        >{{ box.contentWidth }}x{{ box.contentHeight }}</span
      >

      <div class="inner-box"></div>
    </div>

    <div class="metric-display">
      <div>
        offsetWidth/offsetHeight:
        {{ box.offset.width }} x {{ box.offset.height }}
      </div>
      <div>
        clientWidth/clientHeight:
        {{ box.client.width }} x {{ box.client.height }}
      </div>
      <div>
        scrollWidth/scrollHeight:
        {{ box.scroll.width }} x {{ box.scroll.height }}
      </div>
      <div>
        BCRWidth/BCRHeight:
        {{ box.BCR.width }} x {{ box.BCR.height }}
      </div>
      <div>
        styleWidth/styleHeight:
        {{ box.style.width }} x {{ box.style.height }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.geometry-container {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  margin: 20px 0;
  user-select: none;
}

.measure-box {
  height: 100px;
  border: 10px solid #42b983;
  transition: all 0.3s ease;
  position: relative;
  overflow: auto;

  &.is-hidden-scroll::-webkit-scrollbar {
    display: none;
  }

  .size-label {
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 0.8em;
    color: #666;
  }

  .inner-box {
    width: 200%;
    height: 500%;
  }
}

.metric-display {
  margin-top: 20px;
  padding: 5px 15px;
  background-color: var(--vp-code-block-bg);
  border-radius: 4px;

  div {
    font-family: monospace;
    margin: 5px 0;
  }
}
</style>
