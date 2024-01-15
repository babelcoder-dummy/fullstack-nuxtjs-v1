<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const { data: announcement } = useFetch(`/api/announcements/${slug}`)
</script>

<template>
  <AnnouncementDetails v-if="announcement" :announcement="announcement" />
</template>
