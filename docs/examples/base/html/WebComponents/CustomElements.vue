<script setup lang="ts">
import { ref, onMounted } from 'vue';

const customElementsRef = ref();

onMounted(() => {
  if (customElements.get('user-card') === undefined) {
    class UserCard extends HTMLElement {
      static get observedAttributes() {
        return ['name', 'age'];
      } // 声明需监听的属性

      constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // 改用 Shadow DOM
        this.shadowRoot.innerHTML = `
      <div class="card">
        <h3></h3>
        <p>Age: <span class="age"></span></p>
      </div>
    `;
      }

      attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'name') {
          this.shadowRoot.querySelector('h3').textContent = newVal;
        } else if (name === 'age') {
          this.shadowRoot.querySelector('.age').textContent = newVal;
        }
      }
    }

    customElements.define('user-card', UserCard);
  }

  const userCard = document.createElement('user-card');
  userCard.setAttribute('name', 'Bob');
  userCard.setAttribute('age', '35');
  customElementsRef.value.appendChild(userCard);
})
</script>

<template>
  <main ref="customElementsRef" class="custom-elements"></main>
</template>
