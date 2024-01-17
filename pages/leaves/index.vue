<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { data: leaves } = await useFetch('/api/leaves')
</script>

<template>
  <LeaveList v-if="leaves" :leaves="leaves" />
</template>
