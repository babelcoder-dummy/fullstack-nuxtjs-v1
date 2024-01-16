<script setup lang="ts">
import type { CreateArticleInput } from '~/server/api/admin/articles/index.post'

const emit = defineEmits<{
  (e: 'success'): void
}>()

async function handleSubmit(form: CreateArticleInput) {
  const formData = new FormData()
  formData.append('title', form.title)
  formData.append('excerpt', form.excerpt)
  formData.append('content', form.content)
  if (form.image)
    formData.append('image', form.image)

  await useFetch('/api/admin/articles', { method: 'POST', body: formData })
  emit('success')
}
</script>

<template>
  <AdminArticleForm kind="create" @submit="handleSubmit" />
</template>
