<script setup lang="ts">
import { ref, onMounted } from 'vue'

const shadowDOMRef = ref()

onMounted(() => {
  if (customElements.get('shadow-button') === undefined) {
    class ShadowButton extends HTMLElement {
      constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })

        // 添加样式和结构
        shadow.innerHTML = `
      <style>
        button {
          padding: 10px 20px;
          background: #007BFF;
          color: white;
          border: none;
          border-radius: 4px;
        }
      </style>
      <button><slot></slot></button>
    `
      }
    }

    customElements.define('shadow-button', ShadowButton)
  }

  const shadowButton = document.createElement('shadow-button')
  shadowButton.textContent = '按钮'
  shadowDOMRef.value.appendChild(shadowButton)
})
</script>

<template>
  <main ref="shadowDOMRef"></main>
</template>
