<script setup lang="ts">
interface Article {
  id: number
  title: string
  excerpt: string
}

const { articles } = defineProps<{ articles: Article[] }>()
</script>

<template>
  <h1>
    Article List
  </h1>
  <table>
    <thead>
      <tr>
        <td>ID</td>
        <td>Title</td>
        <td>Excerpt</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="article of articles" :key="article.id">
        <td>{{ article.id }}</td>
        <td>{{ article.title }}</td>
        <td>{{ article.excerpt }}</td>
      </tr>
    </tbody>
  </table>
</template>
