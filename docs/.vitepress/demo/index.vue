<template>
  <div class="demo-container">
    <div class="demo-description" v-html="decodedDescription" />
    <div class="demo-example">
      <component :is="demoComponent" />
    </div>
    <div class="demo-actions">
      <button @click="showCode = !showCode">
        {{ showCode ? '隐藏代码' : '显示代码' }}
      </button>
    </div>
    <div v-show="showCode" class="demo-code">
      <pre class="language-vue"><code>{{ sourceCode }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue'

const props = defineProps({
  path: String,
  description: String,
})

const decodedPath = computed(() => decodeURIComponent(props.path))
const decodedDescription = computed(() => decodeURIComponent(props.description))

const demos = inject('demos')
const sources = inject('sources')

const demoComponent = computed(() => {
  return demos[`../examples/${decodedPath.value}.vue`]?.default
})

const sourceCode = computed(() => {
  return sources[`../examples/${decodedPath.value}.vue`]
})

const showCode = ref(false)
</script>

<style>
/* 添加你的样式 */
.demo-container {
  border: 1px solid #eee;
  margin: 1em 0;
  padding: 1em;
}

.demo-actions {
  text-align: center;
  margin: 1em 0;
}
</style>
