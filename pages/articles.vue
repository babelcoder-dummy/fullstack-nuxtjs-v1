<script setup lang="ts">
import type { Column } from '~/components/ui/UiDataTable.vue'

interface ArticleItem {
  id: number
  title: string
  excerpt: string
}

const { data: articles } = await useFetch('/api/articles')
const columns: Column<ArticleItem>[] = [
  { name: 'ID', field: 'id' },
  { name: 'Title', field: 'title' },
  { name: 'Excerpt', field: 'excerpt' },
]
</script>

<template>
  <UiDataTable
    v-if="articles"
    title="Article List"
    :columns="columns"
    :rows="articles"
    @trigger="console.log($event)"
  />
</template>
