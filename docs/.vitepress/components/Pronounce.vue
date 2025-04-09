<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  word: {
    type: String,
    required: true,
  },
})

const audioRef = ref<HTMLAudioElement | null>(null)

const playAudio = () => {
  if (audioRef.value) {
    audioRef.value.currentTime = 0
    audioRef.value.play().catch((error) => {
      console.error('音频播放失败:', error)
    })
  }
}
</script>

<template>
  <div class="pronounce-wrapper">
    <button @click="playAudio" class="play-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
      >
        <path
          d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
        />
      </svg>
    </button>

    <audio ref="audioRef" :src="`../../../pronounce/${props.word}.mp3`"></audio>
  </div>
</template>

<style scoped lang="scss">
.pronounce-wrapper {
  display: inline-block;
  vertical-align: middle;
}

.play-button {
  cursor: pointer;
  padding: 4px;
  border: none;
  background: none;
  color: #64748b;
  transition: color 0.2s;
  border-radius: 4px;

  &:hover {
    color: var(--vp-code-color);
    background-color: var(--vp-code-bg);
  }
  &:active {
    transform: scale(0.95);
  }
  svg {
    display: block;
    fill: currentColor; // 使用当前文本颜色
  }
}
</style>
