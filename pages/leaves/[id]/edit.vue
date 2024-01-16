<script setup lang="ts">
import type { UpdateLeaveInput } from '~/server/api/leaves/[id].patch'

const route = useRoute()
const id = +(route.params.id as string)
const { data: leave } = await useFetch(`/api/leaves/${id}`)

function handleSubmit(form: UpdateLeaveInput) {
  console.log(form)
}
</script>

<template>
  <LeaveForm v-if="leave" kind="edit" :leave="leave" @submit="handleSubmit" />
</template>
