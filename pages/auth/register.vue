<script setup lang="ts">
import type { RegisterInput } from '~/server/api/auth/register.post'

async function handleSignUp(credentials: RegisterInput) {
  const { status, error } = await useFetch('/api/auth/register', {
    method: 'POST',
    body: credentials,
  })

  if (error.value)
    console.error(error.value.message)

  if (status.value === 'success')
    navigateTo('/auth/login')
}
</script>

<template>
  <AuthForm kind="register" @submit="handleSignUp" />
</template>
