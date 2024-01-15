<script setup lang="ts">
import type { ArticleDetails } from '~/server/api/articles/[slug].get'

const { article } = defineProps<{ article: ArticleDetails }>()
</script>

<template>
  <NuxtImg :src="article.image" class="h-[350px] w-full" />
  <h1 class="text-4xl font-bold">
    {{ article.title }}
  </h1>
  <p class="my-4">
    {{ article.content }}
  </p>
</template>
