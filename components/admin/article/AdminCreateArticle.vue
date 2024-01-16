<script setup lang="ts">
import type { CreateArticleInput } from '~/server/api/articles/index.post'

const emit = defineEmits<{
  (e: 'success'): void
}>()

function handleSubmit(form: CreateArticleInput) {
  console.log(form)
  emit('success')
}
</script>

<template>
  <AdminArticleForm kind="create" @submit="handleSubmit" />
</template>
