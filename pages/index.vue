<script setup lang="ts">
const { data: articles } = useFetch('/api/articles')
</script>

<template>
  <UiAutoSuggestion v-if="articles" :items="articles" />
</template>
