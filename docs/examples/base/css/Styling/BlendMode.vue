<template>
  <div class="blend-mode-demo">
    <!-- 效果展示区域 -->
    <div
      class="blend-container"
      :class="gradientClass"
      :style="{ backgroundBlendMode: currentMode.name }"
    >
      <div class="content">
        <h2>{{ currentMode.label }}</h2>
        <p>{{ currentMode.desc }}</p>
      </div>
    </div>

    <!-- 混合模式选择器 -->
    <div class="controls">
      <el-form ref="formRef" label-width="auto">
        <el-form-item label="混合模式">
          <el-select size="small" v-model="selectedMode" @wheel="wheelToggle">
            <el-option
              v-for="mode in blendModes"
              :key="mode.name"
              :label="mode.name"
              :value="mode.name"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="渐变">
          <el-radio-group size="small" v-model="selectedGradient">
            <el-radio-button
              v-for="gradient in gradients"
              :label="gradient.label"
              :value="gradient.name"
            ></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedMode = ref('normal')
const selectedGradient = ref('linear-red-blue')
const blendModes = ref([
  {
    name: 'normal',
    label: '正常模式',
    desc: '默认模式，上层完全覆盖下层，无混合效果',
  },
  {
    name: 'multiply',
    label: '正片叠底',
    desc: '模拟印刷叠加效果，使图像变暗，适合阴影处理',
  },
  {
    name: 'screen',
    label: '滤色模式',
    desc: '类似多个投影仪叠加效果，使图像变亮，适合光效',
  },
  {
    name: 'overlay',
    label: '叠加模式',
    desc: '智能组合正片叠底和滤色，增强对比度',
  },
  {
    name: 'darken',
    label: '变暗模式',
    desc: '逐像素比较，保留较暗的颜色值',
  },
  {
    name: 'lighten',
    label: '变亮模式',
    desc: '逐像素比较，保留较亮的颜色值',
  },
  {
    name: 'color-dodge',
    label: '颜色减淡',
    desc: '通过降低对比度来减淡颜色，产生发光效果',
  },
  {
    name: 'color-burn',
    label: '颜色加深',
    desc: '通过增加对比度加深颜色，产生焦灼效果',
  },
  {
    name: 'hard-light',
    label: '强光模式',
    desc: '根据上层颜色决定叠加方式，产生强烈对比',
  },
  {
    name: 'soft-light',
    label: '柔光模式',
    desc: '类似强光但更柔和，模拟漫反射光照效果',
  },
  {
    name: 'difference',
    label: '差异模式',
    desc: '显示颜色差异，常用于反相效果',
  },
  {
    name: 'exclusion',
    label: '排除模式',
    desc: '类似差异但对比度更低，适合柔和对比',
  },
  {
    name: 'hue',
    label: '色相混合',
    desc: '保留下层明度和饱和度，应用上层色相',
  },
  {
    name: 'saturation',
    label: '饱和度混合',
    desc: '保留下层明度和色相，应用上层饱和度',
  },
  {
    name: 'color',
    label: '颜色混合',
    desc: '保留下层明度，应用上层色相和饱和度',
  },
  {
    name: 'luminosity',
    label: '明度混合',
    desc: '保留下层色相和饱和度，应用上层明度',
  },
])
const gradients = ref([
  { name: 'none', label: '无渐变' },
  { name: 'linear-red-blue', label: '红蓝线性渐变' },
  { name: 'radial-purple', label: '紫色径向渐变' },
  { name: 'green-diagonal', label: '绿色斜向渐变' },
])
const currentMode = computed(() =>
  blendModes.value.find((n) => n.name === selectedMode.value),
)
const gradientClass = computed(() => `gradient-${selectedGradient.value}`)

const wheelToggle = function (e) {
  const step = Math.sign(e.deltaY)
  let index = blendModes.value.findIndex((n) => n?.name === selectedMode.value)
  index = (index + step + blendModes.value.length) % blendModes.value.length

  selectedMode.value = blendModes.value[index]?.name

  e.preventDefault()
}
</script>

<style lang="scss" scoped>
/* SCSS变量 */
$demo-bg-image: url('../../../../public/images/康娜.png');
$gradients: (
  linear-gradient(45deg, rgba(255, 0, 0, 0.5), rgba(0, 0, 255, 0.5)),
  linear-gradient(135deg, rgba(34, 197, 94, 0.5), rgba(6, 95, 70, 0.5)),
  radial-gradient(circle, rgba(147, 51, 234, 0.5), rgba(79, 70, 229, 0.5))
);

.blend-mode-demo {
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;

  .blend-container {
    height: 50vh;
    border: 2px solid #333;
    position: relative;
    transition: background 0.3s ease;

    // 基础背景设置
    background-image:
      linear-gradient(45deg, rgba(255, 0, 0, 0.5), rgba(0, 0, 255, 0.5)),
      $demo-bg-image;
    background-size: cover;
    background-position: top center;

    // 默认无渐变状态
    &.gradient-none {
      background-image: $demo-bg-image;
    }

    // 红蓝线性渐变
    &.gradient-linear-red-blue {
      background-image:
        linear-gradient(45deg, rgba(255, 0, 0, 0.5), rgba(0, 0, 255, 0.5)),
        $demo-bg-image;
    }

    // 紫色径向渐变
    &.gradient-radial-purple {
      background-image:
        radial-gradient(
          circle,
          rgba(147, 51, 234, 0.5),
          rgba(79, 70, 229, 0.5)
        ),
        $demo-bg-image;
    }

    // 绿色斜向渐变
    &.gradient-green-diagonal {
      background-image:
        linear-gradient(135deg, rgba(34, 197, 94, 0.5), rgba(6, 95, 70, 0.5)),
        $demo-bg-image;
    }

    .content {
      position: absolute;
      bottom: 2rem;
      left: 1rem;
      right: 1rem;
      color: white;
      text-shadow:
        1px 1px 4px rgba(0, 0, 0, 0.5),
        1px 1px 4px rgba(0, 0, 0, 0.5);
      font-size: 1rem;

      h2 {
        margin: 0 0 0.5rem;
        font-size: 2rem;
      }
    }
  }

  .controls {
    margin-top: 10px;

    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
