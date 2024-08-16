<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterLink to="/home">Go to Home</RouterLink>
  <RouterLink to="/animations">Go to animations</RouterLink>
  <router-view />
</template>

<style scoped></style>
