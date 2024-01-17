<script setup lang="ts">
import type { LoginInput } from '~/server/api/auth/login.post'

const { signIn } = useAuth()
const { setToast } = useUiStore()

async function handleSignIn(credentials: LoginInput) {
  await signIn(credentials, { callbackUrl: '/' })
  setToast({ type: 'success', title: 'Welcome back!', message: 'You have already been logged in' })
}
</script>

<template>
  <AuthForm kind="login" @submit="handleSignIn" />
</template>
