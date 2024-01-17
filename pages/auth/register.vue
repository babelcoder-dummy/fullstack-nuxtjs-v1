<script setup lang="ts">
import type { RegisterInput } from '~/server/api/auth/register.post'

const { setToast } = useUiStore()

async function handleSignUp(credentials: RegisterInput) {
  const { status, error } = await useFetch('/api/auth/register', {
    method: 'POST',
    body: credentials,
  })

  if (error.value)
    setToast({ type: 'error', title: 'Registration failed', message: error.value.message })

  if (status.value === 'success') {
    setToast({
      type: 'success',
      title: 'Registration successfully',
      message: 'You have already been signed up',
    })
    navigateTo('/auth/login')
  }
}
</script>

<template>
  <AuthForm kind="register" @submit="handleSignUp" />
</template>
