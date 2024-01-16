<script setup lang="ts">
import type { UpdateArticleInput } from '~/server/api/articles/[slug].patch'

const { slug } = defineProps<{ slug: string }>()
const emit = defineEmits<{
  (e: 'success'): void
}>()
const { data: article } = await useFetch(`/api/articles/${slug}`)

function handleSubmit(form: UpdateArticleInput) {
  console.log(form)
  emit('success')
}
</script>

<template>
  <AdminArticleForm v-if="article" kind="edit" :article="article" @submit="handleSubmit" />
</template>
