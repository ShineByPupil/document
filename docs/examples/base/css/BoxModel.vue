<template>
  <div class="container">
    <div class="box-model">
      <!-- 宽度标注线 -->
      <div class="width-indicator">
        <div class="measure-line"></div>
        <span class="measure-text">width</span>
      </div>

      <div class="height-indicator">
        <div class="measure-line"></div>
        <span class="measure-text">height</span>
      </div>

      <div class="margin-area">
        <span class="label margin-label">margin</span>
        <div class="border-area">
          <span class="label border-label">border</span>
          <div class="padding-area">
            <span class="label padding-label">padding</span>
            <div class="content-area">
              <span class="label content-label">content</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 控制面板 -->
  <div class="controls">
    <div class="switch-container">
      <span>标准模型</span>
      <label class="switch">
        <input type="checkbox" v-model="isIEModel">
        <span class="slider"></span>
      </label>
      <span>IE模型</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const isIEModel = ref(false);
const width = computed(() => !isIEModel.value ? '4rem' : '10rem')
const height = computed(() => !isIEModel.value ? '3rem' : '9rem')
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.controls {
  display: flex;
  justify-content: center;
  color: var(--text-color);

  .switch-container {
    $switch-width: 60px;
    $switch-height: 34px;
    $slider-size: 26px;
    $transition: 0.4s;

    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 14px;

    .switch {
      position: relative;
      display: inline-block;
      width: $switch-width;
      height: $switch-height;

      input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: $transition;
        border-radius: $switch-height;

        &::before {
          position: absolute;
          content: "";
          height: $slider-size;
          width: $slider-size;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: $transition;
          border-radius: 50%;
        }
      }

      input:checked + .slider {
        background-color: #2196F3;

        &::before {
          transform: translateX($switch-width - $slider-size - 8px);
        }
      }
    }
  }
}

.box-model {
  display: inline-block;
  position: relative;

  .width-indicator {
    position: absolute;
    top: -1.5rem; // 整体上移
    left: 50%;
    transform: translateX(-50%);
    width: v-bind(width);
    transition: width 0.3s ease-in-out;

    .measure-line {
      position: relative;
      height: 2px;
      background: var(--text-color);

      // 左右箭头
      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border: 5px solid transparent;
      }


      &::before { // 左箭头
        left: 0;
        border-right-color: var(--text-color);
        transform: translate(-6px, -4px);
      }

      &::after { // 右箭头
        right: 0;
        border-left-color: var(--text-color);
        transform: translate(6px, -4px);
      }

    }

    .measure-text {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 0.7rem;
      white-space: nowrap;
      background-color: var(--vp-c-bg);
      padding: 0.3rem;
      line-height: 12px;
    }
  }

  .height-indicator {
    position: absolute;
    top: 50%;
    right: -1.5rem; // 移到右侧外部
    transform: translateY(-50%);
    height: v-bind(height);
    transition: height 0.3s ease-in-out;

    .measure-line {
      position: relative;
      width: 2px;
      height: 100%;
      background: var(--text-color);
      margin: 0 auto;

      // 上下箭头
      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border: 5px solid transparent;
      }

      &::before { // 上箭头
        top: 0;
        border-bottom-color: var(--text-color);
        transform: translate(-4px, -6px);
      }

      &::after { // 下箭头
        bottom: 0;
        border-top-color: var(--text-color);
        transform: translate(-4px, 6px);
      }
    }

    .measure-text {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      transform-origin: left center;
      font-size: 0.7rem;
      white-space: nowrap;
      background: var(--vp-c-bg);
      padding: 0.3rem;
      line-height: 12px;
    }
  }

  .label {
    position: absolute;
    font-size: 0.7rem;
    color: #333;
    border-radius: 0.2rem;
  }

  .margin-area {
    background-color: #ffeeba; // 明黄色
    padding: 1.5rem;
    position: relative;

    .margin-label {
      top: 0.1rem;
      left: 0.5rem;
    }
  }

  .border-area {
    border: 1.5rem solid #ffa94d; // 橙色
    position: relative;

    .border-label {
      top: -1.4rem;
      left: -1rem;
    }
  }

  .padding-area {
    background-color: #c3e6cb; // 浅绿色
    padding: 1.5rem;
    position: relative;

    .padding-label {
      top: 0.1rem;
      left: 0.4rem;
    }
  }

  .content-area {
    background-color: #a0d8ef; // 浅蓝色
    width: 4rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .content-label {
      bottom: 50%;
      right: 50%;
      transform: translate(50%, 50%);
    }
  }
}
</style>
