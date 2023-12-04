<script setup lang="ts">
const { data: articles } = await useFetch('/api/articles')
</script>

<template>
  <h1 class="title">
    Article List
  </h1>
  <ul>
    <li v-for="article of articles" :key="article.id">
      {{ article.title }}
    </li>
  </ul>
</template>

<style scoped>
  .title {
    color: red;
    font-size: 36px;
  }
</style>
