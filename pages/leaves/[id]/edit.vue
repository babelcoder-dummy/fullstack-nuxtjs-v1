<script setup lang="ts">
import type { UpdateLeaveInput } from '~/server/api/leaves/[id].patch'

definePageMeta({
  middleware: ['auth'],
})

const route = useRoute()
const id = +(route.params.id as string)
const { data: leave } = await useFetch(`/api/leaves/${id}`)

async function handleSubmit(form: UpdateLeaveInput) {
  await useFetch(`/api/leaves/${id}`, { method: 'PATCH', body: form })
  navigateTo('/leaves')
}
</script>

<template>
  <LeaveForm v-if="leave" kind="edit" :leave="leave" @submit="handleSubmit" />
</template>
