<script setup lang="ts">
const { data: articles } = await useFetch('/api/articles')
</script>

<template>
  <ArticleList v-if="articles" :articles="articles" />
</template>
