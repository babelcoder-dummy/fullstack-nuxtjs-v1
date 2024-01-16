<script setup lang="ts">
import type { LoginInput } from '~/server/api/auth/login.post'

function handleSignIn(credentials: LoginInput) {
  console.log(credentials)
}
</script>

<template>
  <AuthForm kind="login" @submit="handleSignIn" />
</template>
