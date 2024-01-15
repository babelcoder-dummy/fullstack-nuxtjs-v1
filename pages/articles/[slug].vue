<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const { data: article } = useFetch(`/api/articles/${slug}`)
</script>

<template>
  <ArticleDetails v-if="article" :article="article" />
</template>
