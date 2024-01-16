<script setup lang="ts">
import type { RegisterInput } from '~/server/api/auth/register.post'

function handleSignUp(credentials: RegisterInput) {
  console.log(credentials)
}
</script>

<template>
  <AuthForm kind="register" @submit="handleSignUp" />
</template>
