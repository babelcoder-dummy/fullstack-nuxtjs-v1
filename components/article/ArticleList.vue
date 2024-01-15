<script setup lang="ts">
import type { ArticleList } from '~/server/api/articles/index.get'

const { articles } = defineProps<{ articles: ArticleList }>()
const navigateToDetailsPage = (slug: string) => navigateTo(`/articles/${slug}`)
</script>

<template>
  <h1 class="text-center text-4xl my-4">
    Article List
  </h1>
  <section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    <UCard v-for="article of articles" :key="article.id" class="cursor-pointer" @click="navigateToDetailsPage(article.slug)">
      <template #header>
        <h3 class="text-lg font-bold">
          {{ article.title }}
        </h3>
      </template>
      <NuxtImg :src="article.image" class="mx-auto" />
      <template #footer>
        <p class="mt-auto">
          {{ article.excerpt }}
        </p>
      </template>
    </UCard>
  </section>
</template>
