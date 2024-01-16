<script setup lang="ts">
import type { ProfileInput } from '~/server/api/auth/profile.patch'

const { data: user, getSession } = useAuth()

async function handleSubmit(form: ProfileInput) {
  const formData = new FormData()
  if (form.name)
    formData.append('name', form.name)
  if (form.email)
    formData.append('email', form.email)
  if (form.password)
    formData.append('password', form.password)
  if (form.image)
    formData.append('image', form.image)

  await useFetch('/api/auth/profile', { method: 'PATCH', body: formData })
  await getSession()
}
</script>

<template>
  <AuthProfile v-if="user" :profile="user" @submit="handleSubmit" />
</template>
