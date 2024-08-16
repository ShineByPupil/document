<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 死循环
const fn = (timestamp: number) => {
  let end = Date.now() + timestamp;
  while (Date.now() < end) {}
};

const webAnimations = ref<HTMLElement | null>(null);

onMounted(() => {
  if (webAnimations.value) {
    webAnimations.value.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(100px)' }],
      {
        duration: 2000,
        iterations: Infinity,
        direction: 'alternate',
      }
    );
  }
});
</script>

<template>
  <nav style="position: fixed; right: 0">
    <ul>
      <li><a href="#css">css</a></li>
      <li><a href="#svg">SVG 动画</a></li>
      <li><a href="#web-animations">Web Animations API</a></li>
      <li><button @click="fn(1000)">暂停1s</button></li>
    </ul>
  </nav>

  <h1 id="css">css</h1>
  <div class="box css transform">transform</div>
  <div class="box css position">position</div>
  <div class="box css margin">margin</div>

  <h1 id="svg">SVG 动画</h1>

  <svg width="200" height="100">
    <rect id="box" x="0" y="0" width="100" height="100" fill="red">
      <animate
        attributeName="x"
        values="0;100;0"
        keyTimes="0;0.5;1"
        dur="4s"
        repeatCount="indefinite"
      />
    </rect>
  </svg>

  <h1 id="web-animations">Web Animations API</h1>
  <div ref="webAnimations" class="box web-animations"></div>
</template>

<style scoped>
.box {
  margin-bottom: 20px;
  width: 100px;
  height: 100px;
  background-color: red;
  position: relative;
  color: #fff;
  text-align: center;
  line-height: 100px;
  font-size: 20px;
}
.css.transform {
  animation: move1 2s linear infinite alternate;
}
.css.position {
  position: relative;
  animation: move2 2s linear infinite alternate;
}
.css.margin {
  animation: move3 2s linear infinite alternate;
}

@keyframes move1 {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100px);
  }
}

@keyframes move2 {
  from {
    left: 0;
  }
  to {
    left: 100px;
  }
}

@keyframes move3 {
  from {
    margin-left: 0;
  }
  to {
    margin-left: 100px;
  }
}
</style>
