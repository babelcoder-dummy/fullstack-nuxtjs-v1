<script setup lang="ts">
const { data: leaves } = await useFetch('/api/leaves')
</script>

<template>
  <LeaveList v-if="leaves" :leaves="leaves" />
</template>
