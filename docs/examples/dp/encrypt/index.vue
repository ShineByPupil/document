<script setup lang="ts">
import { ref } from 'vue'
import { encrypt } from './encrypt'
import { decrypt } from './decrypt'

const message1 = ref('')
const message2 = ref('')
const result1 = ref('')
const result2 = ref('')

const handleEncrypt = () => {
  result1.value = encrypt(message1.value)
  message2.value = result1.value
}

const handleDecrypt = () => {
  result2.value = decrypt(message2.value)
}
</script>

<template>
  <div class="demo-container">
    <el-input
      v-model="message1"
      @keydown.enter="handleEncrypt"
      placeholder="请输入需要加密的信息"
    >
      <template #append>
        <el-button @click="handleEncrypt">加密</el-button>
      </template>
    </el-input>

    <el-input :value="result1" disabled placeholder="加密结果" />

    <el-input v-model="message2" placeholder="请输入需要加密的信息">
      <template #append>
        <el-button @click="handleDecrypt">解密</el-button>
      </template>
    </el-input>

    <el-input :value="result2" readonly placeholder="解密结果" />
  </div>
</template>

<style scoped lang="scss">
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
