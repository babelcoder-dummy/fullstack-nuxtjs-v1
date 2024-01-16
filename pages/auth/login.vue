<script setup lang="ts">
import type { LoginInput } from '~/server/api/auth/login.post'

const { signIn } = useAuth()

async function handleSignIn(credentials: LoginInput) {
  await signIn(credentials, { callbackUrl: '/' })
}
</script>

<template>
  <AuthForm kind="login" @submit="handleSignIn" />
</template>
