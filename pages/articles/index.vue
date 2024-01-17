<script setup lang="ts">
useSeoMeta({
  title: 'Absence Management - All Articles',
  ogTitle: 'Absence Management - All Articles',
})
const { data: articles } = await useFetch('/api/articles')
</script>

<template>
  <ArticleList v-if="articles" :articles="articles" />
</template>
