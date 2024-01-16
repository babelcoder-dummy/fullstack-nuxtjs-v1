<script setup lang="ts">
import type { UpdateArticleInput } from '~/server/api/admin/articles/[slug].patch'

const { slug } = defineProps<{ slug: string }>()
const emit = defineEmits<{
  (e: 'success'): void
}>()
const { data: article } = await useFetch(`/api/articles/${slug}`)

async function handleSubmit(form: UpdateArticleInput) {
  const formData = new FormData()
  if (form.title)
    formData.append('title', form.title)
  if (form.excerpt)
    formData.append('excerpt', form.excerpt)
  if (form.content)
    formData.append('content', form.content)
  if (form.image)
    formData.append('image', form.image)

  await useFetch(`/api/admin/articles/${slug}`, { method: 'PATCH', body: formData })
  emit('success')
}
</script>

<template>
  <AdminArticleForm v-if="article" kind="edit" :article="article" @submit="handleSubmit" />
</template>
