<script setup lang="ts">
const { data: announcements } = await useFetch('/api/announcements')
</script>

<template>
  <AnnouncementList v-if="announcements" :announcements="announcements" />
</template>
