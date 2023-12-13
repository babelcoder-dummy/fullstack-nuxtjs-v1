<script setup lang="ts">
const route = useRoute()
</script>

<template>
  Leave Details
  <p>{{ route.params.id }}</p>
  <p>{{ route.path }}</p>
  <p>{{ route.query.field }}</p>
</template>
