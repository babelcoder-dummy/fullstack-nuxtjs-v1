<script setup lang="ts">
const router = useRouter()
</script>

<template>
  Home Page
  <button @click="router.push('/leaves')">
    Go to /leaves
  </button>
</template>
