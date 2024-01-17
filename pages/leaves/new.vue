<script setup lang="ts">
import type { CreateLeaveInput } from '~/server/api/leaves/index.post'

definePageMeta({
  middleware: ['auth'],
})

async function handleSubmit(form: CreateLeaveInput) {
  await useFetch('/api/leaves', { method: 'POST', body: form })
  navigateTo('/leaves')
}
</script>

<template>
  <LeaveForm kind="create" @submit="handleSubmit" />
</template>
