<script setup lang="ts">
import type { ProfileInput } from '~/server/api/auth/profile.patch'

function handleSubmit(form: ProfileInput) {
  console.log(form)
}
</script>

<template>
  <AuthProfile @submit="handleSubmit" />
</template>
